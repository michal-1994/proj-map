import { useState } from 'react';

import MapNav from '../components/map/layout/MapNav';
import MapSidebar from '../components/map/layout/MapSidebar';
import MapView from '../components/map/layout/MapView';
import MapPrint from '../components/map/tools/MapPrint';

import { MapProvider } from '../context/map-context';

const MapPage = () => {
    const [isOpenSidebar, setIsOpenSidebar] = useState(false);
    const [isOpenMapPrint, setIsOpenMapPrint] = useState(true);

    const toggleSidebar = () => {
        setIsOpenSidebar(!isOpenSidebar);
    };

    const toggleMapPrint = () => {
        setIsOpenMapPrint(!isOpenMapPrint);
    };

    return (
        <MapProvider>
            <MapNav />
            <MapSidebar isOpen={isOpenSidebar} toggleSidebar={toggleSidebar} />
            {/* <MapPrint isOpen={isOpenMapPrint} toggleMapPrint={toggleMapPrint} /> */}
            <MapView />
        </MapProvider>
    );
};

export default MapPage;
