import { Map } from 'ol';
import { OSM, StadiaMaps } from 'ol/source';
import { Fill, Stroke, Style, Text } from 'ol/style';
import { GeoJSON } from 'ol/format';
import VectorSource from 'ol/source/Vector';
import VectorLayer from 'ol/layer/Vector';
import TileLayer from 'ol/layer/Tile';

import { BaseLayerProps, LayerProps, ToolProps } from '../models';

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

export const createStamenLayer = (layerId: string) => {
    return new TileLayer({
        source: new StadiaMaps({
            layer: layerId
        })
    });
};

export const createOSMLayer = () => {
    return new TileLayer({
        source: new OSM()
    });
};

export const updateMapLayers = (map: Map, layers: LayerProps[]) => {
    layers.forEach((layer: LayerProps) => {
        const existingLayer = map
            ?.getLayers()
            .getArray()
            .find(l => l.get('id') === layer.id);

        if (layer.enable && !existingLayer) {
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

        if (!layer.enable && existingLayer) {
            map?.removeLayer(existingLayer);
        }
    });
};

export const updateMapBaseLayers = (map: Map, baseLayers: BaseLayerProps[]) => {
    baseLayers.forEach((baseLayer: BaseLayerProps) => {
        const existingLayer = map
            ?.getLayers()
            .getArray()
            .find(l => l.get('id') === baseLayer.id);

        if (baseLayer.enable && !existingLayer) {
            let createdLayer: any;

            switch (baseLayer.type) {
                case 'osm':
                    createdLayer = createOSMLayer();
                    break;
                case 'stamen':
                    createdLayer = createStamenLayer(baseLayer.id);
                    break;
            }

            if (createdLayer) {
                createdLayer.setZIndex(-Infinity);
                createdLayer.set('id', baseLayer.id);
                map?.addLayer(createdLayer);
            }
        }

        if (!baseLayer.enable && existingLayer) {
            map?.removeLayer(existingLayer);
        }
    });
};

export const getTool = (tools: ToolProps[], id: string) => {
    return tools.find(tool => tool.id === id);
};
