import { Card } from 'react-bootstrap';

interface ToolProps {
    title: string;
    icon: string;
}

const ToolButton: React.FC<ToolProps> = ({ title, icon }) => {
    return (
        <button className="nav-link" title={title}>
            <Card style={{ padding: '.15rem' }}>
                <img
                    src={icon}
                    alt="icon"
                    style={{ width: '1.5rem', height: '1.5rem' }}
                />
            </Card>
        </button>
    );
};

export default ToolButton;
