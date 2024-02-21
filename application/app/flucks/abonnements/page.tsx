import {API_ABONNEMENTS} from "@/app/utils/appGlobal";
import {getCookieToken} from "@/app/utils/getToken";

export default async function Page() {

    const fetchAbonnements = async () => {
        try {
            const res = await fetch(API_ABONNEMENTS, {
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

    const abonnementsData = await fetchAbonnements();

    return (
        <div className={'w-5/6'}>
            <p className={'p-8 text-2xl font-bold'}>Mes abonnements</p>
            {abonnementsData.data.map((abonnement) => {
                return (
                    <div className={'flex flex-row items-center pl-8 bg-[#5DA5B3] mx-8 py-4 rounded-lg'}>
                        <img src={'/img/flucks_profile.png'} alt={''} width={80} className={'rounded-xl'}/>
                        <p className={'text-white ml-8'}>Vous êtes abonné à <strong>{abonnement.abonneur}</strong></p>
                    </div>
                )
            })}

        </div>
    )
}