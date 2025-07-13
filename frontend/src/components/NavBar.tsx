import React from 'react';
import { Link } from 'react-router-dom';

export default function NavBar() {
  return (
    <nav className="bg-gray-800 p-4 text-white flex space-x-4">
      <Link to="/" className="hover:underline">Home</Link>
      <Link to="/ProductSearch" className="hover:underline">Product Search</Link>
      <Link to="/Login" className="hover:underline">Login</Link>
      <Link to="/Register" className="hover:underline">Register</Link>
    </nav>
  );
}
