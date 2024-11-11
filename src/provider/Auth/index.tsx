import { createContext, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

type AuthInfo = {
  isAuthenticated: boolean;
  handleLoginSuccess: () => Promise<void>;
  logout: () => void;
};

export const AuthContext = createContext<AuthInfo | undefined>(undefined);

interface AuthProviderProps {
  children: React.ReactNode;
}

export default function AuthProvider({ children }: AuthProviderProps) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleLoginSuccess = async () => {
    try {
      console.log('handleLoginSuccess 실행됨');
      setIsAuthenticated(true);
      console.log('인증 상태 변경됨:', true);
      return await Promise.resolve();
    } catch (error) {
      console.error('Login success handling failed:', error);
      return await Promise.reject(error);
    }
  };

  useEffect(() => {
    const handleAuth = async () => {
      console.log('handleAuth 실행됨');
      console.log('현재 경로:', window.location.pathname);
      console.log('현재 전체 URL:', window.location.href);
      if (window.location.pathname.includes('/auth')) {
        console.log('auth 경로 감지, 로그인 처리 시작');
        try {
          console.log('entering handleAuth');
          await handleLoginSuccess();
          console.log('Login success handled');
        } catch (error) {
          console.error('Auth handling failed:', error);
        }
      }
    };
    handleAuth();
  }, []);

  const logout = () => {
    try {
      setIsAuthenticated(false);
      navigate('/');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const value = useMemo(
    () => ({
      isAuthenticated,
      handleLoginSuccess,
      logout,
    }),
    [isAuthenticated],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
