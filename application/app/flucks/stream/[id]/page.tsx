export default function Page({ params }: {
    params: {
        id: string
    }
}) {
    return (
        <p>Bienvenue sur le stream n° { params.id} !</p>
    )
}