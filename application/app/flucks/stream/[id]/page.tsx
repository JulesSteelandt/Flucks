export default function Page({params}: {
    params: {
        id: string
    }
}) {
    return (
        <div className={'p-4'}>
            <p>Bienvenue sur le stream !</p>
            <p className={'font-bold'}>{params.id}</p>
        </div>
    )
}