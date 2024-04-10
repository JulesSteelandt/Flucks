'use client';

import React from 'react';

// @ts-ignore
export default function Like({nbLikes, isLike}: any) {
  const [liked, setLiked] = React.useState(isLike);

  function likeVideo() {
    setLiked(!liked);
  }

  return (
    <div className={'items mx-16 flex flex-row'}>
      <img
        src={liked ? '/img/like_empty.png' : '/img/like_full.png'}
        alt={'like empty'}
        className={'w-8'}
        onClick={likeVideo}
      />
      <p className={'ml-1 font-bold text-[#394054]'}>{nbLikes}</p>
    </div>
  );
}
