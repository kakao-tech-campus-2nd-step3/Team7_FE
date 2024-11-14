import { createContext, useCallback, useEffect, useMemo, useState } from 'react';
import { getRefreshToken } from '@/api/hooks/useGetRefreshToken';

type AuthInfo = {
  isAuthenticated: boolean;
  handleLoginSuccess: (userNickname: string) => Promise<void>;
  logout: () => void;
};

export const AuthContext = createContext<AuthInfo | undefined>(undefined);

interface AuthProviderProps {
  children: React.ReactNode;
}

const ACCESS_TOKEN_REFRESH_INTERVAL = 9 * 60 * 1000;

export default function AuthProvider({ children }: AuthProviderProps) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  const logout = useCallback(() => {
    try {
      setIsAuthenticated(false);
      localStorage.removeItem('isAuthenticated');
      localStorage.removeItem('nickname');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  }, []);

  const refreshTokenRegularly = useCallback(async () => {
    try {
      await getRefreshToken();
      setTimeout(refreshTokenRegularly, ACCESS_TOKEN_REFRESH_INTERVAL);
    } catch (error) {
      console.error('Token Refresh failed:', error);
      logout();
    }
  }, [logout]);

  const handleLoginSuccess = useCallback(async (userNickname: string) => {
    try {
      setIsAuthenticated(true);
      localStorage.setItem('nickname', userNickname);
      localStorage.setItem('isAuthenticated', 'true');

      return await Promise.resolve();
    } catch (error) {
      console.error('Login success handling failed:', error);
      return await Promise.reject(error);
    }
  }, []);

  useEffect(() => {
    if (!isAuthenticated) return () => {};

    const timer = setTimeout(refreshTokenRegularly, ACCESS_TOKEN_REFRESH_INTERVAL);
    return () => clearTimeout(timer);
  }, [refreshTokenRegularly, isAuthenticated]);

  useEffect(() => {
    const savedAuthStatus = localStorage.getItem('isAuthenticated');
    const isAuth = savedAuthStatus === 'true';
    setIsAuthenticated(isAuth);
  }, []);

  const value = useMemo(
    () => ({
      isAuthenticated,
      handleLoginSuccess,
      logout,
    }),
    [isAuthenticated, handleLoginSuccess, logout],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
