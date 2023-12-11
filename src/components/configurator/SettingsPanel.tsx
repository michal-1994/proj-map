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

import * as Constants from '../../constants';
import { useAppContext } from '../../context/context';
import { useModalContext } from '../../context/modal-context';

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

    const getTool = (id: string) => {
        return tools.find(tool => tool.id === id);
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
                                    label="Mini map visible"
                                    checked={minimapVisibility}
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
                                        getTool(Constants.MINIMAP_TOOL)?.enable
                                    }
                                    onChange={() =>
                                        updateTool(Constants.MINIMAP_TOOL)
                                    }
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
                                    checked={
                                        getTool(Constants.PRINT_TOOL)?.enable
                                    }
                                    onChange={() =>
                                        updateTool(Constants.PRINT_TOOL)
                                    }
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
                                        getTool(Constants.ADD_LAYERS_TOOL)
                                            ?.enable
                                    }
                                    onChange={() =>
                                        updateTool(Constants.ADD_LAYERS_TOOL)
                                    }
                                />
                            </Form.Group>
                        </Form>
                    </Col>
                </Row>
                <br />
                <Row>
                    <Col>
                        <Form>
                            <Form.Group controlId="drawToolSwitcher">
                                <Form.Check
                                    type="switch"
                                    label="Draw"
                                    checked={
                                        getTool(Constants.DRAW_TOOL)?.enable
                                    }
                                    onChange={() =>
                                        updateTool(Constants.DRAW_TOOL)
                                    }
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
                                        getTool(Constants.MEASURMENT_TOOL)
                                            ?.enable
                                    }
                                    onChange={() =>
                                        updateTool(Constants.MEASURMENT_TOOL)
                                    }
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
                                        getTool(Constants.CONTRAST_TOOL)?.enable
                                    }
                                    onChange={() =>
                                        updateTool(Constants.CONTRAST_TOOL)
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
