'use client'

import { useEffect, useState } from "react";
import Like from '@/app/components/Like';
import VideoContent from '@/app/components/VideoContent';
import { formatAbonnements } from '@/app/flucks/likes';
import { API_DIFFUSIONS, API_POST_COMMENT } from '@/app/utils/appGlobal';
import { getCookieToken } from "@/app/utils/getToken";

export default function Page({ params }: { params: { id: string; }; }) {
    const [commentInput, setCommentInput] = useState('');
    const [videoData, setVideoData] = useState<any>(null);
    const [emptyComment, setEmptyComment] = useState<boolean>(false);

    useEffect(() => {
        fetchVideoDataWithID();
    }, [params.id]);

    const fetchVideoDataWithID = async () => {
        try {
            const res = await fetch(`${API_DIFFUSIONS}/${params.id}`, { cache: 'no-cache' });
            if (!res.ok) {
                console.error('Données non chargées');
                return;
            }
            const data = await res.json();
            setVideoData(data);
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
                        'Authorization': `Bearer ${token}`,
                    },
                    body: JSON.stringify({ commentaire: commentInput }),
                });
                if (!response.ok) {
                    console.log('Le commentaire n\'a pas pu être envoyé');
                } else {
                    // Réinitialiser le champ d'entrée et le state une fois le commentaire publié avec succès
                    setCommentInput('');
                    fetchVideoDataWithID();
                }
            } else {
                setEmptyComment(true);
            }
        } catch (error) {
            console.error('Erreur lors de l\'envoi du commentaire:', error);
        }
    };

    const areCommentsEmpty = () => {
        return videoData?.data.commentaires === null;
    };

    return (
        <div className={'m-8 w-5/6 p-4'}>
            {videoData && (
                <>
                    <VideoContent id={params.id} />
                    <div className={'flex sm:flex-row max-sm:flex-col'}>
                        <p className={'sm:w-5/6 max-sm:w-full bg-[#D9D9D9] p-4 text-center font-bold'}>{videoData.data.titre}</p>
                        <p className={'sm:w-1/6 max-sm:w-full p-4 text-center italic underline'}>{videoData.data.createur.pseudo}</p>
                    </div>
                    <div className={'flex sm:flex-row max-sm:flex-col sm:justify-between'}>
                        <div className={'flex flex-row items-center p-4 max-lg:justify-center'}>
                            <p className={'mx-2 font-mono text-xl font-extrabold text-[#394054]'}>
                                {formatAbonnements(videoData.data.createur.abonnees)}
                            </p>
                            <button className={'rounded-full bg-[#394054] px-4 py-2 font-bold text-white'}>S'abonner</button>
                        </div>
                        <div className={'flex flex-row items-center max-sm:pb-4 max-lg:justify-around'}>
                            <Like nbLikes={videoData.data.like}/>
                            <p className={'text-sm'}>{videoData.data.vue} vues</p>
                        </div>
                    </div>
                    <div className={'flex flex-col bg-gray-300 p-4 max-lg:mb-28'}>
                        <div className={'flex flex-row items-center'}>
                            <p className={'pr-3 font-bold'}>Commentaires</p>
                            <img src={'/img/chat_icon.png'} alt={'chat'} width={40} />
                        </div>
                        <div className={'flex flex-row'}>
                            <input type={'text'} placeholder={'Écrire un commentaire ...'} className={'my-4 w-full p-1'}
                                   value={commentInput}
                                   onChange={(e) => setCommentInput(e.target.value)}
                                   onKeyDown={(e) => {
                                       if (e.key === 'Enter') {
                                           sendComment();
                                       }
                                   }} />
                            <button className={'py-0 pl-4'} onClick={sendComment}>
                                <img src={'/img/pencil_icon.png'} alt={'Envoyer'} width={20} />
                            </button>
                        </div>
                        {emptyComment && <p>Votre commentaire n'est pas valide</p>}
                        {areCommentsEmpty() ? (
                            <p>Pas de commentaires</p>
                        ) : (
                            videoData.data.commentaires.slice().reverse().map((comment: any, index: number) => (
                                <div key={index}
                                     className={'flex flex-col py-4 border-b-2 border-gray-200 last:border-none'}>
                                    <p className={'text-sm italic font-bold'}>@{comment.pseudo} a écrit :</p>
                                    <p className={'pt-2 max-sm:text-sm'}>{comment.commentaire}</p>
                                </div>
                            ))
                        )}
                    </div>
                </>
            )}
        </div>
    );
}
