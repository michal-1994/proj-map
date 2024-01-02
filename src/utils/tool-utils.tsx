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

import { LINEAR_MEASURMENT, POLYGON_MEASURMENT } from '../constants';
import {
    createMeasurmentPreviewStyle,
    createMeasurmentResultStyle
} from './style-utils';
import { ExportModel } from '../models';

export const toggleHighContrast = () => {
    document.getElementsByTagName('html')[0].classList.toggle('high-contrast');
};

export const formatLength = (line: any) => {
    const length = getLength(line);
    let output;
    if (length > 100) {
        output = Math.round((length / 1000) * 100) / 100 + ' ' + 'km';
    } else {
        output = Math.round(length * 100) / 100 + ' ' + 'm';
    }
    return output;
};

export const formatArea = (polygon: any) => {
    const area = getArea(polygon);
    let output;
    if (area > 10000) {
        output =
            Math.round((area / 1000000) * 100) / 100 + ' ' + 'km<sup>2</sup>';
    } else {
        output = Math.round(area * 100) / 100 + ' ' + 'm<sup>2</sup>';
    }
    return output;
};

export const switchMeasurmentTool = (map: Map, idOption: string) => {
    const source = new VectorSource();
    const vector = new VectorLayer({
        source: source,
        style: createMeasurmentResultStyle()
    });

    let sketch: any;
    let helpTooltipElement: any;
    let helpTooltip: any;
    let measureTooltipElement: any;
    let measureTooltip: any;
    let draw: any;

    const createHelpTooltip = () => {
        if (helpTooltipElement) {
            helpTooltipElement.parentNode.removeChild(helpTooltipElement);
        }
        helpTooltipElement = document.createElement('div');
        helpTooltipElement.className = 'ol-tooltip hidden';
        helpTooltip = new Overlay({
            element: helpTooltipElement,
            offset: [15, 0],
            positioning: 'center-left'
        });
        map.addOverlay(helpTooltip);
    };

    const createMeasureTooltip = () => {
        if (measureTooltipElement) {
            measureTooltipElement.parentNode.removeChild(measureTooltipElement);
        }
        measureTooltipElement = document.createElement('div');
        measureTooltipElement.className = 'ol-tooltip ol-tooltip-measure';
        measureTooltip = new Overlay({
            element: measureTooltipElement,
            offset: [0, -15],
            positioning: 'bottom-center',
            stopEvent: false,
            insertFirst: false
        });
        map.addOverlay(measureTooltip);
    };

    const addInteraction = () => {
        const type = idOption === POLYGON_MEASURMENT ? 'Polygon' : 'LineString';
        draw = new Draw({
            source: source,
            type: type,
            style: function (feature) {
                const geometryType = feature?.getGeometry()?.getType();
                if (geometryType === type || geometryType === 'Point') {
                    return createMeasurmentPreviewStyle();
                }
            }
        });
        map.addInteraction(draw);

        createMeasureTooltip();
        createHelpTooltip();

        let listener: EventsKey | EventsKey[];
        draw.on('drawstart', function (evt: any) {
            sketch = evt.feature;

            let tooltipCoord = evt.coordinate;

            listener = sketch.getGeometry().on('change', function (evt: any) {
                const geom = evt.target;
                let output;
                if (idOption === POLYGON_MEASURMENT) {
                    output = formatArea(geom);
                    tooltipCoord = geom.getInteriorPoint().getCoordinates();
                } else if (idOption === LINEAR_MEASURMENT) {
                    output = formatLength(geom);
                    tooltipCoord = geom.getLastCoordinate();
                }
                measureTooltipElement.innerHTML = output;
                measureTooltip.setPosition(tooltipCoord);
            });
        });

        draw.on('drawend', function () {
            measureTooltipElement.className = 'ol-tooltip ol-tooltip-static';
            measureTooltip.setOffset([0, -7]);
            sketch = null;
            measureTooltipElement = null;
            createMeasureTooltip();
            unByKey(listener);
        });
    };

    map?.addLayer(vector);

    map.removeInteraction(draw);
    addInteraction();
};

export const exportToPDF = (config: ExportModel) => {
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
