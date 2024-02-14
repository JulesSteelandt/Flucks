import Image from "next/image";

export default function Video({ id }) {
    return (
        <div id="carte" className={'border-2 rounded-xl bg-[#5DA5B3] w-60 m-2'}>
            <div className={'flex justify-center py-8'}>
                <Image src={"/img/play_icon.png"} width={50} height={0} alt={"play logo"}/>
            </div>
            <div className={'flex flex-row justify-between bg-white rounded-b-xl p-2'}>
                <p className={'text-sm'}>Nom de la vidéo</p>
                <p className={'text-sm'}>Créateur</p>
            </div>
        </div>
    )
}