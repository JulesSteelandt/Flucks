import Link from 'next/link';

export default function NotFound() {
  return (
    <div className={'m-2 text-center'}>
      <h1 className={'text-2xl'}>Not found – 404!</h1>
      <div>
        <Link href={'/flucks'} className={'text-blue-500 hover:text-blue-900'}>
          Liste des vidéos
        </Link>
      </div>
    </div>
  );
}
