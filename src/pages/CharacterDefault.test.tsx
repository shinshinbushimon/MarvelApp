import React from 'react';
import { render, screen } from '@testing-library/react';
import { RecoilRoot } from 'recoil';
import { searchOutput, searchValue } from "RecoilAtom";
import { CharacterDefault } from './CharacterDefault';
import * as customHooks from 'customHooks';

// customHooksのモック化
jest.mock('customHooks', () => ({
  useSearchOutput: jest.fn()
}));

let initializeState = ({ set }) => {
  set(searchOutput, []);
  set(searchValue, '');
};

describe('CharacterDefault Component', () => {
  it('renders CharacterList by default when no search results', () => {
    render(
      <RecoilRoot initializeState={initializeState}>
        <CharacterDefault />
      </RecoilRoot>
    );

    // SearchBarとBasicPaginationがレンダリングされることを確認
    expect(screen.getByRole('input')).toBeInTheDocument();
    //expect(screen.getByText(/</i)).toBeInTheDocument(); // BasicPagination内の要素

    // CharacterListがレンダリングされていることを確認
    expect(screen.getByText('character-list')).toBeInTheDocument();
  });

  it('renders SearchedElements when there are search results', () => {
    // 検索結果がある状態をシミュレート
    initializeState = ({ set }) => {
      set(searchOutput, [{ id: 1, name: "Spider-Man" }]);
      set(searchValue, 'Spider');
    };

    render(
      <RecoilRoot initializeState={initializeState}>
        <CharacterDefault />
      </RecoilRoot>
    );

    // SearchedElementsがレンダリングされていることを確認
    expect(screen.getByText('searched-elements')).toBeInTheDocument();
  });
});
