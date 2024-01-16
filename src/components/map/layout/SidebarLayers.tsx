import { Form, Dropdown, Button } from 'react-bootstrap';
import {
    MdDeleteOutline,
    MdMenu,
    MdOutlineOpacity,
    MdOutlineTableView
} from 'react-icons/md';
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from 'react-icons/md';

import { getFeatures } from '../../../utils/map-utils';
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

    const handleMoreDetailsClick = async (name: string, url: string) => {
        document.body.style.cursor = 'progress';
        const features = await getFeatures(url);

        document.body.style.cursor = 'auto';
        openMoreDetailsWindow(name, features);
    };

    const moveLayerUp = (layerId: string) => {
        console.log(layerId);
    };

    const moveLayerDown = (layerId: string) => {
        console.log(layerId);
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
                        label={layer.name}
                        checked={layer.enable}
                        onChange={() => switchLayer(layer.id)}
                    />
                    <div className="sidebar-layer-actions">
                        <div className="sidebar-layer-actions-arrows">
                            <Button
                                className="card"
                                onClick={() => moveLayerUp(layer.id)}>
                                <MdKeyboardArrowUp />
                            </Button>
                            <Button
                                className="card"
                                onClick={() => moveLayerDown(layer.id)}>
                                <MdKeyboardArrowDown />
                            </Button>
                        </div>
                        <Dropdown className="sidebar-layer-actions-dropdown">
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
                                        onTouchMove={event =>
                                            event.stopPropagation()
                                        }
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
                                    onClick={() => {
                                        if (layer.url) {
                                            handleMoreDetailsClick(
                                                layer.name,
                                                layer.url
                                            );
                                        }
                                    }}>
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
                </div>
            ))}
        </Form>
    );
};

export default SidebarLayers;
