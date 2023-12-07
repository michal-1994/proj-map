import icon from '../assets/react.svg';
import {
    FaPrint,
    FaMap,
    FaDrawPolygon,
    FaPlus,
    FaRuler,
    FaInfo
} from 'react-icons/fa';
import { MdContrast, MdMenu } from 'react-icons/md';

export const TILES = [
    {
        title: 'Map',
        text: 'Map application',
        icon: icon,
        path: '/map'
    },
    {
        title: 'Configurator',
        text: 'Configurator application',
        icon: icon,
        path: '/configurator'
    },
    {
        title: 'Visit author',
        text: 'Visit the author website',
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
        id: 'info',
        title: 'Information about the object',
        icon: <FaInfo />
    },
    {
        id: 'contrast',
        title: 'Contrast',
        icon: <MdContrast />
    },
    {
        id: 'seemore',
        title: 'See more tools',
        icon: <MdMenu />
    }
];
