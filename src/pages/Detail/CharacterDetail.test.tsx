import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import { CharacterDetail } from './CharacterDetail';
import * as customHooks from 'customHooks';
import { targetCharacterId, targetCharacter } from "RecoilAtom";

// customHooksとRecoilの状態をモック化
jest.mock('customHooks', () => ({
  useDetailSearch: jest.fn(() => false)
}));
const mockedUseDetailSearch = jest.mocked(customHooks.useDetailSearch);

describe('CharacterDetail Component', () => {
  const initializeState = ({ set }) => {
    set(targetCharacterId, 1);
    set(targetCharacter, {
      name: 'Spider-Man',
      thumbnail: { path: 'path/to/spiderman', extension: 'jpg' },
      modified: new Date(),
      description: 'Heroic Spider-Man',
      resourceURI: 'http://example.com/more',
      urls: [{ type: 'detail', url: 'http://example.com/detail' }]
    });
  };

  it('renders character details when data is loaded', async () => {
    mockedUseDetailSearch.mockReturnValue(false); // Loading is done

    render(
      <MemoryRouter>
        <RecoilRoot initializeState={initializeState}>
          <CharacterDetail />
        </RecoilRoot>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('Spider-Man')).toBeInTheDocument();
      expect(screen.getByText('Heroic Spider-Man')).toBeInTheDocument();
      expect(screen.getByText('More Details')).toBeInTheDocument();
      expect(screen.getByRole('link', { name: 'detail' })).toHaveAttribute('href', 'http://example.com/detail');
    });
  });

  it('renders loading when data is being fetched', () => {
    mockedUseDetailSearch.mockReturnValue(true); // Loading is true

    render(
      <MemoryRouter>
        <RecoilRoot initializeState={initializeState}>
          <CharacterDetail />
        </RecoilRoot>
      </MemoryRouter>
    );

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('navigates back to character list', () => {
    mockedUseDetailSearch.mockReturnValue(false); // Loading is done

    render(
      <MemoryRouter>
        <RecoilRoot initializeState={initializeState}>
          <CharacterDetail />
        </RecoilRoot>
      </MemoryRouter>
    );

    const backButton = screen.getByText('リストへ戻る');
    backButton.click();
    // Navigation assertion here
  });
});
