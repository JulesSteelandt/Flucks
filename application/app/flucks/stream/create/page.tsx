'use client';
import {useState} from 'react';
import CheckboxLinear from '../../../components/CheckboxLinear';
import Image from 'next/image';
import PreviewStream from './components/PreviewStream';
import {API_CREATE_STREAM} from '@/app/utils/appGlobal';
import {router} from 'next/client';
import {useRouter} from 'next/navigation';

export default function CreateStream() {
    // state
    const router = useRouter();

    // comportement
      async function createIdStream () {
        const response = await fetch(API_CREATE_STREAM, { cache: 'no-cache',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IkFsaWNlT2ZmIiwiZW1haWwiOiJhbGljZUBtYWlsLmNvbSIsImlhdCI6MTcwODM1NDM3MH0.2uLEkqYJoEfVAEI3uHG3hqhHZEj8iWKtQp3fA1iCFYo'
            },
            body: JSON.stringify({
                titre: 'JeTestAvecLeFront',
                direct: 1,
                urgence: 0,
            })
        });
        const data = await response.json();
        if (!response.ok) {
            console.log('erreur pdt le fetch creation stream');
        } else {
            router.push(`/flucks/stream/${data.data.diffusionId}`);
        }

    };


    // affichage
    return (
        <section className={'bg-[#E0E2E8] w-full md:w-5/6'}>
            <div className={'flex flex-col '}>
                <PreviewStream/>
                <div className={'h-auto w-auto flex flex-col justify-center md:flex-row m-10'}>


                    <div className={'flex flex-col md:w-1/3'}>
                        <label>Titre du stream :</label>
                        <textarea className={'rounded-lg drop-shadow-lg resize-none'}></textarea>

                        <label>Description du stream :</label>
                        <textarea className={'rounded-lg drop-shadow-lg resize-none'}></textarea>
                    </div>

                    <div className={'border-black border-[1px] mx-2 hidden md:block'}></div>

                    <div className={'flex flex-col gap-2 md:w-1/3'}>
                        <label>Tags :</label>
                        <textarea className={'rounded-lg drop-shadow-lg resize-none'}></textarea>

                        <div
                            className={'flex bg-white rounded-lg p-1 justify-center items-center drop-shadow-lg max-w-[250px] gap-5'}>
                            <CheckboxLinear/>
                            <label className={'font-semibold mr-2'}>Géolocalisation</label>
                        </div>

                        <div className={'flex self-center'} onClick={createIdStream} >
                            <Image src={'/../img/FlecheDouble.png'} width={30} height={30}
                                   className={'max-w-[30px] max-h-[30px] self-center'} alt={'fleche'}/>
                            <p className={'bg-[#19AFFB] py-1 px-2 rounded-lg text-white'}>Lancer la diffusion en
                                direct</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
