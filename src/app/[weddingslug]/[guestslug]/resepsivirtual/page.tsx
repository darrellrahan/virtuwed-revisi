'use client'
import Ballroom from '@/components/Ballroom';
import { Suspense, useEffect, useState } from 'react';
import Loading from './loading';
import useSound from 'use-sound';
import { redirect, usePathname } from 'next/navigation';
import { RootState } from '@/app/redux/reducers';

import { useSelector } from 'react-redux';

const Page = ({ params }: { params: { weddingslug: string, guestslug: string } }) => {
    // SONG 
    // const [play, { pause }] = useSound('/assets/kenanganVirtual/GonnaLiveForever.mp3')
    // const [isPlaying, setIsPlaying] = useState(false);
    // const [isPlaying, setIsPlaying] = useState(true);

    const guest = useSelector((state: RootState) => state.value.guest);

    useEffect(() => {
        // setIsPlaying(true)
    }, [])

    // const handleButtonClick = () => {
    //     // Toggle play/pause when the button is clicked
    //     setIsPlaying(!isPlaying)
    // };

    // if (isPlaying) {
    //     play();
    // } else {
    //     pause();
    // }

    if (params.guestslug === guest.guest_slug) {
        return (
            // <main className={`container w-full min-w-full h-screen mx-auto overflow-hidden relative`}>
            <main className={`container w-full min-w-full min-h-[100dvh] h-[100dvh] mx-auto overflow-hidden relative`}>
                <Suspense fallback={<Loading />}>
                    <Ballroom />
                </Suspense>

                {/* MUSIC */}
                {/* <section className='fixed z-10 top-3 right-3'>
                    <button className={`block bg-music-disc bg-cover w-12 h-12 ${isPlaying ? 'animate-spin-slow' : 'animate-none'}`} onClick={handleButtonClick}>
                    </button>
                </section> */}
            </main >
        )
    } else {
        return redirect('/')
    }


}

export default Page;
