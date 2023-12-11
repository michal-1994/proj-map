import React from 'react';

import TileCard from './TileCard';

import { TileGridProps } from '../../models';

import './TileGrid.css';

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
