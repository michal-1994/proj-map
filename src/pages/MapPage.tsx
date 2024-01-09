import { Suspense, lazy, useState } from 'react';
import { GridLoader } from 'react-spinners';

import MapNav from '../components/map/layout/MapNav';
import MapSidebar from '../components/map/layout/MapSidebar';
import MapPrint from '../components/map/tools/MapPrint';

import { MapProvider } from '../context/map-context';
import { ToolProvider } from '../context/tool-context';

const MapView = lazy(() => import('../components/map/layout/MapView'));

const MapPage = () => {
    const [isOpenSidebar, setIsOpenSidebar] = useState<boolean>(false);

    const toggleSidebar = () => {
        setIsOpenSidebar(!isOpenSidebar);
    };

    const loadingElement = (
        <div
            style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh'
            }}>
            <GridLoader color="#0d6efd" />
        </div>
    );

    return (
        <MapProvider>
            <ToolProvider>
                <Suspense fallback={loadingElement}>
                    <MapNav />
                    <MapSidebar
                        isOpen={isOpenSidebar}
                        toggleSidebar={toggleSidebar}
                    />
                    <MapPrint />
                    <MapView />
                </Suspense>
            </ToolProvider>
        </MapProvider>
    );
};

export default MapPage;
