'use client'

import React from "react";
import Link from "next/link";
import {useRouter} from "next/navigation";

export default function Header() {

    const router = useRouter();

    return (
        <header className={'flex flex-row justify-between bg-[#5DA5B3] p-4'}>
            <img src={'/img/flucks_logo.png'} alt={'logo flucks'} className={'w-72'} onClick={() => router.push('/flucks')}/>
            <div className={'flex flex-row justify-center items-center'}>
                <div className={'flex flex-col mr-4'}>
                    <Link href={'/flucks/inscription'} className={'bg-white font-bold rounded-2xl p-1 my-1 flex justify-center'}>S'inscrire</Link>
                    <Link href={'/flucks/login'} className={'bg-white font-bold rounded-2xl p-1 my-1 flex justify-center'}>Se connecter</Link>
                </div>
                <img src={'/img/flucks_profile.png'} alt={'flucks profile'} className={'rounded-t-full rounded-br-full w-28'} onClick={() => router.push('/flucks/user')}/>
            </div>
        </header>
    )
}
