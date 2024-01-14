'use client'
import Ballroom from '@/src/components/Ballroom';
import { Suspense, useEffect, useState } from 'react';
import Loading from './loading';
import useSound from 'use-sound';
import { redirect, usePathname } from 'next/navigation';
import { RootState } from '@/src/app/[lang]/redux/reducers';

import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { Locale } from '@/i18n.config';
import { setData, fetchData as fetchAction } from '../../../redux/actions';
import LoadingSkeleton from '@/src/components/LoadingSkeleton';
import ResepsiVirtual from '@/src/components/ResepsiVirtual';
import { data } from './dataPano';

const Page = ({ params }: { params: { weddingslug: string, guestslug: string, lang: Locale } }) => {
    const dispatch = useDispatch();

    const API_BASE_URL = 'https://panel.virtuwed.id/api';
    const API_ENDPOINT = `/wedding?wedding_slug=${params.weddingslug}&${params.guestslug && params.guestslug ? 'guest_slug=' + params.guestslug : ''}`;
    const ANALYTIC = `/wedding/analytic?wedding_slug=${params.weddingslug}&guest_slug=${params.guestslug}&feature_hit=resepsi_virtual`;

    // SONG 
    // const [play, { pause }] = useSound('/assets/kenanganVirtual/GonnaLiveForever.mp3')
    // const [isPlaying, setIsPlaying] = useState(false);
    // const [isPlaying, setIsPlaying] = useState(true);

    const guest = useSelector((state: RootState) => state.value.guest);

    useEffect(() => {
        dispatch(fetchAction());
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
        // setIsPlaying(true)
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
            // <main className={`container w-full min-w-full h-screen mx-auto overflow-hidden relative`}>
            <main className={`container w-full min-w-full min-h-dvh h-dvh mx-auto overflow-hidden relative`}>
                <Suspense fallback={<Loading />}>
                    <Ballroom lang={params.lang} />
                    {/* <ResepsiVirtual dataPano={data} lang={params.lang} /> */}
                </Suspense>

                {/* MUSIC */}
                {/* <section className='fixed z-10 top-3 right-3'>
                    <button className={`block bg-music-disc bg-cover w-12 h-12 ${isPlaying ? 'animate-spin-slow' : 'animate-none'}`} onClick={handleButtonClick}>
                    </button>
                </section> */}
            </main >
        )
    } else {
        return (

            // redirect('/')
            <LoadingSkeleton />
        )
    }


}

export default Page;
