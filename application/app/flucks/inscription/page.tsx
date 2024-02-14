import Link from "next/link";

export default function Page() {
    return (
        <div className={'flex flex-col items-center w-5/6'}>
            <p className={'font-bold text-3xl p-6'}>Inscription</p>
            <img src={'/img/desktop_logo.png'} className={'w-1/5'}/>
            <div>
                <p className={'font-bold text-sm'}>Email :</p>
                <input type={"text"} className={'border-2'}/>
            </div>
            <div>
                <p className={'font-bold text-sm'}>Pseudo :</p>
                <input type={"text"} className={'border-2'}/>
            </div>
            <div>
                <p className={'font-bold text-sm'}>Mot de passe :</p>
                <input type={"text"} className={'border-2'}/>
            </div>
            <div>
                <p className={'font-bold text-sm'}>Confirmer le mot de passe :</p>
                <input type={"text"} className={'border-2'}/>
            </div>
            <div>
                <button className={'text-sm'}>S'inscrire</button>
                <Link className={'text-sm'} href={'flucks/connexion'}>J'ai déjà un compte</Link>
            </div>
        </div>
    )
}