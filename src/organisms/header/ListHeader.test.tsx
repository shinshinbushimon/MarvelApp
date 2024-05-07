/*
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { ListHeader } from './ListHeader';
import userEvent from '@testing-library/user-event';

jest.useFakeTimers();

describe('ListHeader Component', () => {
    beforeEach(() => {
        render(<ListHeader onSearch={jest.fn()} />);
    });

    it('検索ボタンのクリック', async () => {
        const searchButton = screen.getByText('Search');
        expect(screen.queryByPlaceholderText('Search...')).toBeNull();

        userEvent.click(searchButton);
        expect(screen.getByPlaceholderText('Search...')).toBeInTheDocument();

        userEvent.click(searchButton);
        expect(screen.queryByPlaceholderText('Search...')).toBeNull();
    });

    it('performs a delayed search after user input', async () => {
        userEvent.click(screen.getByText('Search'));
        const input = screen.getByPlaceholderText('Search...');

        fireEvent.change(input, { target: { value: 'Marvel' } });
        expect(input.value).toBe('Marvel');

        // Simulate typing delay
        jest.advanceTimersByTime(2000);

        await waitFor(() => {
            // Expect some function to be called that handles the filtered results
            // This is a placeholder for whatever function or effect handles the rendering or fetching of filtered data
            expect(screen.getByText('Results for Marvel')).toBeInTheDocument();
        });
    });
});
*/