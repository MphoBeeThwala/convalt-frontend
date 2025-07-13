import RequireAuth from '../components/RequireAuth';
import { useState } from 'react';

// Admin management UI placeholder
function AdminPage() {
  // In a real app, fetch/manage products via API
  const [products, setProducts] = useState([
    { id: 1, name: 'Sample Product', category: 'SampleCat' }
  ]);
  const [form, setForm] = useState({ name: '', category: '' });
  const [message, setMessage] = useState('');

  // Placeholder handlers (replace with real API calls)
  const handleCreate = e => {
    e.preventDefault();
    setProducts([...products, { id: Date.now(), ...form }]);
    setForm({ name: '', category: '' });
    setMessage('Product created (placeholder).');
  };
  const handleDelete = id => {
    setProducts(products.filter(p => p.id !== id));
    setMessage('Product deleted (placeholder).');
  };

  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
      <p className="mb-4">This page is only visible to users with the admin role.</p>
      <form className="flex gap-2 mb-4" onSubmit={handleCreate}>
        <input
          placeholder="Product name"
          value={form.name}
          onChange={e => setForm({ ...form, name: e.target.value })}
          required
          className="border p-2 rounded"
        />
        <input
          placeholder="Category"
          value={form.category}
          onChange={e => setForm({ ...form, category: e.target.value })}
          required
          className="border p-2 rounded"
        />
        <button type="submit" className="bg-blue-600 text-white px-3 py-1 rounded">Create</button>
      </form>
      {message && <div className="text-green-600 mb-2">{message}</div>}
      <ul>
        {products.map(p => (
          <li key={p.id} className="flex justify-between items-center border-b py-2">
            <span>{p.name} ({p.category})</span>
            <button onClick={() => handleDelete(p.id)} className="text-red-600">Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

// Export wrapped with RequireAuth for admin-only access
export default function ProtectedAdminPage(props) {
  return (
    <RequireAuth role="admin">
      <AdminPage {...props} />
    </RequireAuth>
  );
}

