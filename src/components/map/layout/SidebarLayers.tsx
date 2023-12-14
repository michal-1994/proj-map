import { Form } from 'react-bootstrap';

import { useMapContext } from '../../../context/map-context';

import './SidebarLayers.css';

const SidebarLayers = () => {
    const { layers, updateLayer, selectAll, updateAllLayers } = useMapContext();

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
                <Form.Check
                    key={index}
                    id={layer.id}
                    type="checkbox"
                    label={layer.id}
                    checked={layer.enable}
                    onChange={() => updateLayer(layer.id)}
                />
            ))}
        </Form>
    );
};

export default SidebarLayers;
