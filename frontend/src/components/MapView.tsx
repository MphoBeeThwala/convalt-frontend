import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const MapView = ({ lat = -33.9249, lon = 18.4241, label = "Cape Town" }) => (
  <MapContainer center={[lat, lon]} zoom={13} style={{ height: "400px", width: "100%" }}>
    <TileLayer
      attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />
    <Marker position={[lat, lon]}>
      <Popup>{label}</Popup>
    </Marker>
  </MapContainer>
);

export default MapView;
