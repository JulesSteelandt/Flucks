'use client';

import Video from '@/app/components/Video';
import {API_VIDEO_USER} from '@/app/utils/appGlobal';
import {getCookieToken} from '@/app/utils/getToken';
import {VideoData} from '@/app/utils/types';
import {useEffect, useState} from 'react';

export default function Page() {
  const [myVideosData, setVideosData] = useState<VideoData[]>([]);

  useEffect(() => {
    const fetchMyVideos = async () => {
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
        const ok = await res.json();
        setVideosData(ok.data);
        return await res.json();
      } catch (e) {
        console.log('Données non chargées');
      }
    };

    fetchMyVideos();
  }, []);

  return (
    <div className={'w-5/6'}>
      <p className={'p-8 text-2xl font-bold'}>Mes vidéos</p>
      <div className={'grid xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 gap-2'}>
        {myVideosData.map((video: VideoData) => {
          if (!video.direct) {
            return <Video key={video.id} title={video.titre} creator={video.createur} id={video.id} />;
          }
        })}
      </div>
    </div>
  );
}
