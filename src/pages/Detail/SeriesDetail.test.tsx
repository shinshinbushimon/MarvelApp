import React from 'react';
import { render, screen } from '@testing-library/react';
import { RecoilRoot } from 'recoil';
import { SeriesDetail } from './SeriesDetail';
import { AllScrollData } from "RecoilAtom";
import * as customHooks from 'customHooks';

// customHooksのモック化
jest.mock('customHooks', () => ({
  createImg: jest.fn().mockReturnValue('mocked-image-url')
}));

// テスト用のシリーズデータ
const mockSeriesData = {
  title: "Marvel Series",
  description: "Detailed description of the Marvel series.",
  startYear: 2000,
  endYear: 2020,
  rating: "PG-13",
  modified: "2021-05-01",
  thumbnail: { path: "path/to/thumbnail", extension: "jpg" },
  characters: {
    items: [{ name: "Spider-Man" }, { name: "Iron Man" }]
  },
  creators: {
    items: [{ name: "Stan Lee" }, { name: "Jack Kirby" }]
  }
};

const initializeState = ({ set }) => {
  set(AllScrollData, {
    series: [mockSeriesData]
  });
};

describe('SeriesDetail Component', () => {
  it('renders series details correctly', () => {
    render(
      <RecoilRoot initializeState={initializeState}>
        <SeriesDetail />
      </RecoilRoot>
    );

    expect(screen.getByText('Marvel Series')).toBeInTheDocument();
    expect(screen.getByText('Detailed description of the Marvel series.')).toBeInTheDocument();
    expect(screen.getByText('Start Year: 2000')).toBeInTheDocument();
    expect(screen.getByText('End Year: 2020')).toBeInTheDocument();
    expect(screen.getByText('Rating: PG-13')).toBeInTheDocument();
    expect(screen.getByText('Last Modified: 5/1/2021')).toBeInTheDocument();
    expect((screen.getByAltText('Series Thumbnail') as HTMLImageElement).src).toContain('mocked-image-url');
    expect(screen.getByText('Spider-Man')).toBeInTheDocument();
    expect(screen.getByText('Iron Man')).toBeInTheDocument();
    expect(screen.getByText('Stan Lee')).toBeInTheDocument();
    expect(screen.getByText('Jack Kirby')).toBeInTheDocument();
  });
});
