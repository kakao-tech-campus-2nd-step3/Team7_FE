import { ReactElement, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { AxiosError, isAxiosError } from 'axios';
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

type AxiosErrorWithResponse = AxiosError<ApiErrorResponse> & {
  response: NonNullable<AxiosError<ApiErrorResponse>['response']>;
};

const isAuthorizationError = (error: unknown): error is AxiosErrorWithResponse => {
  if (!isAxiosError(error)) return false;
  if (!error.response) return false;

  return (
    error.response.status === 401 && error.response.data !== undefined && typeof error.response.data.code === 'string'
  );
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
    enabled: true,
    onError: (error: unknown) => {
      if (isAuthorizationError(error)) {
        // 이제 error.response는 항상 존재함이 보장됨
        console.log('[PrivateRoute] Unauthorized access:', error.response.data.message);
        if (isProtectedPath) {
          navigate('/', { replace: true });
        } else {
          setShouldShowModal(true);
        }
        return;
      }
      console.error('사용자 정보 요청 실패:', error);
      if (isProtectedPath) {
        navigate('/', { replace: true });
      } else {
        setShouldShowModal(true);
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

  if (shouldShowModal && !isAuthenticated) {
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
