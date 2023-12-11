import { useEffect, useState } from 'react';

import { OverviewMap } from 'ol/control';
import { fromLonLat } from 'ol/proj';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import View from 'ol/View';
import Map from 'ol/Map';
import 'ol/ol.css';

import { useAppContext } from '../../../context/context';
import { useMapContext } from '../../../context/map-context';

import './MapView.css';

const MapView = () => {
    const { minimapVisibility } = useAppContext();
    const { isMinimap } = useMapContext();

    const [map, setMap] = useState<Map | null>(null);
    const [overviewMapControl, setOverviewMapControl] =
        useState<OverviewMap | null>(null);

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

        setOverviewMapControl(mapOverviewControl);
        setMap(mapInstance);

        if (minimapVisibility) {
            map?.addControl(overviewMapControl!);
        } else {
            map?.removeControl(overviewMapControl!);
        }

        return () => {
            mapInstance.setTarget(null!);
        };
    }, [minimapVisibility]);

    useEffect(() => {
        if (isMinimap) {
            map?.addControl(overviewMapControl!);
        } else {
            map?.removeControl(overviewMapControl!);
        }
    }, [map, isMinimap]);

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

    return <main className="map-view" id="map-view"></main>;
};

export default MapView;
