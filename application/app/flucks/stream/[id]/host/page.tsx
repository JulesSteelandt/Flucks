import {fetchDiffusionDataWithID} from '@/app/data';
import React from 'react';
import StreamerHost from '@/app/flucks/stream/[id]/host/components/StreamerComponent';
import {API_DIFFUSIONS} from '@/app/utils/appGlobal';

export default async function Page({params}: {
    params: {
        id: string
    }
}) {
  const fetchStreamDataWithID = async () => {
    try {
      const res = await fetch(`${API_DIFFUSIONS  }/${  params.id}`, {cache: 'no-cache'});
      if (!res.ok) {
        console.error('Erreur de récupération des marqueurs');
        return;
      }
      return await res.json();
    } catch (e) {
        console.log('erreur lors de la création du stream');
    }
  };

  let streamData = {};
  try {
     streamData = await fetchStreamDataWithID();
    console.log(streamData);
    if (streamData === undefined)    streamData = {data: {titre: 'inconnu' }};

  } catch (e) {
    console.log('erreur');
  }

    return (
        <div className={'p-4 w-5/6 m-8'}>
          <StreamerHost id={params.id} />
                <p className={'bg-[#D9D9D9] w-5/6 text-center p-4 font-bold'}>{streamData.data.titre} </p>
            <div className={'flex flex-row justify-between'}>

            </div>



        </div>

    );
}