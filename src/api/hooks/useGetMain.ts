import { useSuspenseQueries } from '@tanstack/react-query';

import { fetchInstance } from '../instance';
import { InfluencerResponse, PageableData } from '@/types';

export const getBannerPath = () => `/banners`;
export const getInfluencerPath = () => `/influencers`;
export const getCoolVideoPath = () => `/videos/cool`;
export const getNewVideoPath = () => `/videos/new`;

// export const getBanner = async () => {
//   const response = await fetchInstance.get<BannerResponse>(getBannerPath());
//   return response.data;
// };
export const getInfluencer = async () => {
  const response = await fetchInstance.get<InfluencerResponse>(getInfluencerPath());
  return response.data;
};
export const getCoolVideo = async () => {
  const response = await fetchInstance.get<PageableData>(getCoolVideoPath());
  return response.data;
};
export const getNewVideo = async () => {
  const response = await fetchInstance.get<PageableData>(getNewVideoPath());
  return response.data;
};
export const useGetMain = () => {
  return useSuspenseQueries({
    queries: [
      // {
      //   queryKey: ['banners'],
      //   queryFn: getBanner,
      //   staleTime: 1000 * 60 * 5,
      // },
      {
        queryKey: ['influencers'],
        queryFn: getInfluencer,
        staleTime: 1000 * 60 * 5,
      },
      { queryKey: ['coolVideo'], queryFn: getCoolVideo, staleTime: 1000 * 60 * 5 },
      { queryKey: ['newVideo'], queryFn: getNewVideo, staleTime: 1000 * 60 * 5 },
    ],
  });
};
