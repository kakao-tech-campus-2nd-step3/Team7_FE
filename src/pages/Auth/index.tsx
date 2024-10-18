import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AuthPage() {
  const navigate = useNavigate();
  const [hasRedirected, setHasRedirected] = useState(false); // 리디렉션이 한 번만 실행되도록 상태 변수 추가

  useEffect(() => {
    if (!hasRedirected) {
      const redirectPath = localStorage.getItem('redirectPath');

      if (redirectPath) {
        localStorage.removeItem('redirectPath');
        setHasRedirected(true);
        navigate(redirectPath);
      }
    }
  }, [hasRedirected, navigate]);

  return null;
}
