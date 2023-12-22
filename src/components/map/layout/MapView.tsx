import { useEffect, useState } from 'react';

import { OSM } from 'ol/source';
import { OverviewMap } from 'ol/control';
import { fromLonLat } from 'ol/proj';
import TileLayer from 'ol/layer/Tile';
import 'ol/ol.css';

import * as Constants from '../../../constants';
import { useAppContext } from '../../../context/context';
import { useMapContext } from '../../../context/map-context';

import {
    getTool,
    updateMapBaseLayers,
    updateMapLayers
} from '../../../utils/map-utils';

import './MapView.css';

const MapView = () => {
    const { minimapVisibility, tools } = useAppContext();
    const { map, initMap, isMinimap, layers, baseLayers } = useMapContext();

    const [overviewMapControl, setOverviewMapControl] =
        useState<OverviewMap | null>(null);

    useEffect(() => {
        initMap();

        setOverviewMapControl(
            new OverviewMap({
                layers: [
                    new TileLayer({
                        source: new OSM()
                    })
                ],
                collapsed: false
            })
        );
    }, []);

    useEffect(() => {
        if (
            getTool(tools, Constants.MINIMAP_TOOL)?.enable &&
            minimapVisibility
        ) {
            map?.addControl(overviewMapControl!);
        } else {
            map?.removeControl(overviewMapControl!);
        }
    }, [map, minimapVisibility, tools]);

    useEffect(() => {
        const overviewMapActive = !map
            ?.getControls()
            .getArray()
            .includes(overviewMapControl!);

        if (
            getTool(tools, Constants.MINIMAP_TOOL)?.enable &&
            isMinimap &&
            overviewMapActive
        ) {
            map?.addControl(overviewMapControl!);
        } else {
            map?.removeControl(overviewMapControl!);
        }
    }, [isMinimap]);

    useEffect(() => {
        if (map) {
            navigator.geolocation.getCurrentPosition(
                position => {
                    const { longitude, latitude } = position.coords;
                    const currentPosition = fromLonLat([longitude, latitude]);
                    map.getView().setCenter(currentPosition);
                },
                error => {
                    console.error('Error getting geolocation:', error);
                },
                { enableHighAccuracy: true }
            );
            updateMapLayers(map, layers);
            updateMapBaseLayers(map, baseLayers);
        }
    }, [map]);

    useEffect(() => {
        if (map) {
            updateMapLayers(map, layers);
        }
    }, [layers]);

    useEffect(() => {
        if (map) {
            updateMapBaseLayers(map, baseLayers);
        }
    }, [baseLayers]);

    return <main className="map-view" id="map-view"></main>;
};

export default MapView;
