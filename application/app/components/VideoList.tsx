import Stream from "@/app/components/Stream";
import Video from "@/app/components/Video";

export default function VideoList({ nb }) {
    return (
        <div>
            <p className={'font-bold p-8 text-2xl'}>Liste des vidéos</p>
            <div className={'flex flex-wrap justify-evenly p-8'}>
                <Video/>
                <Video/>
                <Video/>
                <Video/>
                <Video/>
                <Video/>
                <Video/>
                <Video/>
            </div>
        </div>
    )
}

