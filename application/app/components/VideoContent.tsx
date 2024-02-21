import {useState} from 'react';
import classNames from 'classnames';
import {API_WS_URL} from '@/app/utils/appGlobal';

export default function Page(id) {
  const [videoNotFound, setVideoNotFound] = useState(false);
  const handleVideoError = () => {
    setVideoNotFound(true);
  };

  return (
    <div className={classNames('w-[calc(100% - 32px)] mb-4 flex h-2/3 items-center justify-center bg-black')}>
      {videoNotFound ? (
        <p className={'text-white'}>Erreur de chargement de la vidéo</p>
      ) : (
        <video className={'h-full'} controls onError={handleVideoError}>
          <source src={`${API_WS_URL}/video/${id.id}.mp4`} type={'video/mp4'} />
        </video>
      )}
    </div>
  );
}
