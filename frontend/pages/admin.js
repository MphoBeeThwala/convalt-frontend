import { useAuth } from '../src/authContext';

export default function AdminPage() {
  const { user } = useAuth();

  if (!user) return <div>Please log in.</div>;
  if (user.role !== 'admin') return <div>Access denied. Admins only.</div>;

  return (
    <div>
      <h1>Welcome, Admin!</h1>
      <p>This page is only visible to users with the admin role.</p>
    </div>
  );
}
