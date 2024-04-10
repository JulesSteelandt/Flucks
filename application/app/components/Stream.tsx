'use client';

import {useRouter} from 'next/navigation';

export default function Stream({key, title, creator, emergency, id}) {
    const router = useRouter();

    return (
        <div className={'relative flex flex-col rounded-xl border-2 bg-[#B0C0D4] hover:scale-105 duration-300'} key={key}>
            <div
                className={'flex justify-center py-8'}
                onClick={() => {
                    return router.push(`/flucks/stream/${id}`);
                }}
            >
                <img src={'/img/stream_menu_logo.png'} alt={'play logo'} className={'w-12'}/>
            </div>
            {emergency && <img src={'/img/emergency.png'} className={'absolute right-0 top-0 m-2 w-6'} alt={'!'}/>}
            <div className={'flex flex-row justify-between rounded-b-xl bg-white p-2 mt-auto overflow-x-auto gap-4'}>
                <p className={'text-sm font-bold'}>{title}</p>
                <p className={'text-sm italic'}>{creator}</p>
            </div>
        </div>
    );
}
