import { render, screen, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider, UseQueryResult } from '@tanstack/react-query';
import { MemoryRouter } from 'react-router-dom';
import { AuthContext } from '@/provider/Auth';
import MainPage from '@/pages/Main';
import * as locationHook from '@/hooks/useGetLocation';
import * as api from '@/api/hooks/useGetAroundVideo';
import { useGetAroundVideo } from '@/api/hooks/useGetAroundVideo';
import { PageableData } from '@/types';

jest.mock('@/api/hooks/useGetAroundVideo');
jest.mock('@/hooks/useGetLocation');
const queryClient = new QueryClient();

test('사용자 위치 기반 내주변 비디오 호출 확인', async () => {
  const mockLocation = { lat: 37.5665, lng: 126.978 };
  jest.spyOn(locationHook, 'default').mockReturnValue(mockLocation);

  (useGetAroundVideo as jest.Mock).mockReturnValue({
    data: {
      totalPages: 0,
      totalElements: 0,
      size: 0,
      number: 0,
      sort: {
        empty: true,
        sorted: true,
        unsorted: true,
      },
      numberOfElements: 0,
      pageable: {
        offset: 0,
        sort: {
          empty: true,
          sorted: true,
          unsorted: true,
        },
        paged: true,
        pageNumber: 0,
        pageSize: 0,
        unpaged: true,
      },
      first: true,
      last: true,
      empty: true,
      content: [
        {
          videoId: 1,
          videoAlias: 'Test Video',
          videoUrl: 'https://example.com',
          place: {
            placeId: 0,
            placeName: '',
          },
        },
      ],
    } as PageableData,
    isLoading: false,
    error: null,
    isError: false,
    isSuccess: true,
    refetch: jest.fn(),
  } as Partial<UseQueryResult<PageableData, Error>>);

  render(
    <AuthContext.Provider
      value={{
        accessToken: 'mock-access-token',
        refreshToken: 'mock-refresh-token',
        tokensRefresh: jest.fn(),
        logout: jest.fn(),
      }}
    >
      <MemoryRouter future={{ v7_relativeSplatPath: true }}>
        <QueryClientProvider client={queryClient}>
          <MainPage />
        </QueryClientProvider>
      </MemoryRouter>
    </AuthContext.Provider>,
  );

  await waitFor(() => {
    expect(screen.getByText('주변')).toBeInTheDocument();
    expect(screen.getByText('Test Video')).toBeInTheDocument();
  });

  expect(api.useGetAroundVideo).toHaveBeenCalledWith(mockLocation.lat, mockLocation.lng, true);
});
