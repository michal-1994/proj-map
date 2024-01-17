import React, { useState } from 'react';
import { Modal, Form, Row, Button } from 'react-bootstrap';

import { useToolContext } from '../../../context/tool-context';
import { useMapContext } from '../../../context/map-context';
import { isLayerExist } from '../../../utils/map-utils';

const AddLayer: React.FC = () => {
    const [layerName, setLayerName] = useState<string>('');
    const [geoJSONUrl, setGeoJSONUrl] = useState<string>('');
    const [layerNameError, setLayerNameError] = useState<string>('');
    const [geoJSONUrlError, setGeoJSONUrlError] = useState<string>('');

    const { showAddLayerWindow, openAddLayerWindow } = useToolContext();
    const { map, addLayer } = useMapContext();

    const handleSubmit = async (event: any) => {
        event.preventDefault();
        setLayerNameError('');
        setGeoJSONUrlError('');

        const newLayerId = layerName.toLowerCase();
        let layerExist: boolean = false;

        if (map) {
            layerExist = await isLayerExist(newLayerId, map);
        }

        if (!layerName.trim()) {
            setLayerNameError('Layer name is required');
            return;
        }

        if (!geoJSONUrl.trim()) {
            setGeoJSONUrlError('Link is required');
            return;
        }

        if (layerExist) {
            setLayerNameError('Layer name exist');
            return;
        }

        if (layerName.trim() && geoJSONUrl.trim()) {
            addLayer({
                id: newLayerId,
                name: layerName,
                type: 'geojson',
                url: geoJSONUrl,
                enable: true,
                opacity: 1
            });

            setLayerName('');
            setGeoJSONUrl('');
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
                        <Form.Group controlId="geoJSONUrlId">
                            <Form.Control
                                type="text"
                                placeholder="Enter geoJSON url"
                                value={geoJSONUrl}
                                onChange={event =>
                                    setGeoJSONUrl(event.target.value)
                                }
                                required
                            />
                            <Form.Text className="text-danger">
                                {geoJSONUrlError}
                            </Form.Text>
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
