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
          <StreamerHost id={params.id} />
                <p className={'bg-[#D9D9D9] w-5/6 text-center p-4 font-bold'}>{streamData.data.titre}</p>
            <div className={'flex flex-row justify-between'}>

            </div>



        </div>

    );
}