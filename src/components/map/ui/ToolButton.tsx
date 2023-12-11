import { Card } from 'react-bootstrap';

import * as Constants from '../../../constants';
import { useMapContext } from '../../../context/map-context';

interface ToolProps {
    id: string;
    enable: boolean;
}

const ToolButton: React.FC<ToolProps> = ({ id }) => {
    const { toggleMinimap } = useMapContext();
    const tool = Constants.TOOLS.find(tool => tool.id === id);

    const handleClick = (id: string) => {
        console.log(id);
        switch (id) {
            case 'minimap':
                toggleMinimap();
                break;
        }
    };

    return (
        <button
            className="nav-link"
            title={tool?.title}
            onClick={() => handleClick(id)}>
            <Card style={{ padding: '.45rem' }}>{tool?.icon}</Card>
        </button>
    );
};

export default ToolButton;
