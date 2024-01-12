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

    let attributes: any = [];
    let content: any;

    if (moreDetailsWindowContent.features[0]?.properties) {
        attributes = Object.keys(
            moreDetailsWindowContent.features[0]?.properties
        );
    }

    if (moreDetailsWindowContent.features.length > 0 && attributes.length > 0) {
        content = (
            <Table responsive>
                <thead>
                    <tr>
                        <th>No.</th>
                        {attributes.map((attribute: any, index: number) => (
                            <th key={index}>{attribute.toUpperCase()}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {moreDetailsWindowContent.features.map(
                        (feature: any, index: number) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                {Object.values(feature.properties).map(
                                    (value: any, index: number) => (
                                        <td key={index}>{value}</td>
                                    )
                                )}
                            </tr>
                        )
                    )}
                </tbody>
            </Table>
        );
    } else {
        content = <>No features found</>;
    }

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
            <Modal.Body>{content}</Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={closeMoreDetailsWindow}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default MoreDetails;
