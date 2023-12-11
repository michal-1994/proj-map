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
        console.log(id);
        switch (id) {
            case 'minimap':
                toggleMinimap();
                break;
        }
    };

    const getTool = (id: string) => {
        return Constants.TOOLS.find(tool => tool.id === id);
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
