import Link from "next/link";

export default function Page() {
    return (
        <main>
            <div className={'p-2 m-4 bg-gray-200'}>
                <Link href={"/flucks"}>Allez sur la page d'accueil</Link>
            </div>
        </main>
    );
}
