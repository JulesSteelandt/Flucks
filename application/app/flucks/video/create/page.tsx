'use client';
import Image from 'next/image';
import VideoWaitingComponent from '@/app/flucks/video/create/components/VideoWaiting';
import {ChangeEvent, useState} from 'react';
import {API_CREATE_STREAM, API_UPLOAD_VIDEO} from '@/app/utils/appGlobal';
import {getCookieToken} from '@/app/utils/getToken';
import {router} from 'next/client';
import {cache} from 'browserslist';



export default function Page() {
  // state
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState('');
  const [video, setVideo] = useState<File | null>(null);



  // comportement
  async function handleCreate  (event: any) {
    console.log('coucou jai cliqué sur le bouton submit : créer');
     const data = await createVideo() ;
     const responseUpload = await uploadVideo(data);
      console.log(responseUpload);
      };



  async function uploadVideo(data: any) {
    console.log(data.data.diffusionId);
    const formData = new FormData();
    formData.append('file', video as File);

    const response =await fetch(`${API_UPLOAD_VIDEO}/${data.data.diffusionId}`, {
      cache: 'no-cache',
      method: 'POST',
      body: formData,
    });
    const dataresponse = await response.json();
    if (!response.ok) {
      console.log('erreur pdt l\'upload de la vidéo');
    } else {
      return dataresponse;
    }



  }

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      setVideo(file);
    }
  };

  const createBody = () => {
    const body: {[key: string]: any} = {
      titre: title,
      direct: 0,
      urgence: 0,
    };

    // Vérification et ajout des attributs en fonction des valeurs
    if (description !== '') {
      body.description = description;
    }
    if (tags.length > 0) {
      body.tags = tags;
    }


    console.log('body :', body);
    return JSON.stringify(body);
  };

  async function createVideo() {
    const response = await fetch(API_CREATE_STREAM, {
      cache: 'no-cache',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${await getCookieToken()}`,
      },
      body: createBody(),
    });
    const data = await response.json();
    if (!response.ok) {
      console.log('erreur pdt le fetch creation stream');
    } else {
     return data;
    }
  };

  // affichage
  return (
    <div className={'flex  w-full flex-col items-center md:w-5/6 mx-8  '}>
      <p className={'p-6 text-3xl font-bold'}>Créer une vidéo</p>

      <div className={'flex w-full justify-center'} >
        <div className={'flex flex-wrap'}>
          <div className={'flex gap-2 h-fit'}>
            <div className={'bg-[#5DA5B3] rounded-xl min-w-[150px] min-h-[75px] flex items-center justify-center'}>
              <Image src={'/img/video_play_img.png'} alt={'Play'} width={'50'} height={'50'} />
            </div>

            <div className={'flex flex-col gap-4'}>
              <input type={'file'}
                     onChange={handleFileChange}
                     className={'w-full rounded-lg border-2 p-1 drop-shadow-lg max-w-[15vw]'} />


              <input type={'file'} className={'w-full rounded-lg border-2 p-1 drop-shadow-lg max-w-[15vw]'} />
            </div>
          </div>


          <div className={'flex flex-col'}>
            <div className={'mb-4 w-ull mx-auto'}>
              <div className={'flex'}>
                <p className={'mb-1 text-sm font-bold'}>Titre</p>
                <p className={'text-red-700'}>*</p>
              </div>
              <input type={'text'} onChange={
                (e) => {
                  setTitle(e.target.value);
                }
              } className={'w-full rounded-lg border-2 p-1 drop-shadow-lg min-w-[250px]'} />
            </div>
            <div className={'mb-4 w-fit mx-auto'}>
              <p className={'mb-1 text-sm font-bold'}>Description</p>
              <input type={'text'} onChange={
                (e) => {
                  setDescription(e.target.value);
                }
              }
                     className={'w-full rounded-lg border-2 p-1 drop-shadow-lg min-w-[250px] min-h-[60px]'} />
            </div>

            <div className={'flex gap-2'}>
              <div className={'mb-4 w-fit mx-auto'}>
                <p className={'mb-1 text-sm font-bold'}>Tags :</p>
                <input type={'text'} className={'w-full rounded-lg border-2 p-1 drop-shadow-lg min-w-[250px]'} />
              </div>

              <button type={'submit'} onClick={handleCreate}
                     className={
                       'drop-shadow-lg mr-4 rounded-xl bg-[#19AFFB] px-6 py-2 text-sm text-center font-bold text-white hover:bg-white hover:text-[#19AFFB] min-w-fit max-h-fit self-center'
                     }
              >Créer</button>
            </div>
          </div>
        </div>
      </div>

      <div className={'border-[1px] border-black w-[70vw] mt-8'} />
      <p className={'font-bold text-2xl mt-4'}>Vidéos en attente de publication</p>


      <div className={'flex flex-wrap justify-start gap-2'}>
        <VideoWaitingComponent id={'test'} title={'testtesttesttesttesttesttesttesttesttest'} creator={'testesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttestt'} />
        <VideoWaitingComponent id={''} title={''} creator={''} />
        <VideoWaitingComponent id={''} title={''} creator={''} />

      </div>


    </div>
  );
}
