import { Card } from 'react-bootstrap';

import { useMapContext } from '../../../context/map-context';
import { useToolContext } from '../../../context/tool-context';
import { toggleHighContrast } from '../../../utils/tool-utils';
import {
    ADD_LAYERS_TOOL,
    BUTTON_TOOLS,
    CONTRAST_TOOL,
    DRAW_TOOL,
    MEASURMENT_TOOL,
    MINIMAP_TOOL,
    PRINT_TOOL
} from '../../../constants';
import { ToolProps } from '../../../models';

const ToolButton: React.FC<ToolProps> = ({ id }) => {
    const { toggleMinimap } = useMapContext();
    const { showPrintWindow, openPrintWindow } = useToolContext();

    const handleClick = (id: string) => {
        switch (id) {
            case MINIMAP_TOOL:
                toggleMinimap();
                break;
            case PRINT_TOOL:
                openPrintWindow(!showPrintWindow);
                break;
            case ADD_LAYERS_TOOL:
                break;
            case DRAW_TOOL:
                break;
            case MEASURMENT_TOOL:
                break;
            case CONTRAST_TOOL:
                toggleHighContrast();
                break;
        }
    };

    const getTool = (id: string) => {
        return BUTTON_TOOLS.find(tool => tool.id === id);
    };

    return (
        <button
            className="nav-link"
            title={getTool(id)?.title}
            onClick={() => handleClick(id)}>
            <Card style={{ padding: '.45rem' }}>{getTool(id)?.icon}</Card>
        </button>
    );
};

export default ToolButton;
