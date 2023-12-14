import { Form } from 'react-bootstrap';

import { useMapContext } from '../../../context/map-context';

const SidebarLayers = () => {
    const { layers, updateLayer, selectAll, updateAllLayers } = useMapContext();

    return (
        <Form>
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
