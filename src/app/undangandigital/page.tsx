'use client'
import React from 'react'
import Image from 'next/image'
import { Icon } from '@iconify/react';

// TODO:
// 1. Jumbotron
// 2. Footer
// 3. Timeline
// 4. Moment
// 5.


const page = () => {
    return (
        <main className='container min-h-screen'>

            {/* MAIN HERO */}
            <section className='container min-w-full px-2.5 py-5 bg-red-600'>
                <div className='h-auto'>
                    <div>
                        <p>Wedding Invitation</p>
                        <h1>Natkun & Mega</h1>
                        <p>7.9.2034</p>
                    </div>
                </div>
            </section>

            {/* QUOTE */}
            <div className='relative py-14'>
                <div className='relative text-center mx-4 py-5'>
                    <div style={{ backgroundSize: '100% 100%' }} className='absolute bottom-0 top-0 mx-auto right-0 left-0 w-full max-w-sm bg-no-repeat bg-center bg-[url(https://katsudoto.id/media/template/custom/denis-serlyn/brown/frame-quote-min.png)]'></div>
                    <div className='grid items-center h-full px-6 overflow-y-auto'>
                        <p className='leading-relaxed'>I’ll be loving you, always with a love that’s true <br />- Pasty Cline</p>
                    </div>
                </div>
            </div>

            {/* PROFILE */}
            <section className='container overflow-hidden pt-5 pb-12 grid'>
                <div className='p-6 text-center'>
                    <h1 className='text-2xl text-primary'>
                        Our Special Reception
                    </h1>
                    <p className='my-2'>The pleasure of your company is requested</p>
                </div>

                {/* COUPLE BODY */}
                <div className='mt-5'>
                    {/* MAN */}
                    <div>
                        <div className='grid justify-center py-8'>
                            <div className='relative w-56 h-56 rounded-full border-2 border-solid border-tertiary'>
                                <div className='bg-flower-dark absolute h-40 w-full bg-contain bg-no-repeat -z-10 -bottom-7 -left-10'></div>
                                <Image
                                    src="https://instagram.fbdo1-2.fna.fbcdn.net/v/t51.2885-19/350172296_980621829634181_3804070959350616254_n.jpg?stp=dst-jpg_s320x320&_nc_ht=instagram.fbdo1-2.fna.fbcdn.net&_nc_cat=105&_nc_ohc=sLZnO3tGrF0AX8BFT7H&edm=AOQ1c0wBAAAA&ccb=7-5&oh=00_AfBvg5Yq69dZ4rMlzpC4LW3IBp0XMobqTC6GgfvT4oF5Hg&oe=6488F6C3&_nc_sid=f70a57"
                                    alt="Vercel Logo"
                                    className="w-full h-full rounded-full z-50"
                                    width={220}
                                    height={220}
                                    priority
                                />
                            </div>
                        </div>
                        <div className='text-center grid gap-y-2.5 px-2.5 py-5'>
                            <h2 className='text-4xl text-primary'>Natkun Kageyama</h2>
                            <p>Putra dari Bapak Sudarto Brotolaras dan Ibu Barbara Jeanne Huard</p>
                            <div className='flex gap-2 items-center justify-center hover:underline underline-offset-4'>
                                <Icon icon="bi:instagram" className='text-sm' />
                                <a className='inline-block' href="https://www.instagram.com/hasnat5_/" target='_blank'>@hasnat5_</a>
                            </div>
                        </div>
                    </div>
                    <div className='py-8'><h2 className='text-center text-6xl text-tertiary'>&</h2></div>
                    {/* WOMAN */}
                    <div className='relative'>
                        <div style={{ backgroundSize: '100% 100%' }} className='absolute -z-30 bg-center bg-story-texture -bottom-64 left-0 right-0 mx-auto h-full w-[500px] bg-no-repeat'></div>
                        <div className='grid justify-center py-8'>
                            <div className='relative w-56 h-56 rounded-full border-2 border-solid border-tertiary'>
                                <div className='bg-flower-dark absolute h-40 w-full bg-contain bg-no-repeat -z-10 -top-7 -right-10 rotate-180'></div>
                                <Image
                                    src="https://instagram.fbdo1-1.fna.fbcdn.net/v/t51.2885-19/344581579_1366309627265655_5034329855608864686_n.jpg?stp=dst-jpg_s320x320&_nc_ht=instagram.fbdo1-1.fna.fbcdn.net&_nc_cat=103&_nc_ohc=4Pvdqnz2OIQAX89JVl7&edm=AOQ1c0wBAAAA&ccb=7-5&oh=00_AfDVu6hhYqc_3LpR4gSRyfafUYkeAMyLddN885A_r0Kqeg&oe=6489ABB6&_nc_sid=f70a57"
                                    alt="Vercel Logo"
                                    className="w-full h-full rounded-full z-50"
                                    width={220}
                                    height={220}
                                    priority
                                />
                            </div>
                        </div>
                        <div className='text-center grid gap-y-2.5 px-2.5 py-5'>
                            <h2 className='text-4xl text-primary'>Mega Sarashina</h2>
                            <p>Putra dari Bapak Sudarto Brotolaras dan Ibu Barbara Jeanne Huard</p>
                            <div className='flex gap-2 items-center justify-center hover:underline underline-offset-4'>
                                <Icon icon="bi:instagram" className='text-sm' />
                                <a className='inline-block' href="https://www.instagram.com/hasnat5_/" target='_blank'>@hasnat5_</a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>


            {/* COUNTDOWN */}
            <section className='relative overflow-hidden px-5'>
                {/* BACKGROUND */}
                <div style={{ backgroundSize: '100% auto' }} className='absolute bottom-0 left-0 bg-silent-garden bg-no-repeat bg-center h-full w-[125%]'></div>

                <div className='grid gap-1 py-5'>
                    <h1 className='text-tertiary italic text-5xl leading-normal'>Save<br />The Date</h1>
                    <p className='text-primary'>March 24 <sup>th </sup>, 2023</p>
                </div>

                {/* COUNTDOWN */}
                <div className='py-2.5'>
                    <p>
                        ini COUNTDOWN COUNTDOWN COUNTDOWN COUNTDOWN COUNTDOWN COUNTDOWN COUNTDOWN COUNTDOWN COUNTDOWN
                    </p>
                </div>
            </section>

            {/* RESEPSI */}
            <section className='container mx-auto py-6'>
                <div className='relative'>
                    {/* DECORATION */}
                    <div style={{ backgroundSize: 'auto 100%' }} className='absolute bg-line-orn-event h-2.5 w-full bg-center bg-no-repeat -bottom-7'></div>

                    <div className='grid gap-1.5 p-5 text-center'>
                        <h2 className='text-2xl text-primary italic'>Intimate Reception</h2>
                        <p className='text-[#00000080]'>Tanpa mengurangi rasa hormat kami dan dengan adanya kerterbatasan tempat dan undangan; Kami mengundang anda ke dalam Resepsi Pernikahan Virtual (Virtual Wedding) berikut ini.</p>
                    </div>
                </div>

                <div className='mt-20'>
                    <div className='event-head text-center p-5 grid gap-5 relative'>
                        {/* DECORATION */}
                        <div style={{ backgroundSize: 'auto 100%' }} className='absolute bg-forest h-[130%] w-full bg-center bg-no-repeat top-0 bottom-0 left-0 right-0 m-auto'></div>

                        <h3 className='uppercase text-primary text-xl tracking-[8px]'>Friday,</h3>
                        <h2 className='text-primary text-3xl font-semibold'>March <span className='text-5xl'>24<sup>th</sup></span>, 2034</h2>
                    </div>
                    <div className='p-5 text-center'>
                        <Image
                            src="https://katsudoto.id/media/template/icons/gold/01.png"
                            alt="Resepsi"
                            className="object-contain object-center mb-7 mx-auto"
                            width={50}
                            height={50}
                            priority
                        />
                        <h3 className='mb-1 italic text-secondary text-3xl'>Reception</h3>
                        <p className='text-primary'>15:30 - End</p>
                    </div>

                    <div className='grid gap-2 p-5 text-center text-primary'>
                        <p className='font-bold'>Villa Kailasha</p>
                        <p>Banjar Dukuh, Desa Kelating, Kelating, Kerambitan, Tabanan Regency, Bali 82121, Indonesia</p>
                        <p>Tabanan Regency</p>
                        <div className='mt-3 text-center'><a href="#" className='inline-block text-secondary border border-solid border-secondary rounded-lg pt-2 pb-2.5 px-6'>View Maps</a></div>
                        <div className='mt-3 text-center'><a href="#" className='inline-block text-white bg-secondary rounded-lg pt-2 pb-2.5 px-6'>Buka Resepsi Virtual</a></div>
                    </div>
                </div>

            </section>

            {/* MOMENT */}
            <section>

            </section>

            {/* TIMELINE */}
            <section>

            </section>


            {/* FOOTER */}
            <section></section>
        </main>
    )
}

export default page