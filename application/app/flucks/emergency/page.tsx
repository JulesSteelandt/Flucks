'use client';
import {API_CREATE_STREAM} from '@/app/utils/appGlobal';
import {getCookieToken, getDecodedToken} from '@/app/utils/getToken';
import {useRouter} from 'next/navigation';

export default function emergencyWarning() {
    const router = useRouter();

    const getDateTime = () => {
        const date = new Date();
        // date format  j-m-a-h-m
        return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}-${date.getHours()}h${date.getMinutes()}`;
    };
    const getTitre = async () => {
        let title = getDateTime();
        try {
            const token = await getDecodedToken();
            // @ts-ignore
            title += `_${token.username}`;
            return title;
        } catch (error: any) {
            return title;
        }
    };

    const getPosition = () => {
        return new Promise((resolve, reject) => {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(resolve, reject);
            } else {
                reject("La géolocalisation n'est pas prise en charge par ce navigateur.");
            }
        });
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

        try {
            const position = await getPosition();
            // @ts-ignore
            body.geolocalisation = {latitude: position.coords.latitude, longitude: position.coords.longitude};
        } catch (error: any) {
            body.geolocalisation = {latitude: null, longitude: null};
        }

        return JSON.stringify(body);
    };

    async function createStreamEmergency() {
        const response = await fetch(API_CREATE_STREAM, {
            cache: 'no-cache',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${await getCookieToken()}`,
            },
            body: await createBody(),
        });
        const data = await response.json();
        if (!response.ok) {
            console.log('erreur pdt le fetch creation stream urgence');
        } else {
            router.push(`/flucks/emergency/${data.data.diffusionId}`);
        }
    }

    const handleEmergency = () => {
        createStreamEmergency();
    };

    return (
        <div className={'flex h-full w-full flex-col items-center justify-center md:w-5/6'}>
            <button
                onClick={handleEmergency}
                className={'mt-[25vh] flex w-fit max-w-[400px] flex-col items-center justify-center'}
            >
                <div className={'flex w-full rounded-t-lg bg-[#5DA5B3] md:py-6 max-md:py-4 items-center max-md:flex-col'}>
                    <div
                        className={'md:ml-4 max-md:mb-2 flex h-12 min-h-12 w-12 min-w-12 items-center justify-center rounded-full bg-[#A91208]'}
                    >
                        <p className={'text-center text-3xl text-white font-bold'}>!</p>
                    </div>

                    <p className={'md:mx-6 max-md:mx-4 max-w-[80vw] text-left font-semibold text-white max-md:text-center w-full'}>
                        Attention, vous allez passer en direct et votre localisation sera partagée.
                    </p>
                </div>
                <p className={'w-full rounded-b-lg bg-[#A91208] py-4 font-bold text-white max-md:px-4'}>Lancer la diffusion en
                    direct</p>
            </button>
        </div>
    );
}
