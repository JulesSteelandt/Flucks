'use client';

import Link from 'next/link';
import {API_SIGNUP} from '@/app/utils/appGlobal';
import {useState} from 'react';

export default function SignUpPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [pseudo, setPseudo] = useState('');
  const [password2, setPassword2] = useState('');
  const [error, setError] = useState('');
  const [signup, setSignup] = useState('');

  const handleSubmit = async (e: any) => {
    setError('');
    setSignup('');
    if (checkPassword() && checkPseudo()) {
      try {
        const response = await fetch(API_SIGNUP, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({email, password, pseudo}),
        });
        if (response.ok) {
          setSignup('Inscription réussie');
        } else {
          setError('Email déjà utilisé');
        }
      } catch (error) {
        setError('Erreur serveur');
      }
    }
  };

  const checkPassword = () => {
    if (password === '' || password2 === '' || password !== password2) {
      setError('Les mots de passe ne correspondent pas');
      return false;
    }
    return true;
  };
  const checkPseudo = () => {
    if (pseudo === '' || pseudo.length < 4) {
      setError('Le pseudo doit contenir au moins 4 caractères');
      return false;
    }
    return true;
  };

  return (
    <div className={'flex w-full flex-col items-center pb-2 md:w-5/6'}>
      <div className={'mx-auto mb-4 w-fit'}>
        <p className={'mb-1 text-sm font-bold'}>Email :</p>
        <input
          type={'email'}
          className={'w-full min-w-[250px] rounded-lg border-2 p-1 drop-shadow-lg'}
          placeholder={'xxx@mail.com'}
          value={email}
          onChange={(e) => {
            return setEmail(e.target.value);
          }}
          required={true}
        />
      </div>
      <div className={'mx-auto mb-4 w-fit'}>
        <p className={'mb-1 text-sm font-bold'}>Pseudo :</p>
        <input
          type={'text'}
          className={'w-full min-w-[250px] rounded-lg border-2 p-1 drop-shadow-lg'}
          placeholder={'jean'}
          value={pseudo}
          onChange={(e) => {
            return setPseudo(e.target.value);
          }}
          required={true}
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
          required={true}
        />
      </div>
      <div className={'mx-auto mb-4 w-fit'}>
        <p className={'mb-1 text-sm font-bold'}>Verifier le Mot de passe :</p>
        <input
          type={'password'}
          className={'w-full min-w-[250px] rounded-lg border-2 p-1 drop-shadow-lg'}
          placeholder={'ACAB'}
          value={password2}
          onChange={(e) => {
            return setPassword2(e.target.value);
          }}
          required={true}
        />
      </div>

      {error && <p className='text-red-500'>{error}</p>}
      {signup && <p className='text-green-700'>{signup}</p>}

      <div className={'flex flex-col gap-2 md:flex-row'}>
        <button
          onClick={handleSubmit}
          className={
            'mr-4 min-w-fit rounded-xl bg-[#19AFFB] px-6 py-2 text-sm font-bold text-white drop-shadow-lg hover:border-2 hover:bg-white hover:text-[#19AFFB]'
          }
        >
          S’inscrire
        </button>
        <Link
          className={
            'min-w-fit rounded-xl border-2 bg-gray-100 px-6 py-2 text-sm font-bold drop-shadow-lg hover:bg-black hover:text-white'
          }
          href={'/flucks/signin'}
        >
          J'ai déjà un compte
        </Link>
      </div>
    </div>
  );
}
