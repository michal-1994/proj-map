import { Container } from 'react-bootstrap';

import TileGrid from '../components/home/TileGrid';

import * as Constants from '../constants';

const HomePage = () => {
    return (
        <Container>
            <TileGrid tiles={Constants.TILES} />
        </Container>
    );
};

export default HomePage;
