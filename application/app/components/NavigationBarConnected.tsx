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
        <div className={'flex flex-col items-center bg-[#394054] mt-0 h-screen w-1/6'}>
            <input className={'w-11/12 mx-1 my-4 p-1.5'} type={'text'} placeholder={"Rechercher"}/>
            <div className={'w-11/12 max-w-11/12'}>
                <Link href={'/flucks'}
                      className={'flex flex-row items-center rounded-xl bg-white text-[#394054] font-bold text-lg p-1 mb-1'}>
                    <img src={'/img/img_icon.png'} alt={'img logo'} width={30}/>
                    <p className={'ml-1'}>Live</p>
                </Link>
                <Link href={'/flucks'}
                      className={'flex flex-row items-center rounded-xl bg-white text-[#394054] font-bold text-lg p-1 mb-1'}>
                    <img src={'/img/img_icon.png'} alt={'img logo'} width={30}/>
                    <p className={'ml-1'}>Vidéos</p>
                </Link>
                <Link href={'/map'}
                      className={classNames('flex flex-row items-center rounded-xl bg-white text-[#394054] font-bold text-lg p-1 mb-1 w-full', {})}>
                    <img src={'/img/img_icon.png'} alt={'img logo'} width={30}/>
                    <p className={'ml-1'}>Carte</p>
                </Link>
                <Link href={'/map'}
                      className={classNames('flex flex-row items-center rounded-xl bg-white text-[#394054] font-bold text-lg p-1 mb-1 w-full', {})}>
                    <img src={'/img/img_icon.png'} alt={'img logo'} width={30}/>
                    <p className={'ml-1'}>Abonnements</p>
                </Link>
                <button
                    className={classNames('flex flex-row items-center rounded-xl bg-white text-[#394054] font-bold text-lg p-1 mb-1 w-full', {'bg-gray-500': subMenu})}
                    onClick={handleSubMenu}>
                    <img src={'/img/img_icon.png'} alt={'img logo'} width={30}/>
                    <p className={'ml-1'}>Créer</p>
                </button>
                <Link href={'/flucks'}
                      className={classNames('flex flex-row items-center rounded-xl bg-white text-[#394054] font-bold text-lg p-1 mb-1 ml-6', {'hidden': !subMenu})}>
                    <img src={'/img/img_icon.png'} alt={'img logo'} width={30}/>
                    <p className={'ml-1'}>Publier une vidéo</p>
                </Link>
                <Link href={'/flucks'}
                      className={classNames('flex flex-row items-center rounded-xl bg-white text-[#394054] font-bold text-lg p-1 mb-1 ml-6', {'hidden': !subMenu})}>
                    <img src={'/img/img_icon.png'} alt={'img logo'} width={30}/>
                    <p className={'ml-1'}>Passer en direct</p>
                </Link>
                <Link href={'/flucks'}
                      className={'flex flex-row items-center rounded-xl bg-white text-[#394054] font-bold text-lg p-1 mb-1'}>
                    <img src={'/img/img_icon.png'} alt={'img logo'} width={30}/>
                    <p className={'ml-1'}>Mes vidéos</p>
                </Link>
                <Link href={'/flucks'}
                      className={'flex flex-row items-center rounded-xl bg-red-100 text-[#394054] font-bold text-lg p-1 mb-1'}>
                    <img src={'/img/emergency.png'} alt={'mode urgence'} width={30}/>
                    <p className={'ml-1'}>Mode Urgence</p>
                </Link>
            </div>
        </div>
    )
}