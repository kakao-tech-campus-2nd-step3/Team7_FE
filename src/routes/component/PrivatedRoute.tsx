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
  const { isAuthenticated, handleLoginSuccess: authLoginSuccess } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  console.log('[PrivateRoute] Current state:', {
    path: location.pathname,
    isAuthenticated,
  });

  const {
    data: userInfo,
    isError: userInfoError,
    isLoading,
  } = useGetUserInfo({
    retry: false,
    onError: (error: AxiosError<ApiErrorResponse>) => {
      console.error('사용자 정보 요청 실패:', error);
      const contentType = error.response?.headers?.['content-type'];
      const isHtmlResponse = contentType?.includes('text/html');

      if (isHtmlResponse || error.response?.status === 401) {
        if (directRedirectPaths.includes(location.pathname)) {
          console.log('[PrivateRoute] Protected path, redirecting to home');
          navigate('/', { replace: true });
        } else {
          setShouldShowModal(true);
        }
      }
    },
  });

  const directRedirectPaths = ['/choice', '/auth'];

  useEffect(() => {
    const processAuth = async () => {
      if (isLoading) return;

      const isProtectedPath = directRedirectPaths.includes(location.pathname);
      const hasValidAuth = isAuthenticated && userInfo?.nickname;

      console.log('[PrivateRoute] Processing auth:', {
        isProtectedPath,
        hasValidAuth,
        hasUserInfo: !!userInfo?.nickname,
      });

      if (isProtectedPath && !hasValidAuth) {
        navigate('/', { replace: true });
        return;
      }

      if (userInfo?.nickname && !isAuthenticated) {
        try {
          await authLoginSuccess(userInfo.nickname);
        } catch (error) {
          console.error('인증 처리 실패:', error);
          if (isProtectedPath) {
            navigate('/', { replace: true });
          } else {
            setShouldShowModal(true);
          }
        }
      }
    };

    processAuth();
  }, [userInfo?.nickname, isAuthenticated, authLoginSuccess, location.pathname, navigate, userInfoError, isLoading]);

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

  if (directRedirectPaths.includes(location.pathname) && (!isAuthenticated || !userInfo?.nickname)) {
    navigate('/');
    return null;
  }

  return children;
}
