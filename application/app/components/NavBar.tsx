'use client';
import Link from 'next/link';
import classNames from 'classnames';

export default function NavBar() {
  return (
    <div className={'mt-0 flex h-screen w-1/6 flex-col items-center bg-[#394054]'}>
      <input className={'mx-1 my-4 w-11/12 p-1.5 max-sm:hidden'} type={'text'} placeholder={'Rechercher'} />
      <div className={'max-w-11/12 flex w-11/12 flex-col items-center max-sm:flex-row'}>
        <Link
          href={'/flucks'}
          className={
            'my-1 flex flex-row items-center rounded-xl bg-white p-1 text-lg font-bold text-[#394054] max-sm:mx-1 max-sm:w-64 max-sm:justify-center sm:w-full'
          }
        >
          <img src={'/img/video_menu_logo.png'} alt={'img logo'} width={30} />
          <p className={'ml-1 max-sm:hidden'}>Streams</p>
        </Link>
        <Link
          href={'/flucks'}
          className={
            'my-1 flex flex-row items-center rounded-xl bg-white p-1 text-lg font-bold text-[#394054] max-sm:mx-1 max-sm:w-64 max-sm:justify-center sm:w-full'
          }
        >
          <img src={'/img/stream_menu_logo.png'} alt={'img logo'} width={30} />
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
      </div>
      ;
    </div>
  );
}
