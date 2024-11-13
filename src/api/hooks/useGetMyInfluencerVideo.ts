import { useQuery } from '@tanstack/react-query';

import { fetchInstance } from '../instance';
import { PageableData, SpotData } from '@/types';

export const getMyInfluencerVideoPath = () => `/videos/my`;

export const getMyInfluencerVideo = async () => {
  const response = await fetchInstance.get<PageableData<SpotData>>(getMyInfluencerVideoPath());
  return response.data;
};
export const useGetMyInfluencerVideo = (enabled: boolean) => {
  return useQuery({
    queryKey: ['myInfluencerVideo'],
    queryFn: getMyInfluencerVideo,
    staleTime: 1000 * 60 * 5,
    enabled,
  });
};
