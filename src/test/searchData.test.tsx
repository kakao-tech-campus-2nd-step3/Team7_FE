import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { MemoryRouter } from 'react-router-dom';
import * as api from '@/api/hooks/useGetSearchData';
import * as completeApi from '@/api/hooks/useGetSearchComplete';
import SearchPage from '@/pages/Search';
import { AuthContext } from '@/provider/Auth';
import * as influencerApi from '@/api/hooks/useGetAllInfluencers';

jest.mock('@/api/hooks/useGetSearchComplete');
(completeApi.useGetSearchComplete as jest.Mock).mockReturnValue({
  data: [
    { result: 'Example 1', score: 0, searchType: 'Type1' },
    { result: 'Example 2', score: 0, searchType: 'Type2' },
  ],
});
jest.mock('@/api/hooks/useGetSearchData', () => {
  return {
    ...jest.requireActual('@/api/hooks/useGetSearchData'),
    useGetSearchData: jest.fn(),
  };
});
(api.useGetSearchData as jest.Mock).mockImplementation(() => [
  {
    data: [{ influencerId: 1, influencerName: 'Test Influencer', influencerImgUrl: '', influencerJob: 'Test Infl2' }],
    isLoading: false,
    isError: false,
  },
  {
    data: [
      {
        videoId: 1,
        videoAlias: '풍자 이(가) Video',
        videoUrl: '',
        place: {
          placeId: 1,
          placeName: '풍쟈',
        },
      },
    ],
    isLoading: false,
    isError: false,
  },
  { data: [{ placeId: 1, placeName: '풍자또가', imageUrl: '', likes: true }], isLoading: false, isError: false },
]);

jest.mock('@/api/hooks/useGetAllInfluencers');
(influencerApi.useGetAllInfluencers as jest.Mock).mockReturnValue({
  data: {
    totalElement: 2,
    content: [
      {
        influencerId: 1,
        influencerName: '성시경',
        influencerImgUrl: 'https://via.placeholder.com/100',
        influencerJob: '모델',
        likes: true,
      },
      {
        influencerId: 2,
        influencerName: '풍자',
        influencerImgUrl: 'https://via.placeholder.com/100',
        influencerJob: '배우',
        likes: false,
      },
    ],
  },
});
const queryClient = new QueryClient();

test('특정 키워드 검색 시 검색 결과가 잘 나오는 지 확인', async () => {
  render(
    <AuthContext.Provider
      value={{
        isAuthenticated: false,
        handleLoginSuccess: jest.fn(),
        logout: jest.fn(),
      }}
    >
      <MemoryRouter future={{ v7_relativeSplatPath: true }}>
        <QueryClientProvider client={queryClient}>
          <SearchPage />
        </QueryClientProvider>
      </MemoryRouter>
      ,
    </AuthContext.Provider>,
  );
  const searchInput = screen.getByPlaceholderText('인플루언서, 장소를 검색해주세요!');
  fireEvent.change(searchInput, { target: { value: '풍자' } });
  fireEvent.keyDown(searchInput, { key: 'Enter', code: 'Enter' });

  await waitFor(() => {
    expect(screen.getByText('검색 결과')).toBeInTheDocument();
  });

  await waitFor(() => {
    expect(screen.getByText('Test Influencer')).toBeInTheDocument();
  });
});
