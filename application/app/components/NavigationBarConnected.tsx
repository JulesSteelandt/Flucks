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
                'fixed overflow-hidden max-md:w-full max-md:h-24 max-md:z-0 mt-0 flex h-screen w-1/6 md:flex-col items-center bg-[#394054] max-md:fixed max-md:bottom-0 max-md:items-center'
            }
        >
            <input className={'mx-1 my-4 w-11/12 p-1.5 max-md:hidden'} type={'text'} placeholder={'Rechercher'}/>
            <div
                className={'max-w-11/12 flex md:w-11/12 max-md:w-full md:flex-col max-md:flex-row'}>
                <Link
                    href={'/flucks/streams'}
                    className='navBarButtonConnected'
                >
                    <img src={'/img/stream_menu_logo.png'} alt={'img logo'} width={30}/>
                    <p className={'ml-1 max-md:hidden max-lg:text-sm'}>Streams</p>
                </Link>
                <Link
                    href={'/flucks/videos'}
                    className='navBarButtonConnected'
                >
                    <img src={'/img/video_menu_logo.png'} alt={'img logo'} width={30}/>
                    <p className={'ml-1 max-md:hidden max-lg:text-sm'}>Vidéos</p>
                </Link>
                <Link
                    href={'/flucks/map'}
                    className='navBarButtonConnected'
                >
                    <img src={'/img/map_menu_logo.png'} alt={'img logo'} width={30}/>
                    <p className={'ml-1 max-md:hidden max-lg:text-sm'}>Carte</p>
                </Link>
                <Link
                    href={'/flucks/abonnements'}
                    className='navBarButtonConnected'
                >
                    <img src={'/img/abo_menu_logo.png'} alt={'img logo'} width={30}/>
                    <p className={'ml-1 max-md:hidden max-lg:text-sm'}>Abonnements</p>
                </Link>
                <button
                    className={classNames(
                        'my-1 flex flex-row items-center rounded-xl bg-white p-1 text-lg font-bold text-[#394054] max-md:mx-1 max-md:w-64 max-md:justify-center md:w-full',
                        {'bg-gray-500': subMenu},
                    )}
                    onClick={handleSubMenu}
                >
                    <img src={'/img/create_menu_logo.png'} alt={'img logo'} width={30}/>
                    <p className={'ml-1 max-md:hidden max-lg:text-sm'}>Créer</p>
                </button>
                <Link
                    href={'/flucks/video/create'}
                    className={classNames(
                        'my-1 ml-6 flex flex-row items-center rounded-xl bg-white p-1 text-lg font-bold text-[#394054] max-md:mx-1 max-md:w-64 max-md:justify-center',
                        {hidden: !subMenu},
                    )}
                >
                    <img src={'/img/create_video_menu_logo.png'} alt={'img logo'} width={30}/>
                    <p className={'ml-1 max-md:hidden max-lg:text-sm'}>Publier une vidéo</p>
                </Link>
                <Link
                    href={'/flucks/stream/create'}
                    className={classNames(
                        'my-1 ml-6 flex flex-row items-center rounded-xl bg-white p-1 text-lg font-bold text-[#394054] max-md:mx-1 max-md:w-64 max-md:justify-center',
                        {hidden: !subMenu},
                    )}
                >
                    <img src={'/img/create_stream_menu_logo.png'} alt={'img logo'} width={30} />
                    <p className={'ml-1 max-md:hidden max-lg:text-sm'}>Passer en direct</p>
                </Link>
                <Link
                    href={'/flucks/my_videos'}
                    className='navBarButtonConnected'
                >
                    <img src={'/img/my_videos_menu_logo.png'} alt={'img logo'} width={30}/>
                    <p className={'ml-1 max-md:hidden max-lg:text-sm'}>Mes vidéos</p>
                </Link>
                <Link
                    href={'/flucks/emergency'}
                    className='navBarButtonConnected'
                >
                    <img src={'/img/emergency.png'} alt={'mode urgence'} width={30}/>
                    <p className={'ml-1 max-md:hidden max-lg:text-sm'}>Mode Urgence</p>
                </Link>
            </div>
        </div>
    );
}
