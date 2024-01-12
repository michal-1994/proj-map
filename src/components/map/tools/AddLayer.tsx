import React from 'react';
import { Modal, Button } from 'react-bootstrap';

import { useToolContext } from '../../../context/tool-context';

import './AddLayer.css';

const AddLayer: React.FC = () => {
    const { showAddLayerWindow, openAddLayerWindow } = useToolContext();

    return (
        <Modal
            show={showAddLayerWindow}
            onHide={() => openAddLayerWindow(false)}
            dialogClassName="add-layer-window">
            <Modal.Header closeButton>
                <Modal.Title>Add layer</Modal.Title>
            </Modal.Header>
            <Modal.Body>Content</Modal.Body>
            <Modal.Footer>
                <Button
                    variant="secondary"
                    onClick={() => openAddLayerWindow(false)}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default AddLayer;
