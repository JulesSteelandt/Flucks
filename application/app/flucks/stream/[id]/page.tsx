import {fetchDiffusionDataWithID} from '@/app/data';
import Like from '@/app/components/Like';
import {formatAbonnements} from '@/app/flucks/likes';
import React from 'react';
import ViewerComponent from '@/app/flucks/stream/[id]/components/ViewerComponent';

export default async function Page({params}: {
    params: {
        id: string
    }
}) {
    const streamData = await fetchDiffusionDataWithID(params.id);
    return (
        <div className={'p-4 w-5/6 m-8'}>

              <ViewerComponent id={params.id} />
            <div className={'flex flex-row'}>
                <p className={'bg-[#D9D9D9] w-5/6 text-center p-4 font-bold'}>{streamData.data.titre}</p>
                <p className={'w-1/6 text-center p-4 italic underline'}>{streamData.data.createur.pseudo}</p>
            </div>
            <div className={'flex flex-row justify-between'}>
                <div className={'flex flex-row items-center p-4'}>
                    <p className={'font-extrabold text-xl text-[#394054] mx-2 font-mono'}>{formatAbonnements(streamData.data.createur.abonnees)}</p>
                    <button className={'bg-[#394054] text-white px-4 py-2 rounded-full font-bold'}>S'abonner</button>
                </div>
                <div className={'flex flex-row items-center'}>
                    <Like nbLikes={streamData.data.like}/>
                    <p className={'text-sm'}>{streamData.data.vue} vues</p>
                </div>
            </div>
        </div>

    );
}