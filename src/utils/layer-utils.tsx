import VectorSource from 'ol/source/Vector';
import VectorLayer from 'ol/layer/Vector';
import GeoJSON from 'ol/format/GeoJSON';
import Stroke from 'ol/style/Stroke';
import Style from 'ol/style/Style';
import Fill from 'ol/style/Fill';
import Text from 'ol/style/Text';
import Map from 'ol/Map';

import { LayerProps } from '../models';

export const createGeoJSONLayer = (url: string) => {
    return new VectorLayer({
        source: new VectorSource({
            format: new GeoJSON(),
            url: url
        }),
        style: function (feature) {
            const label = feature.get('nazwa');

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
                    text: label,
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
        }
    });
};

export const updateMapLayers = (map: Map, layers: LayerProps[]) => {
    layers.forEach((layer: LayerProps) => {
        const isAdded = map
            ?.getLayers()
            .getArray()
            .find(l => l.get('id') === layer.id);

        if (layer.enable && !isAdded) {
            let createdLayer: any;
            switch (layer.type) {
                case 'geojson':
                    if (layer.url) {
                        createdLayer = createGeoJSONLayer(layer.url);
                    }
                    break;
            }

            if (createdLayer) {
                createdLayer.set('id', layer.id);
                map?.addLayer(createdLayer);
            }
        }

        if (!layer.enable && isAdded) {
            map?.removeLayer(isAdded);
        }
    });
};
