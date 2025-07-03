import { useRouter } from 'next/router';

export default function LogoutButton() {
  const router = useRouter();
  const handleLogout = () => {
    localStorage.removeItem('token');
    router.push('/login');
  };
  return (
    <button onClick={handleLogout} className="text-sm text-blue-600 underline ml-4">Logout</button>
  );
}
