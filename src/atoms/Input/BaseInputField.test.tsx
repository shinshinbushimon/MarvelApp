import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { InputField } from './BaseInputField';

describe('InputFieldのテスト', () => {
    const testProps = {
        type: 'text',
        placeholder: 'Enter your name',
        value: 'Mr.test',
        onChange: jest.fn(),
    };

    it('プロパティが正しいこと', () => {
        render(<InputField {...testProps} />);
        const inputElement = screen.getByPlaceholderText('Enter your name');
        expect(inputElement).toBeInTheDocument();
        expect(inputElement).toHaveAttribute('type', 'text');
        expect(inputElement).toHaveAttribute('value', 'John Doe');
    });

    it('適切なスタイルが充てられていること', () => {
        render(<InputField {...testProps} />);
        const inputElement = screen.getByPlaceholderText('Enter your name');
        expect(inputElement).toHaveStyle('border: none');
        expect(inputElement).toHaveStyle('outline: none');
        expect(inputElement).toHaveStyle('padding: 10px 15px');
        expect(inputElement).toHaveStyle('font-size: 16px');
        expect(inputElement).toHaveStyle('border-radius: 15px');
        expect(inputElement).toHaveStyle('width: 100%');
    });

    it('イベントハンドラが適切であること', () => {
        render(<InputField {...testProps} />);
        const inputElement = screen.getByPlaceholderText('Enter your name');
        fireEvent.change(inputElement, { target: { value: 'Jane Doe' } });
        expect(testProps.onChange).toHaveBeenCalled();
    });
});
