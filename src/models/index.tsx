import { Map } from 'ol';

export interface BaseLayerProps {
    id: string;
    name: string;
    type: string;
    url?: string;
    enable: boolean;
    image: string;
}

export interface LayerProps {
    id: string;
    name: string;
    type: string;
    url?: string;
    enable: boolean;
    opacity: number;
}

export interface ToolProps {
    id: string;
    enable?: boolean;
    type?: string;
    title?: string;
    icon?: JSX.Element;
    options?: ToolProps[];
}

export interface TileProps {
    title: string;
    text: string;
    icon: string;
    path?: string;
    url?: string;
}

export interface TileGridProps {
    tiles: TileProps[];
}

export interface Dims {
    a0: number[];
    a1: number[];
    a2: number[];
    a3: number[];
    a4: number[];
    a5: number[];
}

export interface Option {
    value: string;
    label: string;
}

export interface ExportModel {
    map: Map;
    width: number;
    height: number;
    overviewExtent: number[];
    scale: string;
    resolution: string;
    orientation: 'portrait' | 'landscape';
}
