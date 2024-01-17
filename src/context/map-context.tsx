import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Map } from 'ol';

import { useAppContext } from './context';
import { createMap, removeLayerById } from '../utils/map-utils';
import { BASE_LAYERS, LAYERS } from '../constants';
import { BaseLayerProps, LayerProps } from '../models';

interface MapContextProps {
    map: Map | null;
    initMap: () => void;
    isMinimap: boolean;
    toggleMinimap: () => void;
    layers: LayerProps[];
    switchLayer: (layerId: string) => void;
    removeLayer: (layerId: string) => void;
    addLayer: (layer: LayerProps) => void;
    moveLayer: (layerId: string, direction: number) => void;
    changeOpacityLayer: (layerId: string, value: number) => void;
    selectAll: boolean;
    updateAllLayers: (value: boolean) => void;
    baseLayers: BaseLayerProps[];
    updateBaseLayers: (layerId: string) => void;
}

const MapContext = createContext<MapContextProps | undefined>(undefined);

export const MapProvider: React.FC<{ children: ReactNode }> = ({
    children
}) => {
    const { minimapVisibility } = useAppContext();
    const [map, setMap] = useState<Map | null>(null);
    const [isMinimap, setIsMinimap] = useState<boolean>(minimapVisibility);
    const [layers, setLayers] = useState<LayerProps[]>(LAYERS);
    const [baseLayers, setBaseLayers] = useState<BaseLayerProps[]>(BASE_LAYERS);
    const [selectAll, setSelectAll] = useState<boolean>(
        LAYERS.every(layer => layer.enable)
    );

    const initMap = () => {
        setMap(createMap());
    };

    const toggleMinimap = () => {
        setIsMinimap(prevIsMinimap => !prevIsMinimap);
    };

    const switchLayer = (layerId: string) => {
        const updatedLayers = layers.map(layer => {
            return layer.id === layerId
                ? { ...layer, enable: !layer.enable }
                : layer;
        });

        setSelectAll(updatedLayers.every(layer => layer.enable));
        setLayers(updatedLayers);
    };

    const removeLayer = (layerId: string) => {
        const updatedLayers = layers.filter(layer => layer.id !== layerId);
        setLayers(updatedLayers);

        if (map) {
            removeLayerById(map, layerId);
        }
    };

    const addLayer = (layer: LayerProps) => {
        const updatedLayers = [layer, ...layers];
        setLayers(updatedLayers);
    };

    const moveLayer = (layerId: string, direction: number) => {
        const index = layers.findIndex(layer => layer.id === layerId);

        if (index !== -1) {
            const newIndex = index + direction;

            if (newIndex >= 0 && newIndex < layers.length) {
                [layers[index], layers[newIndex]] = [
                    layers[newIndex],
                    layers[index]
                ];

                const newLayers = [...layers];
                [newLayers[index], newLayers[newIndex]] = [
                    layers[index],
                    layers[newIndex]
                ];

                setLayers(newLayers);
            }
        }
    };

    const changeOpacityLayer = (layerId: string, value: number) => {
        const updatedLayers = layers.map(layer => {
            return layer.id === layerId ? { ...layer, opacity: value } : layer;
        });

        setLayers(updatedLayers);
    };

    const updateAllLayers = (value: boolean) => {
        setSelectAll(value);

        const updatedLayers = layers.map(layer => {
            return { ...layer, enable: value };
        });

        setLayers(updatedLayers);
    };

    const updateBaseLayers = (layerId: string) => {
        const updatedBaseLayers = baseLayers.map(layer =>
            layer.id === layerId
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
        switchLayer,
        removeLayer,
        addLayer,
        moveLayer,
        changeOpacityLayer,
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
