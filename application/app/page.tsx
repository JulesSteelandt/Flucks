import Link from 'next/link';

export default function Page() {
  return (
    <main>
      <div className={'m-4 bg-gray-200 p-2'}>
        <Link href={'/flucks'}>Allez sur la page d'accueil</Link>
      </div>
    </main>
  );
}
