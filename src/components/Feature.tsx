import { ArrowUpRightIcon } from '@heroicons/react/24/solid'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

type FeatureProps = {
    source: string
    title: string
    description: string
    link: string
    linkTitle: string
}

const Feature: React.FC<FeatureProps> = (props) => {
    return (
        <div className='grid gap-6 px-4 justify-center items-center py-16 lg:px-40 lg:grid-cols-2'>
            <div>
                <Image
                    src={props.source}
                    alt="Jumbotron Ilustration"
                    className="w-full h-auto mx-auto"
                    width={220}
                    height={220}
                    priority
                />
            </div>

            <div className='grid gap-y-4'>
                <h2 className='text-3xl font-bold'>{props.title}</h2>
                <p>{props.description}</p>
                <div>
                    <Link className='inline-block' href={props.link}>
                        <div className='items-center flex gap-2'>
                            <p className='text-primary'>{props.linkTitle}</p>
                            <ArrowUpRightIcon className="h-4 w-4 text-primary" />
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Feature