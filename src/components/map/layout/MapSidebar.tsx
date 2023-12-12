import { Card, Form } from 'react-bootstrap';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';

import { useMapContext } from '../../../context/map-context';

import './MapSidebar.css';

interface MapSidebarProps {
    isOpen: boolean;
    toggleSidebar: () => void;
}

const MapSidebar: React.FC<MapSidebarProps> = ({ isOpen, toggleSidebar }) => {
    const { layers, updateLayer } = useMapContext();

    return (
        <Card className={`sidebar ${isOpen ? 'open' : ''}`}>
            <button className="card" onClick={toggleSidebar}>
                {isOpen ? <FaAngleLeft /> : <FaAngleRight />}
            </button>
            <div className="sidebar-content">
                <h2>Layers</h2>
                <Form>
                    {layers.map((layer, index) => (
                        <Form.Check
                            key={index}
                            id={layer.id}
                            type="checkbox"
                            label={layer.id.toUpperCase()}
                            checked={layer.enable}
                            onChange={() => updateLayer(layer.id)}
                        />
                    ))}
                </Form>
            </div>
        </Card>
    );
};

export default MapSidebar;
