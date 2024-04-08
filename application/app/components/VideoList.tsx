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
    } catch (e: any) {
      throw new Error(e);
    }
  };

  const diffusionsData = await fetchVideoData();
  // @ts-ignore
  const videoData = diffusionsData.data.filter((diffusion) => diffusion.direct === false).slice(0, limit);

  return (
    <div>
      <div className={'flex flex-wrap px-8'}>
        {videoData.map((video: any) => {
          return <Video key={video.id} title={video.titre} creator={video.createur} id={video.id} />;
        })}
      </div>
    </div>
  );
}
