'use client';

import {useRouter} from 'next/navigation';

export default function Video({ title, creator, id }) {
    const router = useRouter();
    return (
        <div id='carte' className={'border-2 rounded-xl bg-[#5DA5B3] w-1/3 m-2'}>
            <div className={'flex justify-center py-8'} onClick={() => {
return router.push(`/flucks/video/${  id}`);
}}>
                <img src={'/img/video_play_img.png'} alt={'play logo'} className={'w-12'}/>
            </div>
            <div className={'flex flex-row justify-between bg-white rounded-b-xl p-2'}>
                <p className={'text-sm font-bold'}>{title}</p>
                <p className={'text-sm italic'}>{creator}</p>
            </div>
        </div>
    );
}