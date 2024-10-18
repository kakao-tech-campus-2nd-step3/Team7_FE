import { ReactElement } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import useAuth from '@/hooks/useAuth';
import LoginModal from '@/components/common/modals/LoginModal';

type PrivatedRouteProps = {
  children: ReactElement;
};

export default function PrivatedRoute({ children }: PrivatedRouteProps) {
  const authInfo = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleCloseModal = () => {
    navigate(-1);
  };

  const handleLoginSuccess = () => {
    navigate(0);
  };

  if (!authInfo?.accessToken) {
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
