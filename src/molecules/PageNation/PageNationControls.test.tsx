import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BasicPagination } from './PagenationControls';
import { RecoilRoot } from 'recoil';
import { currentPage, totalDataCountState } from 'RecoilAtom';

describe('BasicPagination Component', () => {
  // test環境でのRecoil設定
  const initializeState = ({ set }) => {
    set(currentPage, 1);  // 現在のページ
    set(totalDataCountState, 100);  // 総データ数
  };

  it('ページネーションのレンダリングと画面遷移', () => {
    render(
      <RecoilRoot initializeState={initializeState}>
        <BasicPagination />
      </RecoilRoot>
    );

    // 最初のページが表示されていることを確認
    expect(screen.getByText("1")).toBeInTheDocument();

    // ページネーションの2ページ目をクリック
    fireEvent.click(screen.getByText("2"));
    // onChangeハンドラが呼ばれ、ページが変更されることを確認する
    // 実際のAPI呼び出しやデータフェッチロジックのモックが必要になる場合がある
  });

  it('ローティング画面の表示', () => {
    render(
      <RecoilRoot initializeState={({ set }) => set(totalDataCountState, undefined)}>
        <BasicPagination />
      </RecoilRoot>
    );
    // ローディングテキストが表示されているかを確認
    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });
});
