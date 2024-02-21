import Stream from '@/app/components/Stream';
import {API_DIFFUSIONS} from "@/app/utils/appGlobal";

export default async function StreamList() {

    const fetchStreamData = async () => {
        try {
            const res = await fetch(API_DIFFUSIONS, {cache: 'no-cache'});
            if (!res.ok) {
                console.error('Erreur de récupération des données');
                return;
            }
            return await res.json();
        } catch (e) {
           console.log('Données non chargées')
        }
    }

    const streamData = await fetchStreamData();

    return (
        <div>
            <div className={'flex flex-wrap px-8'}>
                {streamData.data.slice(0, 8).map((stream: any) => {
                    if (stream.direct) {
                        return <Stream title={stream.titre} creator={stream.createur} emergency={stream.urgence}
                                       id={stream.id}/>;
                    }
                })}
            </div>
        </div>
    );
}
