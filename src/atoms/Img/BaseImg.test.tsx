import React from 'react';
import { render, screen } from '@testing-library/react';
import { BaseImage } from './BaseImg';

describe('BaseImageの表示テスト', () => {
  const src = 'test-image.jpg';
  const alt = 'Test Image';

  it('Imageのレンダリングと属性値が正しいこと', () => {
    render(<BaseImage src={src} alt={alt} />);
    const image = screen.getByRole('img');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', src);
    expect(image).toHaveAttribute('alt', alt);
  });

  it('適切なスタイルが充てられていること', () => {
    render(<BaseImage src={src} alt={alt} />);
    const image = screen.getByRole('img');
    expect(image).toHaveStyle('border-radius: 50%');
    expect(image).toHaveStyle('object-fit: contain');
    expect(image).toHaveStyle('max-width: 100%');
    expect(image).toHaveStyle('max-height: 100%');
  });

});
