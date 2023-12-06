import { useState } from 'react';

import MapNav from '../components/map/layout/MapNav';
import MapSidebar from '../components/map/layout/MapSidebar';
import MapView from '../components/map/layout/MapView';

const MapPage = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    return (
        <>
            <MapNav />
            <MapSidebar isOpen={isOpen} toggleSidebar={toggleSidebar} />
            <MapView />
        </>
    );
};

export default MapPage;
