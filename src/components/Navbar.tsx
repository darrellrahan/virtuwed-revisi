'use client'
import Hamburger from 'hamburger-react'
import Image from 'next/image'
import React, { useState, useEffect, useRef } from 'react'
import { Link as ScrollLink } from 'react-scroll';
import MobileNavigation from './MobileNavigation';
import LocaleSwitcher from './local-switcher';

const Navbar = () => {

    const [isOpen, setOpen] = useState(false)
    const closeMobileMenu = () => setOpen(false)


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

                    <div className="hidden lg:flex lg:gap-x-6">
                        <ul className="flex gap-6 font-amiamie text-third text-base">
                            <li className='cursor-pointer'><ScrollLink to="Home" smooth={true} duration={500}><p>Home</p></ScrollLink></li>
                            <li className='cursor-pointer'><ScrollLink to="Feature" smooth={true} duration={500}><p>Feature</p></ScrollLink></li>
                            <li className='cursor-pointer'><ScrollLink to="Packages" smooth={true} duration={500}><p>Packages</p></ScrollLink></li>
                            <li className='cursor-pointer'><ScrollLink to="Testimonial" smooth={true} duration={500}><p>Testimonial</p></ScrollLink></li>
                        </ul>

                        <LocaleSwitcher />
                    </div>
                </div>

                {isOpen && <MobileNavigation isMobile={true} closeMobileMenus={closeMobileMenu} />}
                <div className="lg:hidden" >
                    <Hamburger color="#3E4C59" toggled={isOpen} toggle={setOpen} size={24} />
                </div>
            </nav >
        </>

    )
}

export default Navbar