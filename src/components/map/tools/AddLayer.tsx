import React, { useState } from 'react';
import { Modal, Form, Row, Col, Button } from 'react-bootstrap';

import { useToolContext } from '../../../context/tool-context';

const AddLayer: React.FC = () => {
    const [layerName, setLayerName] = useState('');
    const [linkToGeoJSON, setLinkToGeoJSON] = useState('');
    const [file, setFile] = useState(null);
    const { showAddLayerWindow, openAddLayerWindow } = useToolContext();

    const handleSubmit = () => {
        console.log('Layer Name:', layerName);
        console.log('Link or File:', linkToGeoJSON);
        console.log('File:', file);
    };

    return (
        <Modal
            show={showAddLayerWindow}
            onHide={() => openAddLayerWindow(false)}
            dialogClassName="add-layer-window">
            <Modal.Header closeButton>
                <Modal.Title>Add layer</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form noValidate onSubmit={event => event.preventDefault()}>
                    <Row>
                        <Form.Group controlId="layerNameId">
                            <Form.Label>Layer Name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter layer name"
                                value={layerName}
                                onChange={event =>
                                    setLayerName(event.target.value)
                                }
                                required
                            />
                        </Form.Group>
                    </Row>
                    <br />
                    <Row>
                        <Form.Group controlId="linkToGeoJSONId">
                            <Form.Label>Link</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter link or choose file"
                                value={linkToGeoJSON}
                                onChange={event =>
                                    setLinkToGeoJSON(event.target.value)
                                }
                            />
                        </Form.Group>
                    </Row>
                    <br />
                    <Row>
                        <Form.Group controlId="fileId">
                            <Form.Label>File</Form.Label>
                            <Form.Control
                                type="file"
                                onChange={(event: any) =>
                                    setFile(event.target.files[0])
                                }
                            />
                        </Form.Group>
                    </Row>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button
                    variant="secondary"
                    onClick={() => openAddLayerWindow(false)}>
                    Close
                </Button>
                <Button variant="primary" onClick={() => handleSubmit()}>
                    Add layer
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default AddLayer;
