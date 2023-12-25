import React, { createContext, useContext, useState, ReactNode } from 'react';

interface ToolContextProps {
    showPrintWindow: boolean;
    openPrintWindow: (value: boolean) => void;
}

const ToolContext = createContext<ToolContextProps | undefined>(undefined);

export const ToolProvider: React.FC<{ children: ReactNode }> = ({
    children
}) => {
    const [showPrintWindow, setShowPrintWindow] = useState<boolean>(false);

    const openPrintWindow = (value: boolean) => {
        setShowPrintWindow(value);
        if (value) {
            document.getElementById('map-print')?.classList.add('open');
        } else {
            document.getElementById('map-print')?.classList.remove('open');
        }
    };

    const toolContextValue: ToolContextProps = {
        showPrintWindow,
        openPrintWindow
    };

    return (
        <ToolContext.Provider value={toolContextValue}>
            {children}
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
