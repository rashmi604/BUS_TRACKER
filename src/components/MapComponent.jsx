import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import { DEFAULT_MAP_CENTER, DEFAULT_ZOOM_LEVEL } from '../constants';

const MapComponent = ({ buses }) => {
  const [map, setMap] = useState(null);

  useEffect(() => {
    // Map initialization logic
  }, []);

  return (
    <MapContainer center={DEFAULT_MAP_CENTER} zoom={DEFAULT_ZOOM_LEVEL} style={{ height: '100vh' }}>
      <TileLayer
        url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
        attribution='&copy; OpenStreetMap contributors'
      />
      {buses.map((bus) => (
        <Marker key={bus.id} position={[bus.lat, bus.lng]}>
          <Popup>{bus.name}</Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default MapComponent;
