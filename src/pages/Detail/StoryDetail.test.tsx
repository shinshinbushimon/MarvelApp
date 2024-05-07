import React from 'react';
import { render, screen } from '@testing-library/react';
import { RecoilRoot } from 'recoil';
import { StoryDetail } from './StoryDetail';
import { AllScrollData } from "RecoilAtom";
import * as customHooks from 'customHooks';

// customHooksのモック化
jest.mock('customHooks', () => ({
  createImg: jest.fn().mockReturnValue('mocked-image-url')
}));

// テスト用のストーリーデータ
const mockStoryData = {
  title: "Marvel Epic Story",
  description: "Detailed description of a Marvel epic story.",
  type: "Main",
  modified: "2022-01-01",
  thumbnail: { path: "path/to/thumbnail", extension: "jpg" },
  characters: {
    items: [{ name: "Hero One" }, { name: "Hero Two" }]
  },
  creators: {
    items: [{ name: "Writer One" }, { name: "Artist Two" }]
  },
  originalissue: { name: "Issue #1" }
};

const initializeState = ({ set }) => {
  set(AllScrollData, {
    stories: [mockStoryData]
  });
};

describe('StoryDetail Component', () => {
  it('renders story details correctly', () => {
    render(
      <RecoilRoot initializeState={initializeState}>
        <StoryDetail index={0} />
      </RecoilRoot>
    );

    expect(screen.getByText('Marvel Epic Story')).toBeInTheDocument();
    expect(screen.getByText('Detailed description of a Marvel epic story.')).toBeInTheDocument();
    expect(screen.getByText('Type: Main')).toBeInTheDocument();
    expect(screen.getByText('Modified: 1/1/2022')).toBeInTheDocument();
    expect((screen.getByAltText('Story Thumbnail') as HTMLImageElement).src).toContain('mocked-image-url');
    expect(screen.getByText('Hero One')).toBeInTheDocument();
    expect(screen.getByText('Hero Two')).toBeInTheDocument();
    expect(screen.getByText('Writer One')).toBeInTheDocument();
    expect(screen.getByText('Artist Two')).toBeInTheDocument();
    expect(screen.getByText('Original Issue: Issue #1')).toBeInTheDocument();
  });
});
