'use client'
import React from 'react'
import Image from 'next/image'
import { Icon } from '@iconify/react';

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
                    <h1 className='text-2xl'>
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
            <section className='bg-green-500'>
                <h1>HITUNG MUNDUR</h1>
            </section>


            {/* GALERY */}
            <section>

            </section>


            {/* TIME */}
            <section className='container mx-auto py-6'>
                <div>
                    <h2>Intimate Reception</h2>
                    <p>&quot;The best use of life is love. The best expression of love is time. The best time to love is now!&quot;</p>
                </div>


                <div>
                    <h3>Friday,</h3>
                    <h2>September
                        <span>
                            7
                            <sup>th</sup>
                        </span>
                        , 2034</h2>
                </div>
            </section>


            {/* MESSAGE */}
            <section>

            </section>


            {/* FOOTER */}
            <section></section>
        </main>
    )
}

export default page