import { Link } from 'react-router-dom';
import { Card } from 'react-bootstrap';

import './TileCard.css';

interface TileCardProps {
    title: string;
    text: string;
    icon: string;
    path: string;
}

const TileCard: React.FC<TileCardProps> = ({ title, text, icon, path }) => {
    return (
        <Link
            to={path}
            style={{ textDecoration: 'none' }}
            className="tile-card">
            <Card
                bg="dark"
                text="light"
                style={{
                    width: '18rem',
                    padding: '1rem',
                    margin: 'auto',
                    textAlign: 'center'
                }}>
                <Card.Body>
                    <img
                        src={icon}
                        alt="icon"
                        style={{
                            width: '2rem',
                            height: '2rem',
                            marginBottom: '1rem'
                        }}
                    />
                    <Card.Title>{title}</Card.Title>
                    <Card.Text>{text}</Card.Text>
                </Card.Body>
            </Card>
        </Link>
    );
};

export default TileCard;
