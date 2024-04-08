'use client';

import Like from '@/app/components/Like';
import VideoContent from '@/app/components/VideoContent';
import {formatAbonnements} from '@/app/flucks/likes';
import {API_DIFFUSIONS} from '@/app/utils/appGlobal';

export default async function Page({
  params,
}: {
  params: {
    id: string;
  };
}) {
  const fetchVideoDataWithID = async () => {
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

  const videoData = await fetchVideoDataWithID();
  const areCommentsEmpty = () => {
    return videoData.data.commentaires === null;
  };

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
      <div className={'flex flex-col bg-gray-300 p-4'}>
        <div className={'flex flex-row items-center'}>
          <p className={'pr-3 font-bold'}>Commentaires</p>
          <img src={'/img/chat_icon.png'} alt={'chat'} width={40} />
        </div>
        <input type={'text'} placeholder={'Écrire un commentaire ...'} className={'my-4 w-full p-1'} />
        {areCommentsEmpty() ? (
          <p>Pas de commentaires</p>
        ) : (
          videoData.data.commentaires.map((comment: any) => {
            return (
              <div className={'flex flex-row justify-between'}>
                <p>{comment.commentaire}</p>
                <p>{comment.pseudo}</p>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
