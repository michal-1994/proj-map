import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import HomePage from './pages/HomePage';
import MapPage from './pages/MapPage';
import ConfiguratorPage from './pages/ConfiguratorPage';

import { AppProvider } from './context/context';

const router = createBrowserRouter([
    {
        path: '/',
        element: <HomePage />,
        errorElement: <HomePage />
    },
    {
        path: '/map',
        element: <MapPage />
    },
    {
        path: '/configurator',
        element: <ConfiguratorPage />
    }
]);

const App = () => {
    return (
        <AppProvider>
            <RouterProvider router={router} />
        </AppProvider>
    );
};

export default App;
