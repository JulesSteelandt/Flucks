'use client';
import {useState} from 'react';
import Map from './components/Map';

export default function MapEvent() {

  // state

  // comportement
  const reloadPage = () => {
    window.location.reload();
  };


  // affichage
  return (
    <div className={'bg-[#E0E2E8] w-5/6'}>
      <div className={'h-full  flex flex-col m-10'}>

        <Map/>
        <div className={'bg-[#D9D9D9] flex flex-col sm:flex-row justify-between mt-10 p-6'}>
          <h1 className={'text-xl font-bold mb-2 sm:mb-0'}>Les évènements proches de vous.</h1>
          <button className={'bg-[#19AFFB] hover:bg-blue-400 text-white font-bold py-2 px-4 rounded-xl'}
                  onClick={reloadPage}>Rafraichir
          </button>
        </div>
      </div>
    </div>
  );
}
