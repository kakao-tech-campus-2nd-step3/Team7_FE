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
  const [isProcessingAuth, setIsProcessingAuth] = useState(false);
  const { isAuthenticated, handleLoginSuccess: authLoginSuccess } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const directRedirectPaths = ['/choice', '/auth'];
  const isProtectedPath = directRedirectPaths.includes(location.pathname);

  console.log('[PrivateRoute] Current state:', {
    path: location.pathname,
    isAuthenticated,
    isProcessingAuth,
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
    const processAuth = async () => {
      if (isLoading || isProcessingAuth) return;
      setIsProcessingAuth(true);

      try {
        console.log('[PrivateRoute] Processing auth:', {
          isProtectedPath,
          hasUserInfo: !!userInfo?.nickname,
          isAuthenticated,
        });

        if (userInfo?.nickname) {
          await authLoginSuccess(userInfo.nickname);
          // Promise executor를 수정하여 타입스크립트 오류 해결
          await new Promise<void>((resolve) => {
            setTimeout(() => {
              resolve();
            }, 100);
          });
        }

        const hasValidAuth = isAuthenticated || !!userInfo?.nickname;

        if (isProtectedPath && !hasValidAuth) {
          console.log('[PrivateRoute] No valid auth, redirecting to home');
          navigate('/', { replace: true });
        }
      } catch (error) {
        console.error('인증 처리 실패:', error);
        if (isProtectedPath) {
          navigate('/', { replace: true });
        } else {
          setShouldShowModal(true);
        }
      } finally {
        setIsProcessingAuth(false);
      }
    };

    processAuth();
  }, [
    userInfo?.nickname,
    isAuthenticated,
    authLoginSuccess,
    isProtectedPath,
    navigate,
    userInfoError,
    isLoading,
    isProcessingAuth,
  ]);

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

  if (isLoading || isProcessingAuth) return null;

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

  if (userInfo?.nickname && (isAuthenticated || isProcessingAuth)) {
    return children;
  }

  return null;
}
