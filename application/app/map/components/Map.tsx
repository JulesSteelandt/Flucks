import React, { useState, useEffect } from 'react';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css';
import * as L from 'leaflet';
import 'leaflet-defaulticon-compatibility';
import GeolocationComponent from './GeolocationComponent';

export default function MyMap() {
  const [markerPosition, setMarkerPosition] = useState<[number, number] | null>(null);
  const [centerMap, setCenterMap] = useState<[number, number]>([48.866669, 2.33333]);
  const [geolocationLoaded, setGeolocationLoaded] = useState<boolean>(false);

  const handleCoordsReceived = (coords: { latitude: number; longitude: number }) => {
    setMarkerPosition([coords.latitude, coords.longitude]);
    setCenterMap([coords.latitude, coords.longitude]);
    setGeolocationLoaded(true);
  };

  return (
    <div className={'w-full full'}>
      {!geolocationLoaded && (
        <MapContainer className={'w-[85vw] h-[40vw]'} center={centerMap} zoom={5} scrollWheelZoom={true}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
          />
        </MapContainer>
      )}

      {geolocationLoaded && (
        <MapContainer className={'w-[85vw] h-[40vw]'} center={centerMap} zoom={18} scrollWheelZoom={true}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
          />

          {markerPosition && (
            <Marker position={markerPosition}>
              <Popup>Votre position</Popup>
            </Marker>
          )}
        </MapContainer>
      )}

      {/* GeolocationComponent est rendu même s'il est chargé ou non */}
      <GeolocationComponent onCoordsReceived={handleCoordsReceived} />
    </div>
  );
}
