import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import AuthGuard from '../../components/AuthGuard';
import LogoutButton from '../../components/LogoutButton';

export default function Dashboard() {
  const [list, setList] = useState([{ name: '', quantity: 1 }]);
  const [budget, setBudget] = useState('');
  const [radius, setRadius] = useState(5);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleListChange = (i, field, value) => {
    const newList = [...list];
    newList[i][field] = value;
    setList(newList);
  };

  const addItem = () => setList([...list, { name: '', quantity: 1 }]);
  const removeItem = i => setList(list.filter((_, idx) => idx !== i));

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/basket/match`, {
        shoppingList: list,
        budget: parseFloat(budget),
        radius,
        latitude: -26.2041, // placeholder for user location
        longitude: 28.0473
      }, { headers: { Authorization: `Bearer ${token}` } });
      router.push({ pathname: '/results', query: { data: JSON.stringify(res.data) } });
    } catch (err) {
      setError(err.response?.data?.error || 'Search failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthGuard>
      <main className="flex flex-col items-center min-h-screen p-8">
        <div className="w-full flex justify-end max-w-lg mb-2"><LogoutButton /></div>
        <h2 className="text-2xl font-bold mb-4">Grocery List & Budget</h2>
        <form className="flex flex-col gap-4 w-full max-w-lg" onSubmit={handleSubmit}>
          {list.map((item, i) => (
            <div key={i} className="flex gap-2">
              <input
                placeholder="Item name"
                value={item.name}
                onChange={e => handleListChange(i, 'name', e.target.value)}
                required
                className="border p-2 rounded flex-1"
              />
              <input
                type="number"
                min="1"
                value={item.quantity}
                onChange={e => handleListChange(i, 'quantity', e.target.value)}
                className="border p-2 rounded w-20"
              />
              <button type="button" onClick={() => removeItem(i)} className="text-red-600">Remove</button>
            </div>
          ))}
          <button type="button" onClick={addItem} className="bg-gray-200 rounded px-2 py-1">Add Item</button>
          <input
            type="number"
            min="1"
            placeholder="Budget (ZAR)"
            value={budget}
            onChange={e => setBudget(e.target.value)}
            required
            className="border p-2 rounded"
          />
          <label className="flex flex-col">
            Search Radius (km)
            <input
              type="range"
              min="1"
              max="20"
              value={radius}
              onChange={e => setRadius(Number(e.target.value))}
              className="w-full"
            />
            <span>{radius} km</span>
          </label>
          <button type="submit" className="bg-blue-600 text-white py-2 rounded" disabled={loading}>{loading ? 'Searching...' : 'Find Cheapest Basket'}</button>
          {error && <div className="text-red-600">{error}</div>}
        </form>
      </main>
    </AuthGuard>
  );
}
