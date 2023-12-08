import { Link } from 'react-router-dom';
import {
    Form,
    Container,
    Row,
    Col,
    ButtonToolbar,
    ButtonGroup,
    Button
} from 'react-bootstrap';

import { useAppContext } from '../../context/context';
import { useModalContext } from '../../context/modal-context';

import './SettingsPanel.css';

const SettingsPanel = () => {
    const { darkMode, toggleDarkMode, minimap, toggleMinimap } =
        useAppContext();
    const { openModal } = useModalContext();

    const handleDefaultClick = () => {
        openModal(
            'Information',
            'Are you sure you want to restore the default settings?'
        );
    };

    return (
        <main className="settings-panel">
            <Container>
                <Row className="settings-panel-buttons">
                    <Col>
                        <ButtonToolbar aria-label="Toolbar with button groups">
                            <ButtonGroup
                                className="me-2"
                                aria-label="Go to home page">
                                <Link
                                    to="/"
                                    className="btn btn-primary"
                                    title="Go to home page">
                                    Home
                                </Link>
                            </ButtonGroup>
                            <ButtonGroup
                                className="me-2"
                                aria-label="Second group">
                                <Link
                                    to="/map"
                                    className="btn btn-primary"
                                    title="Go to map page">
                                    Map
                                </Link>
                            </ButtonGroup>
                        </ButtonToolbar>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <h2>Application</h2>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form>
                            <Form.Group controlId="darkModeSwitch">
                                <Form.Check
                                    type="switch"
                                    label="Dark Mode"
                                    checked={darkMode}
                                    onChange={() => toggleDarkMode()}
                                />
                            </Form.Group>
                        </Form>
                    </Col>
                </Row>
                <br />
                <Row>
                    <Col>
                        <h2>Map</h2>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form>
                            <Form.Group controlId="minimapSwitch">
                                <Form.Check
                                    type="switch"
                                    label="Minimap"
                                    checked={minimap}
                                    onChange={() => toggleMinimap()}
                                />
                            </Form.Group>
                        </Form>
                    </Col>
                </Row>
                <br />
                <Row>
                    <Col>
                        <h2>Tools</h2>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form>
                            <Form.Group controlId="toolPrintMapSwitch">
                                <Form.Check
                                    type="switch"
                                    label="Print map"
                                    checked={true}
                                    onChange={() =>
                                        console.log('toolPrintMapSwitch')
                                    }
                                />
                            </Form.Group>
                        </Form>
                    </Col>
                </Row>
                <br />
                <Row className="settings-panel-buttons">
                    <Col>
                        <ButtonToolbar aria-label="Toolbar with button groups">
                            <ButtonGroup
                                className="me-2"
                                aria-label="Restore default settings">
                                <Button
                                    variant="danger"
                                    title="Restore default settings"
                                    onClick={handleDefaultClick}>
                                    Default Settings
                                </Button>
                            </ButtonGroup>
                        </ButtonToolbar>
                    </Col>
                </Row>
            </Container>
        </main>
    );
};

export default SettingsPanel;
