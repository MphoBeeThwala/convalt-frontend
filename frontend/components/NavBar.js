import Link from 'next/link';
import { useAuth } from '../src/authContext';
import { useRouter } from 'next/router';

export default function NavBar() {
  const { user, logout } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  return (
    <nav className="bg-gray-800 p-4 text-white flex space-x-4 items-center">
      <Link href="/">
        <span className="hover:underline cursor-pointer">Home</span>
      </Link>
      <Link href="/ProductSearch">
        <span className="hover:underline cursor-pointer">Product Search</span>
      </Link>
      <Link href="/basket">
        <span className="hover:underline cursor-pointer">Basket Match</span>
      </Link>
      {user && (
        <Link href="/results">
          <span className="hover:underline cursor-pointer">Results</span>
        </Link>
      )}
      {user && user.role === 'admin' && (
        <Link href="/admin">
          <span className="hover:underline cursor-pointer">Admin</span>
        </Link>
      )}
      {!user && (
        <>
          <Link href="/login">
            <span className="hover:underline cursor-pointer">Login</span>
          </Link>
          <Link href="/signup">
            <span className="hover:underline cursor-pointer">Sign Up</span>
          </Link>
        </>
      )}
      {user && (
        <>
          <span className="ml-4">Hello, {user.email}!</span>
          <button onClick={handleLogout} className="ml-2 bg-red-600 px-3 py-1 rounded">Logout</button>
        </>
      )}
    </nav>
  );
}
