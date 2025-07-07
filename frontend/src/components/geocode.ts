// Simple geocoding utility using Nominatim (OpenStreetMap)
export async function geocodeAddress(address: string) {
  const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}`;
  const res = await fetch(url);
  const data = await res.json();
  if (data.length > 0) {
    return { lat: parseFloat(data[0].lat), lon: parseFloat(data[0].lon), display_name: data[0].display_name };
  }
  return null;
}

// Example usage:
// const coords = await geocodeAddress('123 Main Street, Cape Town');
// if (coords) { console.log(coords.lat, coords.lon); }
