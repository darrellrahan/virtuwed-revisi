import { link } from 'fs';
import Link from 'next/link'
import React from 'react'

type ButtonProps = {
    link: string
    title: string
};

export const Button: React.FC<ButtonProps> = (props) => {
    return (
        <Link href={props.link} className='py-4 px-8 bg-primary text-white text-center inline-block rounded-lg'>{props.title}</Link>
    )
}

export const ButtonOutline: React.FC<ButtonProps> = (props) => {
    return (
        <Link href={props.link} className='py-4 px-8 bg-white text-primary text-center inline-block rounded-lg outline outline-primary'>{props.title}</Link>
    )
}
