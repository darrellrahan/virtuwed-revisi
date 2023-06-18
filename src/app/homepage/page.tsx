'use client'
import Link from 'next/link';


const HomePage = () => {
    return (
        <main className='container grid items-center mx-auto px-4 h-screen text-center'>
            <div className='grid justify-center'>
                <h2>Kepada Yth bapak </h2>
                <p>mohon maaf apabila ada kesalahan pengejaan nama</p>
            </div>

            <div>
                <h1 className='font-bold text-4xl'>Natkun & Futaba</h1>
                <h2 className='text-base'>Wedding</h2>
                <p>30.5.2023</p>
            </div>


            <div className='grid gap-6'>
                <Link href={'homepage/undangandigital'} className='px-2 py-4 bg-primary text-white'>Buka Undangan</Link>
                <Link href={'homepage/resepsivirtual'} className='px-2 py-4 bg-white text-primary border-2 border-solid border-primary'>Buka Resepsi Virtual</Link>
            </div>

        </main>
    );
};

export default HomePage;
