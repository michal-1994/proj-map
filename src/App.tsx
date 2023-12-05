import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import HomePage from './pages/HomePage';
import MapPage from './pages/MapPage';
import ConfiguratorPage from './pages/ConfiguratorPage';

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
    return <RouterProvider router={router} />;
};

export default App;
