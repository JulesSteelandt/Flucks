'use client';

import React from 'react';
import Link from 'next/link';
import {useRouter} from 'next/navigation';

export default function HeaderConnected() {
  const router = useRouter();

  const handleLogout = () => {};

  return (
    <header className={'flex flex-row justify-between bg-[#5DA5B3] p-4'}>
      <img
        src={'/img/flucks_logo.png'}
        alt={'logo flucks'}
        className={'w-72'}
        onClick={() => {
          return router.push('/flucks');
        }}
      />
      <div className={'flex flex-row items-center justify-center'}>
        <div className={'mr-4 flex flex-col'}>
          <Link href={'/flucks/user'} className={'my-1 flex justify-center rounded-2xl bg-white p-1 font-bold'}>
            Mon compte
          </Link>
          <Link href={'/flucks/deconnexion'} className={'my-1 flex justify-center rounded-2xl bg-white p-1 font-bold'}>
            Se deconnecter
          </Link>
        </div>
        <img src={'/img/flucks_profile.png'} alt={'flucks profile'} className={'w-28 rounded-t-full rounded-br-full'} />
      </div>
    </header>
  );
}
