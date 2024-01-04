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
import {
    ADD_LAYERS_TOOL,
    CONTRAST_TOOL,
    MEASURMENT_TOOL,
    MINIMAP_TOOL,
    PRINT_TOOL
} from '../../constants';
import { getTool } from '../../utils/tool-utils';

import './SettingsPanel.css';

const SettingsPanel = () => {
    const {
        darkMode,
        toggleDarkMode,
        minimapVisibility,
        toggleMinimapVisibility,
        tools,
        updateTool
    } = useAppContext();
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
                                    label="Dark mode"
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
                                    label="Mini map visible"
                                    disabled={
                                        !getTool(tools, MINIMAP_TOOL)?.enable
                                    }
                                    checked={
                                        getTool(tools, MINIMAP_TOOL)?.enable &&
                                        minimapVisibility
                                    }
                                    onChange={() => toggleMinimapVisibility()}
                                />
                            </Form.Group>
                        </Form>
                    </Col>
                </Row>
                <br />
                <Row>
                    <Col>
                        <h2>Tools (add tools to map)</h2>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form>
                            <Form.Group controlId="minimapToolSwitcher">
                                <Form.Check
                                    type="switch"
                                    label="Minimap"
                                    checked={
                                        getTool(tools, MINIMAP_TOOL)?.enable
                                    }
                                    onChange={() => updateTool(MINIMAP_TOOL)}
                                />
                            </Form.Group>
                        </Form>
                    </Col>
                </Row>
                <br />
                <Row>
                    <Col>
                        <Form>
                            <Form.Group controlId="printToolSwitcher">
                                <Form.Check
                                    type="switch"
                                    label="Print map"
                                    checked={getTool(tools, PRINT_TOOL)?.enable}
                                    onChange={() => updateTool(PRINT_TOOL)}
                                />
                            </Form.Group>
                        </Form>
                    </Col>
                </Row>
                <br />
                <Row>
                    <Col>
                        <Form>
                            <Form.Group controlId="addLayersToolSwitcher">
                                <Form.Check
                                    type="switch"
                                    label="Add layers"
                                    checked={
                                        getTool(tools, ADD_LAYERS_TOOL)?.enable
                                    }
                                    onChange={() => updateTool(ADD_LAYERS_TOOL)}
                                />
                            </Form.Group>
                        </Form>
                    </Col>
                </Row>
                <br />
                <Row>
                    <Col>
                        <Form>
                            <Form.Group controlId="measurmentToolSwitcher">
                                <Form.Check
                                    type="switch"
                                    label="Measurment"
                                    checked={
                                        getTool(tools, MEASURMENT_TOOL)?.enable
                                    }
                                    onChange={() => updateTool(MEASURMENT_TOOL)}
                                />
                            </Form.Group>
                        </Form>
                    </Col>
                </Row>
                <br />
                <Row>
                    <Col>
                        <Form>
                            <Form.Group controlId="contrastToolSwitcher">
                                <Form.Check
                                    type="switch"
                                    label="Contrast"
                                    checked={
                                        getTool(tools, CONTRAST_TOOL)?.enable
                                    }
                                    onChange={() => updateTool(CONTRAST_TOOL)}
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
