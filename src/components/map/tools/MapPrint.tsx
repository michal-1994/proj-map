import { useState, useEffect } from 'react';
import { Card, Form, Button, Col, Row } from 'react-bootstrap';
import { IoClose } from 'react-icons/io5';

import { useMapContext } from '../../../context/map-context';

import { exportToPDF, togglePrintTool } from '../../../utils/tool-utils';

import { PrintData } from '../../../models';

import { Feature } from 'ol';
import { Polygon } from 'ol/geom';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import { fromLonLat, toLonLat } from 'ol/proj';
import { Fill, Stroke, Style } from 'ol/style';

import { DMIS } from '../../../constants';

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

    useEffect(() => {
        const centerT = map?.getView().getCenter();
        const center = centerT ? toLonLat(centerT) : null;
        const pageSize: string = formData.pageSize.split('-')[0];
        const dim: number[] = (DMIS as any)[pageSize];
        let overviewLayer: any | null = null;

        if (dim && center) {
            const widthScaleFactor = dim[0] / 200;
            const heightScaleFactor = dim[1] / 200;

            const halfWidth = widthScaleFactor / 10;
            const halfHeight = heightScaleFactor / 10;

            const bottomLeft = [center[0] - halfWidth, center[1] - halfHeight];
            const bottomRight = [center[0] + halfWidth, center[1] - halfHeight];
            const topRight = [center[0] + halfWidth, center[1] + halfHeight];
            const topLeft = [center[0] - halfWidth, center[1] + halfHeight];

            const geometry = new Polygon([
                [
                    fromLonLat(bottomLeft),
                    fromLonLat(bottomRight),
                    fromLonLat(topRight),
                    fromLonLat(topLeft)
                ]
            ]);

            map?.getLayers().forEach(layer => {
                const layerId = layer ? layer.get('id') : null;
                if (layerId === 'overviewLayer') {
                    map?.removeLayer(layer);
                }
            });

            overviewLayer = new VectorLayer({
                source: new VectorSource({
                    features: [new Feature(geometry)]
                }),
                style: new Style({
                    fill: new Fill({
                        color: 'rgba(230, 215, 173, 0.3)'
                    }),
                    stroke: new Stroke({
                        color: 'rgb(204, 116, 0)',
                        width: 2
                    })
                })
            });

            overviewLayer.setZIndex(999);
            overviewLayer.set('id', 'overviewLayer');

            map?.addLayer(overviewLayer);
        }
    }, [formData, map]);

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
                        <Form.Group as={Col} controlId="pageSizeId">
                            <Form.Select
                                size="sm"
                                name="pageSize"
                                value={formData.pageSize}
                                onChange={handleChange}
                                required>
                                <option value="" disabled>
                                    Page size
                                </option>
                                <option value="a0-landscape">
                                    A0 Landscape
                                </option>
                                <option value="a0-portrait">A0 Portrait</option>
                                <option value="a1-landscape">
                                    A1 Landscape
                                </option>
                                <option value="a1-portrait">A1 Portrait</option>
                                <option value="a2-landscape">
                                    A2 Landscape
                                </option>
                                <option value="a2-portrait">A2 Portrait</option>
                                <option value="a3-landscape">
                                    A3 Landscape
                                </option>
                                <option value="a3-portrait">A3 Portrait</option>
                                <option value="a4-landscape">
                                    A4 Landscape
                                </option>
                                <option value="a4-portrait">A4 Portrait</option>
                                <option value="a5-landscape">
                                    A5 Landscape
                                </option>
                                <option value="a5-portrait">A5 Portrait</option>
                            </Form.Select>
                            <Form.Control.Feedback>
                                Looks good!
                            </Form.Control.Feedback>
                            <Form.Control.Feedback type="invalid">
                                The field is required.
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group as={Col} controlId="resolutionId">
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
                        <Form.Group as={Col} controlId="scaleId">
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
