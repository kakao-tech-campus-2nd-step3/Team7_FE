import { useSuspenseQuery } from '@tanstack/react-query';
import { fetchInstance } from '../instance';
import { UserInfoData } from '@/types';

export const getUserInfoPath = () => `/users/info`;
export const getUserInfo = async () => {
  const response = await fetchInstance.get<UserInfoData>(getUserInfoPath());
  return response.data;
};
export const useGetUserInfo = () => {
  return useSuspenseQuery({ queryKey: ['UserInfo'], queryFn: () => getUserInfo() });
};
