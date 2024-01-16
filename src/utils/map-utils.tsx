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
import VectorSource from 'ol/source/Vector';
import VectorLayer from 'ol/layer/Vector';
import TileSource from 'ol/source/Tile';
import TileLayer from 'ol/layer/Tile';
import Layer from 'ol/layer/Layer';

import { createGeoJSONStyle } from './style-utils';
import { BaseLayerProps, LayerProps } from '../models';

/**
 * Creates a TileLayer.
 *
 * @param {TileSource} source - The TileSource for the layer.
 * @returns {TileLayer<TileSource>} A TileLayer with the specified source.
 */
export const createTileLayer = (source: TileSource): TileLayer<TileSource> => {
    return new TileLayer({
        source
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
 * Get the layers from the map.
 *
 * @param {Map} map - The OpenLayers map.
 * @returns {Layer[]} - The OpenLayers layers.
 */
export const getLayers = (map: Map): Layer[] => {
    return map?.getLayers().getArray() as Layer[];
};

/**
 * Get the layer by id from the map.
 *
 * @param {Map} map - The OpenLayers map.
 * @param {string} layerId - The layer id.
 * @returns {Layer | null} - The OpenLayers layer with the specified id, or null if not found.
 */
export const getLayerById = (map: Map, layerId: string): Layer | null => {
    return (
        (getLayers(map).find(layer => layer.get('id') === layerId) as Layer) ||
        null
    );
};

/**
 * Fetches GeoJSON features from the specified URL using the Fetch API.
 *
 * @param {string} url - The URL from which to fetch the GeoJSON data.
 * @returns {Promise<any>} - A promise that resolves to an array of GeoJSON features.
 * @throws {Error} - If there is an error during the fetch operation or if no features are found.
 */
export const getFeatures = async (url: string): Promise<any> => {
    try {
        const response = await fetch(url);
        const geojson = await response.json();

        if (geojson) {
            return geojson.features;
        } else {
            console.error('No features found.');
            return [];
        }
    } catch (error) {
        console.error('Error downloading GeoJSON.', error);
        return [];
    }
};

/**
 * Removes the layer by id from the map, if layerId is equal to measurmentLayer remove tooltips.
 *
 * @param {Map} map - The OpenLayers Map.
 * @param {string} id - The layer id.
 */
export const removeLayerById = (map: Map, id: string): void => {
    getLayers(map).forEach(layer => {
        const layerId = layer ? layer.get('id') : null;
        if (layerId === id) {
            map?.removeLayer(layer);
        }
        if (id === 'measurmentLayer') {
            for (let tooltip of document.querySelectorAll('.ol-tooltip')) {
                tooltip.remove();
            }
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
    layers.forEach((layer: LayerProps, index: number) => {
        const existingLayer = getLayers(map).find(
            l => l.get('id') === layer.id
        );

        if (existingLayer) {
            existingLayer.set('opacity', layer.opacity);
            existingLayer.set('visible', layer.enable);
        }

        if (!existingLayer) {
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
                createdLayer.setZIndex(1000 - index);
                createdLayer.set('opacity', layer.opacity);
                createdLayer.set('visible', layer.enable);
                createdLayer.set('url', layer.url);
                map?.addLayer(createdLayer);
            }
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
        const existingLayer = getLayers(map).find(
            l => l.get('id') === baseLayer.id
        );

        if (baseLayer.enable && !existingLayer) {
            let createdLayer: TileLayer<TileSource> | undefined;
            let source: TileSource;

            switch (baseLayer.type) {
                case 'osm':
                    source = new OSM();
                    createdLayer = createTileLayer(source);
                    break;
                case 'stamen':
                    source = new StadiaMaps({
                        layer: baseLayer.id
                    });
                    createdLayer = createTileLayer(source);
                    break;
            }

            if (createdLayer) {
                createdLayer.set('id', baseLayer.id);
                createdLayer.setZIndex(-Infinity);
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

// TEMPORARY
export const helper = (layers: any): any => {
    layers.forEach((layer: any) => {
        console.log(layer.get('id'));
        console.log(layer.getZIndex());
    });
}