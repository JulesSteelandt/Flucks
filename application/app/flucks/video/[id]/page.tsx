'use client';

import {useEffect, useState} from 'react';
import Like from '@/app/components/Like';
import VideoContent from '@/app/components/VideoContent';
import {API_DIFFUSIONS, API_LIKE, API_POST_COMMENT, API_SABONNER} from '@/app/utils/appGlobal';
import {formatAbonnements} from '@/app/flucks/likes';
import {getCookieToken} from '@/app/utils/getToken';

export default function Page({params}: {params: {id: string}}) {
  const [commentInput, setCommentInput] = useState('');
  const [videoData, setVideoData] = useState<any>(null);
  const [emptyComment, setEmptyComment] = useState<boolean>(false);
  const [nmbAbonnements, setNmbAbonnements] = useState<number>(0);
  const [abonne, setAbonne] = useState<boolean>(false);
  const [nmbLikes, setNmbLikes] = useState<number>(0);
  const [isLike, setIsLike] = useState<boolean>(false);

  useEffect(() => {
    fetchVideoDataWithID();
  }, [params.id]);

  const userLike = async () => {
    try {
      const token = await getCookieToken();
      const response = await fetch(`${API_LIKE}/${params.id}`, {
        cache: 'no-cache',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({like: !isLike}),
      });
      if (response.ok) {
        setIsLike(!isLike);
        if (isLike) {
          setNmbLikes(nmbLikes - 1);
        } else {
          setNmbLikes(nmbLikes + 1);
        }
      } else {
        const errorData = await response.json();
        console.error('Erreur lors de la requête:', errorData);
      }
    } catch (error) {
      console.error('Erreur lors de la requête:', error);
    }
  };

  const fetchVideoDataWithID = async () => {
    try {
      const token = await getCookieToken();
      const res = await fetch(`${API_DIFFUSIONS}/${params.id}`, {
        cache: 'no-cache',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      if (!res.ok) {
        console.error('Données non chargées');
        return;
      }
      const data = await res.json();
      setVideoData(data);
      setAbonne(data.data.isAbonne);
      setNmbLikes(Number(data.data.like));
      setIsLike(data.data.isLike);
      setNmbAbonnements(Number(data.data.createur.abonnees));
    } catch (e) {
      console.error('Erreur lors de la récupération des données de la vidéo:', e);
    }
  };

  const sendComment = async () => {
    try {
      if (commentInput.trim().length > 0) {
        setEmptyComment(false);
        const token = await getCookieToken();
        const response = await fetch(`${API_POST_COMMENT}/${params.id}`, {
          cache: 'no-cache',
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({commentaire: commentInput}),
        });
        if (!response.ok) {
          console.log("Le commentaire n'a pas pu être envoyé");
        } else {
          fetchVideoDataWithID();
        }
      } else {
        setEmptyComment(true);
      }
    } catch (error) {
      console.error("Erreur lors de l'envoi du commentaire:", error);
    }
  };

  const areCommentsEmpty = () => {
    return videoData?.data.commentaires === null;
  };

  const abonnement = async () => {
    try {
      const token = await getCookieToken();
      const response = await fetch(`${API_SABONNER}`, {
        cache: 'no-cache',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({email: videoData.data.createur.email, abonne: !abonne}),
      });

      // Vérifier si la réponse est réussie (status 2xx)
      if (response.ok) {
        setAbonne(!abonne);
        if (abonne) {
          setNmbAbonnements(nmbAbonnements - 1);
        } else {
          setNmbAbonnements(nmbAbonnements + 1);
        }
      } else {
        // Si la réponse n'est pas réussie, afficher le message d'erreur
        const errorData = await response.json();
        console.error('Erreur lors de la requête:', errorData);
      }
    } catch (error) {
      console.error('Erreur lors de la requête:', error);
    }
  };

  return (
    <div className={'m-8 w-5/6 p-4'}>
      {videoData && (
        <>
          <VideoContent id={params.id} />
          <div className={'flex md:flex-row max-md:flex-col'}>
            <p className={'md:w-5/6 max-md:w-full bg-[#D9D9D9] p-4 text-center font-bold'}>{videoData.data.titre}</p>
            <p className={'md:w-1/6 p-4 text-center italic underline'}>{videoData.data.createur.pseudo}</p>
          </div>
          <div className={'flex sm:flex-row max-sm:flex-col sm:justify-between'}>
            <div className={'flex flex-row items-center p-4 max-sm:justify-center'}>
              <p className={'mx-2 font-mono text-xl font-extrabold text-[#394054]'}>
                {formatAbonnements(nmbAbonnements)}
              </p>
              <button className={'rounded-full bg-[#394054] px-4 py-2 font-bold text-white'} onClick={abonnement}>
                {abonne ? 'Se désabonner' : "S'abonner"}
              </button>
            </div>
            <div className={'flex flex-row items-center max-sm:justify-around max-sm:mb-4'}>
              <Like nmbLikes={nmbLikes} isLike={isLike} like={userLike} />
              <p className={'text-sm'}>{videoData.data.vue} vues</p>
            </div>
          </div>
          <div className={'flex flex-col bg-gray-300 p-4 max-md:mb-28'}>
            <div className={'flex flex-row items-center'}>
              <p className={'pr-3 font-bold'}>Commentaires</p>
              <img src={'/img/chat_icon.png'} alt={'chat'} width={40} />
            </div>
            <div className={'flex flex-row'}>
              <input
                type={'text'}
                placeholder={'Écrire un commentaire ...'}
                className={'my-4 w-full p-1'}
                onChange={(e) => {
                  return setCommentInput(e.target.value);
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    sendComment();
                  }
                }}
              />
              <button className={'py-0 pl-4'} onClick={sendComment}>
                <img src={'/img/pencil_icon.png'} alt={'Envoyer'} width={20} />
              </button>
            </div>
            {emptyComment && <p>Votre commentaire n'est pas valide</p>}
            {areCommentsEmpty() ? (
              <p>Pas de commentaires</p>
            ) : (
              videoData.data.commentaires
                .slice()
                .reverse()
                .map((comment: any, index: number) => {
                  return (
                    <div key={index} className={'flex flex-col border-b-2 border-gray-200 py-4 last:border-none'}>
                      <p className={'text-sm italic font-bold'}>@{comment.pseudo} a écrit :</p>
                      <p className={'pt-2 max-sm:text-sm'}>{comment.commentaire}</p>
                    </div>
                  );
                })
            )}
          </div>
        </>
      )}
    </div>
  );
}
