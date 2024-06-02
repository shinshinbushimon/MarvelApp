import React from 'react';
import { render, screen } from '@testing-library/react';
import { RecoilRoot } from 'recoil';
import { ComicsDetail } from './ComicsDetail';
import { AllScrollData } from "RecoilAtom";
import * as customHooks from 'customHooks';

// customHooksのモック化
jest.mock('customHooks', () => ({
  createImg: jest.fn().mockReturnValue('path/to/image.jpg')
}));

// Recoilの初期状態を設定
const initializeState = ({ set }) => {
  set(AllScrollData, {
    comics: [
      {
        title: "Example Comic",
        thumbnail: { path: 'path/to/thumbnail', extension: 'jpg' },
        prices: [
          { type: 'printPrice', price: 19.99 },
          { type: 'digitalPurchasePrice', price: 14.99 }
        ],
        characters: {
          items: [
            { name: "Character One" },
            { name: "Character Two" }
          ]
        }
      }
    ]
  });
};

describe('ComicsDetail Component', () => {
  it('renders comic details correctly', () => {
    render(
      <RecoilRoot initializeState={initializeState}>
        <ComicsDetail />
      </RecoilRoot>
    );

    expect(screen.getByText('Example Comic')).toBeInTheDocument();
    expect(screen.getByText('Character One')).toBeInTheDocument();
    expect(screen.getByText('Character Two')).toBeInTheDocument();
    expect((screen.getByAltText('Comic Thumbnail') as HTMLImageElement).src).toContain('path/to/image.jpg');
    expect(screen.getByText('通常価格: $19.99')).toBeInTheDocument();
    expect(screen.getByText('デジタル価格: $14.99')).toBeInTheDocument();
  });
});
