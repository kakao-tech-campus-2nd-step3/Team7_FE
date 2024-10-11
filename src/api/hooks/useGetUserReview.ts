import { useSuspenseQuery } from '@tanstack/react-query';
import { fetchInstance } from '../instance';
import { UserReviewResponse } from '@/types';

export const getUserReviewPath = () => `/users/reviews?page=0`;
export const getUserReview = async () => {
  const response = await fetchInstance.get<UserReviewResponse>(getUserReviewPath());
  return response.data;
};
export const useGetUserReview = () => {
  return useSuspenseQuery({ queryKey: ['UserReview'], queryFn: () => getUserReview() });
};
