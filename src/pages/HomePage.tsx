import { Container } from 'react-bootstrap';

import TileGrid from '../components/home/TileGrid';

import icon from '../assets/react.svg';

const HomePage = () => {
    const tiles = [
        {
            title: 'Map',
            text: 'Map application',
            icon: icon,
            path: '/map'
        },
        {
            title: 'Configurator',
            text: 'Configurator application',
            icon: icon,
            path: '/configurator'
        }
    ];

    return (
        <Container>
            <TileGrid tiles={tiles} />
        </Container>
    );
};

export default HomePage;
