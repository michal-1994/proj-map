import { Card } from 'react-bootstrap';

interface ToolProps {
    title: string;
    icon: JSX.Element;
}

const ToolButton: React.FC<ToolProps> = ({ title, icon }) => {
    return (
        <button className="nav-link" title={title}>
            <Card style={{ padding: '.45rem' }}>{icon}</Card>
        </button>
    );
};

export default ToolButton;
