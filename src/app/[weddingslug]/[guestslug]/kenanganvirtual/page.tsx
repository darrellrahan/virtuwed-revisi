'use client'
// import KenanganVirtual from '@/components/kenanganVirtual'
import KenanganVirtual from '@/components/KenanganVirtual'
import { data } from './dataKenanganVirtual'
import React, { useEffect, useState } from 'react'
// var Marzipano = require('./marzipano');
import { redirect } from 'next/navigation';
import { RootState } from '@/app/redux/reducers';
import { useSelector } from 'react-redux';

// import boopSfx from '/assets/kenanganVirtual/GonnaLiveForever.mp3'
import useSound from 'use-sound';
import LoadingSkeleton from '@/components/LoadingSkeleton';

const Page = ({ params }: { params: { weddingslug: string, guestslug: string } }) => {
    // const [play, { stop, isPlaying }] = useSound('/assets/kenanganVirtual/GonnaLiveForever.mp3');
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
            <main className='h-screen w-full overflow-hidden'>
                <KenanganVirtual dataKenanganVirtual={data} />

                {/* MUSIC */}
                {/* <section className='fixed z-10 top-3 right-3'>
                    <button className={`block bg-music-disc bg-cover w-12 h-12 ${isPlaying ? 'animate-spin-slow' : 'animate-none'}`}
                        onClick={handleButtonClick}
                    >
                    </button>
                </section> */}
            </main >
        )
    } else {
        return redirect('/')
    }
}

export default Page

// onMouseEnter={() => play()} onMouseLeave={() => pause()}