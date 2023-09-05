'use client'
import React from 'react'
import Link from 'next/link'
import { Icon } from '@iconify/react'
import Image from 'next/image'
import { Link as ScrollLink } from 'react-scroll';


const Footer = () => {
    return (
        <footer className='grid gap-6 bg-primary text-white'>
            <div className='grid lg:grid-cols-2 max-w-screen-xl mx-auto w-full px-4 lg:px-40 gap-12'>
                <div>
                    <ScrollLink to="Beranda" smooth={true} duration={500} className='items-center justify-center py-6 gap-2 lg:justify-start cursor-pointer inline-flex'>
                        <Image
                            src="/assets/logopack/Virtuwed_Main_Logo_White.png"
                            alt="Jumbotron Ilustration"
                            className="w-12 h-auto lg:w-24"
                            width={220}
                            height={220}
                            priority
                        />
                        <h2 className='text-3xl lg:text-4xl text-white font-ade'>VIRTUWED</h2>
                    </ScrollLink>
                    <p className='font-light font-amiamie text-white'>PT Virtuwed Digital Indonesia</p>
                </div>


                <div className='grid grid-cols-2 items-start lg:pt-8 lg:justify-items-end'>
                    <div className='grid gap-4'>
                        <h5 className='text-base lg:text-lg font-body text-white font-deAetna'>Navigasi</h5>

                        <ul className='grid gap-2 font-light font-amiamie'>
                            <li className='cursor-pointer hover:underline'><ScrollLink to="Beranda" smooth={true} duration={500}><p className='text-white'>Beranda</p></ScrollLink></li>
                            <li className='cursor-pointer hover:underline'><ScrollLink to="Fitur" smooth={true} duration={500}><p className='text-white'>Fitur</p></ScrollLink></li>
                            <li className='cursor-pointer hover:underline'><ScrollLink to="Paket" smooth={true} duration={500}><p className='text-white'>Paket</p></ScrollLink></li>
                            <li className='cursor-pointer hover:underline'><ScrollLink to="Testimoni" smooth={true} duration={500}><p className='text-white'>Testimoni</p></ScrollLink></li>
                        </ul>
                    </div>

                    <div className='grid gap-4 items-start'>
                        <h5 className='text-base lg:text-lg font-deAetna text-white'>Sosial Media</h5>

                        <ul className='grid gap-2 font-light text-sm font-amiamie'>
                            <li>
                                <a className='flex items-center gap-2 hover:underline' target='_blank' href="https://instagram.com/virtuwed">
                                    <Icon width={16} height={16} icon="ri:instagram-fill" />
                                    <span>Instagram</span>
                                </a>
                            </li>
                            <li>
                                <a className='flex items-center gap-2 hover:underline' target='_blank' href="https://www.linkedin.com/company/virtuwed/">
                                    <Icon width={16} height={16} icon="bi:linkedin" color="white" />
                                    <span>LinkedIn</span>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            <div className='text-center py-4'>
                <p className='text-sm text-white font-amiamie'>© 2023 <a className='text-sm hover:underline' target='_blank' href="https://virtuwed.id">virtuwed.id</a> All Rights Reserved</p>
            </div>
        </footer>
    )
}

export default Footer