import React from 'react';
import { Modal, Button, Table } from 'react-bootstrap';

import { useToolContext } from '../../../context/tool-context';

import './MoreDetails.css';

const MoreDetails: React.FC = () => {
    const {
        showMoreDetailsWindow,
        moreDetailsWindowContent,
        closeMoreDetailsWindow
    } = useToolContext();

    return (
        <Modal
            centered
            size="lg"
            show={showMoreDetailsWindow}
            onHide={closeMoreDetailsWindow}
            dialogClassName="more-details-window">
            <Modal.Header closeButton>
                <Modal.Title>{moreDetailsWindowContent.title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Table responsive>
                    <thead>
                        <tr>
                            <th>#</th>
                            {Array.from({ length: 24 }).map((_, index) => (
                                <th key={index}>Table heading</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {Array.from({ length: 24 }).map((_, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                {Array.from({ length: 24 }).map((_, index) => (
                                    <td key={index}>Table cell {index}</td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={closeMoreDetailsWindow}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default MoreDetails;
