import icon from '../assets/react.svg';
import { FaPrint, FaMap, FaDrawPolygon, FaPlus, FaRuler } from 'react-icons/fa';
import { MdContrast } from 'react-icons/md';

export const TILES = [
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

export const MINIMAP_TOOL = 'minimap';
export const PRINT_TOOL = 'print';
export const ADD_LAYERS_TOOL = 'addlayers';
export const DRAW_TOOL = 'draw';
export const MEASURMENT_TOOL = 'measurment';
export const CONTRAST_TOOL = 'contrast';

export const TOOLS = [
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

export const BUTTON_TOOLS = [
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
