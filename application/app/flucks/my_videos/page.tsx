import Video from "@/app/components/Video";
import {API_VIDEO_USER} from "@/app/utils/appGlobal";
import {getCookieToken} from "@/app/utils/getToken";

export default async function Page() {

    const fetchMyVideos = async () => {
        try {
            const res = await fetch(API_VIDEO_USER, {
                cache: 'no-cache',
                methode: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${await getCookieToken()}`,
                },
            });
            if (!res.ok) {
                console.error('Erreur de récupération des données');
                return;
            }
            return await res.json();
        } catch (e) {
            console.log('Données non chargées');
        }
    }

    const myVideosData = await fetchMyVideos();

    return (
        <div className={'w-5/6'}>
            <p className={'p-8 text-2xl font-bold'}>Mes vidéos</p>
            <div className={'flex flex-wrap px-8'}>
                {myVideosData.data.map((video) => {
                    return <Video title={video.titre} creator={video.createur} id={video.id}/>
                })}
            </div>
        </div>
    )
}