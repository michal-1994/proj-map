import React, {
    createContext,
    useContext,
    useState,
    useEffect,
    ReactNode
} from 'react';

interface ConfiguratorContextProps {
    darkMode: {
        enabled: boolean;
    };
}

interface ToolsContextProps {
    minimap: {
        enabled: boolean;
    };
}

interface AppContextProps {
    configurator: ConfiguratorContextProps;
    tools: ToolsContextProps;
}

const AppContext = createContext<AppContextProps | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({
    children
}) => {
    const [darkMode, setDarkMode] = useState<{
        enabled: boolean;
    }>({
        enabled: false
    });
    const [minimap, setMinimap] = useState<{
        enabled: boolean;
    }>({
        enabled: true
    });

    useEffect(() => {
        const savedConfig = localStorage.getItem('appConfig');
        if (savedConfig) {
            const parsedConfig = JSON.parse(savedConfig);
            setDarkMode(parsedConfig.configurator.darkMode);
            setMinimap(parsedConfig.tools.minimap);
        }
    }, []);

    useEffect(() => {
        const appConfig = { configurator: { darkMode }, tools: { minimap } };
        localStorage.setItem('appConfig', JSON.stringify(appConfig));
    }, [darkMode, minimap]);

    const appContextValue: AppContextProps = {
        configurator: { darkMode },
        tools: { minimap }
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
