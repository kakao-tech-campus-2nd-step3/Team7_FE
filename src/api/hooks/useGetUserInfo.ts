import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { fetchInstance } from '../instance';
import { UserInfoData } from '@/types';

export const getUserInfoPath = () => `/users/info`;

interface ApiErrorResponse {
  message: string;
  code: string;
  status: number;
}

interface QueryOptions {
  retry?: boolean | number;
  enabled?: boolean;
  onError?: (error: AxiosError<ApiErrorResponse>) => void;
}

export const getUserInfo = async () => {
  try {
    const response = await fetchInstance.get<UserInfoData>(getUserInfoPath(), {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error('Failed to fetch user info:', error);
    throw error;
  }
};

export const useGetUserInfo = (options: QueryOptions = {}) => {
  return useQuery<UserInfoData, AxiosError<ApiErrorResponse>>({
    queryKey: ['UserInfo'],
    queryFn: () => getUserInfo(),
    retry: false,
    ...options,
  });
};
