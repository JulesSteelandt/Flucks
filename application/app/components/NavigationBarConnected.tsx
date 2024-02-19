'use client'

import Link from "next/link";
import {useState} from "react";
import classNames from "classnames";

export default function NavBarConnected() {

    const [subMenu, setSubMenu] = useState(false)
    const handleSubMenu = () => {
        setSubMenu(!subMenu);
    }

    return (
        <div className={'flex flex-col max-sm:justify-center max-sm:flex-row items-center bg-[#394054] mt-0 md:h-screen max-sm:w-screen min-w-48 w-1/6 py-2'}>
            <input className={'w-11/12 mx-1 my-4 p-1.5 max-sm:hidden'} type={'text'} placeholder={"Rechercher"}/>
            <div className={'w-11/12 max-w-11/12 flex flex-col max-sm:flex-row items-center'}>
                <Link href={'/flucks'}
                      className={'flex flex-row items-center max-sm:justify-center max-sm:w-64 rounded-xl bg-white text-[#394054] font-bold text-lg p-1 my-1 max-sm:mx-1 sm:w-full'}>
                    <img src={'/img/stream_menu_logo.png'} alt={'img logo'} width={30}/>
                    <p className={'ml-1 max-sm:hidden'}>Streams</p>
                </Link>
                <Link href={'/flucks'}
                      className={'flex flex-row items-center max-sm:justify-center max-sm:w-64 rounded-xl bg-white text-[#394054] font-bold text-lg p-1 my-1 max-sm:mx-1 sm:w-full'}>
                    <img src={'/img/video_menu_logo.png'} alt={'img logo'} width={30}/>
                    <p className={'ml-1 max-sm:hidden'}>Vidéos</p>
                </Link>
                <Link href={'/map'}
                      className={classNames('flex flex-row items-center max-sm:justify-center max-sm:w-64 rounded-xl bg-white text-[#394054] font-bold text-lg p-1 my-1 max-sm:mx-1 sm:w-full', {})}>
                    <img src={'/img/map_menu_logo.png'} alt={'img logo'} width={30}/>
                    <p className={'ml-1 max-sm:hidden'}>Carte</p>
                </Link>
                <Link href={'/map'}
                      className={classNames('flex flex-row items-center max-sm:justify-center max-sm:w-64 rounded-xl bg-white text-[#394054] font-bold text-lg p-1 my-1 max-sm:mx-1 sm:w-full', {})}>
                    <img src={'/img/abo_menu_logo.png'} alt={'img logo'} width={30}/>
                    <p className={'ml-1 max-sm:hidden'}>Abonnements</p>
                </Link>
                <button
                    className={classNames('flex flex-row items-center max-sm:justify-center max-sm:w-64 rounded-xl bg-white text-[#394054] font-bold text-lg p-1 my-1 max-sm:mx-1 sm:w-full', {'bg-gray-500': subMenu})}
                    onClick={handleSubMenu}>
                    <img src={'/img/create_menu_logo.png'} alt={'img logo'} width={30}/>
                    <p className={'ml-1 max-sm:hidden'}>Créer</p>
                </button>
                <Link href={'/flucks'}
                      className={classNames('flex flex-row items-center max-sm:justify-center max-sm:w-64 rounded-xl bg-white text-[#394054] font-bold text-lg p-1 my-1 max-sm:mx-1 ml-6', {'hidden': !subMenu})}>
                    <img src={'/img/create_video_menu_logo.png'} alt={'img logo'} width={30}/>
                    <p className={'ml-1 max-sm:hidden'}>Publier une vidéo</p>
                </Link>
                <Link href={'/flucks'}
                      className={classNames('flex flex-row items-center max-sm:justify-center max-sm:w-64 rounded-xl bg-white text-[#394054] font-bold text-lg p-1 my-1 max-sm:mx-1 ml-6', {'hidden': !subMenu})}>
                    <img src={'/img/create_stream_menu_logo.png'} alt={'img logo'} width={30}/>
                    <p className={'ml-1 max-sm:hidden'}>Passer en direct</p>
                </Link>
                <Link href={'/flucks'}
                      className={'flex flex-row items-center max-sm:justify-center max-sm:w-64 rounded-xl bg-white text-[#394054] font-bold text-lg p-1 my-1 max-sm:mx-1 w-full'}>
                    <img src={'/img/my_videos_menu_logo.png'} alt={'img logo'} width={30}/>
                    <p className={'ml-1 max-sm:hidden'}>Mes vidéos</p>
                </Link>
                <Link href={'/flucks'}
                      className={'flex flex-row items-center max-sm:justify-center max-sm:w-64 rounded-xl bg-red-100 text-[#394054] font-bold text-lg p-1 my-1 max-sm:mx-1 w-full'}>
                    <img src={'/img/emergency.png'} alt={'mode urgence'} width={30}/>
                    <p className={'ml-1 max-sm:hidden'}>Mode Urgence</p>
                </Link>
            </div>
        </div>
    )
}