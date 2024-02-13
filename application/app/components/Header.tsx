import React from "react";
import Image from "next/image";

export default function Header() {
    return (
        <header className={'flex flex-row justify-between bg-[#5DA5B3] p-4'}>
            <Image src={'/img/flucks_logo.png'} alt={'flucks logo'} width={300} height={0} priority={true}/>
            <div className={'flex flex-row justify-center items-center'}>
                <div className={'flex flex-col mr-4'}>
                    <button className={'bg-white font-bold rounded-2xl p-1 my-1'}>S'inscrire</button>
                    <button className={'bg-white font-bold rounded-2xl p-1 my-1'}>Se connecter</button>
                </div>
                <Image src={'/img/flucks_profile.png'} width={100} height={200} alt={'flucks profile'}/>
            </div>
        </header>
    )
}
