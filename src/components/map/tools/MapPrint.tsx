import { useState } from 'react';
import { Card, Form, Button, Col, Row } from 'react-bootstrap';
import { IoClose } from 'react-icons/io5';

import { useMapContext } from '../../../context/map-context';

import { exportToPDF, togglePrintTool } from '../../../utils/tool-utils';

import { PrintData } from '../../../models';

import './MapPrint.css';

const MapPrint = () => {
    const { map } = useMapContext();

    const [validated, setValidated] = useState<boolean>(false);
    const [formData, setFormData] = useState<PrintData>({
        pageSize: '',
        resolution: '',
        scale: ''
    });

    const handleChange = (event: any) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = (event: any) => {
        event.preventDefault();

        if (map && event.currentTarget.checkValidity()) {
            exportToPDF(formData, map);
            togglePrintTool();
        }

        setValidated(true);
    };

    return (
        <Card id="map-print" className="map-print">
            <button
                className="card"
                onClick={() => {
                    togglePrintTool();
                }}>
                <IoClose />
            </button>
            <div className="map-print-content">
                <Form noValidate validated={validated} onSubmit={handleSubmit}>
                    <Row>
                        <Form.Group as={Col} controlId="validationCustom01">
                            <Form.Select
                                size="sm"
                                name="pageSize"
                                value={formData.pageSize}
                                onChange={handleChange}
                                required>
                                <option value="" disabled>
                                    Page size
                                </option>
                                <option value="a0">A0 (slow)</option>
                                <option value="a1">A1</option>
                                <option value="a2">A2</option>
                                <option value="a3">A3</option>
                                <option value="a4">A4</option>
                                <option value="a5">A5 (fast)</option>
                            </Form.Select>
                            <Form.Control.Feedback>
                                Looks good!
                            </Form.Control.Feedback>
                            <Form.Control.Feedback type="invalid">
                                The field is required.
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group as={Col} controlId="validationCustom02">
                            <Form.Select
                                size="sm"
                                name="resolution"
                                value={formData.resolution}
                                onChange={handleChange}
                                required>
                                <option value="" disabled>
                                    Resolution
                                </option>
                                <option value="72">72 dpi (fast)</option>
                                <option value="150">150 dpi</option>
                                <option value="200">200 dpi</option>
                                <option value="300">300 dpi (slow)</option>
                            </Form.Select>
                            <Form.Control.Feedback>
                                Looks good!
                            </Form.Control.Feedback>
                            <Form.Control.Feedback type="invalid">
                                The field is required.
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Row>
                    <br />
                    <Row>
                        <Form.Group as={Col} controlId="validationCustom03">
                            <Form.Select
                                size="sm"
                                name="scale"
                                value={formData.scale}
                                onChange={handleChange}
                                required>
                                <option value="" disabled>
                                    Scale
                                </option>
                                <option value="500">1:500000</option>
                                <option value="250">1:250000</option>
                                <option value="100">1:100000</option>
                                <option value="50">1:50000</option>
                                <option value="25">1:25000</option>
                                <option value="10">1:10000</option>
                            </Form.Select>
                            <Form.Control.Feedback>
                                Looks good!
                            </Form.Control.Feedback>
                            <Form.Control.Feedback type="invalid">
                                The field is required.
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group as={Col}>
                            <Button size="sm" type="submit" variant="primary">
                                Export PDF
                            </Button>
                        </Form.Group>
                    </Row>
                </Form>
            </div>
        </Card>
    );
};

export default MapPrint;
