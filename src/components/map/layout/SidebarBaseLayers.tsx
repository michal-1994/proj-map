import { Form } from 'react-bootstrap';

import { useMapContext } from '../../../context/map-context';

import './SidebarBaseLayers.css';

const SidebarBaseLayers = () => {
    const { baseLayers, updateBaseLayers } = useMapContext();

    return (
        <Form className="sidebar-base-layers">
            {baseLayers.map((layer, index) => (
                <Form.Check
                    key={index}
                    id={layer.id}
                    name="baselayers"
                    type="radio"
                    label={layer.id}
                    checked={layer.enable}
                    onChange={() => updateBaseLayers(layer.id)}
                />
            ))}
        </Form>
    );
};

export default SidebarBaseLayers;
