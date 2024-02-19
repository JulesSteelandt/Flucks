import Link from 'next/link';

export default function Page() {
  return (
    <form className={'flex w-full flex-col items-center md:w-5/6'}>
      <p className={'p-6 text-3xl font-bold'}>Inscription</p>
      <img src={'/img/desktop_logo.png'} className={'w-1/5 min-w-[150px]'} />
      <div className={'mx-auto mb-4 w-fit'}>
        <p className={'mb-1 text-sm font-bold'}>Email :</p>
        <input type={'text'} className={'w-full min-w-[250px] rounded-lg border-2 p-1 drop-shadow-lg'} />
      </div>
      <div className={'mx-auto mb-4 w-fit'}>
        <p className={'mb-1 text-sm font-bold'}>Mot de passe :</p>
        <input type={'text'} className={'w-full min-w-[250px] rounded-lg border-2 p-1 drop-shadow-lg'} />
      </div>

      <div className={'flex flex-col  gap-2 md:flex-row'}>
        <input
          type={'submit'}
          value={'Se connecter'}
          className={
            'mr-4 min-w-fit rounded-xl bg-[#19AFFB] px-6 py-2 text-sm font-bold text-white drop-shadow-lg hover:border-2 hover:bg-white hover:text-[#19AFFB]'
          }
        />

        <Link
          className={
            'min-w-fit rounded-xl border-2 bg-gray-100 px-6 py-2 text-sm font-bold drop-shadow-lg hover:bg-black hover:text-white'
          }
          href={'inscription'}
        >
          Je n'ai pas encore de compte
        </Link>
      </div>
    </form>
  );
}
