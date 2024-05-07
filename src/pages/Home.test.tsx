import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { SignUpPage, LoginPage } from './Home';  // コンポーネントファイルのパスを指定
import { RecoilRoot } from 'recoil';
import { MemoryRouter, Route, Routes, useNavigate } from 'react-router-dom';
import * as customHooks from 'customHooks';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(() => jest.fn()),  // `useNavigate`をモック関数として返す
}));

jest.mock('customHooks', () => ({
  useInputValidation: jest.fn(() => ({
    value: '',
    handleChange: jest.fn(),
    error: ''
  })),
  useVerifyEnteredData: jest.fn(() => ({
    verifyData: jest.fn().mockResolvedValue(true),  // `verifyData`は解決されたPromiseを返す
    isLoading: false
  }))
}));

const mockedUseNavigate = jest.mocked(useNavigate);

describe('SignUpPage and LoginPage', () => {
  beforeEach(() => {
    mockedUseNavigate.mockClear();
  });

  it('should handle user registration', async () => {
    render(
      <RecoilRoot>
        <MemoryRouter initialEntries={['/signup']}>
          <Routes>
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/character" element={<h1>Character Page</h1>} />
          </Routes>
        </MemoryRouter>
      </RecoilRoot>
    );

    const button = screen.getByRole('button', { name: 'Sign Up' });
    fireEvent.click(button);

    await waitFor(() => {
      expect(mockedUseNavigate()).toHaveBeenCalledWith('/character');
    });
  });

  it('should handle user login', async () => {
    render(
      <RecoilRoot>
        <MemoryRouter initialEntries={['/login']}>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/character" element={<h1>Character Page</h1>} />
          </Routes>
        </MemoryRouter>
      </RecoilRoot>
    );

    const button = screen.getByRole('button', { name: 'Log In' });
    fireEvent.click(button);

    await waitFor(() => {
      expect(mockedUseNavigate()).toHaveBeenCalledWith('/character');
    });
  });
});
