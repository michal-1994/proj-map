import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import HomePage from './pages/HomePage.tsx';
import MapPage from './pages/MapPage.tsx';

import 'bootstrap/dist/css/bootstrap.css';
import './index.css';

const router = createBrowserRouter([
    {
        path: '/',
        element: <HomePage />,
        errorElement: <HomePage />
    },
    {
        path: '/map',
        element: <MapPage />
    }
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
);
