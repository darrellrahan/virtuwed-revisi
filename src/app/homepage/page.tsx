'use client'
import Link from 'next/link';
import { useEffect, useState } from 'react';


import AOS from 'aos';
import 'aos/dist/aos.css'; // Import the CSS file

// FONT PURPOSE
import { Playfair_Display } from 'next/font/google'
const playFair = Playfair_Display({ subsets: ['latin'] })


const HomePage = () => {

    useEffect(() => {
        AOS.init(); // Initialize AOS
        return () => {
            AOS.refresh(); // Clean up AOS on component unmount
        };
    }, []);

    return (
        <main className={`${playFair.className} container min-w-full mx-auto h-screen text-center max-w-screen-xl bg-cover-session bg-no-repeat bg-center bg-cover`}>
            <div className='grid items-center h-full px-4 bg-white/75'>
                <div className='grid justify-center gap-2'>
                    <h3 data-aos="zoom-in" data-aos-delay="500" data-aos-duration="500" className='text-3xl'>Kepada Yth bapak/ibu/saudara/i</h3>
                    <p data-aos="fade" data-aos-delay="750" data-aos-duration="500" className='text-base'>mohon maaf apabila ada kesalahan pengejaan nama</p>
                </div>

                <div className=''>
                    <h1 data-aos="zoom-in" data-aos-duration="1000" className='text-5xl text-primaryInv'>Rifqi & Alysha</h1>
                    <h2 data-aos="fade" data-aos-delay="1000" data-aos-duration="500" className='text-lg'>Wedding</h2>
                    <p data-aos="fade" data-aos-delay="1000" data-aos-duration="500">8.7.2023</p>
                </div>


                <div className='grid gap-6 max-w-screen-md w-full mx-auto'>
                    <Link href={'homepage/undangandigital'} className='px-1.5 py-3 bg-primaryInv text-white'>Buka Undangan</Link>
                    {/* <Link href={'homepage/resepsivirtual'} className='px-1.5 py-3 bg-white text-primaryInv border-2 border-solid border-primaryInv'>Buka Resepsi Virtual</Link> */}
                </div>
            </div>


        </main>
    );
};

export default HomePage;
