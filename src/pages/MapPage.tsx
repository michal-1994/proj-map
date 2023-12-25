import { useState } from 'react';

import MapNav from '../components/map/layout/MapNav';
import MapSidebar from '../components/map/layout/MapSidebar';
import MapView from '../components/map/layout/MapView';
import MapPrint from '../components/map/tools/MapPrint';

import { MapProvider } from '../context/map-context';
import { ToolProvider } from '../context/tool-context';

const MapPage = () => {
    const [isOpenSidebar, setIsOpenSidebar] = useState<boolean>(false);

    const toggleSidebar = () => {
        setIsOpenSidebar(!isOpenSidebar);
    };

    return (
        <MapProvider>
            <ToolProvider>
                <MapNav />
                <MapSidebar
                    isOpen={isOpenSidebar}
                    toggleSidebar={toggleSidebar}
                />
                <MapPrint />
                <MapView />
            </ToolProvider>
        </MapProvider>
    );
};

export default MapPage;
