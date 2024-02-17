'use client';
import {useState} from 'react';
import Map from './components/Map';

export default function MapEvent() {
  // state

  // comportement
  const reloadPage = () => {
    if (typeof window !== 'undefined') {
      window.location.reload();
    }
  };

  // affichage
  return (
    <div className={'w-5/6 bg-[#E0E2E8]'}>
      <div className={'m-10  flex h-full flex-col'}>
        <Map></Map>
        <div className={'mt-10 flex flex-col justify-between bg-[#D9D9D9] p-6 sm:flex-row'}>
          <h1 className={'mb-2 text-xl font-bold sm:mb-0'}>Les évènements proches de vous.</h1>
          <button
            className={'rounded-xl bg-[#19AFFB] px-4 py-2 font-bold text-white hover:bg-blue-400'}
            onClick={reloadPage}
          >
            Rafraichir
          </button>
        </div>
      </div>
    </div>
  );
}
