import { createContext, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

type AuthInfo = {
  isAuthenticated: boolean;
  nickname: string | null;
  handleLoginSuccess: (nickname: string) => Promise<void>;
  logout: () => void;
};

export const AuthContext = createContext<AuthInfo | undefined>(undefined);

interface AuthProviderProps {
  children: React.ReactNode;
}

export default function AuthProvider({ children }: AuthProviderProps) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [nickname, setNickname] = useState<string | null>(localStorage.getItem('nickname'));
  const navigate = useNavigate();

  const handleLoginSuccess = async (userNickname: string) => {
    try {
      setNickname(nickname);
      setIsAuthenticated(true);
      localStorage.setItem('nickname', userNickname);
      localStorage.setItem('isAuthenticated', 'true');
      return await Promise.resolve();
    } catch (error) {
      console.error('Login success handling failed:', error);
      return await Promise.reject(error);
    }
  };

  useEffect(() => {
    const savedAuthStatus = localStorage.getItem('isAuthenticated');
    setIsAuthenticated(savedAuthStatus === 'true');
  }, []);

  const logout = () => {
    try {
      setIsAuthenticated(false);
      setNickname(null);
      localStorage.removeItem('isAuthenticated');
      localStorage.removeItem('nickname');
      navigate('/');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const value = useMemo(
    () => ({
      isAuthenticated,
      nickname,
      handleLoginSuccess,
      logout,
    }),
    [isAuthenticated, nickname],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
