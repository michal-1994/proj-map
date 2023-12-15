import { Card, Form } from 'react-bootstrap';

import { useMapContext } from '../../../context/map-context';

import './SidebarBaseLayers.css';

const SidebarBaseLayers = () => {
    const { baseLayers, updateBaseLayers } = useMapContext();

    return (
        <Form className="sidebar-base-layers">
            {baseLayers.map((layer, index) => (
                <Card
                    key={index}
                    onClick={() => updateBaseLayers(layer.id)}
                    className="sidebar-base-layers-row"
                    border={layer.enable ? 'primary' : 'secondary'}>
                    <img src={`images/${layer.image}`} />
                    <Form.Check
                        id={layer.id}
                        name="baselayers"
                        type="radio"
                        label={layer.id}
                        checked={layer.enable}
                        onChange={() => {}}
                    />
                </Card>
            ))}
        </Form>
    );
};

export default SidebarBaseLayers;
