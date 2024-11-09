import { useQueries } from '@tanstack/react-query';

import { fetchInstance } from '../instance';
import { PageableData } from '@/types';

export const getCoolVideoPath = () => `/videos/cool`;
export const getNewVideoPath = () => `/videos/new`;

export const getCoolVideo = async () => {
  const response = await fetchInstance.get<PageableData>(getCoolVideoPath());
  return response.data;
};
export const getNewVideo = async () => {
  const response = await fetchInstance.get<PageableData>(getNewVideoPath());
  return response.data;
};
export const useGetLogoutVideo = () => {
  return useSuspenseQueries({
    queries: [
      { queryKey: ['coolVideo'], queryFn: getCoolVideo, staleTime: 1000 * 60 * 5 },
      { queryKey: ['newVideo'], queryFn: getNewVideo, staleTime: 1000 * 60 * 5 },
export const useGetLogoutVideo = (enabled: boolean) => {
  return useQueries({
    queries: [
      { queryKey: ['coolVideo'], queryFn: getCoolVideo, staleTime: 1000 * 60 * 5, enabled },
      { queryKey: ['newVideo'], queryFn: getNewVideo, staleTime: 1000 * 60 * 5, enabled },
    ],
  });
};
