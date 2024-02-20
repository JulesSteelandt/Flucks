import Link from 'next/link';

export default function Page() {
  return (
    <form className={'flex w-full flex-col items-center md:w-5/6'}>

      <p className={'p-6 text-3xl font-bold'}>Inscription</p>
      <img src={'/img/desktop_logo.png'} alt={'logo desktop'} className={'w-1/5 min-w-[150px]'} />
      <div className={'mb-4 w-fit mx-auto'}>
        <p className={'mb-1 text-sm font-bold'}>Email :</p>
        <input type={'text'} className={'w-full rounded-lg border-2 p-1 drop-shadow-lg min-w-[250px]'} placeholder={'xxx@yyy.zz'} />
      </div>
      <div className={'mb-4 w-fit mx-auto'}>
        <p className={'mb-1 text-sm font-bold'}>Mot de passe :</p>
        <input type={'text'} className={'w-full rounded-lg border-2 p-1 drop-shadow-lg min-w-[250px]'} placeholder={'AlixPerrot68'} />
      </div>

      <div className={'flex flex-col  md:flex-row gap-2'}>
        <input type={'submit'} value={'Se connecter'}
               className={
                 'drop-shadow-lg mr-4 rounded-xl bg-[#19AFFB] px-6 py-2 text-sm font-bold text-white hover:border-2 hover:bg-white hover:text-[#19AFFB] min-w-fit'
               }
        />


        <Link
          className={'rounded-xl border-2 bg-gray-100 px-6 py-2 text-sm font-bold hover:bg-black hover:text-white drop-shadow-lg min-w-fit'}
          href={'flucks/connexion'}
        >
          Je n'ai pas encore de compte
        </Link>
      </div>
    </form>
  );
}
