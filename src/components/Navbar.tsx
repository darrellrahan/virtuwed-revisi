'use client'
import Hamburger from 'hamburger-react'
import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'
import { Link as ScrollLink } from 'react-scroll';

const Navbar = () => {

    const [isOpen, setOpen] = useState(false)
    // const closeMobileMenu = () => setOpen(false)


    return (
        <>
            <nav className="fixed top-0 bg-white flex items-center justify-between px-4 h-16 z-20 w-full border-b border-solid border-[#d5dfff]" >
                <div className='flex items-center justify-between w-full lg:px-40 max-w-screen-xl mx-auto'>
                    <ScrollLink to="Beranda" smooth={true} duration={500} className='cursor-pointer'>
                        <Image
                            src="/assets/logopack/Virtuwed_Main_Logo.png"
                            alt="Virtuwed Logo"
                            className="h-8 w-auto"
                            width={220}
                            height={220}
                            priority
                        />
                    </ScrollLink>

                    <div className="hidden lg:block">
                        <ul className="flex gap-6 font-dinBold text-third text-base">
                            {/* <li><Link href="#Beranda"><motion.p whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => scrollToSection('Beranda')}>Beranda</motion.p></Link></li> */}
                            <li className='cursor-pointer'><ScrollLink to="Beranda" smooth={true} duration={500}><p>Beranda</p></ScrollLink></li>
                            <li className='cursor-pointer'><ScrollLink to="Fitur" smooth={true} duration={500}><p>Fitur</p></ScrollLink></li>
                            <li className='cursor-pointer'><ScrollLink to="Paket" smooth={true} duration={500}><p>Paket</p></ScrollLink></li>
                            <li className='cursor-pointer'><ScrollLink to="Testimoni" smooth={true} duration={500}><p>Testimoni</p></ScrollLink></li>
                        </ul>
                    </div>
                </div>

                {/* {isOpen && <MobileNav isMobile={true} closeMobileMenu={closeMobileMenu} />} */}
                <div className="lg:hidden">
                    <Hamburger color="#3E4C59" toggled={isOpen} toggle={setOpen} size={24} />
                </div>
            </nav >
        </>

    )
}

export default Navbar