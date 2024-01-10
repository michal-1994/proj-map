import React, { createContext, useContext, useState, ReactNode } from 'react';

import MoreDetails from '../components/map/tools/MoreDetails';

interface ToolContextProps {
    showPrintWindow: boolean;
    openPrintWindow: (value: boolean) => void;
    showMoreDetailsWindow: boolean;
    openMoreDetailsWindow: (title: string, content: string) => void;
    closeMoreDetailsWindow: () => void;
    moreDetailsWindowContent: {
        title: string;
        content: string;
    };
}

const ToolContext = createContext<ToolContextProps | undefined>(undefined);

export const ToolProvider: React.FC<{ children: ReactNode }> = ({
    children
}) => {
    const [showPrintWindow, setShowPrintWindow] = useState<boolean>(false);
    const [showMoreDetailsWindow, setShowMoreDetailsWindow] =
        useState<boolean>(false);
    const [moreDetailsWindowContent, setMoreDetailsWindowContent] = useState<{
        title: string;
        content: string;
    }>({
        title: '',
        content: ''
    });

    const openPrintWindow = (value: boolean) => {
        setShowPrintWindow(value);
    };

    const openMoreDetailsWindow = (title: string, content: string) => {
        setMoreDetailsWindowContent({
            title,
            content
        });
        setShowMoreDetailsWindow(true);
    };

    const closeMoreDetailsWindow = () => {
        setShowMoreDetailsWindow(false);
    };

    const toolContextValue: ToolContextProps = {
        showPrintWindow,
        openPrintWindow,
        showMoreDetailsWindow,
        openMoreDetailsWindow,
        closeMoreDetailsWindow,
        moreDetailsWindowContent
    };

    return (
        <ToolContext.Provider value={toolContextValue}>
            {children}
            <MoreDetails />
        </ToolContext.Provider>
    );
};

export const useToolContext = () => {
    const context = useContext(ToolContext);
    if (!context) {
        throw new Error('useToolContext must be used within a ToolProvider');
    }
    return context;
};
