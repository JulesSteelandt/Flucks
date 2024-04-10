import Stream from '@/app/components/Stream';
import {API_DIFFUSIONS} from '@/app/utils/appGlobal';

export default async function StreamList({limit}: {limit: string}) {
  const fetchStreamData = async () => {
    // @ts-ignore
    process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0;
    try {
      const res = await fetch(API_DIFFUSIONS);
      if (!res.ok) {
        console.error('Erreur de récupération des données');
        return;
      }
      return await res.json();
    } catch (e) {
      console.log('e :', e);
      console.log('Données non chargées');
    }
  };

  let streamData = [];
  try {
    const diffusionsData = await fetchStreamData();
    console.log(diffusionsData);
    // @ts-ignore
    streamData = diffusionsData.data
      .filter((diffusion: any) => {
        return diffusion.direct === true;
      })
      .slice(0, limit);
  } catch (e) {
    console.log(e);
  }

  return (
    <div>
      {streamData.length === 0 ? <p className={'px-8'}>Pas de streams disponibles</p> : ''}
      <div className={'grid gap-2 px-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'}>
        {streamData.map((stream: any) => {
          return (
            <Stream
              key={stream.id}
              title={stream.titre}
              creator={stream.createur}
              emergency={stream.urgence}
              id={stream.id}
            />
          );
        })}
      </div>
    </div>
  );
}
