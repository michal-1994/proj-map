import { useState, useEffect } from 'react';
import { Card, Form, Button, Col, Row } from 'react-bootstrap';
import { IoClose } from 'react-icons/io5';
import { Coordinate } from 'ol/coordinate';
import { Translate } from 'ol/interaction';
import { getCenter } from 'ol/extent';
import { toLonLat } from 'ol/proj';
import Collection from 'ol/Collection';

import {
    DMIS,
    PAGE_SIZES,
    RESOLUTIONS,
    SCALES,
    SCALE_FACTOR
} from '../../../constants';
import { useMapContext } from '../../../context/map-context';
import { useToolContext } from '../../../context/tool-context';
import { exportToPDF } from '../../../utils/tool-utils';
import {
    createGeometry,
    createOverviewLayer,
    createOverviewSource,
    removeOverviewLayer
} from '../../../utils/map-utils';
import { Option } from '../../../models';

import './MapPrint.css';

const MapPrint = () => {
    const { map } = useMapContext();
    const { showPrintWindow, openPrintWindow } = useToolContext();

    const [center, setCenter] = useState<Coordinate | null>(null);
    const [width, setWidth] = useState<number | null>(null);
    const [height, setHeight] = useState<number | null>(null);
    const [orientation, setOrientation] = useState<string | null>(null);
    const [format, setFormat] = useState<string | null>(null);
    const [pageSize, setPageSize] = useState<string>('a4-landscape');
    const [resolution, setResolution] = useState<string>('200');
    const [scale, setScale] = useState<string>('100');

    const handleSubmit = (event: any) => {
        event.preventDefault();

        if (map && width && height) {
            exportToPDF(pageSize, resolution, scale, [width, height], map);
            openPrintWindow(!showPrintWindow);
        }
    };

    const calculateDimensions = () => {
        const [x, y] = (DMIS as any)[format!];

        let widthResult, heightResult;

        if (orientation === 'portrait') {
            widthResult = y;
            heightResult = x;
        } else if (orientation === 'landscape') {
            widthResult = x;
            heightResult = y;
        } else {
            widthResult = x;
            heightResult = y;
        }

        setWidth(widthResult);
        setHeight(heightResult);
    };

    useEffect(() => {
        if (showPrintWindow) {
            const center = map?.getView().getCenter();

            if (center) {
                setCenter(toLonLat(center) as Coordinate);
            }
        }
    }, [showPrintWindow]);

    useEffect(() => {
        setOrientation(pageSize.split('-')[1]);
        setFormat(pageSize.split('-')[0]);
    }, [showPrintWindow, pageSize]);

    useEffect(() => {
        if (showPrintWindow && format && orientation) {
            calculateDimensions();
        }
    }, [showPrintWindow, format, orientation]);

    useEffect(() => {
        if (map && center && pageSize && width && height && scale) {
            const [centerX, centerY] = center || [0, 0];
            const halfWidth = width / SCALE_FACTOR / +scale;
            const halfHeight = height / SCALE_FACTOR / +scale;

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
            const translate = new Translate({
                features: new Collection(overviewSource.getFeatures())
            });

            removeOverviewLayer(map);
            map?.addLayer(overviewLayer);
            map?.addInteraction(translate);

            translate.on('translateend', event => {
                const feature = event.features.item(0);
                const geometry = feature.getGeometry();
                const extent = geometry?.getExtent();
                setCenter(toLonLat(getCenter(extent!)) as Coordinate);
            });

            overviewLayer.setZIndex(999);
            overviewLayer.set('id', 'overviewLayer');
        }

        if (map && !showPrintWindow) {
            removeOverviewLayer(map);
        }
    }, [map, showPrintWindow, center, width, height, scale]);

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
                                value={pageSize}
                                onChange={event => {
                                    setPageSize(event.target.value);
                                }}
                                required>
                                {createOptions(PAGE_SIZES)}
                            </Form.Select>
                        </Form.Group>
                        <Form.Group as={Col} controlId="resolutionId">
                            <Form.Label>Resolution</Form.Label>
                            <Form.Select
                                size="sm"
                                name="resolution"
                                value={resolution}
                                onChange={event => {
                                    setResolution(event.target.value);
                                }}
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
                                value={scale}
                                onChange={event => {
                                    setScale(event.target.value);
                                }}
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
