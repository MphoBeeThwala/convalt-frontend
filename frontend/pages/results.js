import { useRouter } from 'next/router';

import RequireAuth from '../components/RequireAuth';

// Export wrapped with RequireAuth to protect the route
export default function ProtectedResultsPage(props) {
  return (
    <RequireAuth>
      <Results {...props} />
    </RequireAuth>
  );
}

function Results() {
  const router = useRouter();
  let data = null;
  try {
    data = router.query.data ? JSON.parse(router.query.data) : null;
  } catch {
    data = null;
  }

  if (!data) return <main className="p-8">No results found.</main>;

  return (
    <main className="flex flex-col items-center min-h-screen p-8">
      <h2 className="text-2xl font-bold mb-4">Cheapest Basket</h2>
      <div className="bg-white shadow rounded p-6 w-full max-w-lg">
        <h3 className="text-xl font-semibold mb-2">Retailer: {data.retailer.name}</h3>
        <ul className="mb-4">
          {data.basket.map((item, i) => (
            <li key={i} className="flex justify-between">
              <span>{item.name} x{item.quantity || 1}</span>
              <span>ZAR {item.price}</span>
            </li>
          ))}
        </ul>
        <div className="font-bold text-lg mb-4">Total: ZAR {data.total}</div>
        <button
          className="bg-green-600 text-white px-4 py-2 rounded"
          onClick={() => alert('Checkout placeholder: You would now be redirected to the retailer checkout.')}
        >
          Accept & Checkout
        </button>
      </div>
    </main>
  );
}
