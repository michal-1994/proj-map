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
