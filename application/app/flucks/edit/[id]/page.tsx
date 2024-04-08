'use client';

import {useEffect, useState} from 'react';
import Video from '@/app/components/Video';
import CheckboxLinear from '@/app/components/CheckboxLinear';
import {API_DIFFUSIONS} from '@/app/utils/appGlobal';

export default function Page({
  params,
}: {
  params: {
    id: string;
  };
}) {
  const [comments, setComments] = useState([]);
  const [editData, setEditData] = useState<any>(null); // Le type peut être ajusté selon la structure des données de votre API

  useEffect(() => {
    const fetchEditDataWithID = async () => {
      try {
        const res = await fetch(`${API_DIFFUSIONS}/${params.id}`, {cache: 'no-cache'});
        if (!res.ok) {
          console.error('Erreur de récupération des marqueurs');
          return;
        }
        const data = await res.json();
        if (Array.isArray(data.data.commentaires)) {
          setComments(data.data.commentaires);
        } else {
          setComments([]);
        }
        setEditData(data.data);
      } catch (e) {
        console.error('Erreur lors de la récupération des données:', e);
      }
    };

    fetchEditDataWithID();
  }, []);

  return (
    <div className={'m-8 w-5/6 p-4'}>
      <p className={'mb-4 text-center text-xl font-bold'}>Modification de la vidéo</p>
      <div className={'flex justify-center'}>
        {editData && <Video title={editData.titre} creator={editData.createur.pseudo} id={params.id} />}
      </div>
      <div className={'mt-8 flex w-full flex-row'}>
        <div className={'w-1/2 border-r-2 border-black p-4'}>
          <div className={'mb-4'}>
            <p>Modifier le titre :</p>
            <input type={'text'} className={'w-full rounded-md border-2 p-1'} placeholder={'Nouveau titre ...'} />
          </div>
          <div className={'mb-4'}>
            <p>Modifier la description :</p>
            <input
              type={'text'}
              className={'w-full rounded-md border-2 p-1'}
              placeholder={'Nouvelle description ...'}
            />
          </div>
          <div className={'flex flex-row justify-between'}>
            <div className={'flex flex-row items-center rounded-full bg-gray-200 px-4 py-2'}>
              <CheckboxLinear />
              <p className={'ml-2'}>Vidéo privée</p>
            </div>
            <button
              className={
                'mr-4 rounded-xl bg-[#19AFFB] px-6 py-2 text-sm font-bold text-white hover:border-2 hover:bg-white hover:text-[#19AFFB]'
              }
            >
              Enregister
            </button>
          </div>
          <button
            className={
              'm-4 rounded-xl bg-[#A91208] px-6 py-2 text-sm font-bold text-white hover:border-2 hover:bg-white hover:text-[#A91208]'
            }
          >
            Supprimer la vidéo
          </button>
        </div>
        <div className={'w-1/2'}>
          <p className={'text-center font-bold'}>Liste des commentaires</p>
          {comments.length > 0 ? (
            comments.map((comment: any) => {
              return (
                <div
                  className={'m-4 flex flex-row items-center justify-between border-b-2 border-black bg-gray-200 p-2'}
                >
                  <div className={'p-2'}>
                    <p className={'w-full font-bold'}>{comment.commentaire}</p>
                    <p className={'italic'}>{comment.pseudo}</p>
                  </div>
                  <button className={'mr-2'}>
                    <img src={'/img/trash_icon.png'} alt={'trash'} width={30} />
                  </button>
                </div>
              );
            })
          ) : (
            <p className='text-center text-gray-500'>Aucun commentaire</p>
          )}
        </div>
      </div>
    </div>
  );
}
