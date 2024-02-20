import {fetchDiffusionDataWithID} from '@/app/data';
import React from 'react';
import StreamerHost from '@/app/flucks/stream/[id]/host/components/StreamerComponent';

export default async function Page({params}: {
    params: {
        id: string
    }
}) {
    const streamData = await fetchDiffusionDataWithID(params.id);
    return (
        <div className={'p-4 w-5/6 m-8'}>
            <div className={'bg-gray-200 w-[calc(100% - 32px)] h-2/3 flex justify-center items-center mb-4'}>ID du stream
                : <strong>{params.id}</strong></div>
            <div className={'flex flex-row'}>
                <p className={'bg-[#D9D9D9] w-5/6 text-center p-4 font-bold'}>{streamData.data.titre}</p>
                <p className={'w-1/6 text-center p-4 italic underline'}>{streamData.data.createur.pseudo}</p>
            </div>
            <div className={'flex flex-row justify-between'}>

            </div>


          <StreamerHost/>
        </div>

    );
}