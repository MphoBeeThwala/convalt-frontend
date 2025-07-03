import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function AuthGuard({ children }) {
  const router = useRouter();
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token');
      if (!token) router.replace('/login');
    }
  }, [router]);
  return children;
}
