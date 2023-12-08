import React, {
    createContext,
    useContext,
    useState,
    useEffect,
    ReactNode
} from 'react';

interface ToolProps {
    id: string;
    enabled: boolean;
}

interface AppContextProps {
    darkMode: boolean;
    minimap: boolean;
    tools: ToolProps[];
}

const AppContext = createContext<AppContextProps | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({
    children
}) => {
    const [darkMode, setDarkMode] = useState<boolean>(true);
    const [minimap, setMinimap] = useState<boolean>(true);
    const [tools, setTools] = useState<ToolProps[]>([]);

    useEffect(() => {
        const savedConfig = localStorage.getItem('appConfig');
        if (savedConfig) {
            const parsedConfig = JSON.parse(savedConfig);
            setDarkMode(parsedConfig.darkMode);
            setMinimap(parsedConfig.minimap);
            setTools(parsedConfig.tools);
        }
    }, []);

    useEffect(() => {
        const appConfig = { darkMode, minimap, tools };
        localStorage.setItem('appConfig', JSON.stringify(appConfig));
    }, [darkMode, minimap, tools]);

    const appContextValue: AppContextProps = {
        darkMode,
        minimap,
        tools
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
