import Video from '@/app/components/Video';
import {fetchDiffusionData} from '@/app/data';

export default async function VideoList() {
  const videoData = await fetchDiffusionData();

  return (
    <div>
      <p className={'p-8 text-2xl font-bold'}>Liste des vidéos</p>
      <div className={'flex flex-wrap px-8'}>
        {videoData.data.map((video) => {
          if (!video.direct) {
            return <Video key={video.id} title={video.titre} creator={video.createur} id={video.id} />;
          }
        })}
      </div>
    </div>
  );
}
