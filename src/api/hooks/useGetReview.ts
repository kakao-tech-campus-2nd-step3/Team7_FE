import { useSuspenseQuery } from '@tanstack/react-query';
import { fetchInstance } from '../instance';
import { ReviewData } from '@/types';

export const getReviewPath = (id: string) => `/places/${id}/reviews&page`;
export const getReview = async (id: string) => {
  const response = await fetchInstance.get<ReviewData[]>(getReviewPath(id));
  return response.data;
};
export const useGetReview = (id: string) => {
  return useSuspenseQuery({ queryKey: ['review', id], queryFn: () => getReview(id) });
};
