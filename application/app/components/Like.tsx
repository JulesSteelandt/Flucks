'use client'

import React from "react";

export default function Like({ nbLikes }) {

    const [liked, setLiked] = React.useState(false);

    function likeVideo() {
        setLiked(!liked);
    }

    return (
        <div className={'flex flex-row items mx-16'}>
            <img src={ liked ? '/img/like_full.png' : '/img/like_empty.png'} alt={'like empty'} className={'w-8'} onClick={ likeVideo }/>
            <p className={'ml-1 font-bold text-[#394054]'}>{ nbLikes }</p>
        </div>
    )
}