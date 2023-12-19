import { Card, Tabs, Tab } from 'react-bootstrap';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';

import SidebarLayers from './SidebarLayers';
import SidebarBaseLayers from './SidebarBaseLayers';

import './MapSidebar.css';

interface MapSidebarProps {
    isOpen: boolean;
    toggleSidebar: () => void;
}

const MapSidebar: React.FC<MapSidebarProps> = ({ isOpen, toggleSidebar }) => {
    return (
        <Card className={`map-sidebar ${isOpen ? 'open' : ''}`}>
            <button className="card" onClick={toggleSidebar}>
                {isOpen ? <FaAngleLeft /> : <FaAngleRight />}
            </button>
            <div className="map-sidebar-content">
                <Tabs
                    defaultActiveKey="layers"
                    id="map-sidebar"
                    className="mb-3"
                    fill>
                    <Tab eventKey="layers" title="Layers">
                        <SidebarLayers />
                    </Tab>
                    <Tab eventKey="baseLayers" title="Base Layers">
                        <SidebarBaseLayers />
                    </Tab>
                </Tabs>
            </div>
        </Card>
    );
};

export default MapSidebar;
