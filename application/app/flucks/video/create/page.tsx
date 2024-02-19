import Link from 'next/link';
import Image from 'next/image';


export default function Page() {
  return (
    <div className={'flex  w-full flex-col items-center md:w-5/6 mx-8  '}>
      <p className={'p-6 text-3xl font-bold'}>Créer une vidéo</p>

      <form className={'flex w-full'}>


        <div className={'flex'}>
          <div className={'flex gap-2 h-fit'}>
            <div className={'bg-[#5DA5B3] rounded-xl min-w-[150px] min-h-[75px] '}>
              <Image src={'/img/video_play_img.png'} alt={'Play'} width={'50'} height={'50'} />
            </div>

            <div className={'flex flex-col gap-4'}>
              <input type={'file'} className={'w-full rounded-lg border-2 p-1 drop-shadow-lg max-w-[15vw]  '} />
              <input type={'file'} className={'w-full rounded-lg border-2 p-1 drop-shadow-lg max-w-[15vw]'} />
            </div>
          </div>


          <div className={'flex flex-col'}>
            <div className={'mb-4 w-ull mx-auto'}>
              <div className={'flex'}>
              <p className={'mb-1 text-sm font-bold'}>Titre</p>
                <p className={'text-red-700'}>*</p>
              </div>
              <input type={'text'} className={'w-full rounded-lg border-2 p-1 drop-shadow-lg min-w-[250px]'} />
            </div>
            <div className={'mb-4 w-fit mx-auto'}>
              <p className={'mb-1 text-sm font-bold'}>Description</p>
              <input type={'text'}
                     className={'w-full rounded-lg border-2 p-1 drop-shadow-lg min-w-[250px] min-h-[60px]'} />
            </div>

            <div className={'flex gap-2'}>
              <div className={'mb-4 w-fit mx-auto'}>
                <p className={'mb-1 text-sm font-bold'}>Tags :</p>
                <input type={'text'} className={'w-full rounded-lg border-2 p-1 drop-shadow-lg min-w-[250px]'} />
              </div>

              <input type={'submit'} value={'Créer'}
                     className={
                       'drop-shadow-lg mr-4 rounded-xl bg-[#19AFFB] px-6 py-2 text-sm text-center font-bold text-white hover:border-2 hover:bg-white hover:text-[#19AFFB] min-w-fit max-h-fit self-center'
                     }
              />
            </div>
          </div>
        </div>
      </form>

      <div className={'border-[1px] border-black w-[70vw] mt-8'} />

      <div>
        <p className={'font-bold text-2xl mt-4'}>Vidéos en attente de publication</p>

      </div>

    </div>
  );
}
