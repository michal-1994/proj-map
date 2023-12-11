import { useState } from 'react';

import MapNav from '../components/map/layout/MapNav';
import MapSidebar from '../components/map/layout/MapSidebar';
import MapView from '../components/map/layout/MapView';

import { MapProvider } from '../context/map-context';

const MapPage = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    return (
        <MapProvider>
            <MapNav />
            <MapSidebar isOpen={isOpen} toggleSidebar={toggleSidebar} />
            <MapView />
        </MapProvider>
    );
};

export default MapPage;
