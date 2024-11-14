import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from '@/hooks/useAuth';
import { useGetUserInfo } from '@/api/hooks/useGetUserInfo';

export default function AuthPage() {
  const navigate = useNavigate();
  const [hasRedirected, setHasRedirected] = useState(false); // 리디렉션이 한 번만 실행되도록 상태 변수 추가
  const { handleLoginSuccess } = useAuth();
  const { data: userInfo } = useGetUserInfo();

  useEffect(() => {
    const processAuth = async () => {
      if (!hasRedirected && userInfo.nickname) {
        try {
          await handleLoginSuccess(userInfo.nickname);

          const redirectPath = localStorage.getItem('redirectPath');
          if (redirectPath) {
            localStorage.removeItem('redirectPath');
            setHasRedirected(true);
            navigate(redirectPath);
          }
        } catch (error) {
          console.error('AuthPage: 로그인 처리 실패', error);
          localStorage.removeItem('nickname');
          localStorage.setItem('isAuthenticated', 'false');
          navigate('/');
        }
      } else {
        navigate('/');
      }
    };

    processAuth();
  }, [hasRedirected, navigate, handleLoginSuccess, userInfo]);

  return null;
}
