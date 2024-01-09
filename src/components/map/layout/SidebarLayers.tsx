import { Form, Dropdown } from 'react-bootstrap';
import { MdDeleteOutline, MdMenu } from 'react-icons/md';

import { useMapContext } from '../../../context/map-context';

import './SidebarLayers.css';

const SidebarLayers = () => {
    const { layers, updateLayer, selectAll, updateAllLayers } = useMapContext();

    const removeLayer = (id: string) => {
        console.log('removeLayer: ', id);
    };

    return (
        <Form className="sidebar-layers">
            <Form.Check
                id="selectAll"
                type="checkbox"
                label="Select all"
                checked={selectAll}
                onChange={() => updateAllLayers(!selectAll)}
            />
            {layers.map((layer, index) => (
                <div key={index} className="sidebar-layer">
                    <Form.Check
                        id={layer.id}
                        type="checkbox"
                        label={layer.id}
                        checked={layer.enable}
                        onChange={() => updateLayer(layer.id)}
                    />
                    <Dropdown className="sidebar-layer-dropdown">
                        <Dropdown.Toggle className="card">
                            <MdMenu />
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Dropdown.Item
                                onClick={() => removeLayer(layer.id)}>
                                <MdDeleteOutline /> Remove
                            </Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </div>
            ))}
        </Form>
    );
};

export default SidebarLayers;
