import { createContext, useEffect, useMemo, useState } from 'react';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import { fetchInstance } from '@/api/instance';

type AuthInfo = {
  accessToken: string | null;
  refreshToken: string | null;
  tokensRefresh: () => Promise<void>;
  logout: () => void;
};

export const AuthContext = createContext<AuthInfo | undefined>(undefined);

interface AuthProviderProps {
  children: React.ReactNode;
}

export default function AuthProvider({ children }: AuthProviderProps) {
  const [accessToken, setAccessToken] = useState<string | null>(Cookies.get('access_token') || null);
  const [refreshToken, setRefreshToken] = useState<string | null>(Cookies.get('refresh_token') || null);
  const navigate = useNavigate();

  const tokensRefresh = async () => {
    if (!refreshToken) return;

    try {
      const response = await fetchInstance.get('/refresh-token', {
        headers: {
          Cookie: `refresh_token=${refreshToken}`,
        },
      });

      if (response.status === 200) {
        const { accessToken: newAccessToken, refreshToken: newRefreshToken } = response.data;
        setAccessToken(newAccessToken);
        setRefreshToken(newRefreshToken);

        // 브라우저 쿠키에 저장
        Cookies.set('access_token', newAccessToken, { secure: true, sameSite: 'strict' });
        Cookies.set('refresh_token', newRefreshToken, { secure: true, sameSite: 'strict' });
      } else {
        throw new Error('토큰 갱신 실패');
      }
    } catch (error) {
      console.error('토큰 갱신 오류:', error);
      logout();
    }
  };

  const logout = () => {
    Cookies.remove('access_token');
    Cookies.remove('refresh_token');
    setAccessToken(null);
    setRefreshToken(null);
    navigate('/');
  };

  useEffect(() => {
    if (!accessToken && refreshToken) {
      tokensRefresh();
    }
  }, [accessToken, refreshToken]);

  const value = useMemo(
    () => ({
      accessToken,
      refreshToken,
      tokensRefresh,
      logout,
    }),
    [accessToken, refreshToken],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
