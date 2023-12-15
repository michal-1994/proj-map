import icon from '../assets/react.svg';
import { FaPrint, FaMap, FaDrawPolygon, FaPlus, FaRuler } from 'react-icons/fa';
import { MdContrast } from 'react-icons/md';

import {
    BaseLayerProps,
    ButtonToolProps,
    LayerProps,
    TileProps,
    ToolProps
} from '../models';

export const GEOJSON_TYPE: string = 'geojson';

export const LAYERS: LayerProps[] = [
    {
        id: 'voivodeships',
        type: GEOJSON_TYPE,
        url: 'geojson/voivodeships.geojson',
        enable: true
    },
    {
        id: 'counties',
        type: GEOJSON_TYPE,
        url: 'geojson/counties.geojson',
        enable: false
    }
];

// TODO: add more base layers
export const BASE_LAYERS: BaseLayerProps[] = [
    {
        id: 'osm', // TODO: change name
        type: 'osm',
        enable: true,
        image: 'osm.png'
    },
    {
        id: 'wms', // TODO: change name
        type: 'wms',
        url: 'https://ahocevar.com/geoserver/wms',
        enable: false,
        image: 'wms.png'
    }
];

export const TILES: TileProps[] = [
    {
        title: 'Map',
        text: 'Map application',
        icon: icon,
        path: '/map'
    },
    {
        title: 'Configurator',
        text: 'Application configurator',
        icon: icon,
        path: '/configurator'
    },
    {
        title: 'Visit author',
        text: "Visit the author's website",
        icon: icon,
        url: 'https://michalgrzegorczyk.pl/'
    }
];

export const MINIMAP_TOOL: string = 'minimap';
export const PRINT_TOOL: string = 'print';
export const ADD_LAYERS_TOOL: string = 'addlayers';
export const DRAW_TOOL: string = 'draw';
export const MEASURMENT_TOOL: string = 'measurment';
export const CONTRAST_TOOL: string = 'contrast';

export const TOOLS: ToolProps[] = [
    {
        id: MINIMAP_TOOL,
        enable: true
    },
    {
        id: PRINT_TOOL,
        enable: false
    },
    {
        id: ADD_LAYERS_TOOL,
        enable: false
    },
    {
        id: DRAW_TOOL,
        enable: false
    },
    {
        id: MEASURMENT_TOOL,
        enable: false
    },
    {
        id: CONTRAST_TOOL,
        enable: false
    }
];

export const BUTTON_TOOLS: ButtonToolProps[] = [
    {
        id: MINIMAP_TOOL,
        title: 'Minimap',
        icon: <FaMap />
    },
    {
        id: PRINT_TOOL,
        title: 'Print map',
        icon: <FaPrint />
    },
    {
        id: ADD_LAYERS_TOOL,
        title: 'Add layers',
        icon: <FaPlus />
    },
    {
        id: DRAW_TOOL,
        title: 'Draw',
        icon: <FaDrawPolygon />
    },
    {
        id: MEASURMENT_TOOL,
        title: 'Measurement',
        icon: <FaRuler />
    },
    {
        id: CONTRAST_TOOL,
        title: 'Contrast',
        icon: <MdContrast />
    }
];
