'use client'
import Ballroom from '@/components/Ballroom';
import { useEffect, useRef, useState } from 'react';

const Page = () => {
    // SONG 
    const [isPlaying, setIsPlaying] = useState(true);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    const handleButtonClick = () => {
        if (isPlaying) {
            audioRef.current?.pause();
        } else {
            audioRef.current?.play();
        }
        setIsPlaying(!isPlaying);
    };

    useEffect(() => {
        audioRef.current = new Audio('/assets/undanganDigital/GonnaLiveForever.mp3');
        audioRef.current.loop = true;
        audioRef.current.play();

        return () => {
            audioRef.current?.pause();
        };
    }, []);

    return (
        <main className={`container w-full min-w-full h-screen mx-auto overflow-hidden`}>
            <Ballroom />

            {/* MUSIC */}
            <section className='fixed z-10 bottom-4 ml-4'>
                <button className={`block bg-music-disc bg-cover w-12 h-12 ${isPlaying ? 'animate-spin-slow' : 'animate-none'}`} onClick={handleButtonClick}>
                </button>
            </section>
        </main>
    )
}

export default Page;
