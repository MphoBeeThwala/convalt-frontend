import { useAuth } from '../src/authContext';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

// Usage: Wrap page component export with RequireAuth
export default function RequireAuth({ children, role }) {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.replace('/login');
    } else if (role && user.role !== role) {
      router.replace('/');
    }
  }, [user, role, router]);

  if (!user) return null;
  if (role && user.role !== role) return null;
  return children;
}
