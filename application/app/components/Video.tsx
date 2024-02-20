'use client';

import {useRouter} from 'next/navigation';

export default function Video({key, title, creator, id}) {
  const router = useRouter();
  return (
    <div id='carte' className={'m-2 w-1/3 rounded-xl border-2 bg-[#5DA5B3]'} key={key}>
      <div
        className={'flex justify-center py-8'}
        onClick={() => {
          return router.push(`/flucks/video/${id}`);
        }}
      >
        <img src={'/img/play_icon.png'} alt={'play logo'} className={'w-12'} />
      </div>
      <div className={'flex flex-row justify-between rounded-b-xl bg-white p-2'}>
        <p className={'text-sm font-bold'}>{title}</p>
        <p className={'text-sm italic'}>{creator}</p>
      </div>
    </div>
  );
}
