import Link from 'next/link';
export default function emergencyWarning() {
    
    
    
return (
    <div className={'flex w-full flex-col items-center md:w-5/6 h-full justify-center'}>
        <button className={'flex w-fit flex-col items-center justify-center mt-[25vh] max-w-[400px]'}>
            <div className={'flex rounded-t-lg bg-[#5DA5B3] py-6 w-full'}>
                <div className={'flex bg-[#A91208] rounded-full h-12 w-12 items-center justify-center ml-4 min-h-12 min-w-12'}>
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