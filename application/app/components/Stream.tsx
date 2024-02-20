'use client'

import {useRouter} from "next/navigation";
import {useState} from "react";

export default function Stream({title, creator, emergency, id} : {title: string, creator: string, emergency: boolean, id: string}) {
    const router = useRouter();

    return (
        <div className={'border-2 rounded-xl bg-[#B0C0D4] xl:w-1/4 max-xl:w-1/3 max-md:w-1/2 relative'}>
            <div className={'flex justify-center py-8'} onClick={() => router.push('/flucks/stream/' + id)}>
                <img src={"/img/stream_menu_logo.png"} alt={"play logo"} className={'w-12'}/>
            </div>
            {
                emergency && (
                    <img src={"/img/emergency.png"} className={'w-6 m-2 absolute right-0 top-0'} alt={'!'}/>
                )
            }
            <div className={'flex flex-row justify-between bg-white rounded-b-xl p-2'}>
                <p className={'text-sm font-bold'}>{title}</p>
                <p className={'text-sm italic'}>{creator}</p>
            </div>
        </div>
    )
}