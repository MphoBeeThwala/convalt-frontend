import { useState } from 'react';
import axios from 'axios';

export default function Signup() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', national_id: '', password: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    setError(''); setSuccess('');
    try {
      const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/signup`, form);
      setSuccess('Signup successful! Please login.');
    } catch (err) {
      setError(err.response?.data?.error || 'Signup failed.');
    }
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-8">
      <h2 className="text-2xl font-bold mb-4">Sign Up</h2>
      <form className="flex flex-col gap-4 w-full max-w-md" onSubmit={handleSubmit}>
        <input name="name" placeholder="Full Name" value={form.name} onChange={handleChange} required className="border p-2 rounded" />
        <input name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} required className="border p-2 rounded" />
        <input name="phone" placeholder="Phone Number" value={form.phone} onChange={handleChange} required className="border p-2 rounded" />
        <input name="national_id" placeholder="South African ID Number" value={form.national_id} onChange={handleChange} required className="border p-2 rounded" />
        <input name="password" type="password" placeholder="Password" value={form.password} onChange={handleChange} required className="border p-2 rounded" />
        <button type="submit" className="bg-blue-600 text-white py-2 rounded">Sign Up</button>
        {error && <div className="text-red-600">{error}</div>}
        {success && <div className="text-green-600">{success}</div>}
      </form>
    </main>
  );
}
