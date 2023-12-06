import { Link } from 'react-router-dom';
import { Card } from 'react-bootstrap';

import './TileCard.css';

interface TileCardProps {
    title: string;
    text: string;
    icon: string;
    path?: string;
    url?: string;
}

const TileCard: React.FC<TileCardProps> = ({
    title,
    text,
    icon,
    path,
    url
}) => {
    let content;
    const card = (
        <Card
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
    );

    if (url) {
        content = (
            <a
                href={url}
                target="_blank"
                style={{ textDecoration: 'none' }}
                className="tile-card">
                {card}
            </a>
        );
    } else if (path) {
        content = (
            <Link
                to={path}
                style={{ textDecoration: 'none' }}
                className="tile-card">
                {card}
            </Link>
        );
    } else {
        content = null;
    }

    return content;
};

export default TileCard;
