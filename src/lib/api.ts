import { z } from 'zod';

const API_URL = import.meta.env.VITE_API_URL;

const loginSchema = z.object({
  token: z.string(),
});

export const login = async (credentials: object) => {
  const res = await fetch(`${API_URL}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials),
  });
  if (!res.ok) throw new Error('Login failed');
  const data = await res.json();
  return loginSchema.parse(data);
};

export const search = async (searchParams: object) => {
  const res = await fetch(`${API_URL}/search`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(searchParams),
  });
  if (!res.ok) throw new Error('Search failed');
  return res.json();
};

export const getUserData = async (token: string) => {
  const res = await fetch(`${API_URL}/dashboard`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error('Failed to fetch user data');
  return res.json();
};
