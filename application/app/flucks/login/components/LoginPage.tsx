'use client';

import Link from 'next/link';
import {APi_SIGNIN} from '@/app/utils/appGlobal';
import {useState} from 'react';
import setCookieLogin from '@/app/flucks/login/actions/setCookieLogin';
import {useRouter} from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const credentials = `${email}:${password}`;
    const encodedCredentials = Buffer.from(credentials).toString('base64');
    try {
      const response = await fetch(APi_SIGNIN, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Basic ${encodedCredentials}`,
        },
      });
      if (response.ok) {
        const json = await response.json();
        await setCookieLogin(json.token);
        router.push('/flucks/');
      } else {
        console.error('Identifiants incorrects', error);
        setError('Identifiants incorrects');
      }
    } catch (error) {
      console.error('Erreur serveur', error);
      setError('Erreur serveur');
    }
  };

  return (
    <form className={'flex w-full flex-col items-center md:w-5/6'} onSubmit={handleSubmit}>
      <div className={'mx-auto mb-4 w-fit'}>
        <p className={'mb-1 text-sm font-bold'}>Email :</p>
        <input
          type={'text'}
          className={'w-full min-w-[250px] rounded-lg border-2 p-1 drop-shadow-lg'}
          placeholder={'xxx@mail.com'}
          value={email}
          onChange={(e) => {
            return setEmail(e.target.value);
          }}
        />
      </div>
      <div className={'mx-auto mb-4 w-fit'}>
        <p className={'mb-1 text-sm font-bold'}>Mot de passe :</p>
        <input
          type={'password'}
          className={'w-full min-w-[250px] rounded-lg border-2 p-1 drop-shadow-lg'}
          placeholder={'ACAB'}
          value={password}
          onChange={(e) => {
            return setPassword(e.target.value);
          }}
        />
      </div>

      {error && <p className='text-red-500'>{error}</p>}

      <div className={'flex flex-col gap-2 md:flex-row'}>
        <input
          type={'submit'}
          value={'Se connecter'}
          className={
            'mr-4 min-w-fit rounded-xl bg-[#19AFFB] px-6 py-2 text-sm font-bold text-white drop-shadow-lg hover:border-2 hover:bg-white hover:text-[#19AFFB]'
          }
        />

        <Link
          className={
            'min-w-fit rounded-xl border-2 bg-gray-100 px-6 py-2 text-sm font-bold drop-shadow-lg hover:bg-black hover:text-white'
          }
          href={'inscription'}
        >
          Je n'ai pas encore de compte
        </Link>
      </div>
    </form>
  );
}
