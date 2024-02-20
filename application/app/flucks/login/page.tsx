import LoginPage from '@/app/flucks/login/components/LoginPage';

export default function Page() {
  return (
    <div className={'flex w-full flex-col items-center md:w-5/6'}>
      <p className={'p-6 text-3xl font-bold'}>Connexion</p>
      <img src={'/img/desktop_logo.png'} className={'w-1/5 min-w-[150px]'} />
      <LoginPage />
    </div>
  );
}
