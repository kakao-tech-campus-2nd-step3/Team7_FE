import { ReactElement, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { AxiosError } from 'axios';
import useAuth from '@/hooks/useAuth';
import LoginModal from '@/components/common/modals/LoginModal';
import { useGetUserInfo } from '@/api/hooks/useGetUserInfo';

interface ApiErrorResponse {
  message: string;
  code: string;
  status: number;
}

type PrivateRouteProps = {
  children: ReactElement;
};

export default function PrivateRoute({ children }: PrivateRouteProps) {
  const [shouldShowModal, setShouldShowModal] = useState(false);
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const directRedirectPaths = ['/choice', '/auth'];
  const isProtectedPath = directRedirectPaths.includes(location.pathname);

  console.log('[PrivateRoute] Current state:', {
    path: location.pathname,
    isAuthenticated,
  });

  const { data: userInfo, isLoading } = useGetUserInfo({
    retry: false,
    onError: (error: AxiosError<ApiErrorResponse>) => {
      console.error('사용자 정보 요청 실패:', error);
      const contentType = error.response?.headers?.['content-type'];
      const isHtmlResponse = contentType?.includes('text/html');

      if (isHtmlResponse || error.response?.status === 401) {
        if (isProtectedPath) {
          console.log('[PrivateRoute] Protected path with API error, redirecting to home');
          navigate('/', { replace: true });
        } else {
          setShouldShowModal(true);
        }
      }
    },
  });

  useEffect(() => {
    if (isProtectedPath && !isAuthenticated && !isLoading && !userInfo?.nickname) {
      navigate('/', { replace: true });
    }
  }, [isProtectedPath, isAuthenticated, userInfo, isLoading, navigate]);

  const handleCloseModal = () => {
    if (window.history.length > 2) {
      navigate(-1);
    } else {
      navigate('/');
    }
  };

  const handleModalSuccess = () => {
    setShouldShowModal(false);
  };

  if (isLoading) return null;

  if (shouldShowModal) {
    return (
      <LoginModal
        currentPath={location.pathname}
        immediateOpen
        onClose={handleCloseModal}
        onLoginSuccess={handleModalSuccess}
      />
    );
  }

  if (userInfo?.nickname || isAuthenticated) {
    return children;
  }

  return null;
}
