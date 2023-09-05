import Link from 'next/link'
import React from 'react'

const page = () => {
    return (
        <main className='container min-w-full'>
            <div className='grid grid-cols-12'>
                {/* IMAGE */}
                <section className='hidden md:grid col-span-7 bg-register bg-cover bg-center h-full w-full'>

                </section>

                {/* FORM */}
                <section className='w-full grid md:justify-center items-center min-h-screen py-6 px-6 col-span-full md:col-span-5'>
                    <form className='grid gap-4 w-full md:w-80 max-w-md' action="">
                        <div className='grid gap-2 mb-10'>
                            <h2 className='font-deAetna text-3xl md:text-4xl'>Daftar ke Virtuwed</h2>
                            <p className='font-light font-amiamie'>Daftar untuk memulai</p>
                        </div>
                        <input type="text" placeholder="Nama Lengkap" className="input input-bordered w-full max-w-md" />
                        <input type="text" placeholder="Email Adress" className="input input-bordered w-full max-w-md" />
                        <input type="password" placeholder="Password" className="input input-bordered w-full max-w-md" />
                        <Link href={'/dashboard'} style={{ background: 'linear-gradient(313deg, #FFF -70%, #D1B0B0 100%)' }} className="btn text-white btn-md lg:btn-lg">Daftar</Link>
                        <p className='font-light font-amiamie'>Telah punya akun? <Link href='/signin' className='font-semibold text-primary'>Masuk</Link></p>
                    </form>
                </section>
            </div>
        </main>
    )
}

export default page