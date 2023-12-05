import { Card } from 'react-bootstrap';

interface ToolProps {
    icon: string;
}

const ToolButton: React.FC<ToolProps> = ({ icon }) => {
    return (
        <button className="nav-link">
            <Card style={{ padding: '.5rem' }}>
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
