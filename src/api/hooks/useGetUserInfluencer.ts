import { useSuspenseQuery } from '@tanstack/react-query';
import { fetchInstance } from '../instance';
import { InfluencerResponse } from '@/types';

export const getUserInfluencerPath = () => `/users/influencers`;
export const getUserInfluencer = async () => {
  const response = await fetchInstance.get<InfluencerResponse>(getUserInfluencerPath());
  return response.data;
};
export const useGetUserInfluencer = () => {
  return useSuspenseQuery({ queryKey: ['UserInfluencer'], queryFn: () => getUserInfluencer() });
};
