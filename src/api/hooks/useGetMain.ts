import { useSuspenseQueries } from '@tanstack/react-query';

import { fetchInstance } from '../instance';
import { InfluencerResponse } from '@/types';

export const getBannerPath = () => `/banners`;
export const getInfluencerPath = () => `/influencers`;

// export const getBanner = async () => {
//   const response = await fetchInstance.get<BannerResponse>(getBannerPath());
//   return response.data;
// };
export const getInfluencer = async () => {
  // await new Promise((resolve) => {
  //   setTimeout(resolve, 5000);
  // });
  const response = await fetchInstance.get<InfluencerResponse>(getInfluencerPath());
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
    ],
  });
};
