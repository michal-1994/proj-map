import { Card } from 'react-bootstrap';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';

import './MapSidebar.css';

interface MapSidebarProps {
    isOpen: boolean;
    toggleSidebar: () => void;
}

const MapSidebar: React.FC<MapSidebarProps> = ({ isOpen, toggleSidebar }) => {
    return (
        <Card className={`sidebar ${isOpen ? 'open' : ''}`}>
            <button className="card" onClick={toggleSidebar}>
                {isOpen ? <FaAngleLeft /> : <FaAngleRight />}
            </button>
            <div className="sidebar-content">Layers</div>
        </Card>
    );
};

export default MapSidebar;
