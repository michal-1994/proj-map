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

export const TOOLS = [
    {
        id: 'print',
        title: 'Print map',
        icon: <FaPrint />
    },
    {
        id: 'minimap',
        title: 'Minimap',
        icon: <FaMap />
    },
    {
        id: 'draw',
        title: 'Draw',
        icon: <FaDrawPolygon />
    },
    {
        id: 'addlayers',
        title: 'Add layers',
        icon: <FaPlus />
    },
    {
        id: 'measurment',
        title: 'Measurement',
        icon: <FaRuler />
    },
    {
        id: 'contrast',
        title: 'Contrast',
        icon: <MdContrast />
    }
];
