import React, { createContext, useContext, useState, ReactNode } from 'react';

import * as Constants from '../constants';
import { useAppContext } from './context';

import { LayerProps } from '../models';

interface MapContextProps {
    isMinimap: boolean;
    toggleMinimap: () => void;
    layers: LayerProps[];
    updateLayer: (id: string) => void;
}

const MapContext = createContext<MapContextProps | undefined>(undefined);

export const MapProvider: React.FC<{ children: ReactNode }> = ({
    children
}) => {
    const { minimapVisibility } = useAppContext();
    const [isMinimap, setIsMinimap] = useState(minimapVisibility); // TODO: fix initial value
    const [layers, setLayers] = useState(Constants.LAYERS);

    const toggleMinimap = () => {
        setIsMinimap(prevIsMinimap => !prevIsMinimap);
    };

    const updateLayer = (id: string) => {
        const updatedLayers = layers.map(layer =>
            layer.id === id ? { ...layer, enable: !layer.enable } : layer
        );

        setLayers(updatedLayers);
    };

    const mapContextValue: MapContextProps = {
        isMinimap,
        toggleMinimap,
        layers,
        updateLayer
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
