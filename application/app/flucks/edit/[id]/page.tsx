'use client'

import {fetchDiffusionDataWithID} from "@/app/data";
import Video from "@/app/components/Video";
import CommentsList from "@/app/components/CommentsList";

export default async function Page({params}: {
    params: {
        id: string;
    };
}) {
    const editData = await fetchDiffusionDataWithID(params.id);

    return (
        <div className={'m-8 w-5/6 p-4'}>
            <p className={'font-bold text-xl text-center mb-4'}>Modification de la vidéo</p>
            <div className={'flex justify-center'}>
                <Video title={editData.data.titre} creator={editData.data.createur.pseudo} id={params.id}/>
            </div>
            <div className={'flex flex-row w-full mt-8'}>
                <div className={'w-1/2 border-r-2 border-black p-4'}>
                    <div className={'mb-4'}>
                        <p>Modifier le titre :</p>
                        <input type={"text"} className={'border-2 w-11/12 p-1 rounded-md'} placeholder={'Nouveau titre ...'}/>
                    </div>
                    <div className={'mb-4'}>
                        <p>Modifier la description :</p>
                        <input type={"text"} className={'border-2 w-11/12 p-1 rounded-md'} placeholder={'Nouvelle description ...'}></input>
                    </div>
                    <div className={'flex flex-row'}>
                        <p>Vidéo privée</p>
                        <button
                            className={'mr-4 rounded-xl bg-[#19AFFB] px-6 py-2 text-sm font-bold text-white hover:border-2 hover:bg-white hover:text-[#19AFFB]'}>Enregister
                        </button>
                    </div>
                    <button
                        className={'mr-4 rounded-xl bg-[#A91208] px-6 py-2 text-sm font-bold text-white hover:border-2 hover:bg-white hover:text-[#A91208]'}>Supprimer
                        la vidéo
                    </button>
                </div>
                <div className={'w-1/2'}>
                    <p className={'font-bold text-center'}>Liste des commentaires</p>
                    {editData.data.commentaires.map((comment) => {
                        return (
                            <div className={'flex flex-row justify-between items-center bg-gray-200 p-2 m-4 border-b-2 border-black'}>
                                <div className={'p-2'}>
                                    <p className={'w-full font-bold'}>{comment.commentaire}</p>
                                    <p className={'italic'}>{comment.pseudo}</p>
                                </div>
                                <button className={'mr-2'}>
                                    <img src={'/img/trash_icon.png'} alt={'trash'} width={30}/>
                                </button>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}