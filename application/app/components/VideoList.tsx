import Video from "@/app/components/Video";
import {API_DIFFUSIONS} from "@/app/utils/appGlobal";

export default async function VideoList() {
    const fetchVideoData = async () => {
        try {
            const res = await fetch(API_DIFFUSIONS, {cache: 'no-cache'});
            if (!res.ok) {
                console.error('Erreur de récupération des données');
                return;
            }
            return await res.json();
        } catch (e) {
            throw new Error(e);
        }
    }

    const videoData = await fetchVideoData();

    return (
        <div>
            <p className={'font-bold p-8 text-2xl'}>Liste des vidéos</p>
            <div className={'flex flex-wrap px-8'}>
                {videoData.data.map((video) => {
                    if (!video.direct) {
                        return <Video title={video.titre} creator={video.createur} id={video.id}/>
                    }
                })}
            </div>
        </div>
    )
}

