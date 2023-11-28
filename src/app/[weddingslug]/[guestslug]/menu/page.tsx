'use client'
import { RootState } from '@/app/redux/reducers';
import Link from 'next/link'
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';

const Menu = () => {
    useEffect(() => {
        document.body.classList.remove("overflow-hidden");
    }, [])


    const wedding = useSelector((state: RootState) => state.value.wedding);
    const guest = useSelector((state: RootState) => state.value.guest);

    return (
        <main className=' bg-White container min-w-full min-h-screen'>
            <section className='grid content-start gap-y-3 px-3 py-6 w-full h-full max-w-screen-2xl mx-auto'>

                <div>
                    <h2 className='text-tertiary'>{wedding.wedding_name}</h2>
                    <h3 className='text-tertiary'>Memories</h3>
                </div>

                <input type="text" placeholder="Cari event" className="input input-bordered w-full" />

                <Link href={`/${wedding.wedding_slug}/${guest.guest_slug}/menu/kenanganvirtual?place=panoScenes[0]`} className='pt-3'>
                    <div className='flex justify-between items-center pb-2'>
                        <h4>Pernikahan #1</h4>
                        <p className='l4-r'>4 Desember 2024</p>
                    </div>
                    <div className='grid grid-cols-2 gap-0.5'>
                        <div className='h-[160px] w-full bg-[url("https://images.pexels.com/photos/2253870/pexels-photo-2253870.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1")] bg-cover bg-center'>
                        </div>

                        <div className='grid grid-cols-2 gap-0.5'>
                            <div className='w-full h-full bg-slate-400 bg-cover bg-center bg-[url("https://images.pexels.com/photos/313707/pexels-photo-313707.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1")]'></div>
                            <div className='w-full h-full bg-slate-400 bg-cover bg-center bg-[url("https://images.pexels.com/photos/1043902/pexels-photo-1043902.jpeg?auto=compress&cs=tinysrgb&w=600")]'></div>
                            <div className='w-full h-full bg-slate-400 bg-cover bg-center bg-[url("https://images.pexels.com/photos/540522/pexels-photo-540522.jpeg?auto=compress&cs=tinysrgb&w=600")]'></div>
                            <div className='w-full h-full bg-slate-400 bg-cover bg-center bg-[url("https://images.pexels.com/photos/2959192/pexels-photo-2959192.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1")]'></div>
                        </div>
                    </div>
                </Link>
                <Link href={`/${wedding.wedding_slug}/${guest.guest_slug}/menu/kenanganvirtual?place=panoScenes[1]`} className='pt-3'>
                    <div className='flex justify-between items-center pb-2'>
                        <h4>Kelahiran Anak</h4>
                        <p className='l4-r'>20-30 November 2023</p>
                    </div>
                    <div className='grid grid-cols-2 gap-0.5'>
                        <div className='h-[160px] w-full bg-cover bg-center bg-[url("https://images.pexels.com/photos/265987/pexels-photo-265987.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1")]'>
                        </div>

                        <div className='grid grid-cols-2 gap-0.5'>
                            <div className='w-full h-full bg-cover bg-center bg-[url("https://images.pexels.com/photos/1648377/pexels-photo-1648377.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1")]'></div>
                            <div className='w-full h-full bg-cover bg-center bg-[url("https://images.pexels.com/photos/459953/pexels-photo-459953.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1")]'></div>
                            <div className='w-full h-full bg-cover bg-center bg-[url("https://images.pexels.com/photos/713959/pexels-photo-713959.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1")]'></div>
                            <div className='w-full h-full bg-cover bg-center bg-[url("https://images.pexels.com/photos/1442005/pexels-photo-1442005.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1")]'></div>
                        </div>
                    </div>
                </Link>

            </section>
        </main>
    )
}

export default Menu