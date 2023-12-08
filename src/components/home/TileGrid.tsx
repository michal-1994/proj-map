import React from 'react';

import TileCard from './TileCard';

import './TileGrid.css';

interface TileGridProps {
    tiles: {
        title: string;
        text: string;
        icon: string;
        path?: string;
        url?: string;
    }[];
}

const TileGrid: React.FC<TileGridProps> = ({ tiles }) => {
    return (
        <main className="tile-grid">
            {tiles.map((tile, index) => (
                <TileCard key={index} {...tile} />
            ))}
        </main>
    );
};

export default TileGrid;
