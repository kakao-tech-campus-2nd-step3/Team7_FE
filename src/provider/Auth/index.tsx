import { createContext, useCallback, useEffect, useMemo, useState } from 'react';
import { getRefreshToken } from '@/api/hooks/useGetRefreshToken';
import { useDeleteToken } from '@/api/hooks/useDeleteToken';
import { useDeleteDB } from '@/api/hooks/useDeleteDB';

type AuthInfo = {
  isAuthenticated: boolean;
  handleLoginSuccess: (userNickname: string) => Promise<void>;
  handleLogout: () => void;
};

export const AuthContext = createContext<AuthInfo | undefined>(undefined);

interface AuthProviderProps {
  children: React.ReactNode;
}

const ACCESS_TOKEN_REFRESH_INTERVAL = 9 * 60 * 1000;

export default function AuthProvider({ children }: AuthProviderProps) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isInitialized, setIsInitialized] = useState<boolean>(false);
  const { mutate: logout } = useDeleteToken();
  const { mutate: delDB } = useDeleteDB();

  const handleLogout = useCallback(() => {
    logout();
    delDB();
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
  }, [handleLogout]);

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
    () => (isInitialized ? { isAuthenticated, handleLoginSuccess, handleLogout } : undefined),
    [isInitialized, isAuthenticated, handleLoginSuccess, handleLogout],
  );

  return <AuthContext.Provider value={value}>{isInitialized && children}</AuthContext.Provider>;
}
