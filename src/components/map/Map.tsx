import { useEffect } from 'react';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import 'ol/ol.css';

const MapView = () => {
    useEffect(() => {
        const map = new Map({
            target: 'map',
            layers: [
                new TileLayer({
                    source: new OSM()
                })
            ],
            view: new View({
                center: [19.4, 52.12],
                zoom: 6
            })
        });

        return () => {
            map.dispose();
        };
    }, []);

    return <div id="map" style={{ width: '100vw', height: '100vh' }}></div>;
};

export default MapView;
