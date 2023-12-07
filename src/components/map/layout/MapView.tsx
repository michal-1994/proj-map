import { useEffect, useState } from 'react';

import { OverviewMap } from 'ol/control';
import { fromLonLat } from 'ol/proj';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import View from 'ol/View';
import Map from 'ol/Map';
import 'ol/ol.css';

import { useAppContext } from '../../../context/context';

import './MapView.css';

const MapView = () => {
    const [map, setMap] = useState<Map | null>(null);
    const { tools } = useAppContext();

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

        if (tools.minimap.enabled) {
            mapInstance.addControl(mapOverviewControl);
        }

        setMap(mapInstance);

        return () => {
            mapInstance.setTarget(null!);
        };
    }, []);

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
