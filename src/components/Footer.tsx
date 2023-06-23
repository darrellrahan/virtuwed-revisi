'use client'
import React from 'react'
import Link from 'next/link'
import { Icon } from '@iconify/react'
import Image from 'next/image'

// // FONT 
// import { Poppins } from 'next/font/google'
// import Image from 'next/image'
// const poppins = Poppins({
//     subsets: ['latin'],
//     weight: ['300', '400', '500', '600', '700']
// })

const Footer = () => {
    return (
        // <footer className={`${poppins.className} grid gap-6 bg-primary text-white`}>
        <footer className='grid gap-6 bg-primary text-white px-4 lg:px-16'>
            <div className='grid lg:grid-cols-2'>
                <div className='flex items-center justify-center py-6 gap-2 lg:justify-start'>
                    <Image
                        src="/assets/logopack/Virtuwed_Main_Logo_White.png"
                        alt="Jumbotron Ilustration"
                        className="w-12 h-auto lg:w-24"
                        width={220}
                        height={220}
                        priority
                    />
                    <h3 className='text-2xl font-bold text-white'>Virtuwed</h3>
                </div>

                <div className='grid grid-cols-2 lg:pt-8 lg:justify-items-end'>
                    <div className='grid gap-4'>
                        <h5 className='text-base lg:text-lg font-bold text-white'>Navigasi</h5>

                        <ul className='grid gap-2'>
                            <li>
                                <Link className='hover:underline font-body' href={'./homepage'}>Harga</Link>
                            </li>
                            <li>
                                <Link className='hover:underline font-body' href={'./homepage'}>Tema</Link>
                            </li>
                            <li>
                                <Link className='hover:underline font-body' href={'./homepage'}>Blog</Link>
                            </li>
                            <li>
                                <Link className='hover:underline font-body' href={'./homepage'}>Bantuan</Link>
                            </li>
                        </ul>
                    </div>

                    <div className='grid gap-4'>
                        <h5 className='text-base lg:text-lg font-bold text-white'>Sosial Media</h5>

                        <ul className='grid gap-2'>
                            <li>
                                <a className='flex items-center gap-2' target='_blank' href="#">
                                    <Icon width={16} height={16} icon="ic:round-email" />
                                    <span>Email</span>
                                </a>
                            </li>
                            <li>
                                <a className='flex items-center gap-2' target='_blank' href="#">
                                    <Icon width={16} height={16} icon="ri:instagram-fill" />
                                    <span>Instagram</span>
                                </a>
                            </li>
                            <li>
                                <a className='flex items-center gap-2' target='_blank' href="#">
                                    <Icon width={16} height={16} icon="ic:baseline-tiktok" />
                                    <span>Tiktok</span>
                                </a>
                            </li>
                            <li>
                                <a className='flex items-center gap-2' target='_blank' href="#">
                                    <Icon width={16} height={16} icon="entypo-social:facebook" />
                                    <span>Facebook</span>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            <div className='text-center py-4'>
                <p className='text-sm'>© 2023 Virtuwed.id All Rights Reserved</p>
            </div>
        </footer>
    )
}

export default Footer