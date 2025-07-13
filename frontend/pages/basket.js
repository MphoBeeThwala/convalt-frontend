import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useAuth } from '../src/authContext';

import RequireAuth from '../components/RequireAuth';

// Export wrapped with RequireAuth to protect the route
export default function ProtectedBasketPage(props) {
  return (
    <RequireAuth>
      <BasketMatch {...props} />
    </RequireAuth>
  );
}

function BasketMatch() {
  // On mount, pre-fill basket from localStorage if available (from product search)
  const [shoppingList, setShoppingList] = useState(() => {
    if (typeof window !== 'undefined') {
      const draft = window.localStorage.getItem('basketDraft');
      if (draft) {
        window.localStorage.removeItem('basketDraft');
        try {
          const parsed = JSON.parse(draft);
          if (Array.isArray(parsed) && parsed.length > 0) return parsed;
        } catch {}
      }
    }
    return [{ name: '', quantity: 1 }];
  });
  const [budget, setBudget] = useState('');
  const [location, setLocation] = useState({ latitude: '', longitude: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { token } = useAuth();

  const handleItemChange = (i, field, value) => {
    const list = [...shoppingList];
    list[i][field] = value;
    setShoppingList(list);
  };

  const addItem = () => setShoppingList([...shoppingList, { name: '', quantity: 1 }]);
  const removeItem = i => setShoppingList(shoppingList.filter((_, idx) => idx !== i));

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/basket/match`,
        {
          shoppingList: shoppingList.filter(item => item.name),
          budget: parseFloat(budget),
          latitude: parseFloat(location.latitude),
          longitude: parseFloat(location.longitude)
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      router.push({ pathname: '/results', query: { data: JSON.stringify(res.data) } });
    } catch (err) {
      setError(err.response?.data?.error || 'Basket match failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex flex-col items-center min-h-screen p-8">
      <h2 className="text-2xl font-bold mb-4">Basket Match</h2>
      <form className="flex flex-col gap-4 w-full max-w-lg" onSubmit={handleSubmit}>
        {shoppingList.map((item, i) => (
          <div key={i} className="flex gap-2">
            <input
              placeholder="Product name"
              value={item.name}
              onChange={e => handleItemChange(i, 'name', e.target.value)}
              required
              className="border p-2 rounded w-full"
            />
            <input
              type="number"
              min="1"
              placeholder="Qty"
              value={item.quantity}
              onChange={e => handleItemChange(i, 'quantity', e.target.value)}
              required
              className="border p-2 rounded w-20"
            />
            <button type="button" onClick={() => removeItem(i)} className="text-red-600">Remove</button>
          </div>
        ))}
        <button type="button" onClick={addItem} className="bg-gray-200 px-2 py-1 rounded w-fit">Add Item</button>
        <input
          type="number"
          min="1"
          placeholder="Budget (ZAR)"
          value={budget}
          onChange={e => setBudget(e.target.value)}
          required
          className="border p-2 rounded"
        />
        <div className="flex gap-2">
          <input
            type="number"
            placeholder="Latitude"
            value={location.latitude}
            onChange={e => setLocation({ ...location, latitude: e.target.value })}
            required
            className="border p-2 rounded w-full"
          />
          <input
            type="number"
            placeholder="Longitude"
            value={location.longitude}
            onChange={e => setLocation({ ...location, longitude: e.target.value })}
            required
            className="border p-2 rounded w-full"
          />
        </div>
        <button type="submit" className="bg-blue-600 text-white py-2 rounded" disabled={loading}>
          {loading ? 'Matching...' : 'Find Cheapest Basket'}
        </button>
        {error && <div className="text-red-600">{error}</div>}
      </form>
    </main>
  );
}
