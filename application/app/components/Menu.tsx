import Image from 'next/image';

// @ts-ignore
export default function Menu({menuName}) {
  return (
    <button className={'mb-2 flex w-4/5 flex-row items-center justify-center rounded-xl bg-white text-[#394054]'}>
      <Image src={'/../img/img_icon.png'} width={30} height={30} alt={'menu'} />
      <p className={'font-bold'}>{menuName}</p>
    </button>
  );
}
