import { Feature, Map, View } from 'ol';
import { OSM, StadiaMaps } from 'ol/source';
import {
    OverviewMap,
    ScaleLine,
    defaults as defaultControls
} from 'ol/control';
import { Geometry, Polygon } from 'ol/geom';
import { fromLonLat } from 'ol/proj';
import { GeoJSON } from 'ol/format';
import VectorSource from 'ol/source/Vector';
import VectorLayer from 'ol/layer/Vector';
import TileLayer from 'ol/layer/Tile';

import { createGeoJSONStyle, createOverviewStyle } from './style-utils';
import { BaseLayerProps, LayerProps, ToolProps } from '../models';

export const createGeoJSONLayer = (url: string) => {
    return new VectorLayer({
        source: new VectorSource({
            format: new GeoJSON(),
            url: url
        }),
        style: function (feature) {
            return createGeoJSONStyle(feature.get('nazwa'));
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

export const createOverviewSource = (geometry: Geometry) => {
    return new VectorSource({
        features: [new Feature(geometry)]
    });
};

export const createOverviewLayer = (source: VectorSource) => {
    return new VectorLayer({
        source: source,
        style: createOverviewStyle()
    });
};

export const removeOverviewLayer = (map: Map) => {
    map?.getLayers().forEach(layer => {
        const layerId = layer ? layer.get('id') : null;
        if (layerId === 'overviewLayer') {
            map?.removeLayer(layer);
        }
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
            fromLonLat([bottomLeft[0], bottomLeft[1]]),
            fromLonLat([bottomRight[0], bottomRight[1]]),
            fromLonLat([topRight[0], topRight[1]]),
            fromLonLat([topLeft[0], topLeft[1]])
        ]
    ]);
};

export const createMap = () => {
    return new Map({
        controls: defaultControls().extend([createScaleLine()]),
        target: 'map-view',
        layers: [],
        view: new View({
            center: fromLonLat([21.0122, 52.2297]), // Default Warszawa
            zoom: 15
        })
    });
};
