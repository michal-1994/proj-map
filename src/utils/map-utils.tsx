import { Feature, Map, View } from 'ol';
import { OSM, StadiaMaps } from 'ol/source';
import {
    OverviewMap,
    ScaleLine,
    defaults as defaultControls
} from 'ol/control';
import { Fill, Stroke, Style, Text } from 'ol/style';
import { fromLonLat, toLonLat } from 'ol/proj';
import { Geometry, Polygon } from 'ol/geom';
import { Coordinate } from 'ol/coordinate';
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

export const createOverviewLayer = (geometry: Geometry) => {
    return new VectorLayer({
        source: new VectorSource({
            features: [new Feature(geometry)]
        }),
        style: new Style({
            fill: new Fill({
                color: 'rgba(230, 215, 173, 0.1)'
            }),
            stroke: new Stroke({
                color: 'rgb(204, 116, 0)',
                width: 2
            })
        })
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

export const createOverviewMap = () => {
    return new OverviewMap({
        layers: [
            new TileLayer({
                source: new OSM()
            })
        ],
        collapsed: false
    });
};

export const createScaleLine = () => {
    return new ScaleLine();
};

export const createGeometry = (
    topLeft: number[],
    topRight: number[],
    bottomRight: number[],
    bottomLeft: number[]
) => {
    return new Polygon([
        [
            transformCoordinate(bottomLeft[0], bottomLeft[1]),
            transformCoordinate(bottomRight[0], bottomRight[1]),
            transformCoordinate(topRight[0], topRight[1]),
            transformCoordinate(topLeft[0], topLeft[1])
        ]
    ]);
};

export const createMap = () => {
    return new Map({
        controls: defaultControls().extend([createScaleLine()]),
        target: 'map-view',
        layers: [],
        view: new View({
            center: transformCoordinate(21.0122, 52.2297), // Default Warszawa
            zoom: 9
        })
    });
};

export const transformCoordinate = (longitude: number, latitude: number) => {
    return fromLonLat([longitude, latitude]);
};

export const transformProjection = (point: Coordinate | undefined) => {
    return point ? toLonLat(point) : null;
};
