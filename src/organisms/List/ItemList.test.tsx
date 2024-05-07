import React from 'react';
import { render, screen } from '@testing-library/react';
import { RecoilRoot, useRecoilValue, useSetRecoilState } from 'recoil';
import { CharacterList } from './ItemList';
import { MarvelApi, currentPage } from "RecoilAtom";

const mockCharacters = [
  { id: '1', name: 'Spider-Man', thumbnail: { path: 'path/to/spiderman', extension: 'jpg' } },
  { id: '2', name: 'Iron Man', thumbnail: { path: 'path/to/ironman', extension: 'jpg' } }
];

describe('CharacterList Component', () => {
  const initializeState = ({ set }) => {
    set(MarvelApi, { '1': mockCharacters });
    set(currentPage, 1);
  };

  it('キャラクター要素の表示', () => {
    render(
      <RecoilRoot initializeState={initializeState}>
        <CharacterList />
      </RecoilRoot>
    );

    expect(screen.getByText('Spider-Man')).toBeInTheDocument();
    expect(screen.getByText('Iron Man')).toBeInTheDocument();
    expect(screen.getAllByRole('link').length).toBe(2);
  });

  it('データが未キャッシュで取得しに行く際に表示する内容', () => {
    render(
      <RecoilRoot initializeState={({ set }) => set(currentPage, 2)}>
        <CharacterList />
      </RecoilRoot>
    );
    expect(screen.getByText('データを取得しています。。。')).toBeInTheDocument();
  });
});
