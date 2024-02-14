'use client';

import React, { useState } from 'react';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import GeolocationComponent from './GeolocationComponent';

export default function MyMap() {
  const [markerPosition, setMarkerPosition] = useState<[number, number] | null>(null);

  const handleCoordsReceived = (coords: { latitude: number; longitude: number }) => {
    setMarkerPosition([coords.latitude, coords.longitude]);
  };

  return (
    <div className={'w-screen full'}>
      <MapContainer className={'w-screen h-[40vw]'} center={markerPosition || [48.866669, 2.33333]} zoom={13} scrollWheelZoom={false}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
        />

        {markerPosition && <Marker position={markerPosition}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>}
      </MapContainer>
      <GeolocationComponent onCoordsReceived={handleCoordsReceived} />
    </div>
  );
}
