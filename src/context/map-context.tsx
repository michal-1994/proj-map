import React, { createContext, useContext, useState, ReactNode } from 'react';

import * as Constants from '../constants';
import { useAppContext } from './context';

import { BaseLayerProps, LayerProps } from '../models';

interface MapContextProps {
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
    const [isMinimap, setIsMinimap] = useState(minimapVisibility); // TODO: fix initial value after refresh map page
    const [layers, setLayers] = useState(Constants.LAYERS);
    const [baseLayers, setBaseLayers] = useState(Constants.BASE_LAYERS);
    const [selectAll, setSelectAll] = useState(
        Constants.LAYERS.every(layer => layer.enable)
    );

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