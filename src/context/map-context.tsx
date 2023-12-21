import React, { createContext, useContext, useState, ReactNode } from 'react';

import { ScaleLine, defaults as defaultControls } from 'ol/control';
import { fromLonLat } from 'ol/proj';
import Map from 'ol/Map';
import View from 'ol/View';

import * as Constants from '../constants';
import { useAppContext } from './context';

import { BaseLayerProps, LayerProps } from '../models';

interface MapContextProps {
    map: Map | null;
    initMap: () => void;
    isMinimap: boolean;
    toggleMinimap: () => void;
    layers: LayerProps[];
    updateLayer: (id: string) => void;
    selectAll: boolean;
    updateAllLayers: (value: boolean) => void;
    baseLayers: BaseLayerProps[];
    updateBaseLayers: (id: string) => void;
}

const MapContext = createContext<MapContextProps | undefined>(undefined);

export const MapProvider: React.FC<{ children: ReactNode }> = ({
    children
}) => {
    const { minimapVisibility } = useAppContext();
    const [map, setMap] = useState<Map | null>(null);
    const [isMinimap, setIsMinimap] = useState<boolean>(minimapVisibility);
    const [layers, setLayers] = useState<LayerProps[]>(Constants.LAYERS);
    const [baseLayers, setBaseLayers] = useState<BaseLayerProps[]>(
        Constants.BASE_LAYERS
    );
    const [selectAll, setSelectAll] = useState<boolean>(
        Constants.LAYERS.every(layer => layer.enable)
    );

    const initMap = () => {
        const newMap = new Map({
            controls: defaultControls({ rotate: false }).extend([
                new ScaleLine()
            ]),
            target: 'map-view',
            layers: [],
            view: new View({
                center: fromLonLat([21.0122, 52.2297]), // Default Warszawa
                zoom: 9
            })
        });

        setMap(newMap);
    };

    const toggleMinimap = () => {
        setIsMinimap(prevIsMinimap => !prevIsMinimap);
    };

    const updateLayer = (id: string) => {
        const updatedLayers = layers.map(layer => {
            return layer.id === id
                ? { ...layer, enable: !layer.enable }
                : layer;
        });

        setSelectAll(updatedLayers.every(layer => layer.enable));
        setLayers(updatedLayers);
    };

    const updateAllLayers = (value: boolean) => {
        setSelectAll(value);

        const updatedLayers = layers.map(layer => {
            return { ...layer, enable: value };
        });

        setLayers(updatedLayers);
    };

    const updateBaseLayers = (id: string) => {
        const updatedBaseLayers = baseLayers.map(layer =>
            layer.id === id
                ? { ...layer, enable: true }
                : { ...layer, enable: false }
        );

        setBaseLayers(updatedBaseLayers);
    };

    const mapContextValue: MapContextProps = {
        map,
        initMap,
        isMinimap,
        toggleMinimap,
        layers,
        updateLayer,
        selectAll,
        updateAllLayers,
        baseLayers,
        updateBaseLayers
    };

    return (
        <MapContext.Provider value={mapContextValue}>
            {children}
        </MapContext.Provider>
    );
};

export const useMapContext = () => {
    const context = useContext(MapContext);
    if (!context) {
        throw new Error('useMapContext must be used within a MapProvider');
    }
    return context;
};
