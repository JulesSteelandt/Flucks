'use client';
import Link from 'next/link';

export default function NavBar() {
    return (
        <div
            className={'fixed left-0 max-md:w-full max-md:h-24 max-md:z-0 mt-0 flex h-screen w-1/6 flex-col items-center bg-[#394054] max-md:fixed max-md:bottom-0'}>
            <input className={'mx-1 my-4 w-11/12 p-1.5 max-md:hidden'} type={'text'} placeholder={'Rechercher'}/>
            <div
                className={'max-w-11/12 flex md:w-11/12 max-md:w-full md:flex-col max-md:flex-row items-center md:justify-center'}>
                <Link
                    href={'/flucks/streams'}
                    className='navBarButtonNoConnected'
                >
                    <img src={'/img/video_menu_logo.png'} alt={'img logo'} width={30}/>
                    <p className={'ml-1 max-md:hidden max-lg:text-sm'}>Streams</p>
                </Link>
                <Link
                    href={'/flucks/videos'}
                    className='navBarButtonNoConnected'
                >
                    <img src={'/img/stream_menu_logo.png'} alt={'img logo'} width={30}/>
                    <p className={'ml-1 max-md:hidden max-lg:text-sm'}>Vidéos</p>
                </Link>
                <Link
                    href={'/flucks/map'}
                    className='navBarButtonNoConnected'
                >
                    <img src={'/img/map_menu_logo.png'} alt={'img logo'} width={30}/>
                    <p className={'ml-1 max-md:hidden max-lg:text-sm'}>Carte</p>
                </Link>
            </div>
        </div>
    );
}
