import React, { createContext, useContext, useState, ReactNode } from 'react';
import { useAppContext } from './context';

interface MapContextProps {
    isMinimap: boolean;
    toggleMinimap: () => void;
}

const MapContext = createContext<MapContextProps | undefined>(undefined);

export const MapProvider: React.FC<{ children: ReactNode }> = ({
    children
}) => {
    const { minimap } = useAppContext();
    const [isMinimap, setIsMinimap] = useState(minimap);

    const toggleMinimap = () => {
        setIsMinimap(prevIsMinimap => !prevIsMinimap);
    };

    const mapContextValue: MapContextProps = {
        isMinimap,
        toggleMinimap
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
