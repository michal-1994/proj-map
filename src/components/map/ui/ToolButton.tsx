import { Card } from 'react-bootstrap';
import { toggleMiniMap } from '../../../utils/mapUtils';

interface ToolProps {
    id: string;
    title: string;
    icon: JSX.Element;
}

const ToolButton: React.FC<ToolProps> = ({ id, title, icon }) => {
    const handleClick = (id: string) => {
        switch (id) {
            case 'minimap': {
                toggleMiniMap();
                break;
            }
            default: {
                break;
            }
        }
    };

    return (
        <button
            className="nav-link"
            title={title}
            onClick={() => handleClick(id)}>
            <Card style={{ padding: '.45rem' }}>{icon}</Card>
        </button>
    );
};

export default ToolButton;
