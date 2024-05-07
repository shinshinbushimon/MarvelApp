import React from 'react';
import { render, screen } from '@testing-library/react';
import { PageNumber } from './PageNumber';

describe('PageNumber Component', () => {
    const pageContent = "Page 1 of 10";

    it('ページを正しくレンダリングしていること', () => {
        render(<PageNumber pageContent={pageContent} />);
        const displayElement = screen.getByText(pageContent);
        expect(displayElement).toBeInTheDocument();
        expect(displayElement).toHaveTextContent(pageContent);
    });

    it('スタイルが充てられていること', () => {
        render(<PageNumber pageContent={pageContent} />);
        const displayElement = screen.getByText(pageContent);
        expect(displayElement).toHaveStyle('font-size: 16px');
        expect(displayElement).toHaveStyle('color: #333');
    });
});
