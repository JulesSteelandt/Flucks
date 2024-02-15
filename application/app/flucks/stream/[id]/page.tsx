import {fetchDiffusionDataWithID} from "@/app/data";
import Like from "@/app/components/Like";

export default async function Page({params}: {
    params: {
        id: string
    }
}) {
    const streamData = await fetchDiffusionDataWithID(params.id);

    function afficherLikes() {
        const nombreLikes = streamData.data.createur.abonnees;

        if (nombreLikes.length >= 10) {
            return "999M";
        } else if (nombreLikes.length >= 7) {
            return nombreLikes.substring(0, nombreLikes.length - 6) + "M";
        } else if (nombreLikes.length >= 4) {
            return nombreLikes.substring(0, nombreLikes.length - 3) + "k";
        } else {
            return nombreLikes;
        }
    }

    return (
        <div className={'p-4 w-5/6 m-8'}>
            <div className={'bg-gray-200 w-[calc(100% - 32px)] h-2/3 flex justify-center items-center mb-4'}>ID du stream
                : <strong>{params.id}</strong></div>
            <div className={'flex flex-row'}>
                <p className={'bg-[#D9D9D9] w-5/6 text-center p-4 font-bold'}>{streamData.data.titre}</p>
                <p className={'w-1/6 text-center p-4 italic underline'}>{streamData.data.createur.pseudo}</p>
            </div>
            <div className={'flex flex-row justify-between'}>
                <div className={'flex flex-row items-center p-4'}>
                    <p className={'font-extrabold text-xl text-[#394054] mx-2 font-mono'}>{ afficherLikes() }</p>
                    <button className={'bg-[#394054] text-white px-4 py-2 rounded-full font-bold'}>S'abonner</button>
                </div>
                <div className={'flex flex-row items-center'}>
                    <Like nbLikes={streamData.data.like}/>
                    <p className={'text-sm'}>{streamData.data.vue} vues</p>
                </div>
            </div>
        </div>
    )
}