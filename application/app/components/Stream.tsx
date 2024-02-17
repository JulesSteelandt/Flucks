'use client';

import {useRouter} from 'next/navigation';

// @ts-ignore
export default function Stream({title, creator, emergency, id}) {
  const router = useRouter();
  return (
    <div className={'relative m-2 w-1/3 rounded-xl border-2 bg-[#B0C0D4]'}>
      <div
        className={'flex justify-center py-8'}
        onClick={() => {
          return router.push(`/flucks/stream/${id}`);
        }}
      >
        <img
          src={'/img/play_icon.png'}
          alt={'play logo'}
          className={'w-12 transition-transform duration-300 hover:w-24'}
        />
      </div>
      {emergency && <img src={'/img/emergency.png'} className={'absolute right-0 top-0 m-2 w-6'} alt={'!'} />}
      <div className={'flex flex-row justify-between rounded-b-xl bg-white p-2'}>
        <p className={'text-sm font-bold'}>{title}</p>
        <p className={'text-sm italic'}>{creator}</p>
      </div>
    </div>
  );
}
