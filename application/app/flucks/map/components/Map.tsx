import React, {useState} from 'react';
import {MapContainer, Marker, Popup, TileLayer} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css';
import * as L from 'leaflet';
import 'leaflet-defaulticon-compatibility';
import GeolocationComponent from './GeolocationComponent';
import EventsMarkers from './EventsMarkers';

export default function MyMap() {
  const [markerPosition, setMarkerPosition] = useState<[number, number] | null>(null);
  const [centerMap, setCenterMap] = useState<[number, number]>([48.866669, 2.33333]);
  const [geolocationLoaded, setGeolocationLoaded] = useState<boolean>(false);

  const handleCoordsReceived = (coords: {latitude: number; longitude: number}) => {
    setMarkerPosition([coords.latitude, coords.longitude]);
    setCenterMap([coords.latitude, coords.longitude]);
    setGeolocationLoaded(true);
  };

  return (
    <div className={'full w-full'}>
      {!geolocationLoaded && (
        <MapContainer className={'h-[40vw] w-full'} center={centerMap} zoom={5} scrollWheelZoom={true}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
          />
          <EventsMarkers />
        </MapContainer>
      )}

      {geolocationLoaded && (
        <MapContainer className={'h-[40vw] w-full'} center={centerMap} zoom={18} scrollWheelZoom={true}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
          />

          {markerPosition && (
            <Marker position={markerPosition}>
              <Popup>Votre position</Popup>
            </Marker>
          )}
          <EventsMarkers />
        </MapContainer>
      )}

      {/* GeolocationComponent est rendu même s'il est chargé ou non */}
      <GeolocationComponent onCoordsReceived={handleCoordsReceived} />
    </div>
  );
}
