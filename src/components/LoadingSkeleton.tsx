import Image from 'next/image'
import React from 'react'

const LoadingSkeleton = () => {
    return (
        <main className='h-screen w-full grid justify-items-center items-center'>
            <Image
                src="/assets/logopack/Virtuwed_Main_Logo.png"
                alt="Jumbotron Ilustration"
                className="w-24 h-auto mx-auto"
                width={500}
                height={500}
                priority
            />
        </main>
    )
}

export default LoadingSkeleton