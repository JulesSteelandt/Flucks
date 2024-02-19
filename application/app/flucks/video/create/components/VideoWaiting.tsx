import Video from '@/app/components/Video';
import React from 'react';


export default function VideoWaitingComponent({ title, creator, id }: { title: string; creator: string; id: string }) {

  return (
    <div className='bg-[#394054] rounded-xl flex w-[20vw] pr-2 gap-2 min-w-[400px]'>
      <div className={'min-w-[200px]'}>
        <Video title={title} creator={creator} id={id}/>
      </div>
      <div className={'flex flex-col justify-between h-full w-full'}>
        <button className={'bg-white font-semibold rounded-xl py-1 mt-2 w-full'}>Modifier</button>
        <button className={'bg-white font-semibold rounded-xl py-1 w-full'}>Supprimer</button>
        <button className={'text-white font-semibold bg-[#19AFFB] rounded-xl  py-1 mb-2 self-end w-full'}>Publier
        </button>
      </div>

    </div>
  );
};
