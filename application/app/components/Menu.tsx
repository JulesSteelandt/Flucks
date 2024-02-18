'use client'

import Image from "next/image";
import classNames from 'classnames';
import {useState} from "react";

export default function Menu({ menuName, sousMenus }) {
    const [buttonClicked, setButtonClicked] = useState(false);
    const handleButtonClicked = () => {
        setButtonClicked(!buttonClicked);
    }

    return (
        <div>
            <button onClick={handleButtonClicked} className={classNames('flex flex-row items-center text-[#394054] bg-white rounded-xl mb-2 w-11/12', {'': buttonClicked})}>
                <Image src={'/../img/img_icon.png'} width={30} height={30}/>
                <p className={'font-bold text-xl ml-2'}>{ menuName }</p>
                <p>{buttonClicked}</p>
            </button>
        </div>

    )
}