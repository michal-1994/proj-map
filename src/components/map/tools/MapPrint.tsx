import { Card } from 'react-bootstrap';
import { IoClose } from 'react-icons/io5';

import './MapPrint.css';

interface MapSidebarProps {
    isOpen: boolean;
    toggleMapPrint: () => void;
}

const MapPrint: React.FC<MapSidebarProps> = ({ isOpen, toggleMapPrint }) => {
    return (
        <Card id="map-print" className={`map-print ${isOpen ? 'open' : ''}`}>
            <button className="card" onClick={toggleMapPrint}>
                <IoClose />
            </button>
            <div className="map-print-content">Print me</div>
        </Card>
    );
};

export default MapPrint;
