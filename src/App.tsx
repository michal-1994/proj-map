import { Suspense, lazy } from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { GridLoader } from 'react-spinners';

import HomePage from './pages/HomePage';
import ConfiguratorPage from './pages/ConfiguratorPage';

import { AppProvider } from './context/context';
import { ModalProvider } from './context/modal-context';

const MapPage = lazy(() => import('./pages/MapPage'));

const loadingElement = (
    <div
        style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh'
        }}>
        <GridLoader color="#0d6efd" />
    </div>
);

const routes = [
    {
        path: '/',
        element: <HomePage />,
        errorElement: <HomePage />
    },
    {
        path: '/map',
        element: (
            <Suspense fallback={loadingElement}>
                <MapPage />
            </Suspense>
        )
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
