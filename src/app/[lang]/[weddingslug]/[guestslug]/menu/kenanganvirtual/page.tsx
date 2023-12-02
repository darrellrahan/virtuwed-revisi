'use client'
import { useSearchParams } from 'next/navigation'
import KenanganVirtual from '@/src/components/KenanganVirtual'
import { data } from './dataKenanganVirtual'
import React, { useEffect, useState } from 'react'
// var Marzipano = require('./marzipano');
import { redirect } from 'next/navigation';
// import { RootState } from '@/src/app/redux/reducers';
import { RootState } from '@/src/app/[lang]/redux/reducers'
import { useDispatch, useSelector } from 'react-redux';

// import { setData, fetchData as fetchAction } from '../../../redux/actions';
// import boopSfx from '/assets/kenanganVirtual/GonnaLiveForever.mp3'
import useSound from 'use-sound';
import LoadingSkeleton from '@/src/components/LoadingSkeleton';
import axios from 'axios';
import { Locale } from '@/i18n.config'
import { setData, fetchData as fetchAction } from '@/src/app/[lang]/redux/actions'

const Page = ({ params }: { params: { weddingslug: string, guestslug: string, lang: Locale } }) => {
    const dispatch = useDispatch();


    // const [play, { stop, isPlaying }] = useSound('/assets/kenanganVirtual/GonnaLiveForever.mp3');
    // const [play, { pause }] = useSound('/assets/kenanganVirtual/GonnaLiveForever.mp3')
    // const [isPlaying, setIsPlaying] = useState(false);
    // const [isPlaying, setIsPlaying] = useState(true);


    const API_BASE_URL = 'https://panel.virtuwed.id/api';
    const API_ENDPOINT = `/wedding?wedding_slug=${params.weddingslug}&${params.guestslug && params.guestslug ? 'guest_slug=' + params.guestslug : ''}`;
    const ANALYTIC = `/wedding/analytic?wedding_slug=${params.weddingslug}&guest_slug=${params.guestslug}&feature_hit=kenangan_virtual`;


    const guest = useSelector((state: RootState) => state.value.guest);
    const searchParams = useSearchParams()

    const place = searchParams.get('place')

    useEffect(() => {
        dispatch(fetchAction());
        // setIsPlaying(true)
        const fetchData = async () => {
            try {
                const response = await axios.get(API_BASE_URL + API_ENDPOINT);


                dispatch(setData(response.data.data));
                // setMessage(response.data.data.message)
                console.log(response.data.data);
                hitAnalytic()
            }

            catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        const hitAnalytic = async () => {
            try {
                const response = await axios.get(API_BASE_URL + ANALYTIC);
                console.log(response.data);

            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData()
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
                {place &&
                    <KenanganVirtual lang={params.lang} place={place as string} dataKenanganVirtual={data} />
                }

                {/* <h1>{place}</h1> */}
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
        return (
            <LoadingSkeleton />
        )
        // redirect('/')
    }
}

export default Page

// onMouseEnter={() => play()} onMouseLeave={() => pause()}