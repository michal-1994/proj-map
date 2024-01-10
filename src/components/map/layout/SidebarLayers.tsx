import { Form, Dropdown, Button } from 'react-bootstrap';
import {
    MdDeleteOutline,
    MdMenu,
    MdOutlineOpacity,
    MdOutlineTableView
} from 'react-icons/md';

import { useMapContext } from '../../../context/map-context';
import { useToolContext } from '../../../context/tool-context';

import './SidebarLayers.css';

const SidebarLayers = () => {
    const {
        layers,
        switchLayer,
        removeLayer,
        changeOpacityLayer,
        selectAll,
        updateAllLayers
    } = useMapContext();
    const { openMoreDetailsWindow } = useToolContext();

    const handleMoreDetailsClick = (id: string) => {
        openMoreDetailsWindow('Information about ' + id, 'Content');
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
                        onChange={() => switchLayer(layer.id)}
                    />
                    <Dropdown className="sidebar-layer-dropdown">
                        <Dropdown.Toggle className="card">
                            <MdMenu />
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Dropdown.Item
                                as={Button}
                                onClick={event => event.stopPropagation()}>
                                <div>
                                    <MdOutlineOpacity />
                                    Opacity: {' ' + layer.opacity}
                                </div>
                                <Form.Range
                                    value={layer.opacity}
                                    min={0}
                                    max={1}
                                    step={0.1}
                                    onChange={e =>
                                        changeOpacityLayer(
                                            layer.id,
                                            parseFloat(e.target.value)
                                        )
                                    }
                                />
                            </Dropdown.Item>
                            <Dropdown.Item
                                as={Button}
                                onClick={() =>
                                    handleMoreDetailsClick(layer.id)
                                }>
                                <MdOutlineTableView /> Details
                            </Dropdown.Item>
                            <Dropdown.Item
                                as={Button}
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
