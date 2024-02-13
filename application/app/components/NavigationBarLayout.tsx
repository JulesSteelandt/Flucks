import Menu from "./MenuLayout.tsx";

export default function NavBar() {
    return (
        <div className={'flex flex-col items-center navBarBackground mt-0 h-screen w-1/6'}>
            <input className={'w-11/12 mx-1 my-4 p-1.5'} type={'text'} placeholder={"Rechercher"}/>
            <Menu menuName={"Live"}/>
            <Menu menuName={"Vidéos"}/>
            <Menu menuName={"Carte"}/>
        </div>
    )
}