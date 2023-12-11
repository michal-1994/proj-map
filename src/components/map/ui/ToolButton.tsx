import { Card } from 'react-bootstrap';

import * as Constants from '../../../constants';
import { useMapContext } from '../../../context/map-context';

interface ToolProps {
    id: string;
    enable: boolean;
}

const ToolButton: React.FC<ToolProps> = ({ id }) => {
    const { toggleMinimap } = useMapContext();

    const handleClick = (id: string) => {
        switch (id) {
            case Constants.MINIMAP_TOOL:
                console.log(Constants.MINIMAP_TOOL);
                toggleMinimap();
                break;
            case Constants.PRINT_TOOL:
                console.log(Constants.PRINT_TOOL);
                break;
            case Constants.ADD_LAYERS_TOOL:
                console.log(Constants.ADD_LAYERS_TOOL);
                break;
            case Constants.DRAW_TOOL:
                console.log(Constants.DRAW_TOOL);
                break;
            case Constants.MEASURMENT_TOOL:
                console.log(Constants.MEASURMENT_TOOL);
                break;
            case Constants.CONTRAST_TOOL:
                console.log(Constants.CONTRAST_TOOL);
                break;
        }
    };

    const getTool = (id: string) => {
        return Constants.BUTTON_TOOLS.find(tool => tool.id === id);
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
