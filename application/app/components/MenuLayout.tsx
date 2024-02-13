import Image from "next/image";

export default function Menu({ menuName }) {
    return (
        <button className={'flex flex-row justify-center items-center navBarText bg-white rounded-xl mb-2 w-4/5'}>
            <Image src={'/../img/img_icon.png'} width={30} height={30}/>
            <p className={'font-bold'}>{ menuName }</p>
        </button>
    )
}