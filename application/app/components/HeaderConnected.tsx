'use client';

import React from 'react';
import Link from 'next/link';
import {useRouter} from 'next/navigation';

export default function HeaderConnected() {
    const router = useRouter();

    const handleLogout = () => {
    };

    return (
        <header className={'flex sticky top-0 sm:flex-row max-sm:flex-col justify-between bg-[#5DA5B3] p-4 z-10'}>
            <div className={'flex flex-row max-md:justify-around max-md:items-center max-sm:mb-4'}>
                <img src={'/img/flucks_logo.png'} alt={'logo flucks'} className={'md:w-72 max-md:w-48 max-md:h-16'}
                     onClick={() => router.push('/flucks')}/>
                <img src={'/img/flucks_profile.png'} alt={'flucks profile'}
                     className={'rounded-t-full rounded-br-full w-28 sm:hidden max-md:w-20'}
                     onClick={() => router.push('/flucks/user')}/>
            </div>
            <div className={'flex flex-row items-center justify-center'}>
                <div className={'flex sm:flex-col max-sm:flew-row mr-4 max-sm:gap-2'}>
                    <Link href={'/flucks/user'}
                          className={'my-1 flex justify-center rounded-2xl bg-white p-1 font-bold max-sm:px-4'}>
                        Mon compte
                    </Link>
                    <Link href={'/flucks/deconnexion'}
                          className={'my-1 flex justify-center rounded-2xl bg-white py-1 px-2 font-bold max-sm:px-4'}>
                        Se déconnecter
                    </Link>
                </div>
                <img src={'/img/flucks_profile.png'} alt={'flucks profile'}
                     className={'rounded-t-full rounded-br-full w-28 max-sm:hidden'}
                     onClick={() => router.push('/flucks/user')}/>
            </div>
        </header>
    );
}
