import { useSuspenseQuery } from '@tanstack/react-query';
import { fetchInstance } from '../instance';
import { UserInfoData } from '@/types';

export const getUserInfoPath = () => `/users/info`;
export const getUserInfo = async () => {
  try {
    const response = await fetchInstance.get<UserInfoData>(getUserInfoPath(), { withCredentials: true });
    return response.data;
  } catch (error) {
    console.error('Failed to fetch user info:', error);
    return null;
  }
};
export const useGetUserInfo = (options = {}) => {
  return useSuspenseQuery({ queryKey: ['UserInfo'], queryFn: () => getUserInfo(), retry: false, ...options });
};
