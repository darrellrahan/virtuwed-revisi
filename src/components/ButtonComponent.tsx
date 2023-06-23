import { link } from 'fs';
import Link from 'next/link'
import React from 'react'

type ButtonProps = {
    link: string
    title: string
};

export const Button: React.FC<ButtonProps> = (props) => {
    return (
        <Link style={{ background: 'linear-gradient(313deg, #FFF -70%, #D1B0B0 100%)' }} href={props.link} className='py-3 px-6 text-white text-center inline-block rounded-lg'>{props.title}</Link>
    )
}

export const ButtonOutline: React.FC<ButtonProps> = (props) => {
    return (
        <Link href={props.link} className='py-3 px-6 bg-primary/20 text-primary text-center inline-block rounded-lg'>{props.title}</Link>
    )
}
