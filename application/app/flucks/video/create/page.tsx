'use client';

import React, {ChangeEvent, useEffect, useState} from 'react';
import VideoWaitingComponent from '@/app/flucks/video/create/components/VideoWaiting';
import {API_CREATE_STREAM, API_UPLOAD_VIDEO, API_VIDEO_USER} from '@/app/utils/appGlobal';
import {getCookieToken} from '@/app/utils/getToken';
import {VideoData} from '@/app/utils/types';

export default function Page() {
  // state
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState('');
  const [video, setVideo] = useState<File | null>(null);
  const [videosData, setVideosData] = useState<VideoData[]>([]);

  useEffect(() => {
    const getVideosPrivate = async () => {
      try {
        const res = await fetch(API_VIDEO_USER, {
          cache: 'no-cache',
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${await getCookieToken()}`,
          },
        });
        if (!res.ok) {
          console.error('Erreur de récupération des données');
          return;
        }
        const data = await res.json();
        setVideosData(data.data);
      } catch (e) {
        console.log('Données non chargées');
      }
    };

    getVideosPrivate();
  }, []);

  // comportement
  async function handleCreate(event: any) {
    console.log('coucou jai cliqué sur le bouton submit : créer');
    const data = await createVideo();
    const responseUpload = await uploadVideo(data);
    console.log(responseUpload);
  }

  async function uploadVideo(data: any) {
    console.log(data.data.diffusionId);
    const formData = new FormData();
    formData.append('file', video as File);

    const response = await fetch(`${API_UPLOAD_VIDEO}/${data.data.diffusionId}`, {
      cache: 'no-cache',
      method: 'POST',
      body: formData,
    });
    const dataresponse = await response.json();
    if (!response.ok) {
      console.log("erreur pdt l'upload de la vidéo");
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
        Authorization: `Bearer ${await getCookieToken()}`,
      },
      body: createBody(),
    });
    const data = await response.json();
    console.log(data);
    if (!response.ok) {
      console.log('erreur pdt le fetch creation stream');
    } else {
      return data;
    }
  }

  // affichage
  return (
    <div className={'mx-8  flex w-full flex-col items-center md:w-5/6  '}>
      <p className={'p-6 text-3xl font-bold'}>Créer une vidéo</p>

      <div className={'flex w-full justify-center'}>
        <div className={'flex flex-wrap'}>
          <div className={'flex h-fit gap-2'}>
            <div className={'flex min-h-[75px] min-w-[150px] items-center justify-center rounded-xl bg-[#5DA5B3]'}>
              <img src={'/img/video_play_img.png'} alt={'Play'} width={'50'} height={'50'} />
            </div>

            <div className={'flex flex-col gap-4'}>
              <input
                type={'file'}
                onChange={handleFileChange}
                className={'w-full max-w-[15vw] rounded-lg border-2 p-1 drop-shadow-lg'}
              />

              <input type={'file'} className={'w-full max-w-[15vw] rounded-lg border-2 p-1 drop-shadow-lg'} />
            </div>
          </div>

          <div className={'flex flex-col'}>
            <div className={'w-ull mx-auto mb-4'}>
              <div className={'flex'}>
                <p className={'mb-1 text-sm font-bold'}>Titre</p>
                <p className={'text-red-700'}>*</p>
              </div>
              <input
                type={'text'}
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
                className={'w-full min-w-[250px] rounded-lg border-2 p-1 drop-shadow-lg'}
              />
            </div>
            <div className={'mx-auto mb-4 w-fit'}>
              <p className={'mb-1 text-sm font-bold'}>Description</p>
              <input
                type={'text'}
                onChange={(e) => {
                  setDescription(e.target.value);
                }}
                className={'min-h-[60px] w-full min-w-[250px] rounded-lg border-2 p-1 drop-shadow-lg'}
              />
            </div>

            <div className={'flex gap-2'}>
              <div className={'mx-auto mb-4 w-fit'}>
                <p className={'mb-1 text-sm font-bold'}>Tags :</p>
                <input type={'text'} className={'w-full min-w-[250px] rounded-lg border-2 p-1 drop-shadow-lg'} />
              </div>

              <button
                type={'submit'}
                onClick={handleCreate}
                className={
                  'mr-4 max-h-fit min-w-fit self-center rounded-xl bg-[#19AFFB] px-6 py-2 text-center text-sm font-bold text-white drop-shadow-lg hover:bg-white hover:text-[#19AFFB]'
                }
              >
                Créer
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className={'mt-8 w-[70vw] border-[1px] border-black'} />
      <p className={'mt-4 text-2xl font-bold'}>Vidéos en attente de publication</p>

      <div className={'flex flex-wrap justify-start gap-2'}>
        {Array.isArray(videosData) &&
          videosData.map((video: VideoData) => {
            if (!video.public) {
              return (
                <div key={video.id}>
                  <VideoWaitingComponent id={video.id} title={video.titre} creator={video.createur} />
                </div>
              );
            }
          })}
      </div>
    </div>
  );
}
