import { useEffect } from 'react';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import { fromLonLat } from 'ol/proj';
import 'ol/ol.css';

import './MapView.css';

const MapView = () => {
    useEffect(() => {
        const map = new Map({
            target: 'map-view',
            layers: [
                new TileLayer({
                    source: new OSM()
                })
            ],
            view: new View({
                center: fromLonLat([19.1451, 51.9194]),
                zoom: 6
            })
        });

        return () => {
            map.dispose();
        };
    }, []);

    return <main className="map-view" id="map-view"></main>;
};

export default MapView;
