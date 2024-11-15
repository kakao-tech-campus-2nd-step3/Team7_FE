import { ReactElement, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import useAuth from '@/hooks/useAuth';
import LoginModal from '@/components/common/modals/LoginModal';
import { useGetUserInfo, isAuthorizationError } from '@/api/hooks/useGetUserInfo'; // isAuthorizationError 임포트

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
    enabled: true,
    onError: (error: unknown) => {
      console.log('Error occurred:', error); // 디버깅용 로그

      if (isAuthorizationError(error)) {
        console.log('[PrivateRoute] Unauthorized access:', {
          message: error.response.data.message,
          status: error.response.status,
        });

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
