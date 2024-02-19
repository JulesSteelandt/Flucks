import React, { useState, useEffect } from 'react';
import { Marker, Popup } from 'react-leaflet';
import { API_GEOLOCALISATION } from '@/app/utils/appGlobal';
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

const EventsMarkers: React.FC = () => {
    const [markers, setMarkers] = useState<MarkerData[]>([]);
    const router = useRouter();

    useEffect(() => {
        const fetchMarkers = async () => {
            try {
                const res = await fetch(API_GEOLOCALISATION, { cache: 'no-cache' });

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
                >
                    <Popup>
                        <div  onClick={() => {
                            return router.push(`/flucks/stream/${marker.diffusion.id}`);
                        }}>
                            <h3 >{marker.diffusion.titre}</h3>
                            <p>Urgence: {marker.diffusion.urgence ? 'Oui' : 'Non'}</p>
                        </div>
                    </Popup>
                </Marker>
            );
})}
        </div>
    );
};

export default EventsMarkers;
