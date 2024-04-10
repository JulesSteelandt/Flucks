// CameraComponent.tsx
import { useEffect, useRef } from 'react';

const CameraComponent: React.FC = () => {
    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        const accessCamera = async () => {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({ video: true });
                if (videoRef.current) {
                    videoRef.current.srcObject = stream;
                }
            } catch (error) {
                console.error('Erreur lors de l\'accès à la caméra : ', error);
            }
        };

        accessCamera();

        return () => {
            if (videoRef.current) {
                const stream = videoRef.current.srcObject as MediaStream;
                if (stream) {
                    stream.getTracks().forEach(track => {
return track.stop();
});
                }
            }
        };
    }, []);

    return (
        <div className='flex justify-center items-center min-w-4/6 mt-8 '>
            <video ref={videoRef} className='w-full max-w-lg h-auto' autoPlay playsInline />
        </div>
    );
};

export default CameraComponent;
