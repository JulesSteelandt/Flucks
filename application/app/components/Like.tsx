'use client';

import React from 'react';

// @ts-ignore
export default function Like({nmbLikes, isLike, like}: any) {
  return (
    <div className={'items-center sm:mx-16 flex flex-row'} onClick={like}>
      <img src={isLike ? '/img/like_full.png' : '/img/like_empty.png'} alt={'like empty'} className={'w-8'} />
      <p className={'ml-1 font-bold text-[#394054]'}>{nmbLikes}</p>
    </div>
  );
}
