import Video from '@/app/components/Video';
import {API_DIFFUSIONS} from '@/app/utils/appGlobal';

export default async function VideoList({limit}: {limit: string}) {
  const fetchVideoData = async () => {
    try {
      const res = await fetch(API_DIFFUSIONS, {cache: 'no-cache'});
      if (!res.ok) {
        console.error('Erreur de récupération des données');
        return;
      }
      return await res.json();
    } catch (e) {
      console.log(e);
    }
  };

  let videoData = [];
  try {
    const diffusionsData = await fetchVideoData();
    // @ts-ignore
    videoData = diffusionsData.data
      .filter((diffusion: any) => {
        return diffusion.direct === false;
      })
      .slice(0, limit);
  } catch (e) {
    console.log(videoData);
  }
  return (
    <div>
      {videoData.length === 0 ? <p className={'px-8'}>Pas de vidéos disponibles</p> : ''}
      <div className={'grid gap-2 px-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'}>
        {videoData.map((video: any) => {
          return <Video key={video.id} title={video.titre} creator={video.createur} id={video.id} />;
        })}
      </div>
    </div>
  );
}
