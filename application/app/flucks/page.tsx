import StreamList from "@/app/components/StreamList";
import VideoList from "@/app/components/VideoList";

export default function Accueil() {
    return (
        <div className={'w-5/6'}>
            <StreamList/>
            <VideoList/>
        </div>
    )
}