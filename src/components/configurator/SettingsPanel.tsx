import { Form, Container, Row, Col } from 'react-bootstrap';

import { useAppContext } from '../../context/context';

import './SettingsPanel.css';

const SettingsPanel = () => {
    const { darkMode, toggleDarkMode, minimap, toggleMinimap } =
        useAppContext();

    return (
        <main className="settings-panel">
            <Container>
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
            </Container>
        </main>
    );
};

export default SettingsPanel;
