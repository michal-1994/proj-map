import { Card } from 'react-bootstrap';

import * as Constants from '../../../constants';

interface ToolProps {
    id: string;
    enable: boolean;
}

const ToolButton: React.FC<ToolProps> = ({ id }) => {
    const tool = Constants.TOOLS.find(tool => tool.id === id);

    const handleClick = (id: string) => {
        console.log(id);
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
