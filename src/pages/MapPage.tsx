import { useRef, useState } from 'react';

import MapNav from '../components/map/layout/MapNav';
import MapSidebar from '../components/map/layout/MapSidebar';
import MapPrint from '../components/map/tools/MapPrint';
import MapView from '../components/map/layout/MapView';

import { isMobile } from '../utils/tool-utils';
import { MapProvider } from '../context/map-context';
import { ToolProvider } from '../context/tool-context';

const MapPage = () => {
    const touchStartX = useRef(0);
    const touchEndX = useRef(0);
    const [isOpenSidebar, setIsOpenSidebar] = useState<boolean>(false);

    const handleTouchStart = (event: any) => {
        touchStartX.current = event.touches[0].clientX;
    };

    const handleTouchMove = (event: any) => {
        touchEndX.current = event.touches[0].clientX;
    };

    const handleTouchEnd = () => {
        const swipeDistance = touchStartX.current - touchEndX.current;

        if (isMobile() && touchEndX.current && swipeDistance > 60) {
            setIsOpenSidebar(false);
            touchEndX.current = 0;
        }
    };

    const toggleSidebar = () => {
        setIsOpenSidebar(!isOpenSidebar);
    };

    return (
        <MapProvider>
            <ToolProvider>
                <MapNav />
                <div
                    onTouchStart={handleTouchStart}
                    onTouchMove={handleTouchMove}
                    onTouchEnd={handleTouchEnd}>
                    <MapSidebar
                        isOpen={isOpenSidebar}
                        toggleSidebar={toggleSidebar}
                    />
                </div>
                <MapPrint />
                <MapView />
            </ToolProvider>
        </MapProvider>
    );
};

export default MapPage;
