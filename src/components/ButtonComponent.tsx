import Image from 'next/image';
import Link from 'next/link'
import React from 'react'
import 'remixicon/fonts/remixicon.css'

type ButtonProps = {
    link: string
    title: string
};

export const Button: React.FC<ButtonProps> = (props) => {
    return (
        <Link style={{ background: 'linear-gradient(313deg, #FFF -70%, #D1B0B0 100%)' }} href={props.link} className='pt-3 pb-2.5 px-6 text-white text-center font-amiamie inline-block rounded-lg hover:btn-shadow-primary transition-all ease-in-out duration-300'>{props.title}</Link>
    )
}

export const ButtonOutline: React.FC<ButtonProps> = (props) => {
    return (
        <Link href={props.link} className='pt-3 pb-2.5 px-6 bg-primary/20 text-primary font-amiamie text-center inline-block rounded-lg hover:btn-shadow-secondary transition-all ease-in-out duration-300'>{props.title}</Link>
    )
}

export const ButtonDaisy: React.FC<ButtonProps> = ({ link, title }) => {
    return (
        <Link href={link} className="btn btn-block btn-secondary text-White md:btn-wide">
            {/* <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg> */}
            <Image
                src={'/assets/logopack/Virtuwed_Main_Logo_White.png'}
                alt="Virtuwed Logo"
                className="object-cover object-center w-6 h-auto"
                width={500}
                height={500}
                priority
            />
            {title}
        </Link>
    )
}

export const ButtonRegisterGuest: React.FC<ButtonProps> = ({ link, title }) => {
    return (
        <Link href={link} className="btn btn-block btn-secondary text-White">
            <i className="ri-whatsapp-line ri-lg text-White"></i>
            {title}
        </Link>
    )
}
