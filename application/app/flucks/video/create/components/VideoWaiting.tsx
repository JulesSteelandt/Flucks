import React from 'react';
import Video from '@/app/flucks/video/create/components/Video';


export default function VideoWaitingComponent({ title, creator, id }: { title: string; creator: string; id: string }) {

  return (
    <div className='bg-[#394054] rounded-xl flex w-[20vw] pr-2 gap-2 min-w-[400px]'>
      <div className={'min-w-[200px]'}>
        <Video title={title} creator={creator} id={id}/>
      </div>
      <div className={'flex flex-col justify-between h-full w-full'}>
        <button className={'rounded-xl w-full bg-gray-100 px-6 py-1 font-bold mt-2 hover:bg-black hover:text-white drop-shadow-lg min-w-fit'}>Modifier</button>
        <button className={'rounded-xl w-full bg-gray-100 px-6 py-1 font-bold hover:bg-black hover:text-white drop-shadow-lg min-w-fit'}>Supprimer</button>
        <button className={'mb-2 w-full drop-shadow-lg mr-4 rounded-xl bg-[#19AFFB] px-6 py-1 font-bold text-white hover: hover:bg-white hover:text-[#19AFFB] min-w-fit'}>Publier
        </button>
      </div>

    </div>
  );
};
