'use client'

import {useRouter, usePathname} from "next/navigation";
import Link from "next/link";

export default function Video({ title, creator, id }: { title: string; creator: string; id: string }) {
    const router = useRouter();
    const pathNameTest = usePathname();

    return (
        <div className={'border-2 rounded-xl bg-[#5DA5B3] w-1/3 m-2'}>
            <div className={'flex justify-center py-8'} onClick={() => router.push('/flucks/video/' + id)}>
                <img src={"/img/play_icon.png"} alt={"play logo"} className={'w-12'}/>
            </div>
            {(pathNameTest === "/flucks/my_videos") && (
                <Link href={'/flucks/edit/' + id} className={'m-2 absolute right-0 top-0'}>
                    Modifier
                </Link>
            )}
            <div className={'flex flex-row justify-between bg-white rounded-b-xl p-2'}>
                <p className={'text-sm font-bold'}>{title}</p>
                <p className={'text-sm italic'}>{creator}</p>
            </div>
        </div>
    )
}