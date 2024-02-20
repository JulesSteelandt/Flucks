import Video from "@/app/components/Video";

export default function Page() {
    return (
        <div className={'w-5/6'}>
            <p className={'p-8 text-2xl font-bold'}>Mes vidéos</p>
            <div className={'flex flex-wrap px-8'}>
                <Video title={'La dinguerie du chef ??'} creator={'AliceOff'} id={'8457d296-c8e6-4a75-b71b-ff2d775e6465'}/>
                <Video title={'btrtnrhn'} creator={'bgrfbhgn'}/>
                <Video title={'btrtnrhn'} creator={'bgrfbhgn'}/>
                <Video title={'btrtnrhn'} creator={'bgrfbhgn'}/>
                <Video title={'btrtnrhn'} creator={'bgrfbhgn'}/>
            </div>
        </div>
    )
}