import React from 'react';
import { render, screen } from '@testing-library/react';
import { RecoilRoot } from 'recoil';
import { EventDetail } from './EventDetail';
import { AllScrollData } from "RecoilAtom";
import * as customHooks from 'customHooks';

// customHooksのモック化
jest.mock('customHooks', () => ({
  createImg: jest.fn(() => 'mocked-image-url')
}));

// テスト用のイベントデータ
const mockEventData = {
  title: "Marvel Universe Event",
  description: "A major event in the Marvel Universe.",
  modified: "2021-04-01",
  start: "2021-05-01",
  end: "2021-06-01",
  thumbnail: { path: "path/to/thumbnail", extension: "jpg" },
  series: { items: [{ name: "Series 1" }, { name: "Series 2" }] },
  characters: { items: [{ name: "Character 1" }, { name: "Character 2" }] },
  creators: { items: [{ name: "Creator 1" }, { name: "Creator 2" }] },
  next: { name: "Next Event" },
  previous: { name: "Previous Event" }
};

const initializeState = ({ set }) => {
  set(AllScrollData, {
    events: [mockEventData]
  });
};

describe('EventDetail Component', () => {
  it('renders event details correctly', () => {
    render(
      <RecoilRoot initializeState={initializeState}>
        <EventDetail />
      </RecoilRoot>
    );

    expect(screen.getByText('Marvel Universe Event')).toBeInTheDocument();
    expect(screen.getByText('A major event in the Marvel Universe.')).toBeInTheDocument();
    expect(screen.getByText('Modified: 4/1/2021')).toBeInTheDocument();
    expect(screen.getByText('Start: 5/1/2021')).toBeInTheDocument();
    expect(screen.getByText('End: 6/1/2021')).toBeInTheDocument();
    expect((screen.getByAltText('Event Thumbnail') as HTMLImageElement).src).toContain('mocked-image-url');
    expect(screen.getByText('Series 1')).toBeInTheDocument();
    expect(screen.getByText('Series 2')).toBeInTheDocument();
    expect(screen.getByText('Character 1')).toBeInTheDocument();
    expect(screen.getByText('Character 2')).toBeInTheDocument();
    expect(screen.getByText('Creator 1')).toBeInTheDocument();
    expect(screen.getByText('Creator 2')).toBeInTheDocument();
    expect(screen.getByText('Next Event: Next Event')).toBeInTheDocument();
    expect(screen.getByText('Previous Event: Previous Event')).toBeInTheDocument();
  });
});
