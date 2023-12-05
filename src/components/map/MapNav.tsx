import { Card, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import icon from '../../assets/react.svg';

const MapNav = () => {
    return (
        <Navbar
            fixed="top"
            className="map-nav"
            style={{
                padding: '.25rem .5rem'
            }}>
            <Link to="/" className="navbar-brand">
                <Card style={{ padding: '.5rem' }}>
                    <img
                        src={icon}
                        alt="icon"
                        style={{ width: '1.5rem', height: '1.5rem' }}
                    />
                </Card>
            </Link>
        </Navbar>
    );
};

export default MapNav;
