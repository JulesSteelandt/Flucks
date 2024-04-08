import Stream from '@/app/components/Stream';
import {API_DIFFUSIONS} from '@/app/utils/appGlobal';

export default async function StreamList({limit}: {limit: string}) {
  const fetchStreamData = async () => {
    try {
      const res = await fetch(API_DIFFUSIONS, {cache: 'no-cache'});
      if (!res.ok) {
        console.error('Erreur de récupération des données');
        return;
      }
      return await res.json();
    } catch (e) {
      console.log('Données non chargées');
    }
  };

  const diffusionsData = await fetchStreamData();
  // @ts-ignore
  const streamData = diffusionsData.data.filter((diffusion) => diffusion.direct === true).slice(0, limit);

  return (
    <div>
      <div className={'flex flex-wrap px-8'}>
        {streamData.map((stream: any) => {
          return <Stream title={stream.titre} creator={stream.createur} emergency={stream.urgence} id={stream.id} />;
        })}
      </div>
    </div>
  );
}
