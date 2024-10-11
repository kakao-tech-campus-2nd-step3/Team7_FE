import { useSuspenseQuery } from '@tanstack/react-query';
import { fetchInstance } from '../instance';
import { UserPlaceResponse } from '@/types';

export const getUserPlacePath = () => `/users/places`;
export const getUserPlace = async () => {
  const response = await fetchInstance.get<UserPlaceResponse>(getUserPlacePath());
  return response.data;
};
export const useGetUserPlace = () => {
  return useSuspenseQuery({ queryKey: ['UserPlace'], queryFn: () => getUserPlace() });
};
