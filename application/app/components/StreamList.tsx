import Stream from '@/app/components/Stream';
import {fetchDiffusionData} from '@/app/data';

export default async function StreamList() {
  const streamData = await fetchDiffusionData();
  return (
    <div>
      <p className={'p-8 text-2xl font-bold'}>Liste des streams</p>
      <div className={'flex flex-wrap pl-8'}>
        {streamData.data.map((stream: any) => {
          if (stream.direct) {
            return <Stream title={stream.titre} creator={stream.createur} emergency={stream.urgence} id={stream.id} />;
          }
        })}
      </div>
    </div>
  );
}
