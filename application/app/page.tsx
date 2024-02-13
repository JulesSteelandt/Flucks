import Link from "next/link";

export default function Home() {
    return (
        <main>
            <div className={'p-2 m-4 bg-gray-200'}>
                <Link href={"/accueil"}>Allez sur la page d'accueil</Link>
            </div>
        </main>
    );
}
