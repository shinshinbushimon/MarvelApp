import React from 'react';
import { render, screen } from '@testing-library/react';
import { RecoilRoot, MutableSnapshot } from 'recoil';
import { SearchedElements } from './SearchedElements';
import { searchOutput } from "RecoilAtom";

// テスト用のダミーデータ
const characters = [
  { id: '1', name: 'Spider-Man', thumbnail: { path: '', extension: '' } },
  { id: '2', name: 'Iron Man', thumbnail: { path: '', extension: '' } }
];

describe('SearchedElements Component', () => {
  const initializeState = ({ set }) => {
    set(searchOutput, characters);
  };

  it('renders a list of character items when search results are available', () => {
    render(
      <RecoilRoot initializeState={initializeState}>
        <SearchedElements />
      </RecoilRoot>
    );

    expect(screen.getByText('Spider-Man')).toBeInTheDocument();
    expect(screen.getByText('Iron Man')).toBeInTheDocument();
    expect(screen.getAllByRole('link').length).toBe(2);
  });

  it('renders a message when there are no search results', () => {
    render(
      <RecoilRoot initializeState={(snapshot) => snapshot.set(searchOutput, [])}>
        <SearchedElements />
      </RecoilRoot>
    );

    expect(screen.getByText('データが見つかりませんでした。')).toBeInTheDocument();
  });
});
