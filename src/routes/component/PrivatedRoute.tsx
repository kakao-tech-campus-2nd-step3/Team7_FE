import { ReactElement } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import useAuth from '@/hooks/useAuth';
import LoginModal from '@/components/common/modals/LoginModal';

type PrivatedRouteProps = {
  children: ReactElement;
};

export default function PrivatedRoute({ children }: PrivatedRouteProps) {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleCloseModal = () => {
    if (window.history.length > 2)
      // privatedRoute로 리다이렉트 되면 최소 2이기 때문
      navigate(-1);
    else navigate('/');
  };

  const handleLoginSuccess = () => {
    navigate(0);
  };

  if (!isAuthenticated) {
    return (
      <LoginModal
        currentPath={location.pathname}
        immediateOpen
        onClose={handleCloseModal}
        onLoginSuccess={handleLoginSuccess}
      />
    );
  }

  return children;
}
