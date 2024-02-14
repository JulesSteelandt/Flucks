import Video from "@/app/components/Video";
import {fetchDiffusionData} from "@/app/data";

export default async function VideoList() {
    const videoData = await fetchDiffusionData();
    return (
        <div>
            <p className={'font-bold p-8 text-2xl'}>Liste des vidéos</p>
            <div className={'flex flex-wrap pl-8'}>
                {videoData.data.map((stream) => {
                    if (!stream.direct) {
                        return <Video title={stream.titre} creator={stream.createur}/>
                    }
                })}
            </div>
        </div>
    )
}

