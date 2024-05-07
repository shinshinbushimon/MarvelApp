import React from 'react';
import { render, screen, act } from '@testing-library/react';
import { RecoilRoot } from 'recoil';
import { InfinityScroll } from './InfinityScroll';
import axios from 'axios';
import * as customHooks from 'customHooks';

// axios モックの設定
jest.mock('axios');
const mockedAxios = jest.mocked(axios);

// customHooks のモック設定
jest.mock('customHooks', () => ({
  createImg: jest.fn().mockReturnValue("mock-image-url"),
  createURI: jest.fn().mockReturnValue("/api/data")
}));

describe('InfinityScroll Component', () => {
  const mockIntersectionObserver = jest.fn();
  window.IntersectionObserver = mockIntersectionObserver;

  beforeEach(() => {
    // IntersectionObserverのモックをリセットし、新たなモック実装を設定
    mockIntersectionObserver.mockReset();
    mockIntersectionObserver.mockImplementation((callback, options) => ({
      observe: () => callback([{ isIntersecting: true }]),
      unobserve: () => {},
      disconnect: () => {}
    }));
    // axios のレスポンスをリセットし、新たなモックレスポンスを設定
    mockedAxios.get.mockClear();
  });

  it('loads data on intersection and renders the data', async () => {
    const responseData = {
      data: {
        results: [{ id: '1', title: 'New Character', thumbnail: { path: 'newpath', extension: 'jpg' } }],
        count: 1,
        total: 2
      }
    };
    mockedAxios.get.mockResolvedValue({ data: responseData });

    render(
      <RecoilRoot>
        <InfinityScroll dataType="testType" />
      </RecoilRoot>
    );

    // Intersection Observer トリガー
    await act(async () => {
      mockIntersectionObserver.mock.calls[0][0]([{ isIntersecting: true }]);
    });

    expect(mockedAxios.get).toHaveBeenCalledWith("/api/data");
    expect(screen.getByText('New Character')).toBeInTheDocument();
  });

  it('displays no data available when no results are returned initially', async () => {
    mockedAxios.get.mockResolvedValue({
      data: {
        data: { results: [], count: 0, total: 0 }
      }
    });

    render(
      <RecoilRoot>
        <InfinityScroll dataType="testType" />
      </RecoilRoot>
    );

    // Intersection Observer トリガー
    await act(async () => {
      mockIntersectionObserver.mock.calls[0][0]([{ isIntersecting: true }]);
    });

    expect(screen.getByText('No data available.')).toBeInTheDocument();
  });
});
