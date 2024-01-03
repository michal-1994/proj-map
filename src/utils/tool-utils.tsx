import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

import { Map, Overlay } from 'ol';
import { FitOptions } from 'ol/View';
import { Draw } from 'ol/interaction';
import { getArea, getLength } from 'ol/sphere.js';
import { unByKey } from 'ol/Observable.js';
import { EventsKey } from 'ol/events';
import VectorSource from 'ol/source/Vector';
import VectorLayer from 'ol/layer/Vector';

import {
    createMeasurmentPreviewStyle,
    createMeasurmentResultStyle
} from './style-utils';
import { ExportModel } from '../models';
import { Type } from 'ol/geom/Geometry';

/**
 * Toggles high contrast mode by adding or removing the 'high-contrast' class to the HTML element.
 */
export const toggleHighContrast = (): void => {
    document.getElementsByTagName('html')[0].classList.toggle('high-contrast');
};

/**
 * Switches the measurement tool based on the selected option (type) for either polygon or linear measurements.
 *
 * @param {Map} map - The OpenLayers map instance.
 * @param {string} type - The selected measurement option ('Polygon' or 'LineString').
 */
export const switchMeasurmentTool = (map: Map, type: string): void => {
    console.log(type);

    const source = new VectorSource();
    const vector = new VectorLayer({
        source: source,
        style: createMeasurmentResultStyle()
    });

    let sketch: any;
    let measureTooltipElement: any;
    let measureTooltip: any;
    let draw: any;

    const createMeasureTooltip = () => {
        if (measureTooltipElement) {
            measureTooltipElement.parentNode.removeChild(measureTooltipElement);
        }
        measureTooltipElement = document.createElement('div');
        measureTooltipElement.style.color = 'black';
        measureTooltip = new Overlay({
            element: measureTooltipElement,
            offset: [0, -15],
            positioning: 'bottom-center',
            stopEvent: false,
            insertFirst: false
        });
        map.addOverlay(measureTooltip);
    };

    map?.addLayer(vector);
    map.removeInteraction(draw);

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

    let listener: EventsKey | EventsKey[];
    draw.on('drawstart', function (evt: any) {
        sketch = evt.feature;
        let tooltipCoord = evt.coordinate;

        listener = sketch.getGeometry().on('change', function (evt: any) {
            const geom = evt.target;
            let output;

            if (type === 'Polygon') {
                const area = getArea(geom);
                output =
                    area > 10000
                        ? `${
                              Math.round((area / 1000000) * 100) / 100
                          } km<sup>2</sup>`
                        : `${Math.round(area * 100) / 100} m<sup>2</sup>`;
                tooltipCoord = geom.getInteriorPoint().getCoordinates();
            } else if (type === 'LineString') {
                const length = getLength(geom);
                output =
                    length > 100
                        ? `${Math.round((length / 1000) * 100) / 100} km`
                        : `${Math.round(length * 100) / 100} m`;
                tooltipCoord = geom.getLastCoordinate();
            }
            measureTooltipElement.innerHTML = output;
            measureTooltip.setPosition(tooltipCoord);
        });
    });

    draw.on('drawend', function () {
        measureTooltipElement.style.color = 'black';
        measureTooltip.setOffset([0, -7]);
        sketch = null;
        measureTooltipElement = null;
        createMeasureTooltip();
        unByKey(listener);
    });
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
