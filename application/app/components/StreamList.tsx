import Stream from "@/app/components/Stream";
import '../globals.css';

export default function StreamList() {
    return (
        <div>
            <p class={'font-bold p-8 text-2xl'}>Liste des streams</p>
            <div className={'flex flex-wrap justify-evenly p-8 bg-gray-100'}>
                <Stream/>
                <Stream/>
                <Stream/>
                <Stream/>
                <Stream/>
                <Stream/>
                <Stream/>
                <Stream/>
            </div>

        </div>
    )
}