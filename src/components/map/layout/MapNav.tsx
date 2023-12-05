import { Card, Nav, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import ToolButton from '../ui/ToolButton';
import icon from '../../../assets/react.svg';

const MapNav = () => {
    const tools = [
        {
            icon: icon
        },
        {
            icon: icon
        },
        {
            icon: icon
        },
        {
            icon: icon
        }
    ];

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
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                    {tools.map((tool, index) => (
                        <ToolButton key={index} {...tool} />
                    ))}
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
};

export default MapNav;
