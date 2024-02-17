import {useState} from 'react';

export default function Page(id: {id: string}) {
  const [videoNotFound, setVideoNotFound] = useState(false);
  const handleVideoError = () => {
    setVideoNotFound(true);
  };

  return (
    <div className={'w-[calc(100% - 32px)] mb-4 flex h-2/3 items-center justify-center bg-black'}>
      {videoNotFound ? (
        <p className={'text-white'}>Erreur de chargement de la vidéo</p>
      ) : (
        <video className={'h-full'} controls onError={handleVideoError}>
          <source src={`http://docketu.iutnc.univ-lorraine.fr:35303/video/${id.id}.mp4`} type={'video/mp4'} />
        </video>
      )}
    </div>
  );
}
