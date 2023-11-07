'use client'
import React, { Fragment, useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import 'remixicon/fonts/remixicon.css'
import { Chrono } from "react-chrono";
import Countdown from 'react-countdown';
import Link from 'next/link';
import { Dialog, Listbox, Transition } from '@headlessui/react'
import axios from 'axios';
import { countGuestComment, countRSPVStatus, getAllGuestCommentsByWeddingSessionId } from '@/app/api/api';
import { useSelector } from 'react-redux';

// FONT PURPOSE
import { Playfair_Display } from 'next/font/google'
// const playFair = Playfair_Display({ subsets: ['latin'] })
const playFair = Playfair_Display({ subsets: ['latin'], style: ['normal', 'italic'], })

import { Tab } from '@headlessui/react'
function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
}

// ANIMATION
import AOS from 'aos';
import 'aos/dist/aos.css'; // Import the CSS file
import { RootState } from '@/app/redux/reducers';

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


const Theme1 = () => {
    const [isClient, setIsClient] = useState(false);
    const openingContainerDigitalInvitation = useRef<HTMLDivElement>(null)

    const [guestComments, setGuestComments] = useState<GuestComments[]>([]);
    const [countRSPV, setCountRSPV] = useState<CountRSPV[]>([]);
    const [countGuestComments, setCountGuestComments] = useState<CountGuestComments | null>(null);
    const [selected, setSelected] = useState(rspv[0])

    const wedding = useSelector((state: RootState) => state.value.wedding);
    const guest = useSelector((state: RootState) => state.value.guest);
    const theme = useSelector((state: RootState) => state.value.theme);

    const [dayPart, monthPart, yearPart] = wedding.reception_begin_at.date.split('-');


    // COMMENT
    // const [name, setName] = useState("");
    const [message, setMessage] = useState("");
    const [displayCount, setDisplayCount] = useState(6);

    // modal moment
    let [isOpen, setIsOpen] = useState(false)
    let [momentTitle, setMomentTitle] = useState('')
    let [momentLink, setMomentLink] = useState('')

    // SONG 
    const [isPlaying, setIsPlaying] = useState(true);
    const [isButtonVisible, setIsButtonVisible] = useState(true);
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const prevScrollY = useRef(0);



    const handleButtonClick = () => {
        if (isPlaying) {
            audioRef.current?.pause();
        } else {
            audioRef.current?.play();
        }
        setIsPlaying(!isPlaying);
    };


    // FETCH FUNCTION
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
        const guestName = guest.nama
        e.preventDefault();
        if (message.trim() === '') {
            // If either name or message is empty, do not proceed with the fetch request
            alert('Jangan lupa isi nama dan pesan yaa')
        } else {
            try {
                const commentSend = await axios.post('https://api.virtuwed.id/graphql', {
                    query: `
                    mutation CreateGuestComment($guestName: String!, $message: String!) {
                      createGuestComment(wedding_session_id: "649007bdca091be7add3c440", name: $guestName, message: $message) {
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
                        guestName,
                        message,
                    },
                });

                const rspvSend = await axios.post('https://api.virtuwed.id/graphql', {
                    query: `
                    mutation RSVPAbsent($guestName: String!, $status: String!) {
                        RSVPAbsent(wedding_session_id: "649007bdca091be7add3c440", name: $guestName, status: $status) {
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
                        guestName,
                        status: selected.status
                    },
                });

                console.log('Data added:');
                // Handle success or show a confirmation message
                // setName("");
                setMessage("");
                fetchGuestComments();
                fetchCountRSPVStatus();
                fetchCountGuestComment();

            } catch (error) {
                console.error('Error adding data:', error);
                // Handle error or show an error message
            }
        }
    };

    // LOAD MORE COMMENT
    const handleLoadMore = () => {
        setDisplayCount(displayCount + 6);
    };
    const displayedItems = guestComments.slice(0, displayCount);



    // MODAL
    function closeModal() {
        setIsOpen(false)
    }

    function openModal() {
        setIsOpen(true)
    }

    const openDigitalInvitation = () => {
        document.body.classList.remove("overflow-hidden");
        openingContainerDigitalInvitation.current?.classList.add('hidden')
        audioRef.current?.play();

    }


    useEffect(() => {
        AOS.init(); // Initialize AOS
        setIsClient(true);

        fetchGuestComments()
        fetchCountGuestComment()
        fetchCountRSPVStatus()

        return () => {
            AOS.refresh(); // Clean up AOS on component unmount
        };
    }, []);

    useEffect(() => {
        document.body.classList.add("overflow-hidden");
        const handleScroll = () => {
            const currentScrollY = window.scrollY;

            if (currentScrollY > prevScrollY.current) {
                setIsButtonVisible(false);
            } else {
                setIsButtonVisible(true);
            }

            prevScrollY.current = currentScrollY;
        };

        // audioRef.current = new Audio('/assets/undanganDigital/GonnaLiveForever.mp3');
        // audioRef.current.loop = true;
        // window.addEventListener('scroll', handleScroll);

        return () => {
            // audioRef.current?.pause();
            // window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <main className='relative overflow-hidden'>

            {/* OPENING */}
            <div ref={openingContainerDigitalInvitation} className='absolute z-50 w-full h-full top-0 left-0'>

                <main className={`relative container min-w-full mx-auto min-h-[666px] md:min-h-[100dvh] h-[100dvh] text-center max-w-screen-xl`}>
                    <Image
                        src={`https://sgp1.vultrobjects.com/virtuwed-storage/` + wedding.undangan_digital.cover_undangan_digital}
                        alt="Moment pengantin"
                        className="absolute object-cover object-center w-full h-full z-0 opacity-20"
                        width={500}
                        height={500}
                        priority
                    />

                    <div className='grid gap-6 justify-items-center content-center min-h-[666px] md:min-h-[100dvh] h-[100dvh] px-4 bg-white z-40'>
                        <div className='grid justify-center gap-2 z-10'>
                            <p data-aos="fade" data-aos-delay="750" data-aos-duration="500" className={`${playFair.className} p3-r italic`}>Selamat datang bapak/ibu/saudara/i </p>
                            <h3 data-aos="zoom-in" data-aos-delay="500" data-aos-duration="500" className={`${playFair.className} text-xl md:text-3xl`}>{guest.nama}</h3>
                        </div>

                        <Image
                            src={`https://sgp1.vultrobjects.com/virtuwed-storage/` + wedding.undangan_digital.cover_undangan_digital}
                            alt="Moment pengantin"
                            className="object-cover object-center rounded-full w-52 h-52 z-10"
                            width={500}
                            height={500}
                            priority
                        />

                        <div className='grid gap-2 z-10'>
                            <h2 data-aos="fade" data-aos-delay="1000" data-aos-duration="500" className={`${playFair.className} text-lg italic`}>Di acara pernikahan antara</h2>
                            <h1 data-aos="zoom-in" data-aos-duration="1000" className={`${playFair.className} text-5xl text-primaryInv`}>{wedding.wedding_name}</h1>
                            <p data-aos="fade" data-aos-delay="1000" data-aos-duration="500" className={`${playFair.className}`}>{wedding.reception_begin_at.date}</p>
                        </div>


                        <div className='grid gap-4 max-w-screen-md w-full mx-auto z-10'>

                            <Link href={`/${wedding.wedding_slug}/${guest.guest_slug}/resepsivirtual`} className={`${playFair.className} italic px-1.5 py-3 bg-primaryInv text-white w-full rounded-lg flex gap-2 items-center justify-center`}>
                                <i className="ri-cake-2-fill ri-lg"></i>
                                Hadiri Pernikahan
                            </Link>

                            <div className='flex w-full gap-4'>
                                <button onClick={openDigitalInvitation} className={`${playFair.className} italic px-1.5 py-3 bg-white text-primaryInv border border-solid border-primaryInv rounded-lg flex items-center justify-center w-full gap-2`}>
                                    <i className="ri-calendar-event-line ri-lg"></i>
                                    Undangan
                                </button>
                                <Link href={`/${wedding.wedding_slug}/${guest.guest_slug}/kenanganvirtual`} className={`${playFair.className} italic px-1.5 py-3 bg-white text-primaryInv border border-solid border-primaryInv w-full rounded-lg flex gap-2 items-center justify-center`}>
                                    <i className="ri-image-line ri-lg"></i>
                                    Galeri
                                </Link>
                            </div>
                        </div>
                    </div>
                </main>
            </div >


            <div className={`overflow-hidden min-h-screen lg:grid lg:grid-cols-12 lg:relative`}>
                <section className='hidden lg:grid col-span-8 h-screen w-4/6 bg-primaryInv fixed p-5'>
                    {wedding.undangan_digital.cover_undangan_digital &&
                        <div className={`relative w-full h-full grid items-end p-16`}>
                            <Image
                                src={`https://sgp1.vultrobjects.com/virtuwed-storage/` + wedding.undangan_digital.cover_undangan_digital}
                                alt="Cover Kedua Mempelai"
                                className="absolute object-cover object-center min-w-full w-full h-full"
                                width={500}
                                height={500}
                                priority
                            />
                            <h1 className={`${playFair.className} uppercase z-50 text-primaryInv text-6xl`}>{wedding.wedding_name}</h1>
                        </div>
                    }
                </section>

                <section className='block lg:grid lg:col-span-4 lg:col-start-9 relative'>

                    {/* NAVIGATION */}
                    <section className='fixed bottom-0 left-0 h-auto lg:w-2/6 lg:right-0 lg:left-auto bg-white text-tertiaryInv w-full py-3 grid justify-center z-30 border-t border-tertiaryInv'>
                        <Link href={`/${wedding.wedding_slug}/${guest.guest_slug}/resepsivirtual`} className='w-fit justify-items-center items-center gap-2 inline-grid'>
                            <i className="ri-building-4-line ri-xl"></i>
                            <p className='p3-r capitalize'>resepsi virtual</p>
                        </Link>
                    </section>
                    {/* MODAL MOMENT */}
                    <Transition appear show={isOpen} as={Fragment}>
                        <Dialog as="div" className="relative z-10" onClose={closeModal}>
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0"
                                enterTo="opacity-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100"
                                leaveTo="opacity-0"
                            >
                                <div className="fixed inset-0 bg-black bg-opacity-25" />
                            </Transition.Child>

                            <div className="fixed inset-0 overflow-y-auto">
                                <div className="flex min-h-full items-center justify-center p-4 text-center">
                                    <Transition.Child
                                        as={Fragment}
                                        enter="ease-out duration-300"
                                        enterFrom="opacity-0 scale-95"
                                        enterTo="opacity-100 scale-100"
                                        leave="ease-in duration-200"
                                        leaveFrom="opacity-100 scale-100"
                                        leaveTo="opacity-0 scale-95"
                                    >
                                        <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                            <Dialog.Title
                                                as="h3"
                                                className="text-lg font-medium leading-6 text-gray-900"
                                            >
                                                Moment {momentTitle}
                                            </Dialog.Title>
                                            <div className="mt-2">
                                                <Image
                                                    src={momentLink}
                                                    alt="Moment pengantin"
                                                    className="object-cover object-center min-w-full w-full h-auto rounded-lg"
                                                    width={500}
                                                    height={500}
                                                    priority
                                                />
                                            </div>

                                            <div className="mt-4">
                                                <button
                                                    type="button"
                                                    className="inline-flex justify-center rounded-md border border-transparent bg-primaryInv px-4 py-2 text-sm font-medium text-white hover:bg-tertiaryInv focus:outline-none"
                                                    onClick={closeModal}
                                                >
                                                    Close
                                                </button>
                                            </div>
                                        </Dialog.Panel>
                                    </Transition.Child>
                                </div>
                            </div>
                        </Dialog>
                    </Transition>

                    {/* MAIN HERO */}
                    <section className='container grid min-w-full justify-center h-screen px-2.5 py-5 bg-rsvp-texture bg-cover bg-no-repeat bg-center'>
                        <div data-aos="zoom-in" data-aos-duration="1000" className='grid h-full justify-end max-w-md rounded-full bg-white bg-opacity-90 border-2 border-solid border-tertiaryInv'>
                            <div className='grid text-center items-center w-full px-5'>
                                <div className='mb-5 grid justify-center'>
                                    <div className='w-3 h-3 bg-tertiaryInv rotate-45' />
                                </div>
                                <p data-aos="fade-down" data-aos-duration="1200" data-aos-delay="800" className={`${playFair.className} mb-4 italic`}>Wedding Invitation</p>
                                <h1 data-aos="zoom-in" data-aos-duration="2000" data-aos-delay="500" className={`${playFair.className} text-tertiaryInv text-6xl uppercase font-thin`}>{wedding.wedding_name.replace('&', '')}</h1>
                                <p data-aos="fade-up" data-aos-duration="1200" data-aos-delay="800" className={`${playFair.className} mt-4 text-base italic`}>Two souls become one heart</p>
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
                                <p data-aos="fade-up" data-aos-duration="1000" data-aos-delay="100" className={`${playFair.className} leading-relaxed italic`}>&quot;The best thing to hold onto in life is each other.&quot;<br />– Audrey Hepburn</p>
                            </div>
                        </div>
                    </div>

                    {/* PROFILE */}
                    <section className='container overflow-hidden pt-5 pb-12 grid mx-auto'>
                        <div className='p-6 text-center'>
                            <h1 data-aos="zoom-in" data-aos-duration="1000" className={`${playFair.className} text-3xl text-primaryInv`}>
                                The Wedding Of
                            </h1>
                            <p data-aos="fade-up" data-aos-duration="1000" className={`${playFair.className} my-2 italic`}>The pleasure of your company is requested</p>
                        </div>

                        {/* COUPLE BODY */}
                        <div className='mt-5'>
                            {/* MAN */}
                            <div>
                                <div className='grid justify-center py-8'>
                                    <div data-aos="zoom-in" data-aos-duration="1500" data-aos-once="true" className='relative w-56 h-56 rounded-full border-2 border-solid border-tertiaryInv'>
                                        <div data-aos="zoom-in" data-aos-duration="2000" data-aos-delay="300" data-aos-once="true" className='bg-flower-dark absolute h-40 w-full bg-contain bg-no-repeat -z-10 -bottom-7 -left-10'></div>
                                        <Image
                                            src="/assets/undanganDigital/pengantinPria.jpg"
                                            alt="Vercel Logo"
                                            className="w-full h-full rounded-full z-50 object-cover bg-white"
                                            width={220}
                                            height={220}
                                            priority
                                        />
                                    </div>
                                </div>
                                <div className='text-center grid gap-y-2.5 px-2.5 py-5'>
                                    <h2 data-aos="fade-up" data-aos-duration="1000" className={`${playFair.className} uppercase text-4xl text-primaryInv`}>{wedding.undangan_digital.pengantin_pria.nama_lengkap}</h2>
                                    <p data-aos="fade-up" data-aos-duration="1000" className={`${playFair.className} italic text-base`}>Putra dari Bapak {wedding.undangan_digital.pengantin_pria.nama_ortu_bapak} dan {wedding.undangan_digital.pengantin_pria.nama_ortu_ibu}</p>
                                    <div data-aos="fade-up" data-aos-duration="1000" className='flex gap-2 items-center justify-center'>
                                        <i className="ri-instagram-line ri-1x"></i>
                                        <a className={`${playFair.className} italic text-base inline-block hover:underline underline-offset-4`} href={`https://www.instagram.com/${wedding.undangan_digital.pengantin_pria.instagram}/`} target='_blank'>@{wedding.undangan_digital.pengantin_pria.instagram}</a>
                                    </div>
                                </div>
                            </div>
                            <div className='py-8'><h2 data-aos="fade-up" data-aos-duration="1000" className={`${playFair.className} text-center text-6xl text-tertiaryInv`}>&</h2></div>
                            {/* WOMAN */}
                            <div className='relative'>
                                <div style={{ backgroundSize: '100% 100%' }} className='absolute -z-10 bg-center bg-story-texture -bottom-64 left-0 right-0 mx-auto h-full w-[500px] bg-no-repeat'></div>
                                <div className='grid justify-center py-8'>
                                    <div data-aos="zoom-in" data-aos-duration="1500" data-aos-once="true" className='relative w-56 h-56 rounded-full border-2 border-solid border-tertiaryInv'>
                                        <div className='bg-flower-dark absolute h-40 w-full bg-contain bg-no-repeat -z-10 -top-7 -right-10 rotate-180'></div>
                                        <Image
                                            src="/assets/undanganDigital/pengantinWanita.jpg"
                                            alt="Vercel Logo"
                                            className="w-full h-full rounded-full z-50 object-cover"
                                            width={220}
                                            height={220}
                                            priority
                                        />
                                    </div>
                                </div>
                                <div className='text-center grid gap-y-2.5 px-2.5 py-5'>
                                    <h2 data-aos="fade-up" data-aos-duration="1000" className={`${playFair.className} uppercase text-4xl text-primaryInv`}>{wedding.undangan_digital.pengantin_wanita.nama_lengkap}</h2>
                                    <p data-aos="fade-up" data-aos-duration="1000" className={`${playFair.className} italic text-base`}>Putri dari {wedding.undangan_digital.pengantin_wanita.nama_ortu_bapak} dan Ibu {wedding.undangan_digital.pengantin_wanita.nama_ortu_ibu}</p>
                                    <div data-aos="fade-up" data-aos-duration="1000" className='flex gap-2 items-center justify-center'>
                                        <i className="ri-instagram-line ri-1x"></i>
                                        <a className={`${playFair.className} italic text-base inline-block hover:underline underline-offset-4`} href={`https://www.instagram.com/${wedding.undangan_digital.pengantin_wanita.instagram}/`} target='_blank'>@{wedding.undangan_digital.pengantin_wanita.instagram}</a>
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
                                <h1 data-aos="fade-up" data-aos-duration="1000" className={`${playFair.className} text-tertiaryInv italic text-5xl leading-normal`}>Save<br />The Date</h1>
                                {/* <p data-aos="fade-up" data-aos-duration="1000" data-aos-delay="300" className='text-primaryInv'>July 8 <sup>th </sup>, 2023</p> */}
                                <p data-aos="fade-up" data-aos-duration="1000" data-aos-delay="300" className={`${playFair.className} text-primaryInv text-lg italic`}>{wedding.reception_begin_at.date}</p>
                            </div>

                            {/* COUNTDOWN */}
                            <div data-aos="fade-up" data-aos-duration="1200" data-aos-delay="100" className='grid justify-center py-10'>
                                {isClient && <Countdown className={`${playFair.className} text-5xl text-primaryInv`} date={`${yearPart}-${monthPart}-${dayPart}T${wedding.reception_begin_at.time}:00`} />}
                            </div>

                            {/* <div className='grid justify-end py-5 mt-1'>
                                <a href="#" className='bg-primaryInv inline-block text-white px-4 pt-2 pb-2.5 rounded-md w-44 text-center'>Add to Calendar</a>
                            </div> */}
                        </div>
                    </section>

                    {/* RESEPSI */}
                    <section className='container mx-auto py-6 max-w-md'>
                        <Tab.Group>
                            <Tab.List className='h-12 flex px-4'>

                                <Tab className={({ selected }) =>
                                    classNames('flex justify-center items-center w-full px-4 border-b-2',
                                        selected
                                            ? 'border-tertiaryInv text-tertiaryInv'
                                            : 'text-N400 border-N400'
                                    )
                                }>
                                    <h4 className={`${playFair.className} italic`}>Resepsi Virtual</h4>
                                </Tab>
                                <Tab className={({ selected }) =>
                                    classNames('flex justify-center items-center w-full px-4 border-b-2',
                                        selected
                                            ? 'border-tertiaryInv text-tertiaryInv'
                                            : 'text-N400 border-N400'
                                    )
                                }>
                                    <h4 className={`${playFair.className} italic`}>Resepsi</h4>
                                </Tab>
                            </Tab.List>

                            <Tab.Panels>

                                {/* RESEPSI VIRTUAL */}
                                <Tab.Panel className='grid w-full'>
                                    <div className='relative'>
                                        {/* DECORATION */}
                                        <div style={{ backgroundSize: 'auto 100%' }} className='-z-10 absolute bg-line-orn-event h-2.5 w-full bg-center bg-no-repeat -bottom-7'></div>

                                        <div className='grid gap-1.5 p-5 text-center'>
                                            <h2 data-aos="zoom-in" data-aos-duration="1500" className={`${playFair.className} text-2xl text-primaryInv italic`}>Intimate Reception</h2>
                                            <p data-aos="fade-up" data-aos-duration="1200" className={`${playFair.className} text-base italic text-[#00000080]`}>Kami mengundang anda ke dalam Resepsi Pernikahan Virtual (Virtual Wedding) berikut ini.</p>
                                        </div>
                                    </div>

                                    <div className='mt-20'>
                                        <div className='event-head text-center p-5 grid gap-5 relative'>
                                            {/* DECORATION */}
                                            <div data-aos="zoom-out" data-aos-duration="3000" data-aos-delay="250" style={{ backgroundSize: 'auto 100%' }} className='-z-10 absolute bg-forest h-[130%] w-full bg-center bg-no-repeat top-0 bottom-0 left-0 right-0 m-auto'></div>

                                            <h3 data-aos="fade-up" data-aos-duration="1000" className={`${playFair.className} uppercase text-primaryInv text-xl tracking-[8px]`}>{wedding.reception_begin_at.day},</h3>
                                            {/* <h2 data-aos="fade-up" data-aos-duration="1000" className={`${playFair.className} italic text-primaryInv text-3xl font-semibold`}><span className='text-5xl'>{dayPart}<sup>th</sup></span> {wedding.reception_begin_at.month}, {yearPart}</h2> */}
                                            <h2 data-aos="fade-up" data-aos-duration="1000" className={`${playFair.className} italic text-primaryInv text-3xl font-semibold`}><span className='text-5xl'>{dayPart}</span> {wedding.reception_begin_at.month} {yearPart}</h2>
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
                                            <h3 data-aos="fade-up" data-aos-duration="1000" className={`${playFair.className} mb-3 italic text-secondaryInvInv text-4xl text-tertiaryInv`}>Virtual Reception</h3>
                                            <p data-aos="fade-up" data-aos-duration="1000" className={`${playFair.className} italic text-primaryInv text-lg`}>{wedding.reception_begin_at.time} - {wedding.reception_end_at.time}</p>
                                        </div>

                                        <div className='grid p-5'>
                                            <div data-aos="fade-up" data-aos-duration="1000" className='mt-3 text-center'><Link href={`/${wedding.wedding_slug}/${guest.guest_slug}/resepsivirtual`} className={`${playFair.className} italic inline-block text-primaryInv border hover:bg-white border-solid hover:border-tertiaryInv rounded-lg pt-2 pb-2.5 px-6 hover:text-tertiaryInv bg-tertiaryInv transition-all ease-in-out`}>Hadiri Resepsi</Link></div>
                                            {/* <div data-aos="fade-up" data-aos-duration="1000" className='mt-3 text-center'><Link href="/homepage/resepsivirtual" className='inline-block text-white bg-secondaryInv rounded-lg pt-2 pb-2.5 px-6'>Buka Resepsi Virtual</Link></div> */}
                                        </div>
                                    </div>
                                </Tab.Panel>

                                {/* RESEPSI */}
                                <Tab.Panel className='grid w-full'>
                                    <div className='relative'>
                                        {/* DECORATION */}
                                        <div style={{ backgroundSize: 'auto 100%' }} className='-z-10 absolute bg-line-orn-event h-2.5 w-full bg-center bg-no-repeat -bottom-7'></div>

                                        <div className='grid gap-1.5 p-5 text-center'>
                                            <h2 data-aos="zoom-in" data-aos-duration="1500" className={`${playFair.className} text-2xl text-primaryInv italic`}>It&#39;s Wedding Day</h2>
                                            <p data-aos="fade-up" data-aos-duration="1200" className={`${playFair.className} text-base italic text-[#00000080]`}>Kami mengundang anda ke Resepsi Pernikahan berikut ini.</p>
                                        </div>
                                    </div>

                                    <div className='mt-20'>
                                        <div className='event-head text-center p-5 grid gap-5 relative'>
                                            {/* DECORATION */}
                                            <div data-aos="zoom-out" data-aos-duration="3000" data-aos-delay="250" style={{ backgroundSize: 'auto 100%' }} className='-z-10 absolute bg-forest h-[130%] w-full bg-center bg-no-repeat top-0 bottom-0 left-0 right-0 m-auto'></div>

                                            <h3 data-aos="fade-up" data-aos-duration="1000" className={`${playFair.className} uppercase text-primaryInv text-xl tracking-[8px]`}>{wedding.reception_begin_at.day},</h3>
                                            <h2 data-aos="fade-up" data-aos-duration="1000" className={`${playFair.className} italic text-primaryInv text-3xl font-semibold`}><span className='text-5xl'>{dayPart}</span> {wedding.reception_begin_at.month} {yearPart}</h2>
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
                                            <h3 data-aos="fade-up" data-aos-duration="1000" className={`${playFair.className} mb-3 italic text-secondaryInvInv text-4xl text-tertiaryInv`}>Reception</h3>
                                            <p data-aos="fade-up" data-aos-duration="1000" className={`${playFair.className} italic text-primaryInv text-lg`}>{wedding.reception_begin_at.time} - {wedding.reception_end_at.time}</p>
                                        </div>

                                        <div className='grid gap-2 p-5 text-center'>
                                            <p data-aos="fade-up" data-aos-duration="1000" className={`${playFair.className} italic font-bold text-primaryInv`}>{wedding.undangan_digital.reception_location_name}</p>
                                            <p data-aos="fade-up" data-aos-duration="1000" className={`${playFair.className} italic text-primaryInv`}>{wedding.undangan_digital.reception_location_address}</p>
                                            {/* <p data-aos="fade-up" data-aos-duration="1000" className='text-primaryInv'>Tabanan Regency</p> */}
                                            <div data-aos="fade-up" data-aos-duration="1000" className='mt-3 text-center'><a href={wedding.undangan_digital.reception_location_maps_url} target='_blank' className={`${playFair.className} italic inline-block text-tertiaryInv border bg-white border-solid border-tertiaryInv rounded-lg pt-2 pb-2.5 px-6 hover:text-white hover:bg-tertiaryInv transition-all ease-in-out`}>View Maps</a></div>
                                        </div>
                                    </div>
                                </Tab.Panel>
                            </Tab.Panels>
                        </Tab.Group>

                    </section>

                    {/* MOMENT */}
                    <section className='pt-5 pb-10 bg-forest-potrait bg-cover bg-center mx-auto min-w-full'>
                        <div className='max-w-md mx-auto'>
                            <div className='px-5 py-6'>
                                <h1 data-aos="fade-up" data-aos-duration="1000" className={`${playFair.className} text-primaryInv italic text-left text-4xl`}>Our Moment</h1>
                            </div>
                            <div className='px-5 grid grid-cols-2 gap-3 overflow-hidden'>
                                {wedding.media.prewedding_photos.map((photos, key) => {
                                    return (
                                        <div
                                            key={key}
                                            onClick={() => {
                                                openModal()
                                                setMomentLink(`https://sgp1.vultrobjects.com/virtuwed-storage/` + photos)
                                                setMomentTitle("1")
                                            }}
                                            className='cursor-pointer border-2 border-solid border-tertiaryInv w-full h-full'>
                                            <Image
                                                src={`https://sgp1.vultrobjects.com/virtuwed-storage/` + photos}
                                                alt="Moment pengantin"
                                                className="object-cover object-center min-w-full max-h-40 w-full h-auto"
                                                width={500}
                                                height={500}
                                                priority
                                            />
                                        </div>
                                    )
                                })}
                            </div>
                        </div>

                        {wedding.media.prewedding_videos[0] &&
                            <div className='max-w-md mx-auto mt-40'>
                                <div className='px-5 py-6'>
                                    <h1 data-aos="fade-up" data-aos-duration="1000" className={`${playFair.className} text-primaryInv italic text-left text-4xl`}>Video gallery</h1>
                                </div>
                                <div className='p-5'>
                                    <iframe
                                        className="rounded-xl h-48 md:h-52 border border-tertiaryInv"
                                        width="100%"
                                        height="auto"
                                        src={wedding.media.prewedding_videos[0]}
                                        title="YouTube video player"
                                        allow="fullscreen; accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                        allowFullScreen={true}
                                    ></iframe>
                                </div>
                            </div>
                        }
                    </section>

                    {/* TIMELINE */}
                    <section className='min-w-full pt-5 pb-10 bg-gradient-to-b from-white from-70% to-backgroundColorInv to-90%'>
                        <h1 data-aos="fade-right" data-aos-duration="1000" className={`${playFair.className} text-primaryInv italic text-left text-4xl p-5`}>Our Story</h1>

                        <div className={`${playFair.className}`}>
                            <Chrono
                                // items={[
                                //     {
                                //         title: "2014",
                                //         cardTitle: "Pertemuan",
                                //         cardSubtitle: "Saya memasuki dunia anak SMP dimana Saya beranjak ke masa remaja. Awalnya Saya sama sekali tidak mengenal Rifqi Sholeh karena Dia cowo satu satunya yang bersikap jutek, cuek sama cewek. Bahkan sama sekali Saya tidak mengenal Rifqi Sholeh saking cueknya itu orang",
                                //     },
                                //     {
                                //         title: "20 Sept 2015",
                                //         cardTitle: "Berpacaran",
                                //         cardSubtitle: 'Hari dimana aku sangat berbahagia bisa mengenal lebih dekat dengan Cowo super jutek dan cuek itu. Setelah mengenal Dia lebih dalam ternyata Dia sangat humoris dan penyayang serta peduli banget sama pasangan ga nyangka bisa pacaran sama Cowo sejutek dan cuek seperti Dia',

                                //     },
                                //     {
                                //         title: "6 Jan 2023",
                                //         cardTitle: "Melamar",
                                //         cardSubtitle: "Hari dimana Aku merasa bahagia dan dibuat degdegan parah. Karena hari itu Dia mulai menunjukan keseriusannya terhadap Aku. Dia pria cuek dan jutek bisa bisanya memberanikan diri untuk datang kerumahku bersama keluarganya membawa kabar gembira yang gabisa Aku ungkapin dengan kata kata dan sangat bikin aku terharu. Setelah sekian lamanya perjalanan banyak lika liku huru hara hubungan Kita",

                                //     },
                                // ]}
                                items={wedding.undangan_digital.kisah_cinta.map((loveStory) => ({
                                    title: loveStory.kisah_cinta_date,
                                    cardTitle: loveStory.kisah_cinta_judul,
                                    cardSubtitle: loveStory.kisah_cinta_cerita,
                                }))}
                                mode="VERTICAL"
                                fontSizes={{
                                    cardSubtitle: '1rem',
                                    cardTitle: '1.5rem',
                                    title: '1rem',
                                }}
                                cardHeight={100} // sets the height of the timeline card to 200px
                                // slideItemDuration={2000}
                                // slideShow={false}
                                hideControls={true}
                                // scrollable={true}
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
                            <h1 data-aos="fade-up" data-aos-duration="1000" className={`${playFair.className} text-primaryInv italic text-left text-4xl`}>Wedding Wish</h1>
                            <p data-aos="zoom-in" data-aos-duration="1000" data-aos-delay="300" className={`${playFair.className} text-primaryInv italic text-left text-base`}>{countGuestComments?.count} Comments</p>

                            <div className='flex justify-between'>

                                {countRSPV?.map((status, id) => (
                                    <div key={id} className='border-2 rounded border-solid border-primaryInv p-4 grid items-center justify-items-center w-20'>
                                        <h2 className={`${playFair.className} text-3xl text-primaryInv`}>{status.count}</h2>
                                        <p className={`${playFair.className} text-base text-primaryInv text-center italic`}>{status._id}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* WISHING FORM */}
                        <form className="p-5" onSubmit={handleFormSubmit}>
                            {/* <div className="mb-4">
                                <input
                                    data-aos-once="true"
                                    data-aos="fade-up" data-aos-duration="1200"
                                    className={`${playFair.className} italic shadow appearance-none rounded w-full p-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
                                    type="text"
                                    placeholder="Name"
                                    value={name}
                                    onChange={
                                        (e) => setName(e.target.value)
                                    } />
                            </div> */}
                            <div className="mb-4">
                                <textarea
                                    data-aos-once="true"
                                    data-aos="fade-up" data-aos-duration="1200"
                                    className={`${playFair.className} italic shadow appearance-none rounded w-full min-h-[100px] p-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`} placeholder="Give your wish...."
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)} />
                            </div>
                            <div className='mb-4'>
                                <Listbox data-aos-once="true" data-aos="fade-up" data-aos-duration="1200" value={selected} onChange={setSelected}>
                                    <div className="relative mt-1">
                                        <Listbox.Button className="z-50 relative w-full cursor-default rounded bg-white py-2 pl-3 pr-10 text-left focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                                            <span className={`${playFair.className} italic block truncate`}>{selected.status}</span>
                                            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                                                <i className="ri-expand-up-down-line text-gray-400 ri-lg"></i>
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
                                                        className={({ active, selected }) =>
                                                            `relative z-30 cursor-default select-none py-2 pl-10 pr-4 ${active ? 'bg-amber-100/50 z-50' : 'text-gray-900'
                                                            } ${selected ? 'bg-amber-100 z-50' : 'text-gray-900'
                                                            }`
                                                        }
                                                        value={rspv}
                                                    >
                                                        {({ selected }) => (
                                                            <>
                                                                <span
                                                                    className={`${playFair.className} italic block truncate ${selected ? 'font-medium text-amber-900' : 'font-normal'
                                                                        }`}
                                                                >
                                                                    {rspv.status}
                                                                </span>
                                                                {selected ? (
                                                                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                                                                        <i className="ri-check-line ri-lg"></i>
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
                                <button data-aos-once="true" data-aos="fade-up" data-aos-duration="1200" className={`${playFair.className} bg-primaryInv text-white italic py-2 px-8 rounded `} type="submit">
                                    Kirim
                                </button>
                            </div>
                        </form>


                        {/* COMMENTAR */}
                        <div className='p-5'>
                            {displayedItems?.map((data) => (
                                <div data-aos-once="true" data-aos="fade-up" data-aos-duration="1200" className='mb-7' key={data.id}>
                                    <div>
                                        <h3 className={`${playFair.className} text-lg text-primaryInv font-bold`}>{data.name}</h3>
                                        <small className={`${playFair.className} text-xs text-primaryInv italic`}>{data.createdAt}</small>
                                    </div>
                                    <div className='mt-2.5'>
                                        <p className={`${playFair.className} text-base text-primaryInv italic`}>{data.message}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className='p-5'>
                            {displayCount < guestComments.length && (
                                <button className={`${playFair.className} bg-primaryInv text-white w-full py-2.5 px-5 rounded text-base italic`} onClick={handleLoadMore}>Load More Comments</button>
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
                            <p data-aos-once="true" data-aos="fade-up" data-aos-duration="1200" className={`${playFair.className} italic z-20 text-primaryInv text-base`}>Two souls become one heart</p>
                            <h1 data-aos-once="true" data-aos="zoom-in" data-aos-duration="1500" data-aos-delay="200" className={`${playFair.className} z-20 text-6xl text-primaryInv`}>{wedding.wedding_name.replace('&', '')}</h1>
                            {/* <p data-aos-once="true" data-aos="fade-up" data-aos-duration="1200" data-aos-delay="500" className='z-20 text-base text-primaryInv'>July 8<sup>th</sup> 2023</p> */}
                            <p data-aos-once="true" data-aos="fade-up" data-aos-duration="1200" data-aos-delay="500" className={`${playFair.className} z-20 text-xl text-primaryInv`}>{wedding.reception_begin_at.date}</p>
                        </div>
                    </section>

                    {/* MUSIC */}
                    {/* <section className='fixed z-20 top-3 right-3'>
                        <button className={`bg-music-disc bg-cover w-12 h-12 ${isPlaying ? 'animate-spin-slow' : 'animate-none'} ${isButtonVisible ? 'block' : 'hidden'}`} onClick={handleButtonClick}>
                        </button>
                    </section> */}

                    <footer className='bg-primaryInv py-2.5 grid justify-center min-w-full'>
                        <div>
                            <p className={`${playFair.className} italic text-center text-white`}>Powered by <Link href='/' className={`font-ade uppercase hover:underline not-italic`}>virtuwed</Link></p>
                        </div>
                    </footer>
                </section >
            </div >
        </main >

    )
}

export default Theme1