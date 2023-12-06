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
    }
];

export const TOOLS = [
    {
        title: 'Print map',
        icon: <FaPrint />
    },
    {
        title: 'Minimap',
        icon: <FaMap />
    },
    {
        title: 'Draw',
        icon: <FaDrawPolygon />
    },
    {
        title: 'Add layers',
        icon: <FaPlus />
    },
    {
        title: 'Measurement',
        icon: <FaRuler />
    },
    {
        title: 'Information about the object',
        icon: <FaInfo />
    },
    {
        title: 'Contrast',
        icon: <MdContrast />
    },
    {
        title: 'See more tools',
        icon: <MdMenu />
    }
];
