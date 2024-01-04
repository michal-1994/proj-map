import { Object } from 'ol';
import { Fill, Stroke, Style, Text } from 'ol/style';
import CircleStyle from 'ol/style/Circle';

/**
 * Creates a GeoJSON style for OpenLayers features.
 *
 * @param {Object} feature - The OpenLayers feature to be styled.
 * @returns {Style} The configured style for the feature.
 */
export const createGeoJSONStyle = (feature: Object): Style => {
    return new Style({
        fill: new Fill({
            color: 'rgba(173, 216, 230, 0.6)'
        }),
        stroke: new Stroke({
            color: 'rgb(0, 102, 204)',
            width: 2
        }),
        text: new Text({
            font: '15px Arial, sans-serif',
            text: feature.get('nazwa'),
            fill: new Fill({
                color: 'rgb(0, 0, 0)'
            }),
            stroke: new Stroke({
                color: 'rgba(255, 255, 255, 0.5)',
                width: 2
            }),
            offsetX: 0,
            offsetY: -10
        })
    });
};

/**
 * Creates an overview style for OpenLayers features.
 *
 * @returns {Style} The configured style for the feature.
 */
export const createOverviewStyle = (): Style => {
    return new Style({
        fill: new Fill({
            color: 'rgba(95, 20, 216, 0.15)'
        }),
        stroke: new Stroke({
            color: 'rgb(95, 20, 216)',
            width: 2
        })
    });
};

/**
 * Creates a measurment result style for OpenLayers features.
 *
 * @returns {Style} The configured style for the feature.
 */
export const createMeasurmentResultStyle = (): Style => {
    return new Style({
        fill: new Fill({
            color: 'rgba(22, 189, 22, .15)'
        }),
        stroke: new Stroke({
            color: 'rgb(22, 189, 22)',
            width: 2
        }),
        image: new CircleStyle({
            radius: 7,
            fill: new Fill({
                color: 'rgb(22, 189, 22)'
            }),
            stroke: new Stroke({
                color: 'rgb(22, 189, 22)',
                width: 2
            })
        })
    });
};

/**
 * Creates a measurment preview style for OpenLayers features.
 *
 * @returns {Style} The configured style for the feature.
 */
export const createMeasurmentPreviewStyle = (): Style => {
    return new Style({
        fill: new Fill({
            color: 'rgba(255, 255, 255, .15)'
        }),
        stroke: new Stroke({
            color: 'rgba(0, 0, 0, 1)',
            lineDash: [10, 10],
            width: 2
        }),
        image: new CircleStyle({
            radius: 5,
            stroke: new Stroke({
                color: 'rgba(0, 0, 0, 1)'
            }),
            fill: new Fill({
                color: 'rgba(255, 255, 255, 1)'
            })
        })
    });
};
