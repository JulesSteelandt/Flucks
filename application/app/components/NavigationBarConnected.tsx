'use client';

import Link from 'next/link';
import {useState} from 'react';
import classNames from 'classnames';

export default function NavBarConnected() {
  const [subMenu, setSubMenu] = useState(false);
  const handleSubMenu = () => {
    setSubMenu(!subMenu);
  };

  return (
    <div
      className={
        'mt-0 flex w-1/6 min-w-48 flex-col items-center bg-[#394054] py-2 max-sm:w-screen max-sm:flex-row max-sm:justify-center md:h-screen'
      }
    >
      <input className={'mx-1 my-4 w-11/12 p-1.5 max-md:hidden'} type={'text'} placeholder={'Rechercher'} />
      <div className={'max-w-11/12 flex w-11/12 flex-col items-center max-sm:flex-row'}>
        <Link
          href={'/flucks/streams'}
          className={
            'my-1 flex flex-row items-center rounded-xl bg-white p-1 text-lg font-bold text-[#394054] max-sm:mx-1 max-sm:w-64 max-sm:justify-center sm:w-full'
          }
        >
          <img src={'/img/stream_menu_logo.png'} alt={'img logo'} width={30} />
          <p className={'ml-1 max-sm:hidden'}>Streams</p>
        </Link>
        <Link
          href={'/flucks/videos'}
          className={
            'my-1 flex flex-row items-center rounded-xl bg-white p-1 text-lg font-bold text-[#394054] max-sm:mx-1 max-sm:w-64 max-sm:justify-center sm:w-full'
          }
        >
          <img src={'/img/video_menu_logo.png'} alt={'img logo'} width={30} />
          <p className={'ml-1 max-sm:hidden'}>Vidéos</p>
        </Link>
        <Link
          href={'/flucks/map'}
          className={classNames(
            'my-1 flex flex-row items-center rounded-xl bg-white p-1 text-lg font-bold text-[#394054] max-sm:mx-1 max-sm:w-64 max-sm:justify-center sm:w-full',
            {},
          )}
        >
          <img src={'/img/map_menu_logo.png'} alt={'img logo'} width={30} />
          <p className={'ml-1 max-sm:hidden'}>Carte</p>
        </Link>
        <Link
          href={'/flucks/abonnements'}
          className={classNames(
            'my-1 flex flex-row items-center rounded-xl bg-white p-1 text-lg font-bold text-[#394054] max-sm:mx-1 max-sm:w-64 max-sm:justify-center sm:w-full',
            {},
          )}
        >
          <img src={'/img/abo_menu_logo.png'} alt={'img logo'} width={30} />
          <p className={'ml-1 max-sm:hidden'}>Abonnements</p>
        </Link>
        <button
          className={classNames(
            'my-1 flex flex-row items-center rounded-xl bg-white p-1 text-lg font-bold text-[#394054] max-sm:mx-1 max-sm:w-64 max-sm:justify-center sm:w-full',
            {'bg-gray-500': subMenu},
          )}
          onClick={handleSubMenu}
        >
          <img src={'/img/create_menu_logo.png'} alt={'img logo'} width={30} />
          <p className={'ml-1 max-sm:hidden'}>Créer</p>
        </button>
        <Link
          href={'/flucks/video/create'}
          className={classNames(
            'my-1 ml-6 flex flex-row items-center rounded-xl bg-white p-1 text-lg font-bold text-[#394054] max-sm:mx-1 max-sm:w-64 max-sm:justify-center',
            {hidden: !subMenu},
          )}
        >
          <img src={'/img/create_video_menu_logo.png'} alt={'img logo'} width={30} />
          <p className={'ml-1 max-sm:hidden'}>Publier une vidéo</p>
        </Link>
        <Link
          href={'/flucks/stream/create'}
          className={classNames(
            'my-1 ml-6 flex flex-row items-center rounded-xl bg-white p-1 text-lg font-bold text-[#394054] max-sm:mx-1 max-sm:w-64 max-sm:justify-center',
            {hidden: !subMenu},
          )}
        >
          <img src={'/img/create_stream_menu_logo.png'} alt={'img logo'} width={30} />
          <p className={'ml-1 max-sm:hidden'}>Passer en direct</p>
        </Link>
        <Link
          href={'/flucks/my_videos'}
          className={
            'my-1 flex w-full flex-row items-center rounded-xl bg-white p-1 text-lg font-bold text-[#394054] max-sm:mx-1 max-sm:w-64 max-sm:justify-center'
          }
        >
          <img src={'/img/my_videos_menu_logo.png'} alt={'img logo'} width={30} />
          <p className={'ml-1 max-sm:hidden'}>Mes vidéos</p>
        </Link>
        <Link
          href={'/flucks/emergency'}
          className={
            'my-1 flex w-full flex-row items-center rounded-xl bg-red-100 p-1 text-lg font-bold text-[#394054] max-sm:mx-1 max-sm:w-64 max-sm:justify-center'
          }
        >
          <img src={'/img/emergency.png'} alt={'mode urgence'} width={30} />
          <p className={'ml-1 max-sm:hidden'}>Mode Urgence</p>
        </Link>
      </div>
    </div>
  );
}
