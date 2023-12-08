import { Container } from 'react-bootstrap';

import PageTitle from '../components/ui/PageTitle';
import SettingsPanel from '../components/configurator/SettingsPanel';

const ConfiguratorPage = () => {
    return (
        <Container>
            <PageTitle>Configurator</PageTitle>
            <SettingsPanel />
        </Container>
    );
};

export default ConfiguratorPage;
