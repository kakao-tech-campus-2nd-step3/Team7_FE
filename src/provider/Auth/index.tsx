import { createContext, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchInstance } from '@/api/instance';

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

  const checkAuthStatus = async () => {
    try {
      const response = await fetchInstance.get('/auth');
      console.log('Auth check response status:', response.status);
      setIsAuthenticated(response.status === 200);
      return response.status === 200;
    } catch (error) {
      console.error('Auth check failed:', error);
      setIsAuthenticated(false);
      return false;
    }
  };

  const refreshTokens = async () => {
    try {
      const response = await fetchInstance.get('/refresh-token', {
        headers: {
          Authorization: document.cookie,
        },
      });
      return response.status === 200;
    } catch (error) {
      console.error('Token refresh failed:', error);
      return false;
    }
  };

  useEffect(() => {
    checkAuthStatus();
  }, []);

  useEffect(() => {
    const redirectPath = localStorage.getItem('redirectPath');
    if (isAuthenticated && redirectPath) {
      localStorage.removeItem('redirectPath');
      navigate(redirectPath);
    }
  }, [isAuthenticated, navigate]);

  const handleLoginSuccess = async () => {
    try {
      const isSuccessful = await checkAuthStatus();
      if (isSuccessful) {
        return await Promise.resolve();
      }
      return await Promise.reject(new Error('Authentication failed'));
    } catch (error) {
      console.error('Login success handling failed:', error);
      return await Promise.reject(error);
    }
  };

  const logout = () => {
    try {
      setIsAuthenticated(false);
      navigate('/');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  useEffect(() => {
    const interceptor = fetchInstance.interceptors.response.use(
      (response) => response,
      async (error) => {
        if (error.response?.status === 401) {
          const isRefreshed = await refreshTokens();
          if (isRefreshed) {
            return fetchInstance(error.config);
          }
          logout();
        }
        return Promise.reject(error);
      },
    );

    return () => {
      fetchInstance.interceptors.response.eject(interceptor);
    };
  }, []);

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
