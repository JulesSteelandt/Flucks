'use client';

import {getDecodedToken} from '@/app/utils/getToken';
import {useEffect, useState} from 'react';

export default function CreateStream() {
  const [userEmail, setUserEmail] = useState(null);
  const [userPseudo, setUserPseudo] = useState(null);

  useEffect(() => {
    getDecodedToken()
      .then((token: any) => {
        setUserEmail(token.email);
        setUserPseudo(token.username);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <section className={'w-full bg-[#E0E2E8] md:w-5/6'}>
      <div className={'flex flex-col '}>
        <div className={'m-10 flex h-auto w-auto flex-col justify-center md:flex-row'}>
          <div className={'flex flex-col'}>
            <div className={'mb-8 flex flex-col items-center'}>
              <div className={'mb-2 h-[50vw] max-h-[200px] w-[50vw] max-w-[200px] rounded-full bg-[#D9D9D9]'} />
              <label>Photo de profil</label>
            </div>

            <form className={'flex flex-col gap-2'}>
              <label className={''}>
                <strong>Email :</strong> {userEmail}
              </label>
              <input
                type={'text'}
                className={'w-full min-w-[250px] resize-none rounded-lg border-2 p-1 drop-shadow-lg'}
                placeholder={'Changer de mail ...'}
              />

              <label className={''}>
                <strong>Pseudo :</strong> {userPseudo}
              </label>
              <input
                type={'text'}
                className={'w-full min-w-[250px] resize-none rounded-lg border-2 p-1 drop-shadow-lg'}
                placeholder={'Changer de pseudo ...'}
              />

              <input
                type={'submit'}
                className={
                  'flex self-end rounded-xl bg-[#19AFFB] px-6 py-2 text-sm font-bold text-white drop-shadow-lg hover:border-2 hover:bg-white hover:text-[#19AFFB]'
                }
                value={'Enregistrer'}
              />
            </form>
          </div>
          <div className={'mx-8 hidden border-[1px] border-black md:block'}></div>
          <form className={'flex flex-col gap-2 md:w-1/3'}>
            <label className={'self-center font-semibold'}>Changer de mot de passe</label>

            <label>Nouveau mot de passe :</label>
            <input
              type={'text'}
              className={'w-full min-w-[250px] resize-none rounded-lg border-2 p-1 drop-shadow-lg'}
            />

            <label>Confirmation du mot de passe :</label>
            <input
              type={'text'}
              className={'w-full min-w-[250px] resize-none rounded-lg border-2 p-1 drop-shadow-lg'}
            />

            <input
              type={'submit'}
              className={
                'flex self-end rounded-xl bg-[#19AFFB] px-6 py-2 text-sm font-bold text-white drop-shadow-lg hover:border-2 hover:bg-white hover:text-[#19AFFB]'
              }
              value={'Enregistrer'}
            />
          </form>
        </div>
      </div>
    </section>
  );
}
