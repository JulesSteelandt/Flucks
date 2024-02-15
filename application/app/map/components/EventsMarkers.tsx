// récupère les diffusion en direct de la base de données et affiche sur la carte ceux proches de la position de l'utilisateur 
// avec des marqueurs de couleur différente selon le type d'événement (rouge urgence, noir normal)
import React, { useState, useEffect } from 'react';
import { Marker, Popup } from 'react-leaflet';
import {API_GEOLOCALISATION} from '@/app/utils/appGlobal';
// la route retourne :
/**
 * 
 * {
 *     "data": [
 *         {
 *             "id": 0,
 *             "geolocalisation": {
 *                 "latitude": 48.8566,
 *                 "longitude": 2.3522
 *             },
 *             "diffusionId": "8457d296-c8e6-4a75-b71b-ff2d775e6465"
 *         },
 *         {
 *             "id": 1,
 *             "geolocalisation": {
 *                 "latitude": 48.8566,
 *                 "longitude": 2.3523
 *             },
 *             "diffusionId": "8d926c39-ef68-4efc-97fe-b0c3f3f32edb"
 *         },
 *         {
 *             "id": 2,
 *             "geolocalisation": {
 *                 "latitude": 48.8566,
 *                 "longitude": 2.3521
 *             },
 *             "diffusionId": "871d3376-ec0b-464f-a137-5886cc16be71"
 *         }
 *     ]
 * }
 */

export default function EventsMarkers() {
  
  // State
  // tableau des marqueurs (diffusionId, latitude, longitude)
  const [markers, setMarkers] = useState<any[]>([]);
  // tableau des marqueurs de type urgence
  const [markersUrgence, setMarkersUrgence] = useState<any[]>([]);
  
  // comportement async fetch
  async function fetchMarkers() {
    try {
      const res = await fetch(API_GEOLOCALISATION, { cache: 'no-cache' });

      if (!res.ok) {
        console.error('Erreur de récupération des marqueurs');
        return;
      }

      const data: { data: { diffusionId: string, geolocalisation: { latitude: number, longitude: number }, urgence: string }[] } = await res.json();

      const markersApi: { diffusionId: string, latitude: number, longitude: number }[] = data.data.map(item => {
return {
        diffusionId: item.diffusionId,
        latitude: item.geolocalisation.latitude,
        longitude: item.geolocalisation.longitude
      };
});
/**
      const markersUrgenceApi: { diffusionId: string, latitude: number, longitude: number }[] = markersApi.filter(marker => {
        // Ici, vous pouvez définir la condition pour les marqueurs d'urgence
        // Je suppose que vous avez une propriété dans votre objet data pour déterminer si c'est une urgence
        // Par exemple, supposons qu'il y a une propriété "urgence" dans l'objet data
        return item.urgence === 'urgence';
      });

        **/

      setMarkers(markersApi);
      // setMarkersUrgence(markersUrgenceApi);
    } catch (error) {
      console.error('Error:', error);
    }
  }



  // useEffect
  useEffect(() => {
    fetchMarkers();
  }, []);

  // affichage

  return (
    <div>
      {markers.map((marker, index) => {
        return (
          <Marker key={index} position={[marker.latitude, marker.longitude]}>
            <Popup>{marker.diffusionId}</Popup>
          </Marker>
        );
      })}
    </div>
  );
  
  
}



