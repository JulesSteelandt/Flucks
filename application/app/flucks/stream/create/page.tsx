'use client';
import {useState} from 'react';
import CheckboxLinear from './components/CheckboxLinear';
import Image from 'next/image';


export default function CreateStream() {

    // state

    // comportement


    // affichage
    return (
        <section className={'bg-[#E0E2E8] w-5/6'}>
            <div className={'h-auto w-auto flex flex-col m-10'}>


                <div className={'flex justify-center'}>
                    <div className={'flex flex-col w-full'}>
                        <label>Titre du stream :</label>
                        <textarea className={'rounded-lg drop-shadow-lg resize-none'}></textarea>

                        <label>Description du stream :</label>
                        <textarea className={'rounded-lg drop-shadow-lg resize-none'}></textarea>

                    </div>

                    <div className={'border-black border-[1px] mx-2'}>
                    </div>

                    <div className={'flex flex-col gap-2 w-full'}>
                        <label>Tags :</label>
                        <textarea className={'rounded-lg drop-shadow-lg resize-none'}></textarea>

                        <div className={'flex bg-white rounded-lg p-1 justify-center items-center drop-shadow-lg max-w-[250px] gap-5'}>
                            <CheckboxLinear/>
                            <label className={'font-semibold mr-2'}>Géolocalisation</label>
                        </div>

                        <div className={'flex self-center'}>
                            <Image src={'/../img/FlecheDouble.png'} width={30} height={30} alt={'fleche'} />
                            <p className={'bg-[#19AFFB] py-1 px-2 rounded-lg text-white'} >Lancer la diffusion en direct</p>
                        </div>

                    </div>

                </div>
            </div>
        </section>

    );
}
