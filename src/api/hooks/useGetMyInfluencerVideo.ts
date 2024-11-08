import { useSuspenseQuery } from '@tanstack/react-query';

import { fetchInstance } from '../instance';
import { PageableData } from '@/types';

export const getMyInfluencerVideoPath = () => `/videos/my`;

export const getMyInfluencerVideo = async () => {
  const response = await fetchInstance.get<PageableData>(getMyInfluencerVideoPath());
  return response.data;
};
export const useGetMyInfluencerVideo = () => {
  return useSuspenseQuery({
    queryKey: ['myInfluencerVideo'],
    queryFn: getMyInfluencerVideo,
    staleTime: 1000 * 60 * 5,
  });
};
