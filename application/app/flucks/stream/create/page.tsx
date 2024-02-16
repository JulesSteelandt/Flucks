'use client';
import {useState} from 'react';
import CheckBoxLinear from './components/CheckboxLinear';
import CheckboxLinear from './components/CheckboxLinear';


export default function CreateStream() {

    // state

    // comportement


    // affichage
    return (
        <div className={'bg-[#E0E2E8] w-5/6'}>
            <div className={'h-full  flex flex-col m-10'}>


                <div className={'flex justify-around'}>
                    <div className={'flex flex-col'}>
                        <label>Titre du stream :</label>
                        <textarea></textarea>

                        <label>Description du stream :</label>
                        <textarea></textarea>

                    </div>

                    <div className={'flex flex-col'}>
                        <label>Tags :</label>
                        <textarea></textarea>

                        <div>
                            <CheckboxLinear/>

                        </div>
                    </div>

                </div>
            </div>
        </div>

    );
}
