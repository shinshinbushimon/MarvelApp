import React from "react";
import { BaseBtn } from "./BaseBtn";
import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';

const user = userEvent.setup();
describe('Baseボタンのテスト', () => {
    it('ボタンのレンダリングテスト', () => {
        render(<BaseBtn btnColor="red" onClick={() => {}}>Clickme</BaseBtn>);
        const button = screen.getByRole('button');
        expect(button).toBeInTheDocument();
        expect(button).toHaveStyle('background: red');
    })

    it('クリックイベントテスト', () => {
         
    })
})