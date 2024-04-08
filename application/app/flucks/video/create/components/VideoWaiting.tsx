import React from 'react';
import {API_DELETE_VIDEO, API_PUBLISH_VIDEO} from '@/app/utils/appGlobal';
import {getCookieToken} from '@/app/utils/getToken';
import {useRouter} from 'next/navigation';
import Video from '@/app/flucks/video/create/components/Video';

export default function VideoWaitingComponent({id, title, creator}: {title: string; creator: string; id: string}) {
  const router = useRouter();
  const handlePublish = async () => {
    try {
      const token = await getCookieToken();
      const response = await fetch(`${API_PUBLISH_VIDEO}/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error('Failed to publish video');
      }
      router.refresh();
    } catch (error) {
      console.error('Error publishing video:', error);
    }
  };

  const handleDelete = async () => {
    try {
      const token = await getCookieToken();
      const response = await fetch(`${API_DELETE_VIDEO}/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error('Failed to delete video');
      }
      router.refresh();
    } catch (error) {
      console.error('Error deleting video:', error);
    }
  };

  const handleEdit = () => {
    router.push(`/flucks/edit/${id}`);
  };

  return (
      <div className='flex w-[20vw] min-w-[400px] gap-2 rounded-xl bg-[#394054] pr-2'>
        <div className={'min-w-[200px] my-2 ml-2'}>
          <Video key={id} title={title} creator={creator} id={id}/>
        </div>
        <div className={'flex flex-col justify-between w-full'}>
          <div className={'flex flex-col gap-2'}>
            <button
                onClick={handleEdit}
                className={'w-full min-w-fit rounded-xl bg-gray-100 px-6 py-1 font-bold drop-shadow-lg hover:bg-black hover:text-white mt-2'}
            >
              Modifier
            </button>
            <button
                onClick={handleDelete}
                className={'w-full min-w-fit rounded-xl bg-gray-100 px-6 py-1 font-bold drop-shadow-lg hover:bg-black hover:text-white'}
            >
              Supprimer
            </button>
          </div>
          <button
              onClick={handlePublish}
              className={'w-full min-w-fit rounded-xl bg-[#19AFFB] px-6 py-1 font-bold text-white drop-shadow-lg hover:bg-white hover:text-[#19AFFB] mb-2'}
          >
            Publier
          </button>
        </div>
      </div>
  );
}
