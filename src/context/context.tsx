import React, {
    createContext,
    useContext,
    useState,
    useEffect,
    ReactNode
} from 'react';

import { TOOLS } from '../constants';
import { ToolProps } from '../models';

interface AppContextProps {
    darkMode: boolean;
    toggleDarkMode: () => void;
    minimapVisibility: boolean;
    toggleMinimapVisibility: () => void;
    tools: ToolProps[];
    updateTool: (toolId: string) => void;
    clearLocalStorage: () => void;
}

const AppContext = createContext<AppContextProps | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({
    children
}) => {
    const [darkMode, setDarkMode] = useState<boolean>(true);
    const [minimapVisibility, setMinimapVisibility] = useState<boolean>(false);
    const [tools, setTools] = useState<ToolProps[]>(TOOLS);

    useEffect(() => {
        const savedConfig = localStorage.getItem('appConfig');
        if (savedConfig) {
            const parsedConfig = JSON.parse(savedConfig);
            setDarkMode(parsedConfig.darkMode);
            setMinimapVisibility(parsedConfig.minimapVisibility);
            setTools(parsedConfig.tools);
        }
    }, []);

    useEffect(() => {
        const appConfig = { darkMode, minimapVisibility, tools };
        localStorage.setItem('appConfig', JSON.stringify(appConfig));

        const theme = darkMode ? 'dark' : 'light';
        document.documentElement.setAttribute('data-bs-theme', theme);
    }, [darkMode, minimapVisibility, tools]);

    const toggleDarkMode = () => {
        setDarkMode(prevDarkMode => !prevDarkMode);
    };

    const toggleMinimapVisibility = () => {
        setMinimapVisibility(prevMinimap => !prevMinimap);
    };

    const updateTool = (toolId: string) => {
        const updatedTools = tools.map(tool =>
            tool.id === toolId ? { ...tool, enable: !tool.enable } : tool
        );

        setTools(updatedTools);
    };

    const clearLocalStorage = () => {
        localStorage.clear();

        setDarkMode(true);
        setMinimapVisibility(false);
        setTools(TOOLS);
    };

    const appContextValue: AppContextProps = {
        darkMode,
        toggleDarkMode,
        minimapVisibility,
        toggleMinimapVisibility,
        tools,
        updateTool,
        clearLocalStorage
    };

    return (
        <AppContext.Provider value={appContextValue}>
            {children}
        </AppContext.Provider>
    );
};

export const useAppContext = () => {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error('useAppContext must be used within an AppProvider');
    }
    return context;
};
