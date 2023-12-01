'use client'
import { Poppins } from "next/font/google"
import { useState } from "react"
import { ChatBubbleBottomCenterTextIcon, GiftIcon, PaintBrushIcon, UserGroupIcon } from '@heroicons/react/24/solid';
import Image from "next/image";
import Link from "next/link";


const poppins = Poppins({
    subsets: ['latin'], weight: ['100', '200', '300', '400', '500', '600', '700']
})

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {

    const [activeTab, setActiveTab] = useState('hadiah');
    const handleClick = (tab: string) => {
        setActiveTab(tab);
    };


    return (
        <html lang="en">
            <body className={`${poppins.className}`}>
                <div className="drawer lg:drawer-open">
                    <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
                    <div className="drawer-content flex flex-col items-center justify-center">
                        {/* Page content here */}
                        <div className="navbar bg-white md:hidden">
                            <div className="flex-none">
                                <label htmlFor="my-drawer-2" className="btn btn-square btn-ghost drawer-button">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-5 h-5 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
                                </label>
                            </div>
                            <div className="flex-1">
                                <a className="btn btn-ghost normal-case text-xl">Dashboard</a>
                            </div>
                        </div>
                        <div className='w-full min-h-screen h-full bg-gray-50'>
                            {children}
                        </div>
                    </div>
                    <div className="drawer-side border-r border-solid border-[#00000026]">
                        <label htmlFor="my-drawer-2" className="drawer-overlay"></label>

                        <ul className="menu p-4 w-64 h-full bg-white text-base-content gap-2">
                            <Link href={'/'} className='flex items-center px-5 py-2 gap-3'>
                                <Image
                                    src="/assets/logopack/Virtuwed_Main_Logo.png"
                                    alt="Jumbotron Ilustration"
                                    className="w-16 h-auto"
                                    width={220}
                                    height={220}
                                    priority
                                />
                                <div>
                                    <h1 className='text-xl font-sans'>Virtuwed</h1>
                                    <p>Pengantin</p>
                                </div>
                            </Link>
                            {/* Sidebar content here */}
                            <li className='grid gap-2 mt-9'>
                                <Link
                                    // onClick={() => handleClick('hadiah')}
                                    href='/dashboard/tamu'
                                    className={`text-gray-400 rounded-lg inline-flex justify-start items-center px-3.5 gap-3 h-11`}>
                                    <UserGroupIcon className='w-6 h-6' />
                                    <p className="">
                                        Tamu
                                    </p>
                                </Link>
                            </li>
                            <li className='grid gap-2'>
                                <Link
                                    // onClick={() => handleClick('hadiah')}
                                    href='/dashboard/ucapan'
                                    className={`text-gray-400 rounded-lg inline-flex justify-start items-center px-3.5 gap-3 h-11`}>
                                    <ChatBubbleBottomCenterTextIcon className='w-6 h-6' />
                                    <p className="">
                                        Ucapan
                                    </p>
                                </Link>
                            </li>
                            <li className='grid gap-2'>
                                <Link
                                    // onClick={() => handleClick('hadiah')}
                                    href='/dashboard/hadiah'
                                    className={`text-gray-400 rounded-lg inline-flex justify-start items-center px-3.5 gap-3 h-11`}>
                                    <GiftIcon className='w-6 h-6' />
                                    <p className="">
                                        Hadiah
                                    </p>
                                </Link>
                            </li>
                            <li className='grid gap-2'>
                                <Link
                                    // onClick={() => handleClick('hadiah')}
                                    href='/dashboard/assets'
                                    className={`text-gray-400 rounded-lg inline-flex justify-start items-center px-3.5 gap-3 h-11`}>
                                    <PaintBrushIcon className='w-6 h-6' />
                                    <p className="">
                                        Assets
                                    </p>
                                </Link>
                            </li>
                        </ul>

                    </div>
                </div>
            </body>
        </html>
    )
}