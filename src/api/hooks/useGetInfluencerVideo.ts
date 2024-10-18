import { useSuspenseQuery } from '@tanstack/react-query';

import { fetchInstance } from '../instance';
import { SpotData } from '@/types';

export const getInfluencerVideoPath = () => `/videos/my`;

export const getInfluencerVideo = async () => {
  const response = await fetchInstance.get<SpotData[]>(getInfluencerVideoPath());
  return response.data;
};

export const useGetInfluencerVideo = () => {
  return useSuspenseQuery({
    queryKey: ['InfluencerVideo'],
    queryFn: () => getInfluencerVideo(),
  });
};
