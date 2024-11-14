import { ReactElement, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import useAuth from '@/hooks/useAuth';
import LoginModal from '@/components/common/modals/LoginModal';
import { useGetUserInfo } from '@/api/hooks/useGetUserInfo';
import { AxiosError } from 'axios';

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

  const {
    data: userInfo,
    isError: userInfoError,
    isLoading,
  } = useGetUserInfo({
    retry: false,
    onError: (error: AxiosError<ApiErrorResponse>) => {
      console.error('사용자 정보 요청 실패:', error);
      if (directRedirectPaths.includes(location.pathname)) {
        navigate('/');
      } else {
        setShouldShowModal(true);
      }
    },
  });

  const directRedirectPaths = ['/choice', '/auth'];

  useEffect(() => {
    const processAuth = async () => {
      if (isLoading) return;

      if (directRedirectPaths.includes(location.pathname)) {
        if (!isAuthenticated || userInfoError || !userInfo?.nickname) {
          navigate('/');
          return;
        }
      }

      if (userInfo?.nickname) {
        try {
          await authLoginSuccess(userInfo.nickname);
          if (!isAuthenticated) {
            if (directRedirectPaths.includes(location.pathname)) {
              navigate('/');
            } else {
              setShouldShowModal(true);
            }
          }
        } catch (error) {
          console.error('인증 처리 실패:', error);
          if (directRedirectPaths.includes(location.pathname)) {
            navigate('/');
          } else {
            setShouldShowModal(true);
          }
        }
      } else if (!isAuthenticated) {
        if (directRedirectPaths.includes(location.pathname)) {
          navigate('/');
        } else {
          setShouldShowModal(true);
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
