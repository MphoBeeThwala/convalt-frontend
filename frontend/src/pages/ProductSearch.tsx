import React, { useState } from 'react';
import { fetchProducts } from '../lib/api';

export default function ProductSearch() {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('');
  const [retailer, setRetailer] = useState('');
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  // New: Track selected products for basket
  const [basket, setBasket] = useState<{ name: string; quantity: number }[]>([]);

  // Add product to basket (default quantity 1, can be edited in basket page)
  const addToBasket = (name: string) => {
    if (!basket.find(item => item.name === name)) {
      setBasket([...basket, { name, quantity: 1 }]);
    }
  };

  // Navigate to basket page with selected items
  const goToBasket = () => {
    if (typeof window !== 'undefined') {
      window.localStorage.setItem('basketDraft', JSON.stringify(basket));
      window.location.href = '/basket';
    }
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const data = await fetchProducts({ name: query, category, retailer });
      setResults(data);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch products');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Product Search</h1>
      <form onSubmit={handleSearch} className="space-y-2">
        <input
          type="text"
          placeholder="Search for products..."
          value={query}
          onChange={e => setQuery(e.target.value)}
          className="border p-2 w-full rounded"
        />
        <input
          type="text"
          placeholder="Category (optional)"
          value={category}
          onChange={e => setCategory(e.target.value)}
          className="border p-2 w-full rounded"
        />
        <input
          type="text"
          placeholder="Retailer (optional)"
          value={retailer}
          onChange={e => setRetailer(e.target.value)}
          className="border p-2 w-full rounded"
        />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded" disabled={loading}>
          {loading ? 'Searching...' : 'Search'}
        </button>
      </form>
      {error && <div className="text-red-600 mt-2">{error}</div>}
      <div className="mt-4">
        {results.length > 0 ? (
          <ul>
            {results.map((product, idx) => (
              <li key={idx} className="border-b py-2 flex justify-between items-center">
                <div>
                  <div className="font-semibold">{product.name}</div>
                  {product.category && <div className="text-sm text-gray-600">Category: {product.category}</div>}
                  {product.prices && product.prices.length > 0 && (
                    <ul className="ml-4 text-sm">
                      {product.prices.map((p: any, i: number) => (
                        <li key={i}>{p.retailer}: <span className="font-bold">R{p.price}</span></li>
                      ))}
                    </ul>
                  )}
                </div>
                <button
                  className="ml-4 bg-green-600 text-white px-3 py-1 rounded"
                  onClick={() => addToBasket(product.name)}
                  disabled={!!basket.find(item => item.name === product.name)}
                >
                  {basket.find(item => item.name === product.name) ? 'Added' : 'Add to Basket'}
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <div className="text-gray-500">No products found.</div>
        )}
        {basket.length > 0 && (
          <div className="mt-6">
            <button
              className="bg-blue-600 text-white px-4 py-2 rounded"
              onClick={goToBasket}
            >
              Go to Basket ({basket.length})
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
