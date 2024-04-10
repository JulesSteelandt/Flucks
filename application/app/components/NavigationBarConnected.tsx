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
        'fixed mt-0 flex h-screen w-1/6 flex-col items-center overflow-hidden bg-[#394054] max-md:fixed max-md:bottom-0 max-md:z-0 max-md:h-24 max-md:w-full'
      }
    >
      <div
        className={
          'max-w-11/12 flex items-center max-md:w-full max-md:flex-row md:w-11/12 md:flex-col md:justify-center'
        }
      >
        <Link href={'/flucks/streams'} className='navBarButtonConnected'>
          <img src={'/img/stream_menu_logo.png'} alt={'img logo'} width={30} />
          <p className={'ml-1 max-lg:text-sm max-md:hidden'}>Streams</p>
        </Link>
        <Link href={'/flucks/videos'} className='navBarButtonConnected'>
          <img src={'/img/video_menu_logo.png'} alt={'img logo'} width={30} />
          <p className={'ml-1 max-lg:text-sm max-md:hidden'}>Vidéos</p>
        </Link>
        <Link href={'/flucks/map'} className='navBarButtonConnected'>
          <img src={'/img/map_menu_logo.png'} alt={'img logo'} width={30} />
          <p className={'ml-1 max-lg:text-sm max-md:hidden'}>Carte</p>
        </Link>
        <Link href={'/flucks/abonnements'} className='navBarButtonConnected'>
          <img src={'/img/abo_menu_logo.png'} alt={'img logo'} width={30} />
          <p className={'ml-1 max-lg:text-sm max-md:hidden'}>Abonnements</p>
        </Link>
        <button
          className={classNames(
            'my-1 flex flex-row items-center rounded-xl bg-white p-1 text-lg font-bold text-[#394054] max-md:mx-1 max-md:w-64 max-md:justify-center md:w-full',
            {'bg-gray-500': subMenu},
          )}
          onClick={handleSubMenu}
        >
          <img src={'/img/create_menu_logo.png'} alt={'img logo'} width={30} />
          <p className={'ml-1 max-lg:text-sm max-md:hidden'}>Créer</p>
        </button>
        <Link
          href={'/flucks/video/create'}
          className={classNames(
            'my-1 ml-6 flex flex-row items-center rounded-xl bg-white p-1 text-lg font-bold text-[#394054] max-md:mx-1 max-md:w-64 max-md:justify-center',
            {hidden: !subMenu},
          )}
        >
          <img src={'/img/create_video_menu_logo.png'} alt={'img logo'} width={30} />
          <p className={'ml-1 max-lg:text-sm max-md:hidden'}>Publier une vidéo</p>
        </Link>
        <Link
          href={'/flucks/stream/create'}
          className={classNames(
            'my-1 ml-6 flex flex-row items-center rounded-xl bg-white p-1 text-lg font-bold text-[#394054] max-md:mx-1 max-md:w-64 max-md:justify-center',
            {hidden: !subMenu},
          )}
        >
          <img src={'/img/create_stream_menu_logo.png'} alt={'img logo'} width={30} />
          <p className={'ml-1 max-lg:text-sm max-md:hidden'}>Passer en direct</p>
        </Link>
        <Link href={'/flucks/my_videos'} className='navBarButtonConnected'>
          <img src={'/img/my_videos_menu_logo.png'} alt={'img logo'} width={30} />
          <p className={'ml-1 max-lg:text-sm max-md:hidden'}>Mes vidéos</p>
        </Link>
        <Link href={'/flucks/emergency'} className='navBarButtonConnected'>
          <img src={'/img/emergency.png'} alt={'mode urgence'} width={30} />
          <p className={'ml-1 max-lg:text-sm max-md:hidden'}>Mode Urgence</p>
        </Link>
      </div>
    </div>
  );
}
