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
    <div className={'grid grid-cols-4 px-8'}>
      {streamData.map((stream: any) => {
        return <Stream title={stream.titre} creator={stream.createur} emergency={stream.urgence} id={stream.id} />;
      })}
    </div>
  );
}
