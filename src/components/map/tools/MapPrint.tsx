import { useState, useEffect } from 'react';
import { Card, Form, Button, Col, Row } from 'react-bootstrap';
import { IoClose } from 'react-icons/io5';
import { Coordinate } from 'ol/coordinate';
import { Translate } from 'ol/interaction';
import { getCenter } from 'ol/extent';
import { toLonLat } from 'ol/proj';
import Collection from 'ol/Collection';

import { DMIS, PAGE_SIZES, RESOLUTIONS, SCALES } from '../../../constants';
import { useMapContext } from '../../../context/map-context';
import { useToolContext } from '../../../context/tool-context';
import { exportToPDF } from '../../../utils/tool-utils';
import {
    addOverviewLayer,
    createGeometry,
    createOverviewLayer,
    createOverviewSource,
    removeOverviewLayer
} from '../../../utils/map-utils';
import { Option, PrintData } from '../../../models';

import './MapPrint.css';

const MapPrint = () => {
    const { map } = useMapContext();
    const { showPrintWindow, openPrintWindow } = useToolContext();

    const [center, setCenter] = useState<Coordinate | null>(null);
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
        if (showPrintWindow) {
            const center = map?.getView().getCenter();
            setCenter(center ? (toLonLat(center) as Coordinate) : null);
        }
    }, [showPrintWindow]);

    useEffect(() => {
        const pageSize: string = formData.pageSize.split('-')[0];
        const orientation: string = formData.pageSize.split('-')[1];
        const dim: number[] = (DMIS as any)[pageSize];
        const scale: number = +formData.scale;

        if (orientation === 'portrait') {
            dim.reverse();
        }

        if (map && showPrintWindow) {
            const [width, height] = dim;
            const [centerX, centerY] = center || [0, 0];
            const halfWidth = width / 2000 / scale;
            const halfHeight = height / 2000 / scale;

            const bottomLeft = [centerX - halfWidth, centerY - halfHeight];
            const bottomRight = [centerX + halfWidth, centerY - halfHeight];
            const topRight = [centerX + halfWidth, centerY + halfHeight];
            const topLeft = [centerX - halfWidth, centerY + halfHeight];

            const geometry = createGeometry(
                topLeft,
                topRight,
                bottomRight,
                bottomLeft
            );

            const overviewSource = createOverviewSource(geometry);
            const overviewLayer = createOverviewLayer(overviewSource);

            removeOverviewLayer(map);
            addOverviewLayer(map, overviewLayer);

            const translate = new Translate({
                features: new Collection(overviewSource.getFeatures())
            });
            map?.addInteraction(translate);

            translate.on('translateend', event => {
                const feature = event.features.item(0);
                const geometry = feature.getGeometry();
                const extent = geometry?.getExtent();
                const center = getCenter(extent!);
                setCenter(toLonLat(center) as Coordinate);
            });

            overviewLayer.setZIndex(999);
            overviewLayer.set('id', 'overviewLayer');
        }

        if (map && !showPrintWindow) {
            removeOverviewLayer(map);
        }
    }, [map, formData, showPrintWindow]);

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
