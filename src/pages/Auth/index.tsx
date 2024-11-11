import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from '@/hooks/useAuth';

export default function AuthPage() {
  const navigate = useNavigate();
  const [hasRedirected, setHasRedirected] = useState(false); // 리디렉션이 한 번만 실행되도록 상태 변수 추가
  const { handleLoginSuccess } = useAuth();

  useEffect(() => {
    const processAuth = async () => {
      if (!hasRedirected) {
        try {
          console.log('AuthPage: 로그인 처리 시작');
          await handleLoginSuccess();
          console.log('AuthPage: 로그인 처리 완료');

          const redirectPath = localStorage.getItem('redirectPath');
          if (redirectPath) {
            console.log('AuthPage: 리다이렉트 경로 확인:', redirectPath);
            localStorage.removeItem('redirectPath');
            setHasRedirected(true);
            navigate(redirectPath);
            console.log('AuthPage: 리다이렉트 완료');
          }
        } catch (error) {
          console.error('AuthPage: 로그인 처리 실패', error);
        }
      }
    };

    processAuth();
  }, [hasRedirected, navigate, handleLoginSuccess]);

  return null;
}
