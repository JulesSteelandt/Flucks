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
      <p className={'p-8 text-2xl font-bold'}>Mes abonnements</p>
      {Array.isArray(abonnementsData) && abonnementsData.length > 0 ? (
        abonnementsData.map((abonnement: Abonnement) => {
          return (
            <div key={abonnement.id} className={'mx-8 flex flex-row items-center rounded-lg bg-[#5DA5B3] py-4 pl-8'}>
              <img src={'/img/flucks_profile.png'} alt={''} width={80} className={'rounded-xl'} />
              <p className={'ml-8 text-white'}>
                Vous êtes abonné à <strong>{abonnement.abonneur}</strong>
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
