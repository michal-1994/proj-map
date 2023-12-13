import { Form } from 'react-bootstrap';

import { useMapContext } from '../../../context/map-context';

const SidebarLayers = () => {
    const { layers, updateLayer } = useMapContext();

    return (
        <Form>
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
