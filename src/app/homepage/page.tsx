'use client'
import Link from 'next/link';
import { useState } from 'react';



const CoverUndangan = () => {
    return (
        <main className='container grid items-center mx-auto px-4'>
            <div className='grid justify-center text-center'>
                <h2>Kepada Yth bapak </h2>
                <p>mohon maaf apabila ada kesalahan pengejaan nama</p>
            </div>

            <div>
                <h1>Natkun & Futaba</h1>
                <h2>Wedding</h2>
                <p>30.5.2023</p>
            </div>


            <div>
                <Link href={'/undangandigital'}>Buka Undangan Virtual</Link>
                <Link href={'/undangandigital'}>Buka Undangan Virtual</Link>
            </div>

        </main>
    )
}


const HomePage = () => {
    const [currentPage, setCurrentPage] = useState('home');

    const pantai = () => {
        setCurrentPage('pantai');
    };

    const gunung = () => {
        setCurrentPage('gunung');
    };

    let pageContent;

    if (currentPage === 'home') {
        pageContent = <CoverUndangan />
    } else if (currentPage === 'gunung') {
        pageContent = <h1>GUNUNG</h1>;
    }

    return (
        <>
            {pageContent}


            <div className='grid grid-flow-row'>
                <button onClick={pantai}>Go to pantai</button>
                <button onClick={gunung}>Go to gunung</button>

                <Link href={'/undangandigital'}>UNDANGAN DIGITAL</Link>
                <Link href={'/resepsivirtual'}>RESEPSI VIRTUAL</Link>
            </div>
        </>
    );
};

export default HomePage;
