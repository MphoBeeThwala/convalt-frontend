// API utility for fetching products from backend
export async function fetchProducts({ name, category, retailer }: { name?: string; category?: string; retailer?: string }) {
  const params = new URLSearchParams();
  if (name) params.append('name', name);
  if (category) params.append('category', category);
  if (retailer) params.append('retailer', retailer);

  const res = await fetch(`/api/products/search?${params.toString()}`);
  if (!res.ok) throw new Error('Failed to fetch products');
  return res.json();
}
