import { Feature, Map, View } from 'ol';
import VectorLayer from 'ol/layer/Vector';
import TileLayer from 'ol/layer/Tile';
import { OSM, StadiaMaps } from 'ol/source';
import VectorSource from 'ol/source/Vector';
import TileSource from 'ol/source/Tile';
import {
    OverviewMap,
    ScaleLine,
    defaults as defaultControls
} from 'ol/control';
import { Geometry, Polygon } from 'ol/geom';
import { fromLonLat } from 'ol/proj';
import { GeoJSON } from 'ol/format';

import { createGeoJSONStyle, createOverviewStyle } from './style-utils';
import { BaseLayerProps, LayerProps, ToolProps } from '../models';

/**
 * Creates a VectorLayer for GeoJSON data.
 *
 * @param {string} url - The URL of the GeoJSON data.
 * @returns {VectorLayer<VectorSource>} A VectorLayer with GeoJSON data.
 */
export const createGeoJSONLayer = (url: string): VectorLayer<VectorSource> => {
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

/**
 * Creates a Stamen TileLayer.
 *
 * @param {string} layerId - The Stamen layer ID.
 * @returns {TileLayer<TileSource>} A TileLayer with Stamen source.
 */
export const createStamenLayer = (layerId: string): TileLayer<TileSource> => {
    return new TileLayer({
        source: new StadiaMaps({
            layer: layerId
        })
    });
};

/**
 * Creates an OSM TileLayer.
 *
 * @returns {TileLayer<TileSource>} A TileLayer with OSM source.
 */
export const createOSMLayer = (): TileLayer<TileSource> => {
    return new TileLayer({
        source: new OSM()
    });
};

/**
 * Creates a VectorSource for the overview map.
 *
 * @param {Geometry} geometry - The overview geometry.
 * @returns {VectorSource} A VectorSource with the overview geometry.
 */
export const createOverviewSource = (geometry: Geometry): VectorSource => {
    return new VectorSource({
        features: [new Feature(geometry)]
    });
};

/**
 * Creates a VectorLayer for the overview map.
 *
 * @param {VectorSource} source - The VectorSource for the overview map.
 * @returns {VectorLayer<VectorSource>} A VectorLayer for the overview map.
 */
export const createOverviewLayer = (
    source: VectorSource
): VectorLayer<VectorSource> => {
    return new VectorLayer({
        source: source,
        style: createOverviewStyle()
    });
};

/**
 * Removes the overview layer from the map.
 *
 * @param {Map} map - The OpenLayers Map.
 */
export const removeOverviewLayer = (map: Map): void => {
    map?.getLayers().forEach(layer => {
        const layerId = layer ? layer.get('id') : null;
        if (layerId === 'overviewLayer') {
            map?.removeLayer(layer);
        }
    });
};

/**
 * Updates map layers based on the provided layer configurations.
 *
 * @param {Map} map - The OpenLayers Map.
 * @param {LayerProps[]} layers - An array of LayerProps for configuration.
 */
export const updateMapLayers = (map: Map, layers: LayerProps[]): void => {
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

/**
 * Updates map base layers based on the provided base layer configurations.
 *
 * @param {Map} map - The OpenLayers Map.
 * @param {BaseLayerProps[]} baseLayers - An array of BaseLayerProps for configuration.
 */
export const updateMapBaseLayers = (
    map: Map,
    baseLayers: BaseLayerProps[]
): void => {
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
 * Creates an OverviewMap control.
 *
 * @returns {OverviewMap} An OverviewMap control.
 */
export const createOverviewMap = (): OverviewMap => {
    return new OverviewMap({
        layers: [
            new TileLayer({
                source: new OSM()
            })
        ],
        collapsed: false
    });
};

/**
 * Creates a ScaleLine control.
 *
 * @returns {ScaleLine} A ScaleLine control.
 */
export const createScaleLine = (): ScaleLine => {
    return new ScaleLine();
};

/**
 * Creates a Polygon geometry based on provided coordinates.
 *
 * @param {number[]} topLeft - Top-left coordinates.
 * @param {number[]} topRight - Top-right coordinates.
 * @param {number[]} bottomRight - Bottom-right coordinates.
 * @param {number[]} bottomLeft - Bottom-left coordinates.
 * @returns {Polygon} A Polygon geometry.
 */
export const createGeometry = (
    topLeft: number[],
    topRight: number[],
    bottomRight: number[],
    bottomLeft: number[]
): Polygon => {
    return new Polygon([
        [
            fromLonLat([bottomLeft[0], bottomLeft[1]]),
            fromLonLat([bottomRight[0], bottomRight[1]]),
            fromLonLat([topRight[0], topRight[1]]),
            fromLonLat([topLeft[0], topLeft[1]])
        ]
    ]);
};

/**
 * Creates an OpenLayers Map.
 *
 * @returns {Map} An OpenLayers Map.
 */
export const createMap = (): Map => {
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
