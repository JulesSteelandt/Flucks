'use client';

import {useRouter} from 'next/navigation';
import {usePathname} from 'next/navigation';
import Link from 'next/link';

// @ts-ignore
export default function Video({key, title, creator, id}) {
    const router = useRouter();
    const pathname = usePathname();

    const isPathnameMyVideos = () => {
        return pathname === '/flucks/my_videos';
    };

    return (
        <div className={'relative rounded-xl border-2 bg-[#5DA5B3] '} key={key}>
            <div
                className={'flex justify-center py-8'}
                onClick={() => {
                    return router.push(`/flucks/video/${id}`);
                }}
            >
                <img src={'/img/video_menu_logo.png'} alt={'play logo'} className={'w-12'}/>
            </div>
            {isPathnameMyVideos() &&
                <Link href={`/flucks/edit/${  id}`}>
                    <img src={'/img/pencil_icon.png'} alt={'Modifier'} width={25} className={'absolute right-0 top-0 m-2 w-6'} />
                </Link>
            }
            <div className={'flex flex-row justify-between rounded-b-xl bg-white p-2'}>
                <p className={'text-sm font-bold overflow-auto '}>{title}</p>
                <p className={'text-sm italic overflow-auto'}>{creator}</p>
            </div>
        </div>
    );
}
