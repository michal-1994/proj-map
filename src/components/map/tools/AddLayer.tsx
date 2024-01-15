import React, { useState } from 'react';
import { Modal, Form, Row, Button } from 'react-bootstrap';

import { useToolContext } from '../../../context/tool-context';

import './AddLayer.css';

const AddLayer: React.FC = () => {
    const [layerName, setLayerName] = useState<string>('');
    const [linkToGeoJSON, setLinkToGeoJSON] = useState<string>('');
    const [file, setFile] = useState<File | null>(null);
    const [layerNameError, setLayerNameError] = useState<string>('');
    const [linkOrFileError, setLinkOrFileError] = useState<string>('');
    const [showLinkField, setShowLinkField] = useState<boolean>(true);

    const { showAddLayerWindow, openAddLayerWindow } = useToolContext();

    const handleSubmit = (event: any) => {
        event.preventDefault();
        setLayerNameError('');
        setLinkOrFileError('');

        if (!layerName.trim()) {
            setLayerNameError('Layer name is required');
            return;
        }

        if (!(linkToGeoJSON || file)) {
            setLinkOrFileError('Link or File is required');
            return;
        }

        if (layerName && (linkToGeoJSON || file)) {
            console.log('layerName: ', layerName);
            console.log('linkToGeoJSON: ', linkToGeoJSON);
            console.log('file: ', file);

            setLayerName('');
            setLinkToGeoJSON('');
            setFile(null);
        }
    };

    return (
        <Modal
            show={showAddLayerWindow}
            onHide={() => openAddLayerWindow(false)}>
            <Modal.Header closeButton>
                <Modal.Title>Add layer</Modal.Title>
            </Modal.Header>
            <Form noValidate onSubmit={handleSubmit}>
                <Modal.Body>
                    <Row>
                        <Form.Group controlId="layerNameId">
                            <Form.Control
                                type="text"
                                placeholder="Enter layer name"
                                value={layerName}
                                onChange={event =>
                                    setLayerName(event.target.value)
                                }
                                required
                            />
                            <Form.Text className="text-danger">
                                {layerNameError}
                            </Form.Text>
                        </Form.Group>
                    </Row>
                    <br />
                    <Row>
                        <Form.Group controlId="submitTypeId">
                            <div className="add-layer-field">
                                <Form.Check
                                    type="radio"
                                    name="submitType"
                                    value="linkField"
                                    checked={showLinkField}
                                    onChange={event => {
                                        setLinkToGeoJSON('');
                                        setFile(null);
                                        setShowLinkField(
                                            event.target.value === 'linkField'
                                        );
                                    }}
                                />
                                <Form.Group controlId="linkToGeoJSONId">
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter link"
                                        value={linkToGeoJSON}
                                        onChange={event =>
                                            setLinkToGeoJSON(event.target.value)
                                        }
                                        disabled={!showLinkField}
                                    />
                                </Form.Group>
                            </div>
                            <br />
                            <div className="add-layer-field">
                                <Form.Check
                                    type="radio"
                                    name="submitType"
                                    value="fileField"
                                    checked={!showLinkField}
                                    onChange={event => {
                                        setLinkToGeoJSON('');
                                        setFile(null);
                                        setShowLinkField(
                                            event.target.value !== 'fileField'
                                        );
                                    }}
                                />
                                <Form.Group controlId="fileId">
                                    <Form.Control
                                        type="file"
                                        onChange={(event: any) =>
                                            setFile(event.target.files[0])
                                        }
                                        disabled={showLinkField}
                                    />
                                    <Form.Text className="text-danger">
                                        {linkOrFileError}
                                    </Form.Text>
                                </Form.Group>
                            </div>
                        </Form.Group>
                    </Row>
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        variant="secondary"
                        onClick={() => openAddLayerWindow(false)}>
                        Close
                    </Button>
                    <Button variant="primary" type="submit">
                        Add layer
                    </Button>
                </Modal.Footer>
            </Form>
        </Modal>
    );
};

export default AddLayer;
