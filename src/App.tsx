import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import HomePage from './pages/HomePage';
import MapPage from './pages/MapPage';
import ConfiguratorPage from './pages/ConfiguratorPage';

import { AppProvider } from './context/context';
import { ModalProvider } from './context/modal-context';

const routes = [
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
];

const router = createBrowserRouter(routes, {
    basename: import.meta.env.DEV ? '/' : '/proj-map/'
});

const App = () => {
    return (
        <AppProvider>
            <ModalProvider>
                <RouterProvider router={router} />
            </ModalProvider>
        </AppProvider>
    );
};

export default App;
