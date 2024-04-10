import React, {useEffect, useState} from 'react';
import {Marker, Popup} from 'react-leaflet';
import L from 'leaflet';
import {API_GEOLOCALISATION} from '@/app/utils/appGlobal';
import {useRouter} from 'next/navigation';

interface MarkerData {
  id: string;
  geolocalisation: {
    latitude: number;
    longitude: number;
  };
  diffusion: {
    id: string;
    titre: string;
    urgence: boolean;
  };
}
const iconUrgent = new L.Icon({
  iconUrl: '/img/red_point.png',
  iconSize: [50, 50],
});

const iconNonUrgent = new L.Icon({
  iconUrl: '/img/black_point.png',
  iconSize: [50, 50],
});

const EventsMarkers: React.FC = () => {
  const [markers, setMarkers] = useState<MarkerData[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchMarkers = async () => {
      try {
        const res = await fetch(API_GEOLOCALISATION, {cache: 'no-cache'});

        if (!res.ok) {
          console.error('Erreur de récupération des marqueurs');
          return;
        }

        const data = await res.json();

        const markersApi: MarkerData[] = data.data.map((item: any) => {
          return {
            id: item.diffusion.id,
            geolocalisation: {
              latitude: item.geolocalisation.latitude,
              longitude: item.geolocalisation.longitude,
            },
            diffusion: {
              id: item.diffusion.id,
              titre: item.diffusion.titre,
              urgence: item.diffusion.urgence,
            },
          };
        });

        setMarkers(markersApi);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchMarkers();
  }, []);

  return (
    <div>
      {markers.map((marker, index) => {
        return (
          <Marker
            key={index}
            position={[marker.geolocalisation.latitude, marker.geolocalisation.longitude]}
            icon={marker.diffusion.urgence ? iconUrgent : iconNonUrgent}
          >
            <Popup>
              <div
                onClick={() => {
                  return router.push(`/flucks/stream/${marker.diffusion.id}`);
                }}
              >
                <h3>{marker.diffusion.titre}</h3>
                {marker.diffusion.urgence ? <p>Urgence: Oui</p> : <p>Urgence: Non</p>}
              </div>
            </Popup>
          </Marker>
        );
      })}
    </div>
  );
};

export default EventsMarkers;
