import Menu from './Menu';

export default function NavBar() {
  return (
    <div className={'mt-0 flex h-screen w-1/6 flex-col items-center bg-[#394054]'}>
      <input className={'mx-1 my-4 w-11/12 p-1.5'} type={'text'} placeholder={'Rechercher'} />
      <Menu menuName={'Live'} />
      <Menu menuName={'Vidéos'} />
      <Menu menuName={'Carte'} />
    </div>
  );
}
