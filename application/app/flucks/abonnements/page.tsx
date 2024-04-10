'use client';

import {useEffect, useState} from 'react';
import {API_ABONNEMENTS} from '@/app/utils/appGlobal';
import {getCookieToken} from '@/app/utils/getToken';

interface Abonnement {
    id: string;
    abonneur: string;
}

export default function Page() {
    const [abonnementsData, setAbonnementsData] = useState<Abonnement[]>([]);

    useEffect(() => {
        const fetchAbonnements = async () => {
            try {
                const res = await fetch(API_ABONNEMENTS, {
                    cache: 'no-cache',
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${await getCookieToken()}`,
                    },
                });
                if (!res.ok) {
                    console.error('Erreur de récupération des données');
                    return;
                }
                const data = await res.json();
                setAbonnementsData(data.data);
            } catch (e) {
                console.log('Données non chargées');
            }
        };

        fetchAbonnements();
    }, []);

    return (
        <div className={'w-5/6'}>
            <div className={'flex flex-row justify-around items-center'}>
                <p className={'p-8 text-2xl font-bold max-sm:text-lg'}>Mes abonnements</p>
                <img src={'/img/flucks_profile.png'} alt={''} width={70}
                     className={'rounded-full sm:hidden my-4'}/>
            </div>
            {Array.isArray(abonnementsData) && abonnementsData.length > 0 ? (
                abonnementsData.map((abonnement: Abonnement) => {
                    return (
                        <div key={abonnement.id}
                             className={'sm:mx-8 flex sm:flex-row justify-between max-sm:flex-col items-center rounded-lg bg-[#5DA5B3] py-4 sm:px-6'}>
                            <img src={'/img/flucks_profile.png'} alt={''} width={80}
                                 className={'rounded-xl max-sm:hidden'}/>
                            <p className={'sm:ml-8 text-white max-sm:flex max-sm:justify-center font-bold'}>
                                {abonnement.abonneur}
                            </p>
                        </div>
                    );
                })
            ) : (
                <p className='p-4 text-gray-500'>Aucun abonnement</p>
            )}
        </div>
    );
}
