import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { CheckInput } from './CheckInput';

/*
describe('CheckInput Component', () => {
    const label = "Agree to terms";
    const handleChange = jest.fn();

    it('レンダリングと要素が正しく認識されていること', () => {
        render(<CheckInput type="checkbox" label={label} checked={false} onChange={handleChange} />);
        expect(screen.getByLabelText(label)).toBeInTheDocument();
        expect(screen.getByLabelText(label).type).toBe('checkbox');
    });

    it('初めは未チェック', () => {
        render(<CheckInput type="checkbox" label={label} checked={true} onChange={handleChange} />);
        expect(screen.getByLabelText(label)).toBeChecked();
    });

    it('チェック押下時の処理', () => {
        render(<CheckInput type="checkbox" label={label} checked={false} onChange={handleChange} />);
        const checkbox = screen.getByLabelText(label);
        fireEvent.click(checkbox);
        expect(handleChange).toHaveBeenCalledTimes(1);
        // Optionally check for specific call arguments if necessary
    });
});
*/