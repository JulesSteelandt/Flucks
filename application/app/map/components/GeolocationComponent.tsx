import React, { useState, useEffect } from 'react';

interface Coords {
  latitude: number;
  longitude: number;
}

interface GeolocationProps {
  onCoordsReceived: (coords: Coords) => void;
}

const GeolocationComponent: React.FC<GeolocationProps> = ({ onCoordsReceived }) => {
  useEffect(() => {
    handleGeolocation();
  }, []);

  const handleGeolocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const coords: Coords = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          };
          onCoordsReceived(coords);
        },
        (error) => {
          console.error(error);
        }
      );
    } else {
      console.error('La géolocalisation n\'est pas supportée par votre navigateur.');
    }
  };

  return null; // Ce composant ne rend rien directement
};

export default GeolocationComponent;
