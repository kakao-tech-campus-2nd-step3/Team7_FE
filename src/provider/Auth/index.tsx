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
      setIsAuthenticated(true);
      return await Promise.resolve();
    } catch (error) {
      console.error('Login success handling failed:', error);
      return await Promise.reject(error);
    }
  };

  useEffect(() => {
    const handleAuth = async () => {
      if (window.location.pathname.includes('/login/oauth2/code/kakao')) {
        try {
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
