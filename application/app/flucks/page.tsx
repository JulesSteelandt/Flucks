import StreamList from '@/app/components/StreamList';
import VideoList from '@/app/components/VideoList';
import Link from 'next/link';

export default function Page() {
    return (
        <div className={'w-5/6'}>
            <div className={'border-b-2 border-gray-200 pb-8'}>
                <div className={'flex flex-row justify-between items-center w-full'}>
                    <p className={'p-8 text-2xl font-bold'}>Les derniers streams</p>
                    <Link href={'/flucks/streams'}
                          className={'flex justify-center items-center m-4 rounded-xl bg-[#19AFFB] md:px-6 max-md:px-2 md:py-2 max-md:py-2 max-md:py-1 text-sm font-bold text-white hover:border-2 hover:bg-white hover:text-[#19AFFB]'}>
                        <p className={'max-md:hidden'}>Voir plus de streams</p>
                        <img className={'md:hidden'} src={'/img/plus_icon.png'} alt={'+'} width={25}/>
                    </Link>
                </div>
                <StreamList limit={'8'}/>
            </div>
            <div className={'flex flex-row justify-between items-center w-full'}>
                <p className={'font-bold p-8 text-2xl'}>Les dernières vidéos</p>
                <Link href={'/flucks/videos'}
                      className={'flex justify-center items-center m-4 rounded-xl bg-[#19AFFB] md:px-6 max-md:px-2 md:py-2 max-md:py-2 max-md:py-1 text-sm font-bold text-white hover:border-2 hover:bg-white hover:text-[#19AFFB]'}>
                    <p className={'max-md:hidden'}>Voir plus de vidéos</p>
                    <img className={'md:hidden'} src={'/img/plus_icon.png'} alt={'+'} width={25}/>
                </Link>
            </div>
            <VideoList limit={'8'}/>
        </div>
    );
}
