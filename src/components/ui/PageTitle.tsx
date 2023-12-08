import React, { ReactNode } from 'react';

import './PageTitle.css';

const PageTitle: React.FC<{ children: ReactNode }> = ({ children }) => {
    return (
        <header className="page-title">
            <h1>{children}</h1>
        </header>
    );
};

export default PageTitle;
