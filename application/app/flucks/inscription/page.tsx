import Link from "next/link";

export default function Page() {
    return (
        <div className={'flex flex-col items-center w-5/6'}>
            <p className={'font-bold text-3xl p-6'}>Inscription</p>
            <img src={'/img/desktop_logo.png'} className={'w-1/5'}/>
            <div className={'mb-4 w-1/4'}>
                <p className={'font-bold text-sm mb-1'}>Email :</p>
                <input type={"text"} className={'border-2 w-full p-1 rounded-md'} placeholder={"xxx@yyy.zz"}/>
            </div>
            <div className={'mb-4 w-1/4'}>
                <p className={'font-bold text-sm mb-1'}>Pseudo :</p>
                <input type={"text"} className={'border-2 w-full p-1 rounded-md'} placeholder={"AlixPerrot68"}/>
            </div>
            <div className={'mb-4 w-1/4'}>
                <p className={'font-bold text-sm mb-1'}>Mot de passe :</p>
                <input type={"text"} className={'border-2 w-full p-1 rounded-md'} placeholder={"1fHu8Eyp8s"}/>
            </div>
            <div className={'mb-4 w-1/4'}>
                <p className={'font-bold text-sm mb-1'}>Confirmer le mot de passe : </p>
                <input type={"text"} className={'border-2 w-full p-1 rounded-md'} placeholder={"1fHu8Eyp8s"}/>
            </div>
            <div className={'flex flex-row'}>
                <button className={'text-sm bg-[#19AFFB] py-2 px-6 rounded-xl text-white font-bold mr-4 hover:text-[#19AFFB] hover:bg-white hover:border-2'}>S'inscrire</button>
                <Link className={'text-sm bg-gray-100 border-2 py-2 px-6 rounded-xl font-bold hover:bg-black hover:text-white'} href={'flucks/connexion'}>J'ai déjà un compte</Link>
            </div>
        </div>
    )
}