import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Marker, Popup } from 'react-leaflet';
import { icon } from 'leaflet';

interface Props {
    position: [number, number];
}

const CustomUserMarker: React.FC<Props> = ({ position }) => {
    const ICON = icon({
        iconUrl: './img/ptnMapUser.png',
        iconSize: [32, 32],
    });

    return (
        <Marker position={position} icon={ICON}>
            <Popup>
                <div>
                    <h3 className={'text-xl'}>Vous êtes ici.</h3>
                </div>
            </Popup>
        </Marker>
    );
};

export default CustomUserMarker;
