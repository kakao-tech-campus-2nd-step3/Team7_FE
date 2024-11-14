import { ReactElement, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import useAuth from '@/hooks/useAuth';
import LoginModal from '@/components/common/modals/LoginModal';
import { useGetUserInfo } from '@/api/hooks/useGetUserInfo';

type PrivatedRouteProps = {
  children: ReactElement;
};

export default function PrivatedRoute({ children }: PrivatedRouteProps) {
  const [shouldShowModal, setShouldShowModal] = useState(false);
  const { isAuthenticated, handleLoginSuccess: authLoginSuccess } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { data: userInfo } = useGetUserInfo();

  const directRedirectPaths = ['/choice', 'auth'];
  useEffect(() => {
    const processAuth = async () => {
      if (directRedirectPaths.includes(location.pathname) && !isAuthenticated) {
        navigate('/');
        return;
      }

      if (userInfo.nickname) {
        try {
          await authLoginSuccess(userInfo.nickname);
          if (!isAuthenticated) {
            setShouldShowModal(true);
          }
        } catch (error) {
          console.error('인증 처리 실패:', error);
          setShouldShowModal(true);
        }
      }
    };
    processAuth();
  }, [userInfo.nickname, isAuthenticated, authLoginSuccess, location.pathname, navigate]);

  const handleCloseModal = () => {
    if (window.history.length > 2)
      // privatedRoute로 리다이렉트 되면 최소 2이기 때문
      navigate(-1);
    else navigate('/');
  };

  const handleModalSuccess = () => {};

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

  return children;
}
