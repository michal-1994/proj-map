import React from 'react';
import { Modal, Button } from 'react-bootstrap';

import { useModalContext } from '../../context/modal-context';

const CustomModal: React.FC = () => {
    const { showModal, closeModal, acceptModal, modalContent } =
        useModalContext();

    return (
        <Modal show={showModal} onHide={closeModal}>
            <Modal.Header closeButton>
                <Modal.Title>{modalContent.title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>{modalContent.content}</Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={closeModal}>
                    No
                </Button>
                <Button variant="primary" onClick={acceptModal}>
                    Yes
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default CustomModal;
