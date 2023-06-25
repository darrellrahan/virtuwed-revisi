'use client'
import React, { Fragment, useEffect, useState } from 'react'
import Image from 'next/image'
import { Icon } from '@iconify/react';
import { Chrono } from "react-chrono";
import Countdown from 'react-countdown';
import Link from 'next/link';
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/24/solid';
import axios from 'axios';
import { countGuestComment, countRSPVStatus, getAllGuestCommentsByWeddingSessionId } from '@/app/api/api';

// FONT PURPOSE
import { Playfair_Display } from 'next/font/google'
const playFair = Playfair_Display({ subsets: ['latin'] })


// ANIMATION
import AOS from 'aos';
import 'aos/dist/aos.css'; // Import the CSS file

// TODO:
// animation
// order comment
// scrollbar

type GuestComments = {
    id: string;
    wedding_session: {
        id: string;
    };
    name: string;
    message: string;
    createdAt: string;
};

interface CountGuestComments {
    count: number;
};

interface CountRSPV {
    _id: string;
    count: number;
};

const rspv = [
    { status: "Hadir" },
    { status: "Tidak Hadir" },
    { status: "Masih Ragu" },
]


const UndanganDigital = () => {
    const [guestComments, setGuestComments] = useState<GuestComments[]>([]);
    const [countRSPV, setCountRSPV] = useState<CountRSPV[]>([]);
    const [countGuestComments, setCountGuestComments] = useState<CountGuestComments | null>(null);
    const [selected, setSelected] = useState(rspv[0])

    const [displayCount, setDisplayCount] = useState(6);

    const [name, setName] = useState("");
    const [message, setMessage] = useState("");

    const fetchCountGuestComment = async () => {
        const query = `
        query {
            countGuestComment(wedding_session_id: "649007bdca091be7add3c440"){
              count
            }
          }
      `;

        try {

            const masuk = await countGuestComment(query);
            setCountGuestComments(masuk);
        } catch (error) {
            console.error(error);
        }
    };

    const fetchGuestComments = async () => {
        const query = `
        query {
            getAllGuestCommentsByWeddingSessionId(wedding_session_id: "649007bdca091be7add3c440") {
                id
                wedding_session {
                  id
                }
                name
                message
                createdAt
                updatedAt
              }
          }
      `;

        try {
            const masuk = await getAllGuestCommentsByWeddingSessionId(query);
            setGuestComments(masuk);
        } catch (error) {
            console.error(error);
        }
    };

    const fetchCountRSPVStatus = async () => {
        const query = `
        query {
            countRSVPStatusByWeddingSessionId(wedding_session_id: "649007bdca091be7add3c440"){
              _id
              count
            }
          }
      `;

        try {
            const masuk = await countRSPVStatus(query);
            setCountRSPV(masuk);
        } catch (error) {
            console.error(error);
        }
    };


    // SEND COMMENT
    const handleFormSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const commentSend = await axios.post('https://calm-plum-hosiery.cyclic.app/graphql', {
                query: `
                mutation CreateGuestComment($name: String!, $message: String!) {
                  createGuestComment(wedding_session_id: "649007bdca091be7add3c440", name: $name, message: $message) {
                    id
                    wedding_session {
                      id
                    }
                    name
                    message
                    createdAt
                    updatedAt
                  }
                }
              `,
                variables: {
                    name,
                    message,
                },
            });

            const rspvSend = await axios.post('https://calm-plum-hosiery.cyclic.app/graphql', {
                query: `
                mutation RSVPAbsent($name: String!, $status: String!) {
                    RSVPAbsent(wedding_session_id: "649007bdca091be7add3c440", name: $name, status: $status) {
                      id
                      wedding_session {
                        id
                      }
                      guest_id {
                        id
                      }
                      name
                      status
                    }
                  }
              `,
                variables: {
                    name,
                    status: selected.status
                },
            });

            console.log('Data added:');
            // Handle success or show a confirmation message
            setName("");
            setMessage("");
            fetchGuestComments();
            fetchCountRSPVStatus();
            fetchCountGuestComment();

        } catch (error) {
            console.error('Error adding data:', error);
            // Handle error or show an error message
        }
    };

    // LOAD MORE COMMENT
    const handleLoadMore = () => {
        setDisplayCount(displayCount + 6);
    };

    const displayedItems = guestComments.slice(0, displayCount);

    useEffect(() => {
        AOS.init(); // Initialize AOS
        fetchGuestComments()
        fetchCountGuestComment()
        fetchCountRSPVStatus()
        return () => {
            AOS.refresh(); // Clean up AOS on component unmount
        };
    }, []);

    return (
        <>
            <main className={`${playFair.className} overflow-hidden min-h-screen lg:grid lg:grid-cols-12 lg:relative`}>
                <section className='hidden lg:grid col-span-8 h-screen w-4/6 bg-primaryInv fixed p-5'>
                    <div className='w-full h-full grid items-end bg-no-repeat bg-cover-wedding bg-cover bg-center p-20'>
                        <h1 className='text-white text-7xl'>RIFQI & ALYSHA</h1>
                    </div>
                </section>

                <section className='block lg:grid lg:col-span-4 lg:col-start-9'>

                    {/* MAIN HERO */}
                    <section className='container grid min-w-full justify-center h-screen px-2.5 py-5 bg-rsvp-texture bg-cover bg-no-repeat bg-center'>
                        <div data-aos="zoom-in" data-aos-duration="1000" className='grid h-full justify-end max-w-md rounded-full bg-white bg-opacity-90 border-2 border-solid border-tertiaryInv'>
                            <div className='grid text-center items-center w-full px-5'>
                                <div className='mb-5 grid justify-center'>
                                    <div className='w-3 h-3 bg-tertiaryInv rotate-45' />
                                </div>
                                <p data-aos="fade-down" data-aos-duration="1200" data-aos-delay="800" className='mb-4'>Wedding Invitation</p>
                                <h1 data-aos="zoom-in" data-aos-duration="2000" data-aos-delay="500" className='text-tertiaryInv text-5xl'>Rifqi & Alysha</h1>
                                <p data-aos="fade-up" data-aos-duration="1200" data-aos-delay="800" className='mt-4 text-base'>8.7.2023</p>
                                <div className='mt-5 grid justify-center'>
                                    <div className='w-3 h-3 bg-tertiaryInv rotate-45' />
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* QUOTE */}
                    <div className='relative py-14'>
                        <div className='relative text-center mx-4 py-5'>
                            <div data-aos="zoom-in" data-aos-duration="1500" style={{ backgroundSize: '100% 100%' }} className='absolute bottom-0 top-0 mx-auto right-0 left-0 w-full max-w-sm bg-no-repeat bg-center bg-[url(https://katsudoto.id/media/template/custom/denis-serlyn/brown/frame-quote-min.png)]'></div>
                            <div className='grid items-center h-full px-6 overflow-y-auto'>
                                <p data-aos="fade-up" data-aos-duration="1000" data-aos-delay="100" className='leading-relaxed'>I’ll be loving you, always with a love that’s true <br />- Pasty Cline</p>
                            </div>
                        </div>
                    </div>

                    {/* PROFILE */}
                    <section className='container overflow-hidden pt-5 pb-12 grid'>
                        <div className='p-6 text-center'>
                            <h1 data-aos="zoom-in" data-aos-duration="1000" className='text-2xl text-primaryInv'>
                                Our Special Reception
                            </h1>
                            <p data-aos="fade-up" data-aos-duration="1000" className='my-2'>The pleasure of your company is requested</p>
                        </div>

                        {/* COUPLE BODY */}
                        <div className='mt-5'>
                            {/* MAN */}
                            <div>
                                <div className='grid justify-center py-8'>
                                    <div data-aos="zoom-in" data-aos-duration="1500" data-aos-once="true" className='relative w-56 h-56 rounded-full border-2 border-solid border-tertiaryInv'>
                                        <div data-aos="zoom-in" data-aos-duration="2000" data-aos-delay="300" data-aos-once="true" className='bg-flower-dark absolute h-40 w-full bg-contain bg-no-repeat -z-10 -bottom-7 -left-10'></div>
                                        <Image
                                            src="/assets/undanganDigital/Prewed1.jpeg"
                                            alt="Vercel Logo"
                                            className="w-full h-full rounded-full z-50 object-cover"
                                            width={220}
                                            height={220}
                                            priority
                                        />
                                    </div>
                                </div>
                                <div className='text-center grid gap-y-2.5 px-2.5 py-5'>
                                    <h2 data-aos="fade-up" data-aos-duration="1000" className='text-4xl text-primaryInv'>Rifqi Sholeh Suman Syahas</h2>
                                    <p data-aos="fade-up" data-aos-duration="1000">Putra dari Bapak Syabar Hidayat dan Ibu Euis Siti Hasanah</p>
                                    <div data-aos="fade-up" data-aos-duration="1000" className='flex gap-2 items-center justify-center hover:underline underline-offset-4'>
                                        <Icon icon="bi:instagram" className='text-sm' />
                                        <a className='inline-block' href="https://www.instagram.com/rifqisholehh/" target='_blank'>@rifqisholehh</a>
                                    </div>
                                </div>
                            </div>
                            <div className='py-8'><h2 data-aos="fade-up" data-aos-duration="1000" className='text-center text-6xl text-tertiaryInv'>&</h2></div>
                            {/* WOMAN */}
                            <div className='relative'>
                                <div style={{ backgroundSize: '100% 100%' }} className='absolute -z-10 bg-center bg-story-texture -bottom-64 left-0 right-0 mx-auto h-full w-[500px] bg-no-repeat'></div>
                                <div className='grid justify-center py-8'>
                                    <div data-aos="zoom-in" data-aos-duration="1500" data-aos-once="true" className='relative w-56 h-56 rounded-full border-2 border-solid border-tertiaryInv'>
                                        <div className='bg-flower-dark absolute h-40 w-full bg-contain bg-no-repeat -z-10 -top-7 -right-10 rotate-180'></div>
                                        <Image
                                            src="/assets/undanganDigital/Prewed1.jpeg"
                                            alt="Vercel Logo"
                                            className="w-full h-full rounded-full z-50 object-cover"
                                            width={220}
                                            height={220}
                                            priority
                                        />
                                    </div>
                                </div>
                                <div className='text-center grid gap-y-2.5 px-2.5 py-5'>
                                    <h2 data-aos="fade-up" data-aos-duration="1000" className='text-4xl text-primaryInv'>Alysha Karmina</h2>
                                    <p data-aos="fade-up" data-aos-duration="1000">Putri dari Bapak Karmana dan Ibu Dedah Jubaedah</p>
                                    <div data-aos="fade-up" data-aos-duration="1000" className='flex gap-2 items-center justify-center hover:underline underline-offset-4'>
                                        <Icon icon="bi:instagram" className='text-sm' />
                                        <a className='inline-block' href="https://www.instagram.com/hasnat5_/" target='_blank'>@alyshakarmina2009</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* COUNTDOWN */}
                    <section className='relative overflow-hidden px-5'>
                        {/* BACKGROUND */}
                        <div style={{
                            backgroundSize: '100% auto',
                            left: '50%',
                            transform: 'translate(-50%, 15%)',
                        }} className='-z-10 absolute bottom-0 bg-silent-garden bg-no-repeat bg-center h-full w-[125%]'></div>

                        <div className='max-w-md mx-auto'>
                            <div className='grid gap-1 py-5'>
                                <h1 data-aos="fade-up" data-aos-duration="1000" className='text-tertiaryInv italic text-5xl leading-normal'>Save<br />The Date</h1>
                                <p data-aos="fade-up" data-aos-duration="1000" data-aos-delay="300" className='text-primaryInv'>July 8 <sup>th </sup>, 2023</p>
                            </div>

                            {/* COUNTDOWN */}
                            <div data-aos="fade-up" data-aos-duration="1200" data-aos-delay="100" className='grid justify-center py-10'>
                                <Countdown className='text-5xl text-primaryInv' date={Date.now() + 100000000} />
                            </div>

                            <div className='grid justify-end py-5 mt-1'>
                                <a href="#" className='bg-primaryInv inline-block text-white px-4 pt-2 pb-2.5 rounded-md w-44 text-center'>Add to Calendar</a>
                            </div>
                        </div>
                    </section>

                    {/* RESEPSI */}
                    <section className='container mx-auto py-6 max-w-md'>
                        <div className='relative'>
                            {/* DECORATION */}
                            <div style={{ backgroundSize: 'auto 100%' }} className='-z-10 absolute bg-line-orn-event h-2.5 w-full bg-center bg-no-repeat -bottom-7'></div>

                            <div className='grid gap-1.5 p-5 text-center'>
                                <h2 data-aos="zoom-in" data-aos-duration="1500" className='text-2xl text-primaryInv italic'>Intimate Reception</h2>
                                <p data-aos="fade-up" data-aos-duration="1200" className='text-[#00000080]'>Tanpa mengurangi rasa hormat kami dan dengan adanya kerterbatasan tempat dan undangan; Kami mengundang anda ke dalam Resepsi Pernikahan Virtual (Virtual Wedding) berikut ini.</p>
                            </div>
                        </div>

                        <div className='mt-20'>
                            <div className='event-head text-center p-5 grid gap-5 relative'>
                                {/* DECORATION */}
                                <div data-aos="zoom-out" data-aos-duration="3000" data-aos-delay="250" style={{ backgroundSize: 'auto 100%' }} className='-z-10 absolute bg-forest h-[130%] w-full bg-center bg-no-repeat top-0 bottom-0 left-0 right-0 m-auto'></div>

                                <h3 data-aos="fade-up" data-aos-duration="1000" className='uppercase text-primaryInv text-xl tracking-[8px]'>Saturday,</h3>
                                <h2 data-aos="fade-up" data-aos-duration="1000" className='text-primaryInv text-3xl font-semibold'>July <span className='text-5xl'>8<sup>th</sup></span>, 2023</h2>
                            </div>
                            <div className='p-5 text-center'>
                                <Image
                                    data-aos="fade-up" data-aos-duration="1000"
                                    src="https://katsudoto.id/media/template/icons/gold/01.png"
                                    alt="Resepsi"
                                    className="object-contain object-center mb-7 mx-auto"
                                    width={50}
                                    height={50}
                                    priority
                                />
                                <h3 data-aos="fade-up" data-aos-duration="1000" className='mb-1 italic text-secondaryInvInv text-3xl text-secondaryInv'>Reception</h3>
                                <p data-aos="fade-up" data-aos-duration="1000" className='text-primaryInv'>15:30 - End</p>
                            </div>

                            <div className='grid gap-2 p-5 text-center'>
                                <p data-aos="fade-up" data-aos-duration="1000" className='font-bold text-primaryInv'>Villa Kailasha</p>
                                <p data-aos="fade-up" data-aos-duration="1000" className='text-primaryInv'>Banjar Dukuh, Desa Kelating, Kelating, Kerambitan, Tabanan Regency, Bali 82121, Indonesia</p>
                                <p data-aos="fade-up" data-aos-duration="1000" className='text-primaryInv'>Tabanan Regency</p>
                                <div data-aos="fade-up" data-aos-duration="1000" className='mt-3 text-center'><a href="#" className='inline-block text-secondaryInv border border-solid border-secondaryInv rounded-lg pt-2 pb-2.5 px-6 hover:text-white hover:bg-secondaryInv transition-all ease-in-out'>View Maps</a></div>
                                <div data-aos="fade-up" data-aos-duration="1000" className='mt-3 text-center'><Link href="/homepage/resepsivirtual" className='inline-block text-white bg-secondaryInv rounded-lg pt-2 pb-2.5 px-6'>Buka Resepsi Virtual</Link></div>
                            </div>

                            <div className='p-5'>

                                <iframe
                                    className="rounded-xl h-48 md:h-64"
                                    width="100%"
                                    height="auto"
                                    src="https://www.youtube.com/embed/GcC12ZYpRa4"
                                    title="YouTube video player"
                                    allow="fullscreen; accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                    allowFullScreen={true}
                                ></iframe>
                            </div>
                        </div>
                    </section>

                    {/* MOMENT */}
                    <section className='pt-5 pb-10 bg-forest-potrait bg-cover bg-center mx-auto min-w-full'>
                        <div className='max-w-md mx-auto'>
                            <div className='px-5 py-6'>
                                <h1 data-aos="fade-up" data-aos-duration="1000" className='text-primaryInv italic text-left text-4xl'>Our Moment</h1>
                            </div>
                            <div className='px-5 grid grid-cols-2 gap-3 overflow-hidden'>
                                <a href="/assets/undanganDigital/Prewed14.jpeg" className='border-2 border-solid border-tertiaryInv w-full h-full'>
                                    <Image
                                        src="/assets/undanganDigital/Prewed14.jpeg"
                                        alt="Moment pengantin"
                                        className="object-cover object-center min-w-full max-h-40 w-full h-auto"
                                        width={500}
                                        height={500}
                                        priority
                                    />
                                </a>
                                <a href="/assets/undanganDigital/Prewed1.jpeg" className='border-2 border-solid border-tertiaryInv w-full h-full'>
                                    <Image
                                        src="/assets/undanganDigital/Prewed1.jpeg"
                                        alt="Moment pengantin"
                                        className="object-cover object-center min-w-full max-h-40 w-full h-auto"
                                        width={500}
                                        height={500}
                                        priority
                                    />
                                </a>
                                <a href="/assets/undanganDigital/Prewed3.jpeg" className='border-2 border-solid border-tertiaryInv w-full h-full'>
                                    <Image
                                        src="/assets/undanganDigital/Prewed3.jpeg"
                                        alt="Moment pengantin"
                                        className="object-cover object-center min-w-full max-h-40 w-full h-auto"
                                        width={500}
                                        height={500}
                                        priority
                                    />
                                </a>
                                <a href="/assets/undanganDigital/Prewed9.jpeg" className='border-2 border-solid border-tertiaryInv w-full h-full'>
                                    <Image
                                        src="/assets/undanganDigital/Prewed9.jpeg"
                                        alt="Moment pengantin"
                                        className="object-cover object-center min-w-full max-h-40 w-full h-auto"
                                        width={500}
                                        height={500}
                                        priority
                                    />
                                </a>
                                <a href="/assets/undanganDigital/Prewed13.jpeg" className='border-2 border-solid border-tertiaryInv w-full h-full'>
                                    <Image
                                        src="/assets/undanganDigital/Prewed13.jpeg"
                                        alt="Moment pengantin"
                                        className="object-cover object-center min-w-full max-h-40 w-full h-auto"
                                        width={500}
                                        height={500}
                                        priority
                                    />
                                </a>
                                <a href="/assets/undanganDigital/Prewed20.jpeg" className='border-2 border-solid border-tertiaryInv w-full h-full'>
                                    <Image
                                        src="/assets/undanganDigital/Prewed20.jpeg"
                                        alt="Moment pengantin"
                                        className="object-cover object-center min-w-full max-h-40 w-full h-auto"
                                        width={500}
                                        height={500}
                                        priority
                                    />
                                </a>
                                <a href="/assets/undanganDigital/Prewed22.jpeg" className='border-2 border-solid border-tertiaryInv w-full h-full'>
                                    <Image
                                        src="/assets/undanganDigital/Prewed22.jpeg"
                                        alt="Moment pengantin"
                                        className="object-cover object-center min-w-full max-h-40 w-full h-auto"
                                        width={500}
                                        height={500}
                                        priority
                                    />
                                </a>
                                <a href="/assets/undanganDigital/Prewed12.jpeg" className='border-2 border-solid border-tertiaryInv w-full h-full'>
                                    <Image
                                        src="/assets/undanganDigital/Prewed12.jpeg"
                                        alt="Moment pengantin"
                                        className="object-cover object-center min-w-full max-h-40 w-full h-auto"
                                        width={500}
                                        height={500}
                                        priority
                                    />
                                </a>



                            </div>
                        </div>
                    </section>

                    {/* TIMELINE */}
                    <section className='min-w-full pt-5 pb-10 bg-gradient-to-b from-white from-70% to-backgroundColorInv to-90%'>
                        <h1 data-aos="fade-right" data-aos-duration="1000" className='text-primaryInv italic text-left text-4xl p-5'>Our Story</h1>

                        <div>
                            <Chrono
                                items={[
                                    {
                                        title: "Jan 2032",
                                        cardTitle: "Perkenalan",
                                        cardSubtitle: "Lorem ipsum dolor sit amet consectetur adipisicing eli Pariatur delectus eaque necessitatibus dicta error molestiae",
                                    },
                                    {
                                        title: "Feb 2032",
                                        cardTitle: "Berteman",
                                        cardSubtitle: `Kami membahas berbagai macam topik yang akhirnya kami memiliki kecocokan terhadap dunia bisnis`,

                                    },
                                    {
                                        title: "Dec 3032",
                                        cardTitle: "Berpacaran",
                                        cardSubtitle: `Perasaan campur aduk dibuat olehnya, akhirnya kami pun melakukan sebuah komitmen untuk saling mengenal lebih dalam`,

                                    },
                                ]}
                                mode="VERTICAL"
                                slideItemDuration={2000}
                                slideShow={true}
                                theme={{
                                    primary: "#765b46",
                                    secondary: "#D5AF6F",
                                    cardBgColor: "white",
                                    titleColor: "black",
                                    titleColorActive: "white",
                                    cardTitleColor: "#906020"
                                }}
                            />
                        </div>
                    </section>

                    {/* RSPV & COMMENT */}
                    <section className='bg-backgroundColorInv pt-5 pb-2.5'>
                        <div className='p-5 grid gap-4'>
                            <h1 data-aos="fade-up" data-aos-duration="1000" className='text-primaryInv italic text-left text-4xl'>Wedding Wish</h1>
                            <p data-aos="zoom-in" data-aos-duration="1000" data-aos-delay="300" className='text-primaryInv italic text-left text-base'>{countGuestComments?.count} Comments</p>

                            <div className='flex justify-between'>

                                {countRSPV.map((status, id) => (
                                    <div key={id} className='border-2 rounded border-solid border-primaryInv p-4 grid items-center justify-items-center w-20'>
                                        <h2 className='text-3xl text-primaryInv'>{status.count}</h2>
                                        <p className='text-base text-primaryInv'>{status._id}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* WISHING FORM */}
                        <form className="p-5" onSubmit={handleFormSubmit}>
                            <div className="mb-4">
                                <input
                                    data-aos-once="true"
                                    data-aos="fade-up" data-aos-duration="1200"
                                    className="shadow appearance-none rounded w-full p-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    type="text"
                                    placeholder="Name"
                                    value={name}
                                    onChange={
                                        (e) => setName(e.target.value)
                                    } />
                            </div>
                            <div className="mb-4">
                                <textarea
                                    data-aos-once="true"
                                    data-aos="fade-up" data-aos-duration="1200"
                                    className="shadow appearance-none rounded w-full min-h-[100px] p-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="Give your wish...."
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)} />
                            </div>
                            <div className='mb-4'>
                                <Listbox data-aos-once="true" data-aos="fade-up" data-aos-duration="1200" value={selected} onChange={setSelected}>
                                    <div className="relative mt-1">
                                        <Listbox.Button className="z-50 relative w-full cursor-default rounded bg-white py-2 pl-3 pr-10 text-left focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                                            <span className="block truncate">{selected.status}</span>
                                            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                                                <ChevronUpDownIcon
                                                    className="h-5 w-5 text-gray-400"
                                                    aria-hidden="true"
                                                />
                                            </span>
                                        </Listbox.Button>
                                        <Transition
                                            as={Fragment}
                                            leave="transition ease-in duration-100"
                                            leaveFrom="opacity-100"
                                            leaveTo="opacity-0"
                                        >
                                            <Listbox.Options className="mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                                {rspv.map((rspv, rspvIdx) => (
                                                    <Listbox.Option
                                                        key={rspvIdx}
                                                        className={({ active }) =>
                                                            `relative z-30 cursor-default select-none py-2 pl-10 pr-4 ${active ? 'bg-amber-100 text-amber-900 z-50' : 'text-gray-900'
                                                            }`
                                                        }
                                                        value={rspv}
                                                    >
                                                        {({ selected }) => (
                                                            <>
                                                                <span
                                                                    className={`block truncate ${selected ? 'font-medium' : 'font-normal'
                                                                        }`}
                                                                >
                                                                    {rspv.status}
                                                                </span>
                                                                {selected ? (
                                                                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                                                                        <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                                                    </span>
                                                                ) : null}
                                                            </>
                                                        )}
                                                    </Listbox.Option>
                                                ))}
                                            </Listbox.Options>
                                        </Transition>
                                    </div>
                                </Listbox>
                            </div>
                            <div className="flex items-center justify-between z-10">
                                <button data-aos-once="true" data-aos="fade-up" data-aos-duration="1200" className="bg-primaryInv text-white italic py-2 px-8 rounded " type="submit">
                                    Kirim
                                </button>
                            </div>
                        </form>


                        {/* COMMENTAR */}
                        <div className='p-5'>
                            {displayedItems.map((data) => (
                                <div data-aos-once="true" data-aos="fade-up" data-aos-duration="1200" className='mb-7' key={data.id}>
                                    <div>
                                        <h3 className='text-lg text-primaryInv font-bold'>{data.name}</h3>
                                        <small className='text-xs text-primaryInv italic'>{data.createdAt}</small>
                                    </div>
                                    <div className='mt-2.5'>
                                        <p className='text-base text-primaryInv italic'>{data.message}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className='p-5'>
                            {displayCount < guestComments.length && (
                                <button className='bg-primaryInv text-white w-full py-2.5 px-5 rounded text-base italic' onClick={handleLoadMore}>Load More Comments</button>
                            )}
                        </div>



                    </section>

                    {/* FOOTNOTE */}
                    <section className='bg-backgroundColorInv container min-w-full grid justify-center relative py-7 overflow-hidden mx-auto'>
                        {/* DECORATION */}
                        <div className='left-0 right-0 mx-auto'>
                            <div className='absolute min-w-full h-full w-[240%] max-w-[900px] bg-no-repeat bg-center bg-forest-landscape opacity-20'
                                style={{
                                    backgroundSize: '100% auto',
                                    top: '50%',
                                    left: '50%',
                                    transform: 'translate(-50%, -50%)',
                                }} />
                        </div>
                        <div className='relative px-5 py-16 mt-36 text-center grid gap-5'>
                            {/* DECORATION */}
                            <div data-aos-once="true" data-aos="zoom-in" data-aos-duration="1500" data-aos-delay="200" className='z-10 absolute left-0 right-0 mx-auto h-full w-[130px] rounded-full bg-[#E6D1B6]' />
                            <p data-aos-once="true" data-aos="fade-up" data-aos-duration="1200" className='z-20 text-primaryInv'>8.7.2023</p>
                            <h1 data-aos-once="true" data-aos="zoom-in" data-aos-duration="1500" data-aos-delay="200" className='z-20 text-4xl text-primaryInv'>Rifqi & Alysha</h1>
                            <p data-aos-once="true" data-aos="fade-up" data-aos-duration="1200" data-aos-delay="500" className='z-20 text-base text-primaryInv'>July 8<sup>th</sup> 2023</p>
                        </div>
                    </section>

                    <footer className='bg-primaryInv py-2.5 grid justify-center min-w-full'>
                        <div>
                            <p className='text-center text-white'>Powered by <a href='https://virtuwed.id' target='_blank' className='hover:underline'>virtuwed.id</a></p>
                        </div>
                    </footer>
                </section >
            </main >
        </>

    )
}

export default UndanganDigital