import { Container } from 'react-bootstrap';

import PageTitle from '../components/ui/PageTitle';
import TileGrid from '../components/home/TileGrid';

import { TILES } from '../constants';

const HomePage = () => {
    return (
        <Container>
            <PageTitle>Home</PageTitle>
            <TileGrid tiles={TILES} />
        </Container>
    );
};

export default HomePage;
