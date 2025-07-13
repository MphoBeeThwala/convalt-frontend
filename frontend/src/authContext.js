import { createContext, useContext, useState, useEffect } from 'react';
import jwt_decode from 'jwt-decode';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  // Helper: check if JWT is expired
  function isTokenExpired(token) {
    try {
      const { exp } = jwt_decode(token);
      if (!exp) return false;
      return Date.now() >= exp * 1000;
    } catch {
      return true;
    }
  }

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      if (isTokenExpired(token)) {
        localStorage.removeItem('token');
        setUser(null);
      } else {
        try {
          const decoded = jwt_decode(token);
          setUser({ ...decoded, token });
        } catch {
          setUser(null);
        }
      }
    }
  }, []);

  const login = (token) => {
    if (isTokenExpired(token)) {
      localStorage.removeItem('token');
      setUser(null);
      return;
    }
    localStorage.setItem('token', token);
    const decoded = jwt_decode(token);
    setUser({ ...decoded, token });
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
