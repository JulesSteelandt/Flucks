import Link from 'next/link';

export default function Page() {
  return (
    <div className={'flex w-5/6 flex-col items-center'}>
      <p className={'p-6 text-3xl font-bold'}>Inscription</p>
      <img src={'/img/desktop_logo.png'} className={'w-1/5'} />
      <div className={'mb-4 w-1/4'}>
        <p className={'mb-1 text-sm font-bold'}>Email :</p>
        <input type={'text'} className={'w-full rounded-md border-2 p-1'} placeholder={'xxx@yyy.zz'} />
      </div>
      <div className={'mb-4 w-1/4'}>
        <p className={'mb-1 text-sm font-bold'}>Pseudo :</p>
        <input type={'text'} className={'w-full rounded-md border-2 p-1'} placeholder={'AlixPerrot68'} />
      </div>
      <div className={'mb-4 w-1/4'}>
        <p className={'mb-1 text-sm font-bold'}>Mot de passe :</p>
        <input type={'text'} className={'w-full rounded-md border-2 p-1'} placeholder={'1fHu8Eyp8s'} />
      </div>
      <div className={'mb-4 w-1/4'}>
        <p className={'mb-1 text-sm font-bold'}>Confirmer le mot de passe : </p>
        <input type={'text'} className={'w-full rounded-md border-2 p-1'} placeholder={'1fHu8Eyp8s'} />
      </div>
      <div className={'flex flex-row'}>
        <button
          className={
            'mr-4 rounded-xl bg-[#19AFFB] px-6 py-2 text-sm font-bold text-white hover:border-2 hover:bg-white hover:text-[#19AFFB]'
          }
        >
          S'inscrire
        </button>
        <Link
          className={'rounded-xl border-2 bg-gray-100 px-6 py-2 text-sm font-bold hover:bg-black hover:text-white'}
          href={'flucks/connexion'}
        >
          J'ai déjà un compte
        </Link>
      </div>
    </div>
  );
}
