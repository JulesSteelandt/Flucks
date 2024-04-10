'use client';
import Link from 'next/link';

export default function NavBar() {
  return (
    <div
      className={
        'fixed left-0 mt-0 flex h-screen w-1/6 flex-col items-center bg-[#394054] max-md:fixed max-md:bottom-0 max-md:z-0 max-md:h-24 max-md:w-full'
      }
    >
      <div
        className={
          'max-w-11/12 flex items-center max-md:w-full max-md:flex-row md:w-11/12 md:flex-col md:justify-center'
        }
      >
        <Link href={'/flucks/streams'} className='navBarButtonNoConnected'>
          <img src={'/img/video_menu_logo.png'} alt={'img logo'} width={30} />
          <p className={'ml-1 max-lg:text-sm max-md:hidden'}>Streams</p>
        </Link>
        <Link href={'/flucks/videos'} className='navBarButtonNoConnected'>
          <img src={'/img/stream_menu_logo.png'} alt={'img logo'} width={30} />
          <p className={'ml-1 max-lg:text-sm max-md:hidden'}>Vidéos</p>
        </Link>
        <Link href={'/flucks/map'} className='navBarButtonNoConnected'>
          <img src={'/img/map_menu_logo.png'} alt={'img logo'} width={30} />
          <p className={'ml-1 max-lg:text-sm max-md:hidden'}>Carte</p>
        </Link>
      </div>
    </div>
  );
}
