'use client'

import React from "react";
import {API_POST_LIKE} from "@/app/utils/appGlobal";
import {getCookieToken} from "@/app/utils/getToken";

export default function Like({nbLikes, idVideo, isLike}) {

    console.log(isLike ? "vidéo likée" : "vidéo non likée");
    const [liked, setLiked] = React.useState(false);

    async function likeVideo() {
        setLiked(!liked);
        try {
            await addLike();
        } catch (error) {
            console.error(error);
        }
    }

    const addLike = async () => {
        try {
            fetch(API_POST_LIKE + '/' + idVideo, {
                cache: 'no-cache',
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${await getCookieToken()}`
                },
                body: JSON.stringify({
                    "like": false
                })
            }).then(result => {
                result.json();
            }).catch(error => {
                console.log(error);
            })
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className={'flex flex-row items mx-16'}>
            <img src={liked ? '/img/like_full.png' : '/img/like_empty.png'} alt={'like empty'} className={'w-8'}
                 onClick={likeVideo}/>
            <p className={'ml-1 font-bold text-[#394054]'}>{nbLikes}</p>
        </div>
    )
}