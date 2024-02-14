import React, { useState, useEffect } from 'react';

interface Coords {
  latitude: number;
  longitude: number;
}

const GeolocationComponent: React.FC = () => {
  const [coords, setCoords] = useState<Coords | null>(null);

  useEffect(() => {
    handleGeolocation();
  }, []);

  const handleGeolocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCoords({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        (error) => {
          console.error(error);
        }
      );
    } else {
      console.error('La géolocalisation n\'est pas supportée par votre navigateur.');
    }
  };

  return (
    <div>
      {coords ? (
        <div>
          <p>Latitude: {coords.latitude}</p>
          <p>Longitude: {coords.longitude}</p>
        </div>
      ) : (
        <p>Demande de géolocalisation en cours...</p>
      )}
    </div>
  );
};

export default GeolocationComponent;
