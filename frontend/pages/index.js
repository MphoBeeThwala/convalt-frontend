import Link from 'next/link';

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-8">
      <h1 className="text-4xl font-bold mb-4">Convergence</h1>
      <p className="mb-8 text-center max-w-xl">Input your grocery list and budget, and get the cheapest complete basket from a single nearby retailer.</p>
      <div className="flex gap-4">
        <Link href="/signup" className="px-4 py-2 bg-blue-600 text-white rounded">Sign Up</Link>
        <Link href="/login" className="px-4 py-2 bg-gray-200 rounded">Login</Link>
      </div>
    </main>
  );
}
