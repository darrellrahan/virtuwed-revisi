'use client'
import React from 'react'
import Link from 'next/link'
import { Icon } from '@iconify/react'
import Image from 'next/image'
import { Link as ScrollLink } from 'react-scroll';


const Footer = () => {
    return (
        <footer className='grid gap-6 bg-primary text-white'>
            <div className='grid lg:grid-cols-2 max-w-screen-xl mx-auto w-full px-4 lg:px-40'>
                <ScrollLink to="Beranda" smooth={true} duration={500} className='items-center justify-center py-6 gap-2 lg:justify-start cursor-pointer inline-flex'>
                    <Image
                        src="/assets/logopack/Virtuwed_Main_Logo_White.png"
                        alt="Jumbotron Ilustration"
                        className="w-12 h-auto lg:w-24"
                        width={220}
                        height={220}
                        priority
                    />
                    <h2 className='text-3xl lg:text-4xl text-white font-display'>VIRTUWED</h2>
                </ScrollLink>

                <div className='grid grid-cols-2 lg:pt-8 lg:justify-items-end'>
                    <div className='grid gap-4'>
                        <h5 className='text-base lg:text-lg font-bold text-white'>Navigasi</h5>

                        <ul className='grid gap-2 font-light text-sm font-body'>
                            <li>
                                <Link className='hover:underline font-body' href={'/'}>Harga</Link>
                            </li>
                            <li>
                                <Link className='hover:underline font-body' href={'/'}>Tema</Link>
                            </li>
                            <li>
                                <Link className='hover:underline font-body' href={'/'}>Blog</Link>
                            </li>
                            <li>
                                <Link className='hover:underline font-body' href={'/'}>Bantuan</Link>
                            </li>
                        </ul>
                    </div>

                    <div className='grid gap-4'>
                        <h5 className='text-base lg:text-lg font-bold text-white'>Sosial Media</h5>

                        <ul className='grid gap-2 font-light text-sm font-body'>
                            <li>
                                <a className='flex items-center gap-2 hover:underline' target='_blank' href="#">
                                    <Icon width={16} height={16} icon="ic:round-email" />
                                    <span>Email</span>
                                </a>
                            </li>
                            <li>
                                <a className='flex items-center gap-2 hover:underline' target='_blank' href="#">
                                    <Icon width={16} height={16} icon="ri:instagram-fill" />
                                    <span>Instagram</span>
                                </a>
                            </li>
                            <li>
                                <a className='flex items-center gap-2 hover:underline' target='_blank' href="#">
                                    <Icon width={16} height={16} icon="ic:baseline-tiktok" />
                                    <span>Tiktok</span>
                                </a>
                            </li>
                            <li>
                                <a className='flex items-center gap-2 hover:underline' target='_blank' href="#">
                                    <Icon width={16} height={16} icon="entypo-social:facebook" />
                                    <span>Facebook</span>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            <div className='text-center py-4'>
                <p className='text-sm text-white'>© 2023 <a className='text-sm hover:underline' target='_blank' href="https://virtuwed.id">virtuwed.id</a> All Rights Reserved</p>
            </div>
        </footer>
    )
}

export default Footer