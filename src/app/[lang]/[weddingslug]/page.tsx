'use client'
import Link from 'next/link';
import { Suspense, useEffect, useState } from 'react';

import { redirect, useSearchParams } from 'next/navigation'


import AOS from 'aos';
import 'aos/dist/aos.css'; // Import the CSS file

// FONT PURPOSE
import { Playfair_Display } from 'next/font/google'
import axios from 'axios';
import LoadingSkeleton from '@/src/components/LoadingSkeleton';
const playFair = Playfair_Display({ subsets: ['latin'] })
import { useDispatch, useSelector } from 'react-redux';
// import { setData, fetchData } from '../redux/actions';
import { fetchData as fetchAction, setData, setNewData } from '../redux/actions';
import Image from 'next/image';
import { ButtonDaisy } from '@/src/components/ButtonComponent';


const Page = ({ params }: { params: { weddingslug: string, guestslug: string } }) => {
    const dispatch = useDispatch();
    // const data = useSelector((state: any) => state.value)

    const API_BASE_URL = 'https://panel.virtuwed.id/api';
    const API_ENDPOINT = `/wedding?wedding_slug=${params.weddingslug}&${params.guestslug && params.guestslug ? 'guest_slug=' + params.guestslug : ''}`;

    const [message, setMessage] = useState<string | null>('loading');

    useEffect(() => {
        AOS.init(); // Initialize AOS
        return () => {
            AOS.refresh(); // Clean up AOS on component unmount
        };
    }, []);

    useEffect(() => {
        console.log("ENDPOINT = " + API_ENDPOINT)
        // dispatch(fetchAction());
        const fetchData = async () => {
            try {
                const response = await axios.get(API_BASE_URL + API_ENDPOINT);

                if (response.data.message === 'guest_slug_required') {
                    setMessage(response.data.message);
                    console.log(response.data);
                }
                else if (response.data.message === 'wedding_not_found') {
                    setMessage(response.data.message);
                    console.log(response.data);
                }
                else if (response.data.message === 'wedding_is_private') {
                    console.log(response.data);
                    setMessage(response.data.message)
                }
                else if (response.data.message === 'please_register_a_new_guest') {
                    console.log(response.data);
                    setMessage(response.data.message);

                }
                else {
                    // dispatch(setData(response.data.data));
                    setMessage(response.data.message)
                    // console.log(response.data.data.guest);
                    // setTheme(response.data.data.theme.nama_theme || 'default')



                }

            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        dispatch(setNewData(params.weddingslug));
        fetchData();
    }, []);

    switch (message) {
        case 'guest_slug_required':
            return (
                <Suspense fallback={<LoadingSkeleton />}>
                    <main className='container min-w-full mx-auto min-h-[100dvh] max-w-screen-xl bg-White'>
                        <section className='grid gap-6 h-[100dvh] content-center justify-items-center px-6'>
                            <Image
                                src={'/assets/virtuwed/private_wedding.jpeg'}
                                alt="Virtuwed Private"
                                className="object-cover object-center w-3/4 h-44 max-w-sm rounded"
                                width={500}
                                height={500}
                                priority
                            />
                            <div className='grid gap-2 text-center max-w-sm mb-4'>
                                <h3 className='text-N700 font-bold capitalize'>Link Tidak Valid</h3>
                                <p className='p3-r text-N700'>Mohon periksa kembali link undangan anda. Cek kembali pesan pada WhatsApp anda yang dikirim oleh akun bernama “Virtuwed”</p>
                            </div>
                            <Link href={'/'} className="btn btn-block btn-secondary rounded-sm md:btn-wide">
                                <Image
                                    src={'/assets/logopack/Virtuwed_Main_Logo_White.png'}
                                    alt="Virtuwed Logo"
                                    className="object-cover object-center w-6 h-auto"
                                    width={500}
                                    height={500}
                                    priority
                                />
                                Virtuwed.id
                            </Link>
                        </section>
                    </main>
                </Suspense>
            )
        case 'wedding_not_found':
            return (
                <Suspense fallback={<LoadingSkeleton />}>
                    <main className='container min-w-full mx-auto min-h-[100dvh] max-w-screen-xl bg-White'>
                        <section className='grid gap-6 h-[100dvh] content-center justify-items-center px-6'>
                            <Image
                                src={'/assets/virtuwed/not_found.jpeg'}
                                alt="Virtuwed Not Found"
                                className="object-cover object-center w-3/4 h-44 max-w-sm rounded"
                                width={500}
                                height={500}
                                priority
                            />
                            <div className='grid gap-2 text-center max-w-sm mb-4'>
                                <h3 className='text-N700 font-bold capitalize'>pernikahan tidak ditemukan</h3>
                                <p className='p3-r text-N700'>Mohon maaf, pernikahan yang anda cari tidak ditemukan</p>
                            </div>
                            <Link href={'/'} className="btn btn-block btn-secondary rounded-sm md:btn-wide">
                                <Image
                                    src={'/assets/logopack/Virtuwed_Main_Logo_White.png'}
                                    alt="Virtuwed Logo"
                                    className="object-cover object-center w-6 h-auto"
                                    width={500}
                                    height={500}
                                    priority
                                />
                                Virtuwed.id
                            </Link>
                        </section>
                    </main>
                </Suspense>
            )
        case 'please_register_a_new_guest':
            return redirect('/register-guest')
        default:
            return (
                <LoadingSkeleton />
            );
    }


};

export default Page;