import {useState} from "react";
import classNames from "classnames";

export default function Page(id) {

    const [videoNotFound, setVideoNotFound] = useState(false);
    const handleVideoError = () => {
        setVideoNotFound(true);
    }

    return (
        <div className={classNames('bg-black w-[calc(100% - 32px)] h-2/3 flex justify-center items-center mb-4')}>
            {
                videoNotFound ? (
                    <p className={'text-white'}>Erreur de chargement de la vidéo</p>
                ) : (
                    <video className={'h-full'} controls onError={handleVideoError}>
                        <source src={"http://docketu.iutnc.univ-lorraine.fr:35303/video/" + id.id + ".mp4"}
                                type={"video/mp4"}/>
                    </video>
                )
            }
        </div>
    )
}