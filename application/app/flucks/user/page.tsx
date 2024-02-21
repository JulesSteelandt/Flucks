'use client';

import {getDecodedToken} from "@/app/utils/getToken";
import {useEffect, useState} from "react";

export default function CreateStream() {

    const [userEmail, setUserEmail] = useState(null);
    const [userPseudo, setUserPseudo] = useState(null);

    useEffect(() => {
        getDecodedToken().then(token => {
            setUserEmail(token.email);
            setUserPseudo(token.username);
        }).catch(error => {
            console.log(error);
        })
    }, []);

    return (
        <section className={'bg-[#E0E2E8] w-full md:w-5/6'}>
            <div className={'flex flex-col '}>
                <div className={'h-auto w-auto flex flex-col justify-center md:flex-row m-10'}>
                    <div className={'flex flex-col'}>
                        <div className={'flex flex-col items-center mb-8'}>
                            <div
                                className={'bg-[#D9D9D9] rounded-full h-[50vw] w-[50vw] max-w-[200px] max-h-[200px] mb-2'}/>
                            <label>Photo de profil</label>
                        </div>


                        <form className={'flex flex-col gap-2'}>
                            <label className={''}><strong>Email :</strong> {userEmail}</label>
                            <input type={'text'}
                                   className={'w-full rounded-lg border-2 p-1 drop-shadow-lg min-w-[250px] resize-none'}/>

                            <label className={''}><strong>Pseudo :</strong> {userPseudo}</label>
                            <input type={'text'}
                                   className={'w-full rounded-lg border-2 p-1 drop-shadow-lg min-w-[250px] resize-none'}/>

                            <input type={'submit'}
                                   className={'flex self-end bg-[#19AFFB] py-2 px-6 rounded-xl font-bold text-sm text-white drop-shadow-lg hover:border-2 hover:bg-white hover:text-[#19AFFB]'}
                                   value={'Enregistrer'}/>
                        </form>
                    </div>
                    <div className={'border-black border-[1px] mx-8 hidden md:block'}></div>
                    <form className={'flex flex-col gap-2 md:w-1/3'}>
                        <label className={'self-center font-semibold'}>Changer de mot de passe</label>

                        <label>Nouveau mot de passe :</label>
                        <input type={'text'}
                               className={'w-full rounded-lg border-2 p-1 drop-shadow-lg min-w-[250px] resize-none'}/>

                        <label>Confirmation du mot de passe :</label>
                        <input type={'text'}
                               className={'w-full rounded-lg border-2 p-1 drop-shadow-lg min-w-[250px] resize-none'}/>

                        <input type={'submit'}
                               className={'flex self-end bg-[#19AFFB] py-2 px-6 rounded-xl font-bold text-sm text-white drop-shadow-lg hover:border-2 hover:bg-white hover:text-[#19AFFB]'}
                               value={'Enregistrer'}/>

                    </form>
                </div>
            </div>
        </section>
    );
}
