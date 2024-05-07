import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { CustomLink } from './BaseLink';

describe('CustomLink Component', () => {
    const testTo = "/test-path";
    const testChildren = "Click Here";
    beforeEach(() => {
        render(
            <MemoryRouter>
                <CustomLink to={testTo}>{testChildren}</CustomLink>
            </MemoryRouter>
        );
    });

    it('リンクの参照と子要素が適切であること', () => {
        const linkElement = screen.getByText(testChildren);
        expect(linkElement).toBeInTheDocument();
        expect(linkElement.getAttribute('href')).toBe(testTo);
    });

    it('適切なスタイルが充てられていること', () => {
        const linkElement = screen.getByText(testChildren);
        expect(linkElement).toHaveStyle('text-decoration: none');
        expect(linkElement).toHaveStyle('color: inherit');
        // Hover effect needs visual testing or animation libraries to verify programmatically
    });
});
