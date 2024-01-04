import { Map, View } from 'ol';
import { OSM, StadiaMaps } from 'ol/source';
import {
    OverviewMap,
    ScaleLine,
    defaults as defaultControls
} from 'ol/control';
import { Polygon } from 'ol/geom';
import { fromLonLat } from 'ol/proj';
import { GeoJSON } from 'ol/format';
import { Style } from 'ol/style';
import VectorLayer from 'ol/layer/Vector';
import TileLayer from 'ol/layer/Tile';
import VectorSource from 'ol/source/Vector';
import TileSource from 'ol/source/Tile';

import { createGeoJSONStyle } from './style-utils';
import { BaseLayerProps, LayerProps } from '../models';

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
 * Creates a VectorLayer.
 *
 * @param {VectorSource} source - The VectorSource for the layer.
 * @param {function} styleFn - The styling function that defines the style for each feature.
 * @returns {VectorLayer<VectorSource>} A VectorLayer with the specified source and style.
 */
export const createVectorLayer = (
    source: VectorSource,
    styleFn: (feature?: any) => Style
): VectorLayer<VectorSource> => {
    return new VectorLayer({
        source,
        style: styleFn
    });
};

/**
 * Removes the layer by id from the map.
 *
 * @param {Map} map - The OpenLayers Map.
 * @param {string} id - The layer id.
 */
export const removeLayerById = (map: Map, id: string): void => {
    map?.getLayers().forEach(layer => {
        const layerId = layer ? layer.get('id') : null;
        if (layerId === id) {
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
                        const source = new VectorSource({
                            format: new GeoJSON(),
                            url: layer.url
                        });
                        createdLayer = createVectorLayer(
                            source,
                            createGeoJSONStyle
                        );
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
        controls: defaultControls().extend([new ScaleLine()]),
        target: 'map-view',
        layers: [],
        view: new View({
            center: fromLonLat([21.0122, 52.2297]), // Default Warszawa
            zoom: 15
        })
    });
};
