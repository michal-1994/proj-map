import icon from '../assets/react.svg';
import { FaPrint, FaMap, FaPlus, FaRuler } from 'react-icons/fa';
import { MdContrast } from 'react-icons/md';

import {
    BaseLayerProps,
    ButtonToolProps,
    Dims,
    LayerProps,
    Option,
    TileProps,
    ToolProps
} from '../models';

export const GEOJSON_TYPE: string = 'geojson';

export const LAYERS: LayerProps[] = [
    {
        id: 'voivodeships',
        type: GEOJSON_TYPE,
        url: 'geojson/voivodeships.geojson',
        enable: false
    },
    {
        id: 'counties',
        type: GEOJSON_TYPE,
        url: 'geojson/counties.geojson',
        enable: false
    }
];

export const BASE_LAYERS: BaseLayerProps[] = [
    {
        id: 'osm',
        name: 'Open Street Map',
        type: 'osm',
        enable: true,
        image: 'osm.png'
    },
    {
        id: 'stamen_watercolor',
        name: 'Water Color',
        type: 'stamen',
        enable: false,
        image: 'water-color.png'
    },
    {
        id: 'stamen_toner',
        name: 'Toner',
        type: 'stamen',
        enable: false,
        image: 'toner.png'
    },
    {
        id: 'stamen_terrain',
        name: 'Terrain',
        type: 'stamen',
        enable: false,
        image: 'terrain.png'
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
export const MEASURMENT_TOOL: string = 'measurment';
export const CONTRAST_TOOL: string = 'contrast';

export const TOOLS: ToolProps[] = [
    {
        id: MINIMAP_TOOL,
        enable: true
    },
    {
        id: PRINT_TOOL,
        enable: true
    },
    {
        id: ADD_LAYERS_TOOL,
        enable: false
    },
    {
        id: MEASURMENT_TOOL,
        enable: false
    },
    {
        id: CONTRAST_TOOL,
        enable: true
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

export const SCALE_FACTOR = 2000;

export const DMIS: Dims = {
    a0: [1189, 841],
    a1: [841, 594],
    a2: [594, 420],
    a3: [420, 297],
    a4: [297, 210],
    a5: [210, 148]
};

export const PAGE_SIZES: Option[] = [
    { value: 'a0-landscape', label: 'A0 Landscape' },
    { value: 'a0-portrait', label: 'A0 Portrait' },
    { value: 'a1-landscape', label: 'A1 Landscape' },
    { value: 'a1-portrait', label: 'A1 Portrait' },
    { value: 'a2-landscape', label: 'A2 Landscape' },
    { value: 'a2-portrait', label: 'A2 Portrait' },
    { value: 'a3-landscape', label: 'A3 Landscape' },
    { value: 'a3-portrait', label: 'A3 Portrait' },
    { value: 'a4-landscape', label: 'A4 Landscape' },
    { value: 'a4-portrait', label: 'A4 Portrait' },
    { value: 'a5-landscape', label: 'A5 Landscape' },
    { value: 'a5-portrait', label: 'A5 Portrait' }
];

export const RESOLUTIONS: Option[] = [
    { value: '72', label: '72 dpi (fast)' },
    { value: '150', label: '150 dpi' },
    { value: '200', label: '200 dpi' },
    { value: '300', label: '300 dpi (slow)' }
];

export const SCALES: Option[] = [
    { value: '500', label: '1:500000' },
    { value: '250', label: '1:250000' },
    { value: '100', label: '1:100000' },
    { value: '50', label: '1:50000' },
    { value: '25', label: '1:25000' },
    { value: '10', label: '1:10000' }
];
