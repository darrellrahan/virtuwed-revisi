import React, { useEffect } from 'react'
import { AnimatePresence, motion } from "framer-motion";
import { Link as ScrollLink } from 'react-scroll';

const MobileNavigation = (props: any) => {

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const target = event.target as HTMLElement;
            const menuContainer = document.getElementById('mobile-menu-container');

            if (menuContainer && !menuContainer.contains(target)) {
                props.closeMobileMenus()
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <AnimatePresence>
            <motion.ul id="mobile-menu-container"
                initial={{ height: 0 }}
                animate={{ height: "auto" }}
                exit={{ height: 0 }}
                transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                className="absolute grid gap-6 content-center justify-center py-8 text-center top-16 left-0 bg-white font-amiamie w-screen shadow-lg">
                <li className='cursor-pointer'><ScrollLink onClick={() => props.isMobile && props.closeMobileMenus()} to="Beranda" smooth={true} duration={500}><p className='text-lg font-light'>Beranda</p></ScrollLink></li>
                <li className='cursor-pointer'><ScrollLink onClick={() => props.isMobile && props.closeMobileMenus()} to="Fitur" smooth={true} duration={500}><p className='text-lg font-light'>Fitur</p></ScrollLink></li>
                <li className='cursor-pointer'><ScrollLink onClick={() => props.isMobile && props.closeMobileMenus()} to="Paket" smooth={true} duration={500}><p className='text-lg font-light'>Paket</p></ScrollLink></li>
                <li className='cursor-pointer'><ScrollLink onClick={() => props.isMobile && props.closeMobileMenus()} to="Testimoni" smooth={true} duration={500}><p className='text-lg font-light'>Testimoni</p></ScrollLink></li>
            </motion.ul>
        </AnimatePresence>
    )
}

export default MobileNavigation