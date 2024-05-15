import { render, screen, waitFor } from "@testing-library/react";
import { FavoriteIcon } from "./BaseIcon";
import * as hooks from 'customHooks'; 
import { RecoilRoot } from "recoil";
import React from "react";
import { loggedInItem, userId } from 'RecoilAtom';

import userEvent from "@testing-library/user-event";

jest.mock('customHooks', () => ({
    addToFavorites: jest.fn(),
    removeFromFavorites: jest.fn()
}))

const mockedCustomHooks = jest.mocked(hooks);
const testUserId = 'testuser'
const testId = 1;
const user = userEvent.setup();

describe('お気に入りアイコンに関する処理のテスト', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        render(
            <RecoilRoot initializeState={(snapshot) => {
                snapshot.set(userId, testUserId); // userIdState に testUserId を設定
            }}>
                <FavoriteIcon characterId={testId} />
            </RecoilRoot>
        );
    });

    it('初期表示', () => {
        expect(screen.getByTestId('outline-star')).toBeInTheDocument();
    });

    it('アイコン活性後の表示', async () => {
        await user.click(screen.getByTestId('outline-star'));
        expect(mockedCustomHooks.addToFavorites).toHaveBeenCalledWith(testUserId, testId);
        expect(screen.getByTestId('fill-star')).toBeInTheDocument();
    });

    it('アイコン非活性の処理', async () => {
        await user.click(screen.getByTestId('outline-star'));
        await user.click(screen.getByTestId('fill-star'));
        waitFor(() => {
            expect(mockedCustomHooks.removeFromFavorites).toHaveBeenCalledWith(testUserId, testId);
            expect(screen.getByTestId('outline-star')).toBeInTheDocument();
        })

    });
});
