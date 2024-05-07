/*
    今後改修が必要 なぜならお気に入りタグとキャラクタータグしか必要ないと思われるため
import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { HomeHeader } from './HomeHeader';

describe('HomeHeader Component', () => {
    beforeEach(() => {
        render(
            <MemoryRouter>
                <HomeHeader />
            </MemoryRouter>
        );
    });

    it('renders navigation links with correct destinations', () => {
        const links = [
            { text: 'Characters', to: '/characters' },
            { text: 'Comics', to: '/comics' },
            { text: 'Events', to: '/events' },
            { text: 'Creators', to: '/creators' }
        ];

        links.forEach(link => {
            const linkElement = screen.getByText(link.text);
            expect(linkElement).toBeInTheDocument();
            expect(linkElement.closest('a')).toHaveAttribute('href', link.to);
        });
    });
});
*/