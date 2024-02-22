'use client';
import Link from 'next/link';
import {API_CREATE_STREAM} from '@/app/utils/appGlobal';
import {getCookieToken, getDecodedToken} from '@/app/utils/getToken';
import {useRouter} from 'next/navigation';

export default function emergencyWarning() {

    const router = useRouter();

    const getDateTime = () => {
        const date = new Date();
        return date.toISOString();
    };
    const getTitre = async () => {
        let title = getDateTime();
        try {
            const token = await getDecodedToken();
            // @ts-ignore
            title += `_${token.username}`;
            return title;
        } catch (error) {
            return title;
        }
    };


    const createBody = async () => {
        const titre = await getTitre();
        const body: { [key: string]: any } = {
            titre: titre,
            direct: 1,
            urgence: 1,
        };

        body.description = 'Urgence en direct';
        body.tags = ['Urgence'];

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                const geo = {latitude: position.coords.latitude, longitude: position.coords.longitude};
                body.geolocalisation = geo;
            });
        }
        return JSON.stringify(body);
    };

    async function createStreamEmergency() {
        const response = await fetch(API_CREATE_STREAM, {
            cache: 'no-cache',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${await getCookieToken()}`,
            },
            body: await createBody(),
        });
        const data = await response.json();
        if (!response.ok) {
            console.log('erreur pdt le fetch creation stream urgence');
        } else {
            router.push(`/flucks/emergency/${data.data.diffusionId}`);
        }

    };

    const handleEmergency = () => {
        createStreamEmergency();
    };


    return (
        <div className={'flex w-full flex-col items-center md:w-5/6 h-full justify-center'}>
            <button onClick={handleEmergency}
                    className={'flex w-fit flex-col items-center justify-center mt-[25vh] max-w-[400px]'}>
                <div className={'flex rounded-t-lg bg-[#5DA5B3] py-6 w-full'}>
                    <div
                        className={'flex bg-[#A91208] rounded-full h-12 w-12 items-center justify-center ml-4 min-h-12 min-w-12'}>
                        <p className={'text-white text-center text-3xl'}>!</p>
                    </div>

                    <p className={'text-white max-w-[30vw] mx-4 font-semibold text-left'}>
                        Attention, vous allez passer en direct et votre localisation sera partagée.
                    </p>
                </div>
                <p className={'bg-[#A91208] rounded-b-lg text-white w-full font-bold py-4'}>
                    Lancer la diffusion en direct
                </p>
            </button>
        </div>

    );
}