import { useEffect, useState } from 'react';

import { OverviewMap } from 'ol/control';
import { fromLonLat } from 'ol/proj';
import TileLayer from 'ol/layer/Tile';
import { OSM } from 'ol/source';
import View from 'ol/View';
import Map from 'ol/Map';
import 'ol/ol.css';

import * as Constants from '../../../constants';
import { useAppContext } from '../../../context/context';
import { useMapContext } from '../../../context/map-context';

import './MapView.css';

const MapView = () => {
    const { minimapVisibility, tools } = useAppContext();
    const { isMinimap, layers } = useMapContext();

    const [map, setMap] = useState<Map | null>(null);
    const [overviewMapControl, setOverviewMapControl] =
        useState<OverviewMap | null>(null);

    const getTool = (id: string) => {
        return tools.find(tool => tool.id === id);
    };

    useEffect(() => {
        const mapOverviewControl = new OverviewMap({
            layers: [
                new TileLayer({
                    source: new OSM()
                })
            ],
            collapsed: false
        });

        const mapInstance = new Map({
            target: 'map-view',
            layers: [
                new TileLayer({
                    source: new OSM()
                })
            ],
            view: new View({
                center: fromLonLat([21.0122, 52.2297]), // Default Warszawa
                zoom: 12
            })
        });

        setMap(mapInstance);
        setOverviewMapControl(mapOverviewControl);

        return () => {
            mapInstance.setTarget(null!);
        };
    }, []);

    useEffect(() => {
        if (getTool(Constants.MINIMAP_TOOL)?.enable && minimapVisibility) {
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
            getTool(Constants.MINIMAP_TOOL)?.enable &&
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
        }
    }, [map]);

    useEffect(() => {
        let newLayer;

        map?.getLayers().clear();

        // TODO: update map layers

        if (newLayer) {
            map?.addLayer(newLayer);
        }
    }, [layers]);

    return <main className="map-view" id="map-view"></main>;
};

export default MapView;
