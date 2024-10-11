import { useSuspenseQueries } from '@tanstack/react-query';

import { fetchInstance } from '../instance';
import { PlaceInfo, ReviewData } from '@/types';

export const getPlaceInfoPath = (id: string) => `/place/${id}`;
export const getReviewPath = (id: string) => `/places/${id}/reviews&page`;

export const getPlaceInfo = async (id: string) => {
  const response = await fetchInstance.get<PlaceInfo>(getPlaceInfoPath(id));
  return response.data;
};
export const getReview = async (id: string) => {
  const response = await fetchInstance.get<ReviewData[]>(getReviewPath(id));
  return response.data;
};
export const useGetDetail = (id: string) => {
  return useSuspenseQueries({
    queries: [
      { queryKey: ['placeInfo', id], queryFn: () => getPlaceInfo(id) },
      { queryKey: ['review', id], queryFn: () => getReview(id) },
    ],
  });
};
