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
      localStorage.removeItem('isAuthenticated');
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
