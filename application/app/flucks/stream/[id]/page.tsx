import Like from '@/app/components/Like';
import {formatAbonnements} from '@/app/flucks/likes';
import {API_DIFFUSIONS} from '@/app/utils/appGlobal';
import React from 'react';
import ViewerComponent from '@/app/flucks/stream/[id]/components/ViewerComponent';

export default async function Page({
  params,
}: {
  params: {
    id: string;
  };
}) {
  const fetchStreamDataWithID = async () => {
    try {
      const res = await fetch(`${API_DIFFUSIONS}/${params.id}`, {cache: 'no-cache'});
      if (!res.ok) {
        console.error('Erreur de récupération des marqueurs');
        return;
      }
      return await res.json();
    } catch (e: any) {
      throw new Error(e);
    }
  };

  const streamData = await fetchStreamDataWithID();

  return (
    <div className={'m-8 w-5/6 p-4'}>
      <ViewerComponent id={params.id} />
      <div className={'flex flex-row'}>
        <p className={'w-5/6 bg-[#D9D9D9] p-4 text-center font-bold'}>{streamData.data.titre}</p>
        <p className={'w-1/6 p-4 text-center italic underline'}>{streamData.data.createur.pseudo}</p>
      </div>
      <div className={'flex flex-row justify-between'}>
        <div className={'flex flex-row items-center p-4'}>
          <p className={'mx-2 font-mono text-xl font-extrabold text-[#394054]'}>
            {formatAbonnements(streamData.data.createur.abonnees)}
          </p>
          <button className={'rounded-full bg-[#394054] px-4 py-2 font-bold text-white'}>S'abonner</button>
        </div>
        <div className={'flex flex-row items-center'}>
          <Like nbLikes={streamData.data.like} />
          <p className={'text-sm'}>{streamData.data.vue} vues</p>
        </div>
      </div>
    </div>
  );
}
