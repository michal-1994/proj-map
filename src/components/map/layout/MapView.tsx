import { useEffect, useState } from 'react';
import { OverviewMap } from 'ol/control';
import { Draw } from 'ol/interaction';
import { fromLonLat } from 'ol/proj';
import 'ol/ol.css';

import { useAppContext } from '../../../context/context';
import { useMapContext } from '../../../context/map-context';
import {
    createOverviewMap,
    getLayers,
    helper,
    updateMapBaseLayers,
    updateMapLayers
} from '../../../utils/map-utils';
import { getTool, removeInteraction } from '../../../utils/tool-utils';
import { MINIMAP_TOOL } from '../../../constants';

import './MapView.css';

const MapView = () => {
    const { minimapVisibility, tools } = useAppContext();
    const { map, initMap, isMinimap, layers, baseLayers } = useMapContext();

    const [overviewMapControl, setOverviewMapControl] =
        useState<OverviewMap | null>(null);

    useEffect(() => {
        initMap();
        setOverviewMapControl(createOverviewMap());
    }, []);

    useEffect(() => {
        if (getTool(tools, MINIMAP_TOOL)?.enable && minimapVisibility) {
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
            getTool(tools, MINIMAP_TOOL)?.enable &&
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

            // TEMPORARY
            // const testLayers = getLayers(map);
            // console.log('%cinit', 'color: red');
            // console.log(testLayers);
            // helper(testLayers);

            const handleKeyPress = (event: any) => {
                if (map && event.key === 'Escape') {
                    removeInteraction(map, Draw);
                }
            };

            window.addEventListener('keydown', handleKeyPress);

            return () => {
                window.removeEventListener('keydown', handleKeyPress);
            };
        }
    }, [map]);

    useEffect(() => {
        if (map) {
            updateMapLayers(map, layers);

            // TEMPORARY
            // const testLayers = getLayers(map);
            // console.log('%cupdateMapLayers', 'color: orange');
            // console.log(testLayers);
            // helper(testLayers);
        }
    }, [layers]);

    useEffect(() => {
        if (map) {
            updateMapBaseLayers(map, baseLayers);

            // TEMPORARY
            // const testLayers = getLayers(map);
            // console.log('%cupdateMapBaseLayers', 'color: pink');
            // console.log(testLayers);
            // helper(testLayers);
        }
    }, [baseLayers]);

    return <main className="map-view" id="map-view"></main>;
};

export default MapView;
