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
  const [isInitialized, setIsInitialized] = useState<boolean>(false);

  const logout = useCallback(() => {
    setIsAuthenticated(false);
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('nickname');
  }, []);

  const refreshTokenRegularly = useCallback(async () => {
    try {
      await getRefreshToken();
      setTimeout(refreshTokenRegularly, ACCESS_TOKEN_REFRESH_INTERVAL);
    } catch (error) {
      console.error('Token refresh failed:', error);
      logout();
    }
  }, [logout]);

  const handleLoginSuccess = useCallback(async (userNickname: string) => {
    setIsAuthenticated(true);
    localStorage.setItem('nickname', userNickname);
    localStorage.setItem('isAuthenticated', 'true');
  }, []);

  useEffect(() => {
    const savedAuthStatus = localStorage.getItem('isAuthenticated') === 'true';
    setIsAuthenticated(savedAuthStatus);
    setIsInitialized(true);

    if (savedAuthStatus) {
      const timer = setTimeout(refreshTokenRegularly, ACCESS_TOKEN_REFRESH_INTERVAL);
      return () => clearTimeout(timer);
    }
    return undefined;
  }, [refreshTokenRegularly]);

  const value = useMemo(
    () => (isInitialized ? { isAuthenticated, handleLoginSuccess, logout } : undefined),
    [isInitialized, isAuthenticated, handleLoginSuccess, logout],
  );

  return <AuthContext.Provider value={value}>{isInitialized && children}</AuthContext.Provider>;
}
