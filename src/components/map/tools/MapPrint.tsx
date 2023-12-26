import { useState, useEffect } from 'react';
import { Card, Form, Button, Col, Row } from 'react-bootstrap';
import { IoClose } from 'react-icons/io5';
import { Coordinate } from 'ol/coordinate';
import { Translate } from 'ol/interaction';
import Collection from 'ol/Collection';

import { DMIS, PAGE_SIZES, RESOLUTIONS, SCALES } from '../../../constants';
import { useMapContext } from '../../../context/map-context';
import { useToolContext } from '../../../context/tool-context';
import { exportToPDF } from '../../../utils/tool-utils';
import {
    createGeometry,
    createOverviewLayer,
    createOverviewSource,
    removeOverviewLayer,
    transformProjection
} from '../../../utils/map-utils';
import { Option, PrintData } from '../../../models';

import './MapPrint.css';

const MapPrint = () => {
    const { map } = useMapContext();
    const { showPrintWindow, openPrintWindow } = useToolContext();

    const [formData, setFormData] = useState<PrintData>({
        pageSize: 'a4-landscape',
        resolution: '200',
        scale: '100'
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
            openPrintWindow(!showPrintWindow);
        }
    };

    useEffect(() => {
        const center = transformProjection(
            map?.getView().getCenter() as Coordinate
        );
        const pageSize: string = formData.pageSize.split('-')[0];
        const orientation: any = formData.pageSize.split('-')[1];
        const dim: number[] = (DMIS as any)[pageSize];

        if (orientation === 'portrait') {
            dim.reverse();
        }

        if (map && dim && center) {
            const widthScaleFactor = dim[0] / 200;
            const heightScaleFactor = dim[1] / 200;

            const halfWidth = widthScaleFactor / 10;
            const halfHeight = heightScaleFactor / 10;

            const bottomLeft = [center[0] - halfWidth, center[1] - halfHeight];
            const bottomRight = [center[0] + halfWidth, center[1] - halfHeight];
            const topRight = [center[0] + halfWidth, center[1] + halfHeight];
            const topLeft = [center[0] - halfWidth, center[1] + halfHeight];

            const geometry = createGeometry(
                topLeft,
                topRight,
                bottomRight,
                bottomLeft
            );

            removeOverviewLayer(map);

            const overviewSource = createOverviewSource(geometry);
            const overviewLayer = createOverviewLayer(overviewSource);

            if (showPrintWindow) {
                map?.addLayer(overviewLayer);
            }

            const translate = new Translate({
                features: new Collection(overviewSource.getFeatures())
            });
            map?.addInteraction(translate);

            overviewLayer.setZIndex(999);
            overviewLayer.set('id', 'overviewLayer');
        }
    }, [showPrintWindow, map, formData]);

    const createOptions = (options: Option[]) => {
        return options.map((option: Option) => (
            <option key={option.value} value={option.value}>
                {option.label}
            </option>
        ));
    };

    return (
        <Card className={`map-print ${showPrintWindow ? 'open' : ''}`}>
            <button
                className="card"
                onClick={() => {
                    openPrintWindow(!showPrintWindow);
                }}>
                <IoClose />
            </button>
            <div className="map-print-content">
                <Form noValidate onSubmit={handleSubmit}>
                    <Row>
                        <Form.Group as={Col} controlId="pageSizeId">
                            <Form.Label>Page size</Form.Label>
                            <Form.Select
                                size="sm"
                                name="pageSize"
                                value={formData.pageSize}
                                onChange={handleChange}
                                required>
                                {createOptions(PAGE_SIZES)}
                            </Form.Select>
                        </Form.Group>
                        <Form.Group as={Col} controlId="resolutionId">
                            <Form.Label>Resolution</Form.Label>
                            <Form.Select
                                size="sm"
                                name="resolution"
                                value={formData.resolution}
                                onChange={handleChange}
                                required>
                                {createOptions(RESOLUTIONS)}
                            </Form.Select>
                        </Form.Group>
                    </Row>
                    <br />
                    <Row>
                        <Form.Group as={Col} xs={8} controlId="scaleId">
                            <Form.Label>Scale</Form.Label>
                            <Form.Select
                                size="sm"
                                name="scale"
                                value={formData.scale}
                                onChange={handleChange}
                                required>
                                {createOptions(SCALES)}
                            </Form.Select>
                        </Form.Group>
                        <Form.Group
                            as={Col}
                            xs={4}
                            style={{ marginTop: 'auto' }}>
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
