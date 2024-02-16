'use client';

import {fetchDiffusionDataWithID} from '@/app/data';
import Like from '@/app/components/Like';
import VideoContent from '@/app/components/VideoContent';
import {formatAbonnements} from '@/app/flucks/likes';

export default async function Page({
  params,
}: {
  params: {
    id: string;
  };
}) {
  const videoData = await fetchDiffusionDataWithID(params.id);
  return (
    <div className={'m-8 w-5/6 p-4'}>
      <VideoContent id={params.id} />
      <div className={'flex flex-row'}>
        <p className={'w-5/6 bg-[#D9D9D9] p-4 text-center font-bold'}>{videoData.data.titre}</p>
        <p className={'w-1/6 p-4 text-center italic underline'}>{videoData.data.createur.pseudo}</p>
      </div>
      <div className={'flex flex-row justify-between'}>
        <div className={'flex flex-row items-center p-4'}>
          <p className={'mx-2 font-mono text-xl font-extrabold text-[#394054]'}>
            {formatAbonnements(videoData.data.createur.abonnees)}
          </p>
          <button className={'rounded-full bg-[#394054] px-4 py-2 font-bold text-white'}>S'abonner</button>
        </div>
        <div className={'flex flex-row items-center'}>
          <Like nbLikes={videoData.data.like} />
          <p className={'text-sm'}>{videoData.data.vue} vues</p>
        </div>
      </div>
    </div>
  );
}
