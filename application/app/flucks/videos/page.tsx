import VideoList from '@/app/components/VideoList';

export default function Page() {
  return (
    <div className={'w-5/6'}>
      <p className={'p-8 text-2xl font-bold'}>Liste des vidéos</p>
      <VideoList limit={'10000'} />
    </div>
  );
}
