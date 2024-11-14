import { useSuspenseQuery } from '@tanstack/react-query';
import { fetchInstance } from '../instance';
import { UserInfoData } from '@/types';

export const getUserInfoPath = () => `/users/info`;
export const getUserInfo = async () => {
  try {
    const response = await fetchInstance.get<UserInfoData>(getUserInfoPath(), {
      withCredentials: true,
    });

    const contentType = response.headers['content-type'];
    console.log('[UserInfo] Response type:', contentType);

    if (contentType?.includes('text/html')) {
      console.log('[UserInfo] Received HTML instead of JSON, throwing error');
      throw new Error('Authentication required');
    }
    return response.data;
  } catch (error) {
    console.error('Failed to fetch user info:', error);
    throw error;
  }
};
export const useGetUserInfo = (options = {}) => {
  return useSuspenseQuery({ queryKey: ['UserInfo'], queryFn: () => getUserInfo(), retry: false, ...options });
};
