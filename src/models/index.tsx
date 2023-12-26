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
    type: string;
    url?: string;
    enable: boolean;
}

export interface ToolProps {
    id: string;
    enable: boolean;
}

export interface ButtonToolProps {
    id: string;
    title: string;
    icon: JSX.Element;
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

export interface PrintData {
    pageSize: string;
    resolution: string;
    scale: string;
}

export interface Dims {
    a3: number[];
    a4: number[];
}

export interface Option {
    value: string;
    label: string;
}
