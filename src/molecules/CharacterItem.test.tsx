import React from 'react';
import { render, screen } from '@testing-library/react';
import { CharacterItem } from './CharacterItem';
import { createImg } from 'customHooks';

jest.mock('customHooks', () => ({
  createImg: jest.fn().mockReturnValue('mocked-image-url')
}));

describe('CharacterItem Component', () => {
  const characterProps = {
    name: "Test Character",
    thumbnail: {
      path: 'path/to/image',
      extension: 'jpg'
    }
  };

  beforeEach(() => {
    render(
        <CharacterItem {...characterProps} />
    );
  });

  it('正しい画像と名前が表示されること', () => {
    expect(createImg).toHaveBeenCalledWith(characterProps.thumbnail);
    expect(screen.getByAltText(characterProps.name)).toBeInTheDocument();
    expect(screen.getByAltText(characterProps.name)).toHaveAttribute('src', 'mocked-image-url');
    expect(screen.getByText(characterProps.name)).toBeInTheDocument();
  });

  it('適切なスタイルが充てられていること', () => {
    const nameContainer = screen.getByText(characterProps.name);
    expect(nameContainer).toHaveStyle('color: #333');
    expect(nameContainer).toHaveStyle('text-align: center');
    expect(nameContainer).toHaveStyle('font-weight: bold');
  });

});
