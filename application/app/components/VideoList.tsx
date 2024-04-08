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
      <div className={'grid grid-cols-4 px-8'}>
        {videoData.map((video: any) => {
          return <Video key={video.id} title={video.titre} creator={video.createur} id={video.id} />;
        })}
      </div>
    </div>
  );
}
