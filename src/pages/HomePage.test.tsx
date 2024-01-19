import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import '@testing-library/jest-dom';

import HomePage from './HomePage';

test('renders home page with correct title', () => {
    render(
        <MemoryRouter>
            <HomePage />
        </MemoryRouter>
    );
    const pageTitle = screen.getByRole('heading', { name: /Home/i });
    expect(pageTitle).toBeInTheDocument();
});
