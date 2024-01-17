import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

import { Map, Overlay } from 'ol';
import { FitOptions } from 'ol/View';
import { Draw, Interaction } from 'ol/interaction';
import { getArea, getLength } from 'ol/sphere.js';
import { LineString, Polygon } from 'ol/geom';
import { unByKey } from 'ol/Observable.js';
import { Type } from 'ol/geom/Geometry';
import { EventsKey } from 'ol/events';
import VectorSource from 'ol/source/Vector';

import {
    createMeasurmentPreviewStyle,
    createMeasurmentResultStyle
} from './style-utils';
import { createVectorLayer, getLayerById } from './map-utils';
import { ExportModel, ToolProps } from '../models';

/**
 * Toggles high contrast mode by adding or removing the 'high-contrast' class to the HTML element.
 */
export const toggleHighContrast = (): void => {
    document.getElementsByTagName('html')[0].classList.toggle('high-contrast');
};

/**
 * Retrieves a tool by its ID from the provided tools array.
 *
 * @param {ToolProps[]} tools - An array of ToolProps.
 * @param {string} id - The ID of the tool to retrieve.
 * @returns {ToolProps | undefined} The tool with the specified ID.
 */
export const getTool = (
    tools: ToolProps[],
    id: string
): ToolProps | undefined => {
    return tools.find(tool => tool.id === id);
};

/**
 * Switches the measurement tool based on the selected option (type) for either polygon or linear measurements.
 *
 * @param {Map} map - The OpenLayers map instance.
 * @param {string} type - The selected measurement option ('Polygon' or 'LineString').
 */
export const switchMeasurmentTool = (map: Map, type: string): void => {
    let measurmentLayer = getLayerById(map, 'measurmentLayer');

    if (!measurmentLayer) {
        const source = new VectorSource();
        measurmentLayer = createVectorLayer(
            source,
            createMeasurmentResultStyle
        );
        map.addLayer(measurmentLayer);
        measurmentLayer.setZIndex(1001);
        measurmentLayer.set('id', 'measurmentLayer');
    }

    let sketch: any;
    let measureTooltipElement: any;
    let measureTooltip: Overlay | null;
    let draw: Draw | null = null;
    let listener: EventsKey | EventsKey[];

    const createMeasureTooltip = (): void => {
        if (measureTooltipElement) {
            measureTooltipElement.parentNode.removeChild(measureTooltipElement);
        }
        measureTooltipElement = document.createElement('div');
        measureTooltipElement.className = 'ol-tooltip';
        measureTooltip = new Overlay({
            element: measureTooltipElement,
            offset: [0, -15],
            positioning: 'bottom-center',
            stopEvent: false,
            insertFirst: false
        });
        map.addOverlay(measureTooltip);
    };

    const updateMeasurementTooltip = (
        geom: Polygon | LineString,
        tooltipCoord: number[]
    ): void => {
        let output;
        if (geom instanceof Polygon) {
            const area = getArea(geom);
            output =
                area > 10000
                    ? `${
                          Math.round((area / 1000000) * 100) / 100
                      } km<sup>2</sup>`
                    : `${Math.round(area * 100) / 100} m<sup>2</sup>`;
            tooltipCoord = geom.getInteriorPoint().getCoordinates();
        } else if (geom instanceof LineString) {
            const length = getLength(geom);
            output =
                length > 100
                    ? `${Math.round((length / 1000) * 100) / 100} km`
                    : `${Math.round(length * 100) / 100} m`;
            tooltipCoord = geom.getLastCoordinate();
        }
        measureTooltipElement.innerHTML = output;
        measureTooltip?.setPosition(tooltipCoord);
    };

    const handleDrawStart = (evt: any): void => {
        sketch = evt.feature;
        listener = sketch.getGeometry().on('change', function (evt: any) {
            updateMeasurementTooltip(evt.target, evt.coordinate);
        });
    };

    const handleDrawEnd = (): void => {
        measureTooltipElement.className = 'ol-tooltip ol-tooltip-static';
        measureTooltip?.setOffset([0, -7]);
        sketch = null;
        measureTooltipElement = null;
        createMeasureTooltip();
        unByKey(listener);
    };

    const addInteraction = (): void => {
        const source = measurmentLayer?.getSource() as VectorSource;

        draw = new Draw({
            source: source,
            type: type as Type,
            style: function (feature) {
                const geometryType = feature?.getGeometry()?.getType();
                if (geometryType === type || geometryType === 'Point') {
                    return createMeasurmentPreviewStyle();
                }
            }
        });

        map.addInteraction(draw);
        createMeasureTooltip();

        draw.on('drawstart', handleDrawStart);
        draw.on('drawend', handleDrawEnd);
    };

    removeInteraction(map, Draw);
    addInteraction();
};

/**
 * Removes a specific interaction from the given map.
 * @param {Map} map - The map from which to remove the interaction.
 * @param {Function} type - The type of the interaction to be removed.
 */
export const removeInteraction = (map: Map, type: Function): void => {
    const isInstanceOfType = (interaction: Interaction): boolean => {
        return interaction instanceof type;
    };

    const interactionToRemove = map
        .getInteractions()
        .getArray()
        .find(isInstanceOfType);
    if (interactionToRemove) {
        map.removeInteraction(interactionToRemove);
    }
};

/**
 * Exports the map view to a PDF document with the specified configuration.
 *
 * @param {ExportModel} config - The configuration object containing map and export settings.
 */
export const exportToPDF = (config: ExportModel): void => {
    document.body.style.cursor = 'progress';

    const originalExtent = config.map
        .getView()
        .calculateExtent(config.map.getSize());

    config.map
        .getView()
        .fit(config.overviewExtent, config.map.getSize() as FitOptions);

    setTimeout(() => {
        html2canvas(config.map.getViewport()).then(canvas => {
            const pdf = new jsPDF({
                orientation: config.orientation,
                unit: 'mm',
                format: [config.width, config.height]
            });

            const margin = 0;
            const marginLeft = margin;
            const marginTop = margin;

            pdf.addImage(
                canvas.toDataURL('image/png'),
                'JPEG',
                marginLeft,
                marginTop,
                config.width - 2 * marginLeft,
                config.height - 2 * marginTop
            );

            config.map
                .getView()
                .fit(originalExtent, config.map.getSize() as FitOptions);

            const pdfBlob = pdf.output('blob');
            const pdfUrl = URL.createObjectURL(pdfBlob);
            window.open(pdfUrl, '_blank');

            document.body.style.cursor = 'auto';
        });
    }, 2000);
};

/**
 * Checks whether the user is using a mobile device.
 * @returns {boolean} True if the user is on a mobile device, otherwise false.
 */
export const isMobile = () => {
    const mobileUserAgents = [
        'Android',
        'webOS',
        'iPhone',
        'iPad',
        'iPod',
        'BlackBerry',
        'Windows Phone'
    ];

    return mobileUserAgents.some((mobileAgent: any) =>
        navigator.userAgent.includes(mobileAgent)
    );
};
