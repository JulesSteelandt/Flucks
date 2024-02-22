import React from 'react';
import {API_DIFFUSIONS} from '@/app/utils/appGlobal';
import StreamerHost from '@/app/flucks/emergency/[id]/components/StreamerComponent';

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
      throw new Error(e);
    }
  };

  const streamData = await fetchStreamDataWithID();
    return (
        <div className={'p-4 w-5/6 m-8'}>
          <StreamerHost id={params.id} />
                <p className={'bg-[#D9D9D9] w-5/6 text-center p-4 font-bold'}>{streamData.data.titre}</p>
            <div className={'flex flex-row justify-between'}>

            </div>
        </div>

    );
}