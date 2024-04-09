import SignUpPage from '@/app/flucks/inscription/components/SignUpPage';

export default function Page() {
  return (
    <div className={'overflow-y-auto flex w-5/6 flex-col items-center'}>
      <p className={'p-6 text-3xl font-bold'}>Inscription</p>
      <img src={'/img/desktop_logo.png'} className={'w-1/5 min-w-[150px]'} />
      <SignUpPage />
    </div>
  );
}
