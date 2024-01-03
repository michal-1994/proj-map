import { Card, Dropdown } from 'react-bootstrap';

import { useMapContext } from '../../../context/map-context';
import { useToolContext } from '../../../context/tool-context';
import {
    switchMeasurmentTool,
    toggleHighContrast
} from '../../../utils/tool-utils';
import {
    ADD_LAYERS_TOOL,
    BUTTON_TOOLS,
    CONTRAST_TOOL,
    MEASURMENT_TOOL,
    MINIMAP_TOOL,
    PRINT_TOOL
} from '../../../constants';
import { ToolProps } from '../../../models';

import './ToolButton.css';

const ToolButton: React.FC<ToolProps> = ({ id }) => {
    const { toggleMinimap } = useMapContext();
    const { showPrintWindow, openPrintWindow } = useToolContext();
    const { map } = useMapContext();

    const handleClick = (id: string, type?: string) => {
        switch (id) {
            case MINIMAP_TOOL:
                toggleMinimap();
                break;
            case PRINT_TOOL:
                openPrintWindow(!showPrintWindow);
                break;
            case ADD_LAYERS_TOOL:
                break;
            case MEASURMENT_TOOL:
                if (map && type) {
                    switchMeasurmentTool(map, type);
                }
                break;
            case CONTRAST_TOOL:
                toggleHighContrast();
                break;
        }
    };

    const getTool = (id: string) => {
        return BUTTON_TOOLS.find(tool => tool.id === id);
    };

    const getIconById = (id: string, options: any) => {
        for (const tool of options) {
            if (tool.id === id) {
                return tool.icon;
            }

            if (tool.options) {
                const nestedIcon: any = getIconById(id, tool.options);
                if (nestedIcon) {
                    return nestedIcon;
                }
            }
        }

        return null;
    };

    return !getTool(id)!.options ? (
        <button
            className="nav-link tool-button"
            title={getTool(id)?.title}
            onClick={() => handleClick(id)}>
            <Card className="btn btn-primary">
                {getIconById(id, BUTTON_TOOLS)}
            </Card>
        </button>
    ) : (
        <Dropdown className="nav-link tool-button">
            <Dropdown.Toggle className="card">
                {getIconById(id, BUTTON_TOOLS)}
            </Dropdown.Toggle>
            <Dropdown.Menu>
                {getTool(id)!.options!.map((option: any) => {
                    return (
                        <Dropdown.Item
                            key={option.id}
                            onClick={() => handleClick(id, option.type)}>
                            {getIconById(option.id, BUTTON_TOOLS)}{' '}
                            {option.title}
                        </Dropdown.Item>
                    );
                })}
            </Dropdown.Menu>
        </Dropdown>
    );
};

export default ToolButton;
