import { link } from 'fs';
import Link from 'next/link'
import React from 'react'

type ButtonProps = {
    link: string
};

export const Button: React.FC<ButtonProps> = (props) => {
    return (
        <div>
            <Link href={props.link} className='py-4 px-8 bg-primary text-white inline-block rounded-lg'>Mulai Sekarang</Link>
        </div>
    )
}

export const ButtonOutline: React.FC<ButtonProps> = (props) => {
    return (
        <div>
            <Link href={props.link} className='py-4 px-8 bg-white text-primary inline-block rounded-lg outline outline-primary'>Mulai Sekarang</Link>
        </div>
    )
}
