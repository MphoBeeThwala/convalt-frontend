import { geocodeAddress } from "./geocode";

async function testGeocode() {
  const address = "123 Main Street, Cape Town";
  const coords = await geocodeAddress(address);
  if (coords) {
    console.log(`Geocoding for '${address}':`, coords);
  } else {
    console.log("No results found for geocoding.");
  }
}

testGeocode();
