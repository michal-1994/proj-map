import { useEffect, useReducer, useState } from 'react';
import { Card, Form, Button, Col, Row } from 'react-bootstrap';

import { Feature } from 'ol';
import { IoClose } from 'react-icons/io5';
import { Coordinate } from 'ol/coordinate';
import { Translate } from 'ol/interaction';
import { getCenter } from 'ol/extent';
import { toLonLat } from 'ol/proj';
import VectorSource from 'ol/source/Vector';
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
    createVectorLayer,
    removeLayerById
} from '../../../utils/map-utils';
import { createOverviewStyle } from '../../../utils/style-utils';
import { initialState, reducer } from '../../../reducers/mapPrintReducer';
import { Option } from '../../../models';

import './MapPrint.css';

const MapPrint = () => {
    const { map } = useMapContext();
    const { showPrintWindow, openPrintWindow } = useToolContext();

    const [overviewExtent, setOverviewExtent] = useState<number[] | null>(null);
    const [state, dispatch] = useReducer(reducer, initialState);
    const {
        center,
        width,
        height,
        orientation,
        format,
        pageSize,
        resolution,
        scale
    } = state;

    const handleSubmit = (event: any) => {
        event.preventDefault();

        if (map && width && height && overviewExtent) {
            exportToPDF({
                map,
                width,
                height,
                overviewExtent,
                scale,
                resolution,
                orientation
            });
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

        dispatch({ type: 'SET_WIDTH', payload: widthResult });
        dispatch({ type: 'SET_HEIGHT', payload: heightResult });
    };

    useEffect(() => {
        if (showPrintWindow) {
            const center = map?.getView().getCenter();

            if (center) {
                dispatch({
                    type: 'SET_CENTER',
                    payload: toLonLat(center) as Coordinate
                });
            }
        }
    }, [showPrintWindow]);

    useEffect(() => {
        dispatch({ type: 'SET_ORIENTATION', payload: pageSize.split('-')[1] });
        dispatch({ type: 'SET_FORMAT', payload: pageSize.split('-')[0] });
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

            const source = new VectorSource({
                features: [new Feature(geometry)]
            });
            const overviewLayer = createVectorLayer(
                source,
                createOverviewStyle
            );
            const translate = new Translate({
                features: new Collection(source.getFeatures())
            });

            removeLayerById(map, 'overviewLayer');
            map?.addLayer(overviewLayer);
            map?.addInteraction(translate);

            setOverviewExtent(geometry?.getExtent()!);

            translate.on('translateend', event => {
                const feature = event.features.item(0);
                const geometry = feature.getGeometry();
                const extent = geometry?.getExtent();
                setOverviewExtent(extent!);
                dispatch({
                    type: 'SET_CENTER',
                    payload: toLonLat(getCenter(extent!)) as Coordinate
                });
            });

            overviewLayer.set('id', 'overviewLayer');
            overviewLayer.setZIndex(1002);
        }

        if (map && !showPrintWindow) {
            removeLayerById(map, 'overviewLayer');
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
                                    dispatch({
                                        type: 'SET_PAGE_SIZE',
                                        payload: event.target.value
                                    });
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
                                    dispatch({
                                        type: 'SET_RESOLUTION',
                                        payload: event.target.value
                                    });
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
                                    dispatch({
                                        type: 'SET_SCALE',
                                        payload: event.target.value
                                    });
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
