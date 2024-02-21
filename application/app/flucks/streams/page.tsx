import StreamList from "@/app/components/StreamList";

export default function Page() {
    return (
        <div className={'w-5/6'}>
            <p className={'p-8 text-2xl font-bold'}>Liste des streams</p>
            <StreamList/>
        </div>
    )
}