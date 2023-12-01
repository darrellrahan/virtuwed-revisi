'use client'
import React, { useEffect, useState } from 'react'
import * as THREE from 'three';
import { RadioGroup, Tab } from '@headlessui/react'
import Typed from 'typed.js';
import { Disclosure } from '@headlessui/react'
import Image from 'next/image';
import { ArrowTopRightOnSquareIcon } from '@heroicons/react/20/solid';
import { Icon } from '@iconify/react';
import 'remixicon/fonts/remixicon.css'
import { useSelector } from 'react-redux';
import { FileUploader } from "react-drag-drop-files";


import "../../node_modules/video-react/dist/video-react.css";
// import '~video-react/dist/video-react.css'; // import css
import { Player } from "video-react";


//TODO:
// 2. image feature
// 3. livestream feature
// 4. infostop gift menu
// 5. storytelling

// minor feature
// 6. leaderboard

// ---feature needed
// infospot hover element
// loading progress
// 3d model
// storytelling

// ANIMATION
import AOS from 'aos';
import 'aos/dist/aos.css';
import { RootState } from '@/src/app/[lang]/redux/reducers';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import YouTubePlayer from './YoutubePlayer';

const gifts = [
    {
        emoticon: '/assets/ballroom/emoticons/4.webp',
        icon: 'ri-plant-line',
        img: '/assets/ballroom/gift/buket_bunga.webp',
        name: 'buket bunga',
        price: '50000'
    },
    {
        emoticon: '/assets/ballroom/emoticons/3.webp',
        icon: 'ri-coupon-3-line',
        img: '/assets/ballroom/gift/tiket_nonton.webp',
        name: 'tiket nonton',
        price: '100000',
    },
    {
        emoticon: '/assets/ballroom/emoticons/2.webp',
        icon: 'ri-timer-line',
        img: '/assets/ballroom/gift/jam_tangan.webp',
        name: 'jam tangan',
        price: '500000',
    },
    {
        emoticon: '/assets/ballroom/emoticons/1.webp',
        icon: 'ri-tv-2-line',
        img: '/assets/ballroom/gift/televisi.webp',
        name: 'televisi',
        price: '1000000',
    },
    {
        emoticon: '/assets/ballroom/emoticons/4.webp',
        icon: 'ri-cash-line',
        img: '/assets/ballroom/gift/televisi.png',
        name: 'Jumlah Lainnya',
        price: '0',
    },
    {
        emoticon: '/assets/ballroom/emoticons/5.webp',
        icon: 'ri-message-3-line',
        img: '/assets/ballroom/gift/televisi.png',
        name: 'Tidak Memberi Apapun',
        price: '0',
    },
]


// FOR TAB "UCAPAN SELAMAT" SELECTED
function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
}

const Ballroom = (props: { lang: any }) => {
    const [isClient, setIsClient] = useState(false);

    const [loading, setLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(true);

    const wedding = useSelector((state: RootState) => state.value.wedding);
    const guest = useSelector((state: RootState) => state.value.guest);
    const theme = useSelector((state: RootState) => state.value.theme);

    const router = useRouter();


    // HADIAH DIGITAL
    const [digitalGift, setDigitalGift] = useState(gifts[0])
    const mainGifts = gifts.slice(0, 4)
    // const [digitalGiftCustom, setDigitalGiftCustom] = useState('')
    // const handleGiftsChange = (gift: any) => {
    //     setDigitalGift(gift);
    //     if (digitalGiftCustom !== '') {
    //         // Update the selected plan's name when a radio option is checked
    //         gift.price = digitalGiftCustom;
    //     }
    // };

    const [continueBtn, setContinueBtn] = useState('buttonKoridor')
    const [backBtn, setBackBtn] = useState('')
    const [isBackButtonDisabled, setIsBackButtonDisabled] = useState(true);
    const [isContinueButtonDisabled, setIsContinueButtonDisabled] = useState(true);


    // UCAPAN SELAMAT
    const [ucapanSelamat, setUcapanSelamat] = useState('')
    // const ucapanSelamatModal = document.getElementById('ucapanSelamatModal') as HTMLDialogElement | null;

    // PREVIEW HANDLER
    const fileTypes = ["JPG", "JPEG", "PNG", "GIF", "TIFF", "PSD", "EPS", "AI", "RAW", "INDD", "MP4", "MOV", "AVI", "WMV", "AVCHD", "WebM", "FLV"];
    const [file, setFile] = useState<File | null>(null)
    const handleChange = (file: File) => {
        setFile(file);
    };
    // END UCAPAN SELAMAT


    const handleKonfirmasi = async (e: any) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('wedding_slug', wedding.wedding_slug);
        formData.append('guest_slug', guest.guest_slug);
        formData.append('ucapan', ucapanSelamat);
        if (file != null) {
            formData.append('ucapan_file', file!);
        }


        // Prevent multiple submissions
        if (loading) {
            return;
        }

        setLoading(true); // Set loading to true when the submission starts

        // KIRIM HADIAH & UCAPAN SELAMAT
        try {

            if (digitalGift != gifts[5]) {
                const postGift = await axios.post('https://panel.virtuwed.id/api/gift', {
                    wedding_slug: wedding.wedding_slug,
                    guest_slug: guest.guest_slug,
                    nama_hadiah: digitalGift.name,
                    nominal: digitalGift.price,
                });

                console.log(postGift.data);

            }

            if (ucapanSelamat != '' || file != null) {
                const postUcapanResepsiVirtual = await axios.post(
                    'https://panel.virtuwed.id/api/guest/ucapan/resepsi',
                    formData
                );
                setUcapanSelamat('')
                console.log(postUcapanResepsiVirtual.data);
            }

            setIsSuccess(true)
        } catch (error) {
            setIsSuccess(false)
            console.log(file);

            alert(error)
        } finally {
            setLoading(false); // Set loading to false when the submission is done, whether it succeeded or failed
        }
    };


    const item = {
        hidden: {
            y: "100%",
            transition: { ease: [0.455, 0.03, 0.515, 0.955] }
        },
        visible: {
            y: 0,
            transition: { ease: [0.455, 0.03, 0.515, 0.955], duration: 0.75 }
        }
    };

    useEffect(() => {
        setIsClient(true);
    }, []);

    useEffect(() => {
        AOS.init(); // Initialize AOS

        return () => {
            AOS.refresh(); // Clean up AOS on component unmount
        };
    }, []);

    useEffect(() => {
        if (isClient) {
            const tweeningDelay = 300, typeStartDelay = 1000, typeSpeed = 50;

            // NAVIGATION BUTTON
            // backBtn
            const buttonSpawnPoint = document.getElementById('buttonSpawnPoint');
            const buttonBackToUcapanSelamat = document.getElementById('buttonBackToUcapanSelamat');
            const buttonBackToDigitalGift = document.getElementById('buttonBackToDigitalGift');

            // continueBtn
            const buttonKoridor = document.getElementById('buttonKoridor');
            const buttonPelaminanModalOpen = document.getElementById('buttonPelaminanModalOpen')
            const buttonKonfirmasiModalOpen = document.getElementById('buttonKonfirmasiModalOpen')

            // exploreBtn
            const exploreBtn = document.getElementById('exploreBtn')
            // END OF NAVIGATION BUTTON

            const opening = document.getElementById('opening');
            const birthdayCard = document.getElementById('birthdayCard');
            const cardFront = document.getElementById('cardFront');


            const openingTouch = document.getElementById('openingTouch');
            const ballroom = document.getElementById('ballroom');


            //infospot information mempelai
            const koridorInfoModal = document.getElementById('koridorInfoModal')
            const koridorInfoCloseButton = document.getElementById('koridorInfoCloseButton')

            const ucapanSelamatContainer = document.getElementById('ucapanSelamatContainer')
            const videocallPlaceholder = document.getElementById('videocallPlaceholder')

            const livestreamContainer = document.getElementById('livestreamContainer');
            const konfirmasiContainer = document.getElementById('konfirmasiContainer');
            const digitalGiftContainer = document.getElementById('digitalGiftContainer');
            const ucapanEnding = document.getElementById('ucapanEnding');

            const digitalGiftButton = document.getElementById('digitalGiftButton');
            const livestreamButton = document.getElementById('livestreamButton');
            const konfirmasiButton = document.getElementById('konfirmasiButton');
            const ucapanEndingButton = document.getElementById('ucapanEndingButton');
            const buttonPelaminan = document.getElementById('buttonPelaminan');
            const buttonChangeDigitalGift = document.getElementById('buttonChangeDigitalGift');
            const buttonChangeUcapanSelamat = document.getElementById('buttonChangeUcapanSelamat');



            const digitalGiftCloseButton = document.getElementById('digitalGiftCloseButton');
            const konfirmasiCloseButton = document.getElementById('konfirmasiCloseButton');


            const ucapanSelamatCloseButton = document.getElementById('ucapanSelamatCloseButton');
            const videocallCloseButton = document.getElementById('videocallCloseButton');

            let directLocation: any;



            // BACK BTN FUNCTION
            buttonSpawnPoint?.addEventListener('click', function () {
                setIsBackButtonDisabled(true)
                setIsContinueButtonDisabled(false)


                // MODAL PRESENCE HANDLING
                if (ucapanSelamatContainer && !ucapanSelamatContainer.classList.contains('hidden')) {
                    // Add the 'hidden' class
                    ucapanSelamatContainer?.classList.add('hidden');
                }

                // UNACTIVE BTN
                buttonPelaminanModalOpen?.classList.toggle('hidden')
                buttonPelaminanModalOpen?.classList.toggle('flex')

                // ACTIVE BTN
                buttonKoridor?.classList.toggle('hidden')
                buttonKoridor?.classList.toggle('flex')

                viewer.setPanorama(koridor);
                // viewer.tweenControlCenter(new THREE.Vector3(5000, 0, 0), 0);
                // viewer.OrbitControls.enabled = true;
            })

            buttonBackToUcapanSelamat?.addEventListener('click', function () {
                delayExecute(ucapkanSelamatInfospot.focus.bind(ucapkanSelamatInfospot), tweeningDelay);
                // viewer.tweenControlCenter(new THREE.Vector3(4787.98, 1426.00, 16.95), 0);
                viewer.OrbitControls.enabled = true;
                setIsBackButtonDisabled(true)

                // UNACTIVE CONTINUE BTN
                buttonKonfirmasiModalOpen?.classList.toggle('hidden')
                buttonKonfirmasiModalOpen?.classList.toggle('flex')

                // ACTIVATION CONTINUE BTN
                buttonPelaminanModalOpen?.classList.toggle('hidden')
                buttonPelaminanModalOpen?.classList.toggle('flex')

                // UNACTIVE BACK BTN
                buttonBackToUcapanSelamat?.classList.toggle('hidden')
                buttonBackToUcapanSelamat?.classList.toggle('flex')

                // ACTIVATION BACK BTN
                buttonSpawnPoint?.classList.toggle('hidden')
                buttonSpawnPoint?.classList.toggle('flex')

                setTimeout(function () {
                    setIsContinueButtonDisabled(false)
                    setIsBackButtonDisabled(false)
                    ucapanSelamatContainer?.classList.toggle('hidden');
                }, 2000);
            })

            buttonBackToDigitalGift?.addEventListener('click', function () {
                console.log('buttonBackToDigitalGift clicked');

                setIsBackButtonDisabled(true)
                viewer.setPanorama(directLocation)
                delayExecute(berikanHadiahInfospot.focus.bind(berikanHadiahInfospot), tweeningDelay);
                viewer.OrbitControls.enabled = false;
                setTimeout(function () {
                    setIsBackButtonDisabled(false)
                    digitalGiftContainer?.classList.toggle('hidden');
                }, 2000);

                // MODAL PRESENCE HANDLING
                if (konfirmasiContainer && !konfirmasiContainer.classList.contains('hidden')) {
                    // Add the 'hidden' class
                    konfirmasiContainer?.classList.add('hidden');
                }

                // UNACTIVE BACK BTN
                buttonBackToDigitalGift?.classList.toggle('hidden')
                buttonBackToDigitalGift?.classList.toggle('flex')

                // ACTIVE BACK BTN
                buttonBackToUcapanSelamat?.classList.toggle('hidden')
                buttonBackToUcapanSelamat?.classList.toggle('flex')

                // UNACTIVE CONTINUE BTN
                buttonKonfirmasiModalOpen?.classList.toggle('hidden')
                buttonKonfirmasiModalOpen?.classList.toggle('flex')

                // ACTIVE CONTINUE BTN
                setIsContinueButtonDisabled(true)
                buttonKonfirmasiModalOpen?.classList.toggle('hidden')
                buttonKonfirmasiModalOpen?.classList.toggle('flex')
            })

            // CONTINUE BTN FUNCTION
            buttonKoridor?.addEventListener('click', function () {
                viewer.setPanorama(directLocation)
                viewer.tweenControlCenter(new THREE.Vector3(5000, 0, 0), 0);
                viewer.OrbitControls.enabled = false;

                setIsContinueButtonDisabled(true)
                buttonKoridor?.classList.toggle('hidden')
                buttonKoridor?.classList.toggle('flex')
                // setContinueBtn('buttonPelaminanModalOpen')

                // ACTIVATE CONTINUE BTN
                buttonPelaminanModalOpen?.classList.toggle('hidden')
                buttonPelaminanModalOpen?.classList.toggle('flex')

                // ACTIVATE BACK BTN
                // buttonSpawnPoint?.classList.toggle('')


                setTimeout(function () {
                    setIsBackButtonDisabled(false)
                    setIsContinueButtonDisabled(false)
                    ucapanSelamatContainer?.classList.toggle('hidden');
                }, 3000);
            });

            buttonPelaminanModalOpen?.addEventListener('click', function () {
                const ucapanSelamatModal = document.getElementById('ucapanSelamatModal') as HTMLDialogElement | null;
                if (ucapanSelamatModal) {
                    ucapanSelamatModal.showModal();
                }
            });

            buttonKonfirmasiModalOpen?.addEventListener('click', function () {
                // NAVIGATION BUTTON PURPOSE
                setIsContinueButtonDisabled(true)
                setIsBackButtonDisabled(true)
                exploreBtn?.classList.toggle('hidden');
                exploreBtn?.classList.toggle('grid');
                // END OF NAVIGATION BUTTON PURPOSE

                // keluarRuanganInfospot.hide()
                // lihatRuanganInfospot.hide()
                konfirmasiContainer?.classList.toggle('hidden');
                delayExecute(keluarRuanganInfospot.focus.bind(ucapanEndingInfospot), tweeningDelay);
                setTimeout(function () {
                    ucapanEnding?.classList.toggle('hidden');
                }, 1500);
            });

            // EXPLORE BTN FUNCTION
            exploreBtn?.addEventListener('click', function () {
                viewer.setPanorama(koridor);
                koridor.add(infospotBack);
                front.add(infospotMid2);
                back.add(infospotKoridor, infospotFront);
            })



            // CONTAINER CLOSE BTN
            ucapanSelamatCloseButton?.addEventListener('click', function () {
                ucapanSelamatContainer?.classList.toggle('hidden');
                setIsContinueButtonDisabled(true)
                berikanHadiahInfospot.hide(0)
                viewer.OrbitControls.enabled = true;
            });

            digitalGiftCloseButton?.addEventListener('click', function () {
                digitalGiftContainer?.classList.toggle('hidden');
            });

            konfirmasiCloseButton?.addEventListener('click', function () {
                konfirmasiContainer?.classList.toggle('hidden')
                setIsContinueButtonDisabled(true)
            })

            videocallCloseButton?.addEventListener('click', function () {
                videocallPlaceholder?.classList.toggle('hidden')
            })
            // END OF CONTAINER CLOSE BTN

            buttonPelaminan?.addEventListener('click', function () {
                ucapanSelamatContainer?.classList.toggle('hidden')
                berikanHadiahInfospot.show(0)
                // setContinueBtn('buttonKonfirmasiModalOpen')

                setIsContinueButtonDisabled(true)
                setIsBackButtonDisabled(true)

                // UNACTIVE CONTINUE BTN
                buttonPelaminanModalOpen?.classList.toggle('hidden')
                buttonPelaminanModalOpen?.classList.toggle('flex')

                // ACTIVATE CONTINUE BTN
                buttonKonfirmasiModalOpen?.classList.toggle('hidden')
                buttonKonfirmasiModalOpen?.classList.toggle('flex')

                // UNACTIVE BACK BTN
                buttonSpawnPoint?.classList.toggle('hidden')
                buttonSpawnPoint?.classList.toggle('flex')

                // ACTIVATE BACK BTN
                buttonBackToUcapanSelamat?.classList.toggle('hidden')
                buttonBackToUcapanSelamat?.classList.toggle('flex')


                delayExecute(berikanHadiahInfospot.focus.bind(berikanHadiahInfospot), tweeningDelay);
                viewer.OrbitControls.enabled = false;
                setTimeout(function () {
                    setIsBackButtonDisabled(false)
                    digitalGiftContainer?.classList.toggle('hidden');
                }, 2000);

            });

            digitalGiftButton?.addEventListener('click', function () {
                digitalGiftContainer?.classList.toggle('hidden');
                delayExecute(mejaKonfirmasiPOVInfospot.focus.bind(mejaKonfirmasiPOVInfospot), tweeningDelay);

                //UNACTIVE BACK BTN
                buttonBackToUcapanSelamat?.classList.toggle('hidden')
                buttonBackToUcapanSelamat?.classList.toggle('flex')

                //ACTIVATE BACK BTN 
                buttonBackToDigitalGift?.classList.toggle('hidden')
                buttonBackToDigitalGift?.classList.toggle('flex')
                setIsBackButtonDisabled(true)

                setTimeout(function () {
                    viewer.setPanorama(back);
                    viewer.tweenControlCenter(new THREE.Vector3(-5000, 0, 0), 0);
                    setTimeout(function () {
                        delayExecute(checkOutInfospot.focus.bind(checkOutInfospot), tweeningDelay);
                        // viewer.tweenControlCenter(new THREE.Vector3(-116.83, 138.59, -4988.43), 0);
                    }, 1000);
                    setTimeout(function () {
                        konfirmasiContainer?.classList.toggle('hidden');
                        setIsBackButtonDisabled(false)
                        setIsContinueButtonDisabled(false)
                    }, 3000);
                }, 1500);

            });

            konfirmasiButton?.addEventListener('click', function () {
                // NAVIGATION BUTTON PURPOSE
                setIsContinueButtonDisabled(true)
                setIsBackButtonDisabled(true)
                exploreBtn?.classList.toggle('hidden');
                exploreBtn?.classList.toggle('grid');
                // END OF NAVIGATION BUTTON PURPOSE

                keluarRuanganInfospot.hide()
                lihatRuanganInfospot.hide()
                konfirmasiContainer?.classList.toggle('hidden');
                delayExecute(keluarRuanganInfospot.focus.bind(ucapanEndingInfospot), tweeningDelay);
                setTimeout(function () {
                    ucapanEnding?.classList.toggle('hidden');
                }, 1500);
                // type(endingText.ending, functi   on () { viewer.OrbitControls.enabled = true; });
            });

            livestreamButton?.addEventListener('click', function () {

                livestreamContainer?.classList.toggle('hidden');
            });

            ucapanEndingButton?.addEventListener('click', function () {
                ucapanEnding?.classList.toggle('hidden');
                viewer.OrbitControls.enabled = true;
                keluarRuanganInfospot.show()
                lihatRuanganInfospot.show()
            });

            buttonChangeDigitalGift?.addEventListener('click', function () {
                setIsBackButtonDisabled(true)
                viewer.setPanorama(directLocation)
                delayExecute(berikanHadiahInfospot.focus.bind(berikanHadiahInfospot), tweeningDelay);
                viewer.OrbitControls.enabled = false;
                setTimeout(function () {
                    setIsBackButtonDisabled(false)
                    digitalGiftContainer?.classList.toggle('hidden');
                }, 2000);

                // MODAL PRESENCE HANDLING
                if (konfirmasiContainer && !konfirmasiContainer.classList.contains('hidden')) {
                    // Add the 'hidden' class
                    konfirmasiContainer?.classList.add('hidden');
                }

                // UNACTIVE BACK BTN
                buttonBackToDigitalGift?.classList.toggle('hidden')
                buttonBackToDigitalGift?.classList.toggle('flex')

                // ACTIVE BACK BTN
                buttonBackToUcapanSelamat?.classList.toggle('hidden')
                buttonBackToUcapanSelamat?.classList.toggle('flex')

                // UNACTIVE CONTINUE BTN
                buttonKonfirmasiModalOpen?.classList.toggle('hidden')
                buttonKonfirmasiModalOpen?.classList.toggle('flex')

                // ACTIVE CONTINUE BTN
                setIsContinueButtonDisabled(true)
                buttonKonfirmasiModalOpen?.classList.toggle('hidden')
                buttonKonfirmasiModalOpen?.classList.toggle('flex')
            });

            buttonChangeUcapanSelamat?.addEventListener('click', function () {
                viewer.setPanorama(directLocation)
                viewer.tweenControlCenter(new THREE.Vector3(4787.98, 1426.00, 16.95), 0);
                // viewer.tweenControlCenter(new THREE.Vector3(4787.98, 1426.00, 16.95), 0);
                viewer.OrbitControls.enabled = false;
                setIsBackButtonDisabled(true)
                setIsContinueButtonDisabled(true)


                // MODAL PRESENCE HANDLING
                if (konfirmasiContainer && !konfirmasiContainer.classList.contains('hidden')) {
                    // Add the 'hidden' class
                    konfirmasiContainer?.classList.add('hidden');
                }

                // UNACTIVE CONTINUE BTN
                buttonKonfirmasiModalOpen?.classList.toggle('hidden')
                buttonKonfirmasiModalOpen?.classList.toggle('flex')

                // ACTIVATION CONTINUE BTN
                buttonPelaminanModalOpen?.classList.toggle('hidden')
                buttonPelaminanModalOpen?.classList.toggle('flex')

                // UNACTIVE BACK BTN
                buttonBackToUcapanSelamat?.classList.toggle('hidden')
                buttonBackToUcapanSelamat?.classList.toggle('flex')
                buttonBackToUcapanSelamat?.classList.toggle('hidden')
                buttonBackToUcapanSelamat?.classList.toggle('flex')
                buttonBackToDigitalGift?.classList.toggle('hidden')
                buttonBackToDigitalGift?.classList.toggle('flex')



                // // ACTIVATION BACK BTN
                buttonSpawnPoint?.classList.toggle('hidden')
                buttonSpawnPoint?.classList.toggle('flex')

                setTimeout(function () {
                    setIsContinueButtonDisabled(false)
                    setIsBackButtonDisabled(false)
                    ucapanSelamatContainer?.classList.toggle('hidden');
                }, 2000);
            });

            let pov = 'daridepan'
            const PANOLENS = require('panolens'); // Use require for server-side compatibility
            const lookAtPositions = [
                new THREE.Vector3(5000, 0, 0), //depan
                new THREE.Vector3(5000, 0, 0), //mid
                new THREE.Vector3(-5000, 0, 0) //koridor
            ];

            // PARAGRAPH ================================================================================================================
            const koridorText = {

                welcome: ['Welcome', 'Profil Mempelai dan Galeri'],
                koridorKiri: ['Memperlihatkan momen prewed', 'dari kedua orang mempelai'],
                koridorKanan: ['Galeri Mempelai', 'Dari pasangan Rifqi dan Alysha'],
            };

            const frontText = {

                pelaminan: ['Ini tempat pilihan button', 'Tamu dapat video call atau livestream'],
                hadiahDigital: ['Tamu dapat memberikan hadiah digital', 'Mempelai akan sangat menghargai segala bentuk hadiah'],
            };

            const endingText = {

                ending: ['Terima kasih telah mengunjungi resepsi', 'Kami sangat menghargai anda'],
            };

            // ============================================================================================================================
            // Patch for typed.js of cutting back-to-back words
            for (const section in koridorText) {
                if (koridorText.hasOwnProperty(section)) {

                    koridorText[section as keyof typeof koridorText].unshift('');
                    koridorText[section as keyof typeof koridorText].push('');

                }
            }
            // Patch for typed.js of cutting back-to-back words
            for (const section in frontText) {
                if (frontText.hasOwnProperty(section)) {

                    frontText[section as keyof typeof frontText].unshift('');
                    frontText[section as keyof typeof frontText].push('');

                }
            }

            // Patch for typed.js of cutting back-to-back words
            for (const section in endingText) {
                if (endingText.hasOwnProperty(section)) {

                    endingText[section as keyof typeof endingText].unshift('');
                    endingText[section as keyof typeof endingText].push('');

                }
            }

            // const viewer = new PANOLENS.Viewer({ container: document.getElementById('ballroom'), enableReticle: false, output: 'console', viewIndicator: true });
            const viewer = new PANOLENS.Viewer({ container: document.getElementById('ballroom'), enableReticle: false, output: 'console', controlBar: false, autoRotate: false, autoHideInfospot: false });
            viewer.OrbitControls.enabled = false;
            viewer.camera.fov = 70; // Adjust the FOV value as needed
            viewer.camera.updateProjectionMatrix();
            if (window.innerWidth < 768) {
                viewer.camera.fov = 100; // Adjust the FOV value as needed
                viewer.camera.updateProjectionMatrix();
            }

            //ASSET SETUP 
            const back = new PANOLENS.ImagePanorama('/assets/ballroom/Back.webp');
            // back.addEventListener('enter-fade-start', function () {
            //     pov == 'daridepan' ?
            //         viewer.tweenControlCenter(lookAtPositions[1], 0)
            //         :
            //         viewer.tweenControlCenter(lookAtPositions[2], 0)

            // });

            const front = new PANOLENS.ImagePanorama('/assets/ballroom/Front.webp');
            // front.addEventListener('enter-fade-start', function () {
            //     viewer.tweenControlCenter(lookAtPositions[0], 0);
            // });

            const koridor = new PANOLENS.ImagePanorama('/assets/ballroom/Koridor.webp');
            koridor.addEventListener('enter-fade-start', function () {
                viewer.tweenControlCenter(lookAtPositions[1], 0);
            });


            // LINKING SETUP


            const infospotMid2 = new PANOLENS.Infospot(300, PANOLENS.DataImage.Info);
            infospotMid2.position.set(-5000, 0, 0);
            infospotMid2.addHoverText("back");

            infospotMid2.addEventListener('click', function () {
                viewer.setPanorama(back);
                pov = 'daribelakang'
            });

            const infospotFront = new PANOLENS.Infospot(300, PANOLENS.DataImage.Info);
            infospotFront.position.set(4997.37, -25.68, 30.91);
            infospotFront.addHoverText("front");

            infospotFront.addEventListener('click', function () {
                viewer.setPanorama(front);
            });


            const infospotBack = new PANOLENS.Infospot(300, PANOLENS.DataImage.Info);
            infospotBack.position.set(5000, 0, 0);
            infospotBack.addHoverText("back");

            infospotBack.addEventListener('click', function () {
                viewer.setPanorama(back);
                pov = 'daridepan'
            });

            const infospotKoridor = new PANOLENS.Infospot(300, PANOLENS.DataImage.Info);
            infospotKoridor.position.set(-5000, 0, 0);
            infospotKoridor.addHoverText("koridor");

            infospotKoridor.addEventListener('click', function () {
                viewer.setPanorama(koridor);
            });


            // ===========================================================================================================================
            const delayExecute = (func: any, delay: any) => {

                setTimeout(func, delay);

            }

            const onLoad = () => {
                viewer.tweenControlCenter(new THREE.Vector3(5000, 0, 0), 0);
                viewer.OrbitControls.enabled = true;
                directLocation = front

                setTimeout(function () {
                    birthdayCard?.classList.toggle('birthdayCard');
                    birthdayCard?.classList.toggle('titleGuestBook');
                    cardFront?.classList.toggle('cardFront');
                }, 1000);

                setTimeout(function () {
                    opening?.classList.toggle('opacity-100');
                    opening?.classList.toggle('opacity-0');
                    openingTouch?.classList.toggle('hidden');
                    ballroom?.classList.toggle('saturate-0');
                }, 4000);
                setTimeout(function () {
                    opening?.classList.toggle('hidden');
                }, 4500);
                setTimeout(function () {
                    openingTouch?.classList.toggle('hidden');
                    setIsContinueButtonDisabled(false)
                    // onWelcomeComplete()
                }, 6000);

            }

            const onLoadFront = () => {
                // buttonKoridor?.classList.toggle('hidden');
                setContinueBtn('buttonPelaminan');
                viewer.tweenControlCenter(new THREE.Vector3(4787.98, 1426.00, 16.95), 0);
                // type(frontText.pelaminan, function () { buttonPelaminan?.classList.toggle('hidden'); viewer.OrbitControls.enabled = true; }, 2000);
                // buttonPelaminan?.classList.toggle('hidden');
                // viewer.OrbitControls.enabled = false;
            }

            const onLoadBack = () => {
                viewer.tweenControlCenter(new THREE.Vector3(-5000, 0, 0), 0);
                setTimeout(function () {
                    delayExecute(checkOutInfospot.focus.bind(checkOutInfospot), tweeningDelay);
                    // viewer.tweenControlCenter(new THREE.Vector3(-116.83, 138.59, -4988.43), 0);
                }, 1000);
                // setTimeout(function () {
                //     konfirmasiContainer?.classList.toggle('hidden');
                // }, 2000);
            }


            // ===========================================================================================================================
            const onWelcomeComplete = () => {

                delayExecute(koridorKiriInfospot1.focus.bind(koridorKiriInfospot1), tweeningDelay);
                type(koridorText.koridorKiri, onKoridorKananTourComplete);

            }

            const onKoridorKananTourComplete = () => {

                delayExecute(koridorKananInfospot1.focus.bind(koridorKananInfospot1), tweeningDelay);
                type(koridorText.koridorKanan, function () { buttonKoridor?.classList.toggle('hidden'); viewer.OrbitControls.enabled = true; directLocation = front });

            }

            // ===========================================================================================================================
            const type = (stringArray: any, onComplete: any, startDelay?: any) => {

                onComplete = onComplete || function () { };
                startDelay = startDelay >= 0 ? startDelay : typeStartDelay;

                const typed = new Typed("#typed", {

                    strings: stringArray,
                    typeSpeed: typeSpeed,
                    showCursor: false,
                    startDelay: startDelay,
                    onComplete: onComplete

                });

            }


            // INFOSPOT
            // KORIDOR INFOSPOTS
            const koridorKiriInfospot1 = new PANOLENS.Infospot(300, '/assets/ballroom/button/infoPengantin/buttonClickHere1.png');
            const koridorKiriInfospot2 = new PANOLENS.Infospot(300, '/assets/ballroom/button/infoPengantin/buttonClickHere2.png');
            const koridorKiriInfospot3 = new PANOLENS.Infospot(300, '/assets/ballroom/button/infoPengantin/buttonClickHere3.png');
            const koridorKiriInfospot4 = new PANOLENS.Infospot(300, '/assets/ballroom/button/infoPengantin/buttonClickHere4.png');
            const koridorKiriInfospot5 = new PANOLENS.Infospot(300, '/assets/ballroom/button/infoPengantin/buttonClickHere5.png');
            const koridorKiriInfospot6 = new PANOLENS.Infospot(300, '/assets/ballroom/button/infoPengantin/buttonClickHere6.png');
            const koridorKiriInfospot7 = new PANOLENS.Infospot(300, '/assets/ballroom/button/infoPengantin/buttonClickHere7.png');

            const koridorKananInfospot1 = new PANOLENS.Infospot(300, '/assets/ballroom/button/infoPengantin/buttonClickHere8.png');
            const koridorKananInfospot2 = new PANOLENS.Infospot(300, '/assets/ballroom/button/infoPengantin/buttonClickHere9.png');
            const koridorKananInfospot3 = new PANOLENS.Infospot(300, '/assets/ballroom/button/infoPengantin/buttonClickHere10.png');
            const koridorKananInfospot4 = new PANOLENS.Infospot(300, '/assets/ballroom/button/infoPengantin/buttonClickHere11.png');
            const koridorKananInfospot5 = new PANOLENS.Infospot(300, '/assets/ballroom/button/infoPengantin/buttonClickHere12.png');
            const koridorKananInfospot6 = new PANOLENS.Infospot(300, '/assets/ballroom/button/infoPengantin/buttonClickHere13.png');
            const koridorKananInfospot7 = new PANOLENS.Infospot(300, '/assets/ballroom/button/infoPengantin/buttonClickHere14.png');

            // FRONT INFOSPOTS
            const berikanHadiahInfospot = new PANOLENS.Infospot(900, '/assets/ballroom/button/berikanHadiah.webp');
            const videocallInfospot = new PANOLENS.Infospot(900, '/assets/ballroom/button/buttonVideocall.png');
            const ucapkanSelamatInfospot = new PANOLENS.Infospot(900, '/assets/ballroom/button/ucapkanSelamat.webp');
            const mejaKonfirmasiPOVInfospot = new PANOLENS.Infospot(10e-7);

            //   BACK INFOSPOTS
            const keluarRuanganInfospot = new PANOLENS.Infospot(900, '/assets/ballroom/button/buttonKeluarResepsi.webp');
            const lihatRuanganInfospot = new PANOLENS.Infospot(900, '/assets/ballroom/button/buttonLihatKenanganVirtual.webp');
            const checkOutInfospot = new PANOLENS.Infospot(900, '/assets/ballroom/button/checkOut.webp');
            const ucapanEndingInfospot = new PANOLENS.Infospot(10e-7);  // Make it not visible


            // KORIDOR
            koridorKiriInfospot1.position.set(2043.70, 746.88, 4498.31);
            koridorKiriInfospot2.position.set(3172.16, 1720.86, 3452.03);
            koridorKiriInfospot3.position.set(3362.12, 224.59, 3686.79);
            koridorKiriInfospot4.position.set(4031.07, 460.70, 2917.41);
            koridorKiriInfospot5.position.set(3000.74, -1070.31, 3842.28);
            koridorKiriInfospot6.position.set(3790.04, -859.98, 3131.63);
            koridorKiriInfospot7.position.set(4628.98, -597.37, 1763.53);

            koridorKiriInfospot1.addHoverElement(document.getElementById('profilPengantinPria'), 140);
            koridorKiriInfospot2.addEventListener('click', function () {
                koridorInfoModal?.classList.toggle('hidden');
            });
            koridorKiriInfospot3.addEventListener('click', function () {
                koridorInfoModal?.classList.toggle('hidden');
            });
            koridorKiriInfospot4.addEventListener('click', function () {
                koridorInfoModal?.classList.toggle('hidden');
            });
            koridorKiriInfospot5.addEventListener('click', function () {
                koridorInfoModal?.classList.toggle('hidden');
            });
            koridorKiriInfospot6.addEventListener('click', function () {
                koridorInfoModal?.classList.toggle('hidden');
            });
            koridorKiriInfospot7.addEventListener('click', function () {
                koridorInfoModal?.classList.toggle('hidden');
            });

            koridorKananInfospot1.position.set(2118.57, 746.00, -4460.28);
            koridorKananInfospot2.position.set(3227.22, 1656.68, -3430.40);
            koridorKananInfospot3.position.set(3411.02, 217.04, -3638.31);
            koridorKananInfospot4.position.set(4043.97, 341.52, -2916.04);
            koridorKananInfospot5.position.set(3036.09, -1019.84, -3826.56);
            koridorKananInfospot6.position.set(3795.00, -846.81, -3129.67);
            koridorKananInfospot7.position.set(4638.36, -566.64, -1749.23);


            koridorKananInfospot1.addHoverElement(document.getElementById('profilPengantinWanita'), 140);
            koridorKananInfospot2.addEventListener('click', function () {
                koridorInfoModal?.classList.toggle('hidden');
            });
            koridorKananInfospot3.addEventListener('click', function () {
                koridorInfoModal?.classList.toggle('hidden');
            });
            koridorKananInfospot4.addEventListener('click', function () {
                koridorInfoModal?.classList.toggle('hidden');
            });
            koridorKananInfospot5.addEventListener('click', function () {
                koridorInfoModal?.classList.toggle('hidden');
            });
            koridorKananInfospot6.addEventListener('click', function () {
                koridorInfoModal?.classList.toggle('hidden');
            });
            koridorKananInfospot7.addEventListener('click', function () {
                koridorInfoModal?.classList.toggle('hidden');
            });

            koridorInfoCloseButton?.addEventListener('click', function () {
                koridorInfoModal?.classList.toggle('hidden')
            });

            // FRONT
            berikanHadiahInfospot.position.set(133.47, -678.04, -4943.77);
            // berikanHadiahInfospot.addHoverText('Kasih Hadiah Digital disini', 50);
            berikanHadiahInfospot.addEventListener('click', function () {
                digitalGiftContainer?.classList.toggle('hidden');
            });

            videocallInfospot.position.set(4501.65, 2168.44, -3.57);
            videocallInfospot.addEventListener('click', function () {
                videocallPlaceholder?.classList.toggle('hidden');
            });


            ucapkanSelamatInfospot.position.set(4957.06, 623.64, -2.76);
            ucapkanSelamatInfospot.addEventListener('click', function () {
                ucapanSelamatContainer?.classList.toggle('hidden');
                setIsContinueButtonDisabled(false)
            });

            mejaKonfirmasiPOVInfospot.position.set(-4995.67, 107.19, -2.18);

            // BACK
            checkOutInfospot.position.set(17.44, -603.27, -4958.70);
            checkOutInfospot.addEventListener('click', function () {
                konfirmasiContainer?.classList.toggle('hidden');
                setIsContinueButtonDisabled(false)
            });

            ucapanEndingInfospot.position.set(-4829.37, 1281.33, 5.80);

            keluarRuanganInfospot.position.set(-4946.40, 713.02, -4.30);
            keluarRuanganInfospot.addEventListener('click', function () {

                // Use the router to navigate without a page reload
                router.push(`/${props.lang}/${wedding.wedding_slug}/${guest.guest_slug}/`);
            });


            lihatRuanganInfospot.position.set(-5000.00, 1811.57, 10.79);
            lihatRuanganInfospot.addEventListener('click', function () {
                // viewer.setPanorama(koridor);
                // koridor.add(infospotBack);
                // front.add(infospotMid2);
                // back.add(infospotKoridor, infospotFront);
                // window.location.href = `/${wedding.wedding_slug}/${guest.guest_slug}/kenanganvirtual`;
                // redirect('/' + wedding.wedding_slug + '/' + guest.guest_slug + '/kenanganvirtual')
                // return redirect('/register-guest')
                const newUrl = `/${props.lang}/${wedding.wedding_slug}/${guest.guest_slug}/menu/kenanganvirtual?place=panoScenes[0]`;

                // Use the router to navigate without a page reload
                router.push(newUrl);
            });


            koridor.addEventListener('load', onLoad);
            koridor.add(
                koridorKiriInfospot1,
                koridorKiriInfospot2,
                koridorKiriInfospot3,
                koridorKiriInfospot4,
                koridorKiriInfospot5,
                koridorKiriInfospot6,
                koridorKiriInfospot7,

                koridorKananInfospot1,
                koridorKananInfospot2,
                koridorKananInfospot3,
                koridorKananInfospot4,
                koridorKananInfospot5,
                koridorKananInfospot6,
                koridorKananInfospot7,
            );

            front.addEventListener('load', onLoadFront);
            // front.add(berikanHadiahInfospot, ucapkanSelamatInfospot, videocallInfospot, mejaKonfirmasiPOVInfospot);
            front.add(berikanHadiahInfospot, ucapkanSelamatInfospot, mejaKonfirmasiPOVInfospot, videocallInfospot);

            back.add(checkOutInfospot, ucapanEndingInfospot, keluarRuanganInfospot, lihatRuanganInfospot);
            // back.addEventListener('load', onLoadBack);


            viewer.add(koridor, front, back);
        }
    }, [isClient]);

    return (
        <>
            <section id='ballroom' className='saturate-0 transition-all duration-1000 delay-2000 w-full h-full relative z-0'>

                <div className='absolute top-1/2 w-full flex justify-center items-center p-5'>
                    <div id="typed" className='text-white text-2xl'></div>
                </div>

            </section>

            {/* OPENING */}
            <div id="opening" className='transition-opacity duration-500 opacity-100 absolute w-full h-full z-50'
                style={{
                    maxWidth: '100%',
                    maxHeight: '100%',
                    minWidth: '200px',
                    minHeight: '250px',
                    WebkitOverflowScrolling: 'touch',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)'
                }}>

                <div className="relative overflow-auto w-full h-full grid justify-items-center content-center p-6 ">

                    {/* GUEST BOOK */}
                    <div
                        id='birthdayCard'
                        style={{
                            transformStyle: 'preserve-3d',
                            transform: 'perspective(2500px)',
                            transition: '1s',
                        }}
                        className='relative w-64 h-96 cursor-pointer '>
                        <div
                            id='cardFront'
                            style={{
                                transformOrigin: 'left',
                                transition: '.6s',
                            }}
                            className='grid justify-center content-center relative bg-guestBookCover bg-contain bg-no-repeat bg-center w-full h-full overflow-hidden '>
                            <h2 className='text-White  titleGuestBook mb-28'>Guest Book</h2>
                        </div>

                        <div className='absolute bg-guestBookInsideRight bg-contain bg-center bg-no-repeat w-full h-full grid gap-6 justify-items-center content-start pb-6 pt-8 pl-6 pr-12 -z-10 left-0 top-0'>
                            <h3 className='text-N700'>Buku Tamu</h3>
                            {/* MAKS 11 ORANG */}
                            <ul className='grid gap-1 text-start w-full list-decimal list-inside text-N700'>
                                <li className='p1-r font-deAetna'>Mugia Choir</li>
                                <li className='p1-r font-deAetna'>Elang Fajar Buana</li>
                                <li className='p1-r font-deAetna'>Zuhdan Nur Ihsan I</li>
                                <li className='p1-r font-deAetna'>Hasnat</li>
                            </ul>
                        </div>

                    </div>


                </div>
            </div>


            {/* OPENING-TOUCH */}
            <div id="openingTouch" className='hidden pointer-events-none absolute w-full h-full z-40'
                style={{
                    maxWidth: '400px',
                    maxHeight: '300px',
                    minWidth: '200px',
                    minHeight: '250px',
                    WebkitOverflowScrolling: 'touch',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)'
                }}>

                <div className="relative overflow-auto w-full h-full grid text-center justify-items-center content-center p-6 ">

                    <Icon icon="carbon:touch-1-filled" color="white" fontSize={128} className='animate-pulse animate-wiper' />
                    <h4 className='font-deAetna text-xl text-white lg:text-2xl'>Geser untuk menggunakan<br />resepsi virtual</h4>
                </div>
            </div>

            {/* PROFIL PRIA */}
            <div id="profilPengantinPria" className='w-full rounded-lg overflow-y-auto px-4 z-10 hidden'
                style={{
                    maxWidth: '500px',
                    maxHeight: '400px',
                    minWidth: '200px',
                    minHeight: 'fit-content',
                    WebkitOverflowScrolling: 'touch',
                }}>

                <div className="bg-gray-100 rounded-lg overflow-auto w-full flex items-start gap-6 p-6 ">
                    <Image
                        src="/assets/undanganDigital/pengantinPria.jpg"
                        alt="Profil Pria"
                        className="w-16 h-16 rounded-full z-50 bg-white"
                        width={220}
                        height={220}
                        priority
                    />

                    <div className='grid gap-4 w-full'>
                        <div>
                            {/* <h3 className='text-xl lg:text-2xl font-deAetna'>Alysha Karmina</h3> */}
                            <h3 className='text-xl lg:text-2xl font-deAetna'>Rifqi Sholeh Suman Syahas</h3>
                            <span className='font-light font-amiamie text-xs'>Mempelai Pria</span>
                        </div>
                        {/* <p className='font-light font-amiamie'>Putri dari Bapak Karmana dan Ibu Dedah Jubaedah</p> */}
                        <p className='font-light font-amiamie'>Putra dari Bapak Syabar Hidayat dan Ibu Euis Siti Hasanah</p>
                        <a href="https://www.instagram.com/rifqisholehh/" target='_blank'>
                            <div className='inline-flex gap-2 items-center py-2 px-4 bg-black rounded-md'>
                                <p className='text-white'>
                                    visit
                                </p>
                                <ArrowTopRightOnSquareIcon
                                    className="h-4 w-4 text-white"
                                />
                            </div>
                        </a>
                    </div>
                </div>
            </div>

            {/* PROFIL WANITA */}
            <div id="profilPengantinWanita" className='w-full rounded-lg overflow-y-auto px-4 z-10 hidden'
                style={{
                    maxWidth: '500px',
                    maxHeight: '400px',
                    minWidth: '200px',
                    minHeight: 'fit-content',
                    WebkitOverflowScrolling: 'touch',
                }}>

                <div className="bg-gray-100 rounded-lg overflow-auto w-full flex items-start gap-6 p-6 ">
                    <Image
                        src="/assets/undanganDigital/pengantinWanita.jpg"
                        alt="Profil Wanita"
                        className="w-16 h-16 rounded-full z-50 bg-white"
                        width={220}
                        height={220}
                        priority
                    />

                    <div className='grid gap-4'>
                        <div>
                            <h3 className='text-xl lg:text-2xl font-deAetna'>Alysha Karmina</h3>
                            <span className='font-light font-amiamie text-xs'>Mempelai Wanita</span>
                        </div>
                        <p className='font-light font-amiamie'>Putri dari Bapak Karmana dan Ibu Dedah Jubaedah</p>
                        <a href="https://www.instagram.com/alyshakarmina2009/" target='_blank'>
                            <div className='inline-flex gap-2 items-center py-2 px-4 bg-black rounded-md'>
                                <p className='text-white'>
                                    visit
                                </p>
                                <ArrowTopRightOnSquareIcon
                                    className="h-4 w-4 text-white"
                                />
                            </div>
                        </a>
                    </div>
                </div>
            </div>

            {/* KORIDOR INFOSPOT INFO */}
            <div id="koridorInfoModal" className='absolute w-full rounded-lg overflow-y-auto px-4 z-10 hidden'
                style={{
                    maxWidth: '500px',
                    maxHeight: '75%',
                    minWidth: '200px',
                    minHeight: '250px',
                    WebkitOverflowScrolling: 'touch',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)'
                }}
                data-aos-once="true"
                data-aos="zoom-in"
                data-aos-delay="300"
                data-aos-duration="1200"
            >

                <div className="text-black bg-gray-100 rounded-lg overflow-auto w-full grid gap-6 p-6 ">

                    <Image
                        src='/assets/undanganDigital/Prewed7.jpeg'
                        alt="Gift"
                        className="w-full h-36 object-cover rounded-md"
                        width={220}
                        height={220}
                        priority
                    />
                    <p className='font-light font-amiamie'>Two hearts intertwined, embarking on a journey of love. From strangers to soulmates, their paths converged, creating a story of laughter, tears, and everlasting devotion. Now, their destinies unite in the promise of forever.</p>
                    <button id='koridorInfoCloseButton' style={{ background: 'linear-gradient(313deg, #FFF -70%, #D1B0B0 100%)' }} className='pt-3 pb-2.5 px-6 text-white text-center font-amiamie inline-block rounded-lg hover:btn-shadow-primary transition-all ease-in-out duration-300'>Tutup</button>
                </div>
            </div >

            {/* BUTTON LINKING */}
            <div className='absolute bottom-3 px-2 min-w-full grid items-end justify-items-center z-20'>
                <div className='w-full max-w-[500px] h-fit bg-White flex items-center rounded-lg shadow-md px-1 py-3 font-amiamie'>
                    {/* BACK BUTTON */}
                    <button id='buttonSpawnPoint' disabled={isBackButtonDisabled} className='w-full text-center text-N800 py-2 flex justify-center items-center gap-1 disabled:text-N400'>
                        <i className="ri-arrow-left-s-line ri-xl"></i>
                        <p className='l4-r'>Kembali</p>
                    </button>
                    <button id='buttonBackToUcapanSelamat' disabled={isBackButtonDisabled} className='hidden w-full text-center text-N800 py-2 justify-center items-center gap-1 disabled:text-N400'>
                        <i className="ri-arrow-left-s-line ri-xl"></i>
                        <p className='l4-r'>Kembali</p>
                    </button>
                    <button id='buttonBackToDigitalGift' disabled={isBackButtonDisabled} className='hidden w-full text-center text-N800 py-2 justify-center items-center gap-1 disabled:text-N400'>
                        <i className="ri-arrow-left-s-line ri-xl"></i>
                        <p className='l4-r'>Kembali</p>
                    </button>

                    {/* EXPLORE BUTTON */}
                    {/* <button id='exploreBtn' className='hidden bg-secondary text-white h-full w-full text-center py-2 gap-2 justify-center items-center rounded'>
                        <i className="ri-compass-3-line ri-xl"></i>
                        <p className='l4-r'>Jelajahi Venue</p>
                    </button> */}

                    <button id='livestreamButton' className=' bg-secondary text-white h-full w-full text-center py-2 gap-2 justify-center items-center rounded'>
                        <i className="ri-live-line ri-xl"></i>
                        <p className='l4-r'>Livestream</p>
                    </button>

                    {/* CONTINUE BUTTON */}
                    <button id='buttonKoridor' disabled={isContinueButtonDisabled} className='w-full text-center text-N800 py-2 flex justify-center items-center gap-1 disabled:text-N400'>
                        <p className='l4-r'>Selanjutnya</p>
                        <i className="ri-arrow-right-s-line ri-xl"></i>
                    </button>
                    <button id='buttonPelaminanModalOpen' disabled={isContinueButtonDisabled} className='hidden w-full text-center text-N800 py-2 justify-center items-center gap-1 disabled:text-N400'>
                        <p className='l4-r'>Selanjutnya</p>
                        <i className="ri-arrow-right-s-line ri-xl"></i>
                    </button>
                    <button id='buttonKonfirmasiModalOpen' disabled={isContinueButtonDisabled} className='hidden w-full text-center text-N800 py-2 justify-center items-center gap-1 disabled:text-N400'>
                        <p className='l4-r'>Selanjutnya</p>
                        <i className="ri-arrow-right-s-line ri-xl"></i>
                    </button>
                    {/* <button id='buttonKoridor' className='hidden w-full text-primary font-amiamie text-center'>Menuju Pelaminan</button> */}
                </div>
            </div>

            {/* LIVESTREAM */}
            <div id='livestreamContainer'
                style={{
                    maxWidth: '100%',
                    maxHeight: '100%',
                    minWidth: '100%',
                    minHeight: '100%',
                    WebkitOverflowScrolling: 'touch',
                    top: '0',
                    bottom: '0',
                    left: '50%',
                    transform: 'translateX(-50%)'
                }}
                className='absolute w-full h-full z-30 hidden'>
                <div className='w-full h-full relative'>
                    {/* NAVBAR */}
                    <div className='bg-dark flex gap-x-2.5 justify-items-center justify-center items-center w-full h-14 fixed top-0 left-0 px-6'>
                        <button onClick={() => document.querySelector('#livestreamContainer')?.classList.toggle('hidden')} className='z-10 absolute left-6 flex justify-self-start'>
                            <i className="ri-arrow-left-s-line ri-xl text-white"></i>
                        </button>
                        <Image
                            src={'/assets/logopack/Virtuwed_Main_Logo_White.png'}
                            alt="Virtuwed Logo"
                            width={1887}
                            height={1003}
                            className='h-6 w-auto'
                        />
                        <div>
                            <h4 className='text-white'>Agy & Yoriko</h4>
                            <p className='l4-r text-white'>Akad Nikah</p>
                        </div>

                    </div>

                    <YouTubePlayer height={window.innerHeight} width={window.innerWidth} videoId={wedding.resepsi_virtual.wedding_live_streaming_link.query ? wedding.resepsi_virtual.wedding_live_streaming_link.query : "HqYhkpGgZXc"} />

                    {/* COMMENT & BUTTON GIFT */}
                    <div className='fixed b w-full bottom-0 left-0 bg-dark py-2.5 px-3 flex gap-x-2.5'>
                        <input type="text" placeholder="Type your comment..." className="input input-bordered w-full" />
                        <button onClick={() => document.querySelector('#digitalGiftContainer2')?.classList.toggle('hidden')} className='px-3'>
                            <Image
                                src={'/assets/ballroom/button/giftLivestream.svg'}
                                alt="Virtuwed Logo"
                                width={46}
                                height={46}
                                className='h-12 w-12'
                            />
                        </button>
                    </div>


                    < div id="digitalGiftContainer2" className='absolute w-full overflow-y-auto px-6 z-10 hidden'
                        style={{
                            maxWidth: '500px',
                            maxHeight: '100%',
                            minWidth: '200px',
                            minHeight: '250px',
                            WebkitOverflowScrolling: 'touch',
                            // top: '72px',
                            bottom: '80px',
                            left: '50%',
                            transform: 'translateX(-50%)'
                        }}>

                        {/* DIGITAL GIFT LIVESTREAM */}
                        <div className="text-center text-black bg-White w-full grid gap-3 px-3 py-4 rounded">
                            <div className='grid justify-end'>
                                <button onClick={() => document.querySelector('#digitalGiftContainer2')?.classList.toggle('hidden')} >
                                    <i className="ri-close-line ri-xl"></i>
                                </button>
                            </div>

                            <div className='grid justify-items-center text-center w-full max-w-[500px] mx-auto'>
                                <h3 className='capitalize text-N800'>berikan hadiah digital</h3>
                                <p className='p3-r text-N700 max-w-[285px]'>Hadiah digital hanya merupakan simbolis, pengantin akan menerima nominal dari hadiah yang anda berikan</p>
                            </div>

                            <div className='p-3 grid w-full max-w-[500px] mx-auto'>
                                <RadioGroup className='w-full grid gap-3' value={digitalGift} onChange={setDigitalGift}>
                                    <div className="grid grid-cols-4 gap-y-3 gap-x-1">
                                        {mainGifts.map((gift) => (
                                            <RadioGroup.Option
                                                key={gift.name}
                                                value={gift}
                                                style={{
                                                    background: `
                                        linear-gradient(357deg, #000 -23.05%, rgba(0, 0, 0, 0.00) 97.17%),
                                        url('${gift.img}') center/cover no-repeat`,
                                                }}
                                                className={({ active, checked }) =>
                                                    `${checked ? 'border-secondary border-4' : 'border-none'} grid w-full h-36 rounded-md items-end p-1.5 cursor-pointer`
                                                }>
                                                <div className='grid justify-start text-white text-start'>
                                                    <p className='l4-r font-deAetna capitalize'>{gift.name}</p>
                                                    <p className='text-[8px] capitalize'>{gift.price}</p>
                                                </div>
                                            </RadioGroup.Option>
                                        ))}
                                    </div >

                                    {/* <RadioGroup.Option
                                key={gifts[4].name}
                                value={gifts[4]}
                                className={({ active, checked }) => `${checked ? 'border-secondary text-secondary' : 'text-N500'} flex w-full border border-N500 pl-3 rounded-full items-center relative`}
                            >
                                <div className="form-control">
                                    <label className="label cursor-pointer">
                                        <span className="label-text">Remember me</span>
                                        <input type="checkbox" className="checkbox checkbox-primary" />
                                    </label>
                                </div>
                                {({ active, checked }) => (
                                    <>
                                        <i className="ri-cash-line ri-xl absolute"></i>
                                        <input
                                            type="number"
                                            // value={digitalGiftCustom}
                                            // onChange={
                                            //     (e) => {
                                            //         setDigitalGiftCustom(e.target.value)
                                            //         console.log(gifts[4].price)
                                            //         console.log(digitalGiftCustom)
                                            //     }
                                            // }
                                            placeholder={gifts[4].name}
                                            className={`${checked ? 'text-secondary' : 'text-N500'} w-full outline-none py-3 text-center bg-transparent`}
                                        />
                                    </>
                                )}
                            </RadioGroup.Option> */}


                                    <div className='flex w-full items-center gap-1 text-red-500'>
                                        <i className="ri-error-warning-line self-start"></i>
                                        <p className='p3-r'>Invoice akan dikirimkan ke whatsapp anda</p>
                                    </div>
                                </RadioGroup >
                                <button
                                    className='mt-3 z-10 btn btn-secondary rounded'
                                    onClick={() => {
                                        const digitalGiftModal = document.getElementById('digitalGiftModal') as HTMLDialogElement | null;
                                        if (digitalGiftModal) {
                                            digitalGiftModal.showModal();
                                        }
                                    }}>
                                    <i className="ri-gift-line ri-xl"></i>
                                    <p className='l2-r font-deAetna'>kirim hadiah</p>
                                </button>
                            </div >

                            {/* DECORATION */}
                            <Image
                                src={
                                    '/assets/virtuwed/accent/vintage-ornaments.png'
                                }
                                alt="decoration"
                                width={110}
                                height={110}
                                className='opacity-50 h-auto w-52 grid justify-self-center -scale-y-100'
                            />

                        </div >
                    </div>


                </div>
            </div >

            {/* KONFIRMASI */}
            < div id="konfirmasiContainer" className='absolute w-full rounded-lg overflow-y-auto px-4 z-10 hidden'
                style={{
                    maxWidth: '500px',
                    maxHeight: '100%',
                    minWidth: '200px',
                    minHeight: '250px',
                    WebkitOverflowScrolling: 'touch',
                    top: '72px',
                    bottom: '88px',
                    left: '50%',
                    transform: 'translateX(-50%)'
                }
                }
            >

                <div className="text-black bg-White rounded-lg overflow-auto w-full grid gap-3 px-3 pt-3 pb-6">
                    <div className='grid justify-end'>
                        <button id='konfirmasiCloseButton'>
                            <i className="ri-close-line ri-xl"></i>
                        </button>
                    </div>
                    <div className='text-center grid justify-items-center w-full'>
                        <h3 className='text-N800 capitalize'>konfirmasi</h3>
                        <p className='p3-r w-full max-w-[285px]'>Tolong konfirmasi ucapan selamat dan hadiah yang akan anda berikan</p>
                    </div>

                    <div className='grid border border-tertiary rounded-lg p-3 gap-5'>

                        {/* GIFT */}
                        <div className='grid gap-1'>
                            <p className='l3-r text-N700 font-deAetna'><span className='font-bold font-amiamie'>{guest.nama} </span> memberi {wedding.wedding_name} sebuah...</p>
                            {
                                digitalGift != gifts[5]
                                    ?
                                    <div className='flex gap-1'>
                                        <Image
                                            src={digitalGift.img}
                                            alt="decoration"
                                            width={72}
                                            height={72}
                                            className='h-20 w-20 rounded'
                                        />
                                        <div className="grid gap-0.5 p-1.5 w-full content-center">
                                            <p className='l2-r font-deAetna text-N700 capitalize'>{digitalGift.name}</p>
                                            <p className='p3-r text-N600 capitalize'>Rp. {digitalGift.price}</p>
                                        </div>
                                    </div>
                                    :
                                    <div className='p-3 gap-1 text-tertiary flex content-center items-center min-h-12 justify-center'>
                                        <i className="ri-alert-line ri-lg"></i>
                                        <p className='l3-r font-deAetna'>{gifts[5].name}</p>
                                    </div>
                            }

                        </div>

                        {/* UCAPAN */}
                        <div className='grid gap-1'>
                            <p className='L3-r font-deAetna text-N700'>dan Ucapan Selamat...</p>
                            <p className='py-3 p3-r text-N400'>{ucapanSelamat}</p>
                        </div>

                        <div className='grid gap-1'>
                            {/* FILE UPLOAD */}
                            {file && (
                                file.type.startsWith('video/') ? (
                                    <>
                                        <p className='L3-r font-deAetna text-N700'>beserta Foto/Video ucapan...</p>
                                        <Player
                                            playsInline
                                            src={URL.createObjectURL(file)}
                                            fluid
                                        />
                                    </>
                                ) : (
                                    <>
                                        <p className='L3-r font-deAetna text-N700'>beserta Foto/Video ucapan...</p>
                                        <Image
                                            src={URL.createObjectURL(file)}
                                            alt="Preview photo"
                                            className="w-full h-auto rounded-md"
                                            width={220}
                                            height={220}
                                            priority
                                        />
                                    </>
                                )
                            )
                            }
                        </div>
                        <div className='flex w-full items-center gap-1 text-red-500'>
                            <i className="ri-error-warning-line self-start"></i>
                            <p className='p3-r'>Data anda akan dilihat oleh pengantin</p>
                        </div>

                        <div className='grid gap-2'>
                            <div className='z-20 flex gap-1 w-full content-stretch'>
                                <button id='buttonChangeUcapanSelamat' className='rounded btn btn-accent h-full py-2'>
                                    <i className="ri-message-3-line ri-xl"></i>
                                    <p className='l2-r font-deAetna'>Ganti Ucapan</p>
                                </button>
                                <button id='buttonChangeDigitalGift' className='rounded btn btn-accent h-full py-2'>
                                    <i className="ri-gift-line ri-xl"></i>
                                    <p className='l2-r font-deAetna'>Ganti Hadiah</p>
                                </button>
                            </div>

                            <button onClick={handleKonfirmasi} id='konfirmasiButton' className='btn btn-secondary rounded'>
                                <i className="ri-check-line ri-xl"></i>
                                <p className='l2-r font-deAetna'>konfirmasi</p>
                            </button>
                        </div>
                    </div>

                    {/* DECORATION */}
                    <Image
                        src={
                            '/assets/virtuwed/accent/vintage-ornaments.png'
                        }
                        alt="decoration"
                        width={110}
                        height={110}
                        className='opacity-50 h-auto w-52 grid justify-self-center -scale-y-100'
                    />
                </div>
            </ div >

            {/* HADIAH DIGITAL */}
            < div id="digitalGiftContainer" className='absolute w-full h-full overflow-y-auto z-20 hidden'
                style={{
                    maxWidth: '100%',
                    maxHeight: '100%',
                    minWidth: '200px',
                    minHeight: '250px',
                    WebkitOverflowScrolling: 'touch',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)'
                }
                }
            >
                <div className="text-center text-black bg-White w-full grid gap-3 px-3 py-4">
                    <div className='grid justify-end'>
                        <button id='digitalGiftCloseButton'>
                            <i className="ri-close-line ri-xl"></i>
                        </button>
                    </div>

                    <div className='grid justify-items-center text-center w-full max-w-[500px] mx-auto'>
                        <h3 className='capitalize text-N800'>berikan hadiah digital</h3>
                        <p className='p3-r text-N700 max-w-[285px]'>Hadiah digital hanya merupakan simbolis, pengantin akan menerima nominal dari hadiah yang anda berikan</p>
                    </div>

                    <Image
                        src={digitalGift.emoticon}
                        alt="emot"
                        className="justify-self-center"
                        width={110}
                        height={110}
                    />

                    <div className='p-3 grid w-full max-w-[500px] mx-auto'>
                        <RadioGroup className='w-full grid gap-3' value={digitalGift} onChange={setDigitalGift}>
                            <div className="grid grid-cols-2 gap-y-3 gap-x-1">
                                {mainGifts.map((gift) => (
                                    <RadioGroup.Option
                                        key={gift.name}
                                        value={gift}
                                        style={{
                                            background: `
                                        linear-gradient(357deg, #000 -23.05%, rgba(0, 0, 0, 0.00) 97.17%),
                                        url('${gift.img}') center/cover no-repeat`,
                                        }}
                                        className={({ active, checked }) =>
                                            `${checked ? 'border-secondary border-4' : 'border-none'} grid w-full h-36 rounded-md items-end p-1.5 cursor-pointer`
                                        }>
                                        <div className='grid justify-start text-white text-start'>
                                            <p className='l4-r font-deAetna capitalize'>{gift.name}</p>
                                            <p className='text-[8px] capitalize'>{gift.price}</p>
                                        </div>
                                    </RadioGroup.Option>
                                ))}
                            </div >

                            {/* <RadioGroup.Option
                                key={gifts[4].name}
                                value={gifts[4]}
                                className={({ active, checked }) => `${checked ? 'border-secondary text-secondary' : 'text-N500'} flex w-full border border-N500 pl-3 rounded-full items-center relative`}
                            >
                                <div className="form-control">
                                    <label className="label cursor-pointer">
                                        <span className="label-text">Remember me</span>
                                        <input type="checkbox" className="checkbox checkbox-primary" />
                                    </label>
                                </div>
                                {({ active, checked }) => (
                                    <>
                                        <i className="ri-cash-line ri-xl absolute"></i>
                                        <input
                                            type="number"
                                            // value={digitalGiftCustom}
                                            // onChange={
                                            //     (e) => {
                                            //         setDigitalGiftCustom(e.target.value)
                                            //         console.log(gifts[4].price)
                                            //         console.log(digitalGiftCustom)
                                            //     }
                                            // }
                                            placeholder={gifts[4].name}
                                            className={`${checked ? 'text-secondary' : 'text-N500'} w-full outline-none py-3 text-center bg-transparent`}
                                        />
                                    </>
                                )}
                            </RadioGroup.Option> */}


                            <div className='flex gap-2.5 justify-center items-center'>
                                <div className='h-1 w-11 rounded-full bg-secondary'></div>
                                <p className='l3-r font-deAetna'>Atau</p>
                                <div className='h-1 w-11 rounded-full bg-secondary'></div>
                            </div>

                            <RadioGroup.Option
                                key={gifts[5].name}
                                value={gifts[5]}
                                className={({ active, checked }) => `${checked ? 'bg-tertiary text-White' : 'text-tertiary'} flex w-full border border-tertiary px-3 rounded items-center py-3 relative cursor-pointer`}
                            >
                                <i className="ri-message-3-line ri-xl absolute"></i>
                                <p className='capitalize w-full text-center font-deAetna l3-r'>{gifts[5].name}</p>
                            </RadioGroup.Option>

                            <div className='flex w-full items-center gap-1 text-red-500'>
                                <i className="ri-error-warning-line self-start"></i>
                                <p className='p3-r'>Invoice akan dikirimkan ke whatsapp anda</p>
                            </div>
                        </RadioGroup >
                        <button
                            className='mt-3 z-10 btn btn-secondary rounded'
                            onClick={() => {
                                const digitalGiftModal = document.getElementById('digitalGiftModal') as HTMLDialogElement | null;
                                if (digitalGiftModal) {
                                    digitalGiftModal.showModal();
                                }
                            }}>
                            <i className="ri-gift-line ri-xl"></i>
                            <p className='l2-r font-deAetna'>kirim hadiah</p>
                        </button>
                    </div >

                    {/* DECORATION */}
                    <Image
                        src={
                            '/assets/virtuwed/accent/vintage-ornaments.png'
                        }
                        alt="decoration"
                        width={110}
                        height={110}
                        className='opacity-50 h-auto w-52 grid justify-self-center -scale-y-100'
                    />

                </div >
            </ div >
            {/* MODAL VALIDATATION */}
            < dialog id="digitalGiftModal" className="modal" >
                <div className="modal-box bg-White px-5 py-8 grid justify-items-center gap-6 rounded-lg w-11/12 max-w-5xl">

                    <Image
                        src={
                            '/assets/virtuwed/accent/vintage-ornaments.png'
                        }
                        alt="emoticon"
                        width={110}
                        height={110}
                        className='opacity-50 h-auto w-52'
                    />

                    <div className='grid gap-2 justify-items-center text-center'>
                        <Image
                            src={digitalGift.emoticon}
                            alt="emoticon"
                            width={110}
                            height={110}
                        />
                        <h4 className="text-N800">
                            {
                                digitalGift === gifts[5]
                                    ? 'Apakah anda yakin hanya memberi ucapan saja kepada Rifqi dan Alysha?'
                                    : 'Rifqi dan Alysha sangat senang dengan pemberian anda'
                            }
                        </h4>
                        <p className="p3-r text-N600">
                            {
                                digitalGift === gifts[5]
                                    ? 'Hadiah dengan berapapun nominalnya akan sangat berharga bagi pengantin'
                                    : 'Terimakasih telah memberikan hadiah terbaik anda'
                            }
                        </p>
                    </div>

                    <form className='flex items-stretch content-stretch gap-1 w-full' method="dialog">
                        {/* if there is a button, it will close the modal */}
                        <button className="btn btn-secondary rounded-l h-full py-2">
                            <i className="ri-gift-line ri-xl"></i>
                            {
                                digitalGift === gifts[5]
                                    ? 'Beri Hadiah'
                                    : 'Ganti Hadiah'
                            }
                        </button>
                        <button id='digitalGiftButton' className="btn btn-accent h-full rounded-r">
                            {
                                digitalGift === gifts[5]
                                    ? <><i className='ri-check-line ri-xl' />Yakin</>
                                    : <><i className='ri-arrow-right-s-line ri-xl' />Lanjut</>
                            }
                        </button>
                    </form>
                </div>
            </dialog >


            {/* UCAPAN SELAMAT */}
            < div id="ucapanSelamatContainer" className='absolute w-full overflow-y-auto px-4 z-10 hidden'
                style={{
                    maxWidth: '500px',
                    maxHeight: '100%',
                    minWidth: '200px',
                    minHeight: '250px',
                    WebkitOverflowScrolling: 'touch',
                    top: '72px',
                    bottom: '88px',
                    left: '50%',
                    transform: 'translateX(-50%)'
                }}>

                <div className="text-black bg-White rounded-lg overflow-auto w-full grid gap-3 px-3 pt-3 pb-6">
                    <div className='grid justify-end'>
                        <button id='ucapanSelamatCloseButton'>
                            <i className="ri-close-line ri-xl"></i>
                        </button>
                    </div>
                    <div className='text-center grid w-full justify-items-center'>
                        <h3 className='text-N800 capitalize'>berikan ucapan selamat</h3>
                        <p className='text-N700 p3-r w-full max-w-[285px]'>Anda dapat memberikan ucapan melalui video ataupun foto</p>
                    </div>


                    < div className='grid gap-3 w-full border border-tertiary rounded-b pt-6 px-3 pb-3' >
                        <div className='grid gap-1'>
                            <p className='l3-r text-N700 font-deAetna'>Upload Foto/Video Ucapan</p>

                            <FileUploader handleChange={handleChange} types={fileTypes} name="file">
                                <div className='bg-white grid gap-1 justify-items-center border border-N300 rounded-md py-4 px-3 text-N400 cursor-pointer'>
                                    <i className="ri-upload-2-line ri-lg"></i>
                                    <p className='p2-r'>Klik untuk {file ? 'ganti' : 'upload'} foto/video</p>
                                </div>
                            </FileUploader>

                            {file && (
                                file.type.startsWith('video/') ? (
                                    <Player
                                        playsInline
                                        src={URL.createObjectURL(file)}
                                        fluid
                                    />
                                ) : (
                                    <Image
                                        src={URL.createObjectURL(file)}
                                        alt="Preview photo"
                                        className="w-full h-auto rounded-md"
                                        width={220}
                                        height={220}
                                        priority
                                    />
                                )
                            )
                            }
                        </div>

                        <div className='grid gap-1'>
                            <p className='l3-r text-N700 font-deAetna'>Ucapan Selamat</p>
                            <form className='grid gap-6'>
                                <textarea
                                    className="resize-y appearance-none rounded-md w-full p-3 text-N800 leading-tight border border-N300 focus:outline-none focus:shadow-outline" placeholder="..."
                                    rows={3}
                                    // value={ucapanSelamat}
                                    // onChange={
                                    //     (e) => setUcapanSelamat(e.target.value)
                                    // }
                                    value={ucapanSelamat}
                                    onChange={
                                        (e) => setUcapanSelamat(e.target.value)
                                    }
                                />
                            </form>
                        </div>

                        <button
                            onClick={() => {
                                const ucapanSelamatModal = document.getElementById('ucapanSelamatModal') as HTMLDialogElement | null;
                                if (ucapanSelamatModal) {
                                    ucapanSelamatModal.showModal();
                                }
                            }}
                            className='btn btn-secondary rounded'>
                            <i className="ri-send-plane-line ri-xl"></i>
                            <p className='l2-r font-deAetna'>kirim ucapan</p>
                        </button>
                    </ div>

                    {/* DECORATION */}
                    < Image
                        src={
                            '/assets/virtuwed/accent/vintage-ornaments.png'
                        }
                        alt="decoration"
                        width={110}
                        height={110}
                        className='opacity-50 h-auto w-52 grid justify-self-center -scale-y-100'
                    />
                </div >
            </ div >
            {/* MODAL VALIDATATION */}
            < dialog id="ucapanSelamatModal" className="modal" >
                <div className="modal-box bg-White px-5 py-8 grid justify-items-center gap-6 rounded-lg w-11/12 max-w-5xl">

                    <Image
                        src={
                            '/assets/virtuwed/accent/vintage-ornaments.png'
                        }
                        alt="emoticon"
                        width={110}
                        height={110}
                        className='opacity-50 h-auto w-52'
                    />

                    <div className='grid gap-2 justify-items-center text-center'>
                        <Image
                            src={
                                file != undefined
                                    ? '/assets/ballroom/emoticons/1.webp'
                                    :
                                    ucapanSelamat != '' ? '/assets/ballroom/emoticons/1.webp' : '/assets/ballroom/emoticons/5.webp'
                            }
                            alt="emoticon"
                            width={110}
                            height={110}
                        />
                        <h4 className="text-N800">
                            {
                                file != undefined
                                    ? 'Terimakasih telah memberikan ucapan selamat kepada kami'
                                    :
                                    ucapanSelamat != '' ? 'Yakin Ga Sekalian Kirim Foto/Video?' : 'Apakah anda yakin tidak ingin memberikan ucapan selamat?'
                            }
                        </h4>
                        <p className="p3-r text-N600">
                            {
                                file != undefined
                                    ? 'Ucapan anda akan sangat berharga bagi momen spesial kami'
                                    :
                                    ucapanSelamat != '' ? 'Kirim Foto/Video ucapan anda untuk pengantin' : 'Ucapan anda akan sangat berharga bagi momen spesial kami'
                            }
                        </p>
                    </div>

                    <form className='flex gap-1 w-full' method="dialog">
                        {/* if there is a button, it will close the modal */}
                        <button className="btn btn-secondary rounded-l">
                            <i className='ri-message-3-line ri-xl' />
                            {
                                file != undefined
                                    ? 'Ganti Ucapan'
                                    :
                                    ucapanSelamat != '' ? 'Ganti Ucapan' : 'Beri Ucapan'
                            }
                        </button>
                        <button id='buttonPelaminan' className="btn btn-accent rounded-r">
                            {
                                file != undefined
                                    ? <><i className='ri-arrow-right-s-line ri-xl' />Lanjut</>
                                    : ucapanSelamat != ''
                                        ? <><i className='ri-arrow-right-s-line ri-xl' />Lanjut</>
                                        : <><i className='ri-check-line ri-xl' />Yakin</>
                            }
                        </button>
                    </form>
                </div>
            </dialog >




            {/* UNUSED COMPONENT */}

            {/* BANNER OPEN BETA */}
            {/* <div id="bannerOpenBeta" className='pointer-events-none absolute w-full h-fit z-50'
                style={{
                    maxWidth: '100%',
                    // maxHeight: 'fit',
                    minWidth: '200px',
                    minHeight: '250px',
                    WebkitOverflowScrolling: 'touch',
                    top: '0',
                    left: '50%',
                    transform: 'translate(-50%, 0)'
                }}>

                <div className="relative bg-white pointer-events-auto overflow-auto w-full h-fit grid gap-2 text-center justify-items-center content-center p-1 shadow-md">
                    <h5 className='font-deAetna text-base text-black'>Anda berada pada Virtuwed Open Beta</h5>

                    <a href='https://forms.gle/VPpq2k7k8vhGntF16' target='_blank' className='py-1.5 px-3 bg-white text-black border-black border-solid border text-xs text-center font-amiamie inline-block rounded-lg hover:btn-shadow-primary w-fit'>Kirim Feedback</a>
                </div>
            </div> */}

            {/* MODAL UCAPAN ENDING */}
            <div id="ucapanEnding" className='absolute w-full rounded-lg overflow-y-auto px-4 z-10 hidden'
                style={{
                    maxWidth: '500px',
                    maxHeight: '75%',
                    minWidth: '200px',
                    minHeight: '250px',
                    WebkitOverflowScrolling: 'touch',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)'
                }
                }>

                <div className="bg-gray-100 rounded-lg overflow-auto w-full grid text-center items-start gap-6 p-6 ">

                    <div className='grid gap-6 w-full'>
                        <div>
                            {/* <h3 className='text-xl lg:text-2xl font-deAetna'>Alysha Karmina</h3> */}
                            <h3 className='text-3xl lg:text-4xl font-deAetna'>Thank You</h3>
                        </div>
                        <p className='font-light font-amiamie'>Kami sangat senang dan berterima kasih atas kehadiran Anda di acara istimewa ini. Keikutsertaan Anda membuat momen ini semakin berarti dan berkesan bagi pasangan pengantin. Semoga Anda menikmati perayaan ini dengan penuh sukacita dan kebahagiaan.</p>

                        <button
                            id='ucapanEndingButton'
                            // style={{ background: 'linear-gradient(313deg, #FFF -70%, #D1B0B0 100%)' }}
                            className='bg-gradient-to-r from-primaryGradient-start to-primaryGradient-end pt-3 pb-2.5 px-6 text-white text-center font-amiamie inline-block rounded-lg hover:btn-shadow-primary transition-all ease-in-out duration-300'>Tutup</button>
                    </div>
                </div>
            </div>

            {/* PLACEHOLDER VIDEOCALL */}
            < div id="videocallPlaceholder" className='hidden absolute w-full h-screen overflow-y-auto z-50'
                style={{
                    maxWidth: '100%',
                    maxHeight: '100%',
                    minWidth: '200px',
                    minHeight: '250px',
                    WebkitOverflowScrolling: 'touch',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)'
                }
                }>

                <div className="relative flex flex-col w-full h-full overflow-hidden">

                    {/* NAVBAR */}
                    <div className='bg-black grid grid-flow-col justify-between py-10 px-4 h-fit'>

                        <Icon icon="ion:chevron-back" color="white" fontSize={24} />
                        <div className='flex gap-2 items-center z-10'>
                            <Icon icon="uis:lock" color="white" />
                            <h4 className='font-amiamie text-base text-gray-300'>End-to-end Encrypted</h4>
                        </div>
                        <Icon icon="icon-park-solid:people-plus-one" color="white" fontSize={24} className='z-10' />
                    </div>

                    {/* PARTNER VIDEOCALL */}
                    <div className='grid w-full h-full'>
                        <Image
                            src="/assets/undanganDigital/Prewed16.jpeg"
                            alt="mempelai"
                            className="object-cover object-center w-full h-full"
                            width={500}
                            height={500}
                            priority
                        />
                    </div>

                    {/* SELF REFLECTION */}
                    <div className='absolute rounded right-4 top-16'>

                        {/* <video
                            autoPlay
                            loop
                            muted
                            playsInline
                            style={{ height: '160px', width: '112px', objectFit: 'cover', objectPosition: 'center', borderRadius: '4px' }}
                        >
                            <source src="assets/ballroom/videocall/guestVideo.mp4" type="video/mp4" />
                            Your browser does not support the video tag.
                        </video> */}

                        <Image
                            src="/assets/ballroom/videocall/kangAgy.jpg"
                            alt="mempelai"
                            className="object-cover object-center h-40 w-28 rounded"
                            width={500}
                            height={500}
                            priority
                        />
                    </div>

                    {/* FEATURE VIDEOCALL */}
                    <div className='bg-stone-800 absolute bottom-0 rounded-t-3xl px-4 pb-8 min-w-full grid justify-items-center gap-4'>
                        <div>
                            <Icon icon="fluent:chevron-up-16-filled" fontSize={36} className='text-stone-700' />
                        </div>

                        <div className='grid grid-flow-col justify-between w-full'>
                            <div className='rounded-full bg-stone-700 p-3'>
                                <Icon icon="mdi:camera-flip" color="white" fontSize={36} />
                            </div>
                            <div className='rounded-full bg-stone-700 p-3'>
                                <Icon icon="eva:video-off-fill" color="white" fontSize={36} />
                            </div>
                            <div className='rounded-full bg-stone-700 p-3'>
                                <Icon icon="bi:mic-mute-fill" color="white" fontSize={36} />
                            </div>
                            <button id='videocallCloseButton' className='rounded-full bg-red-600 p-3'>
                                <Icon icon="fluent:call-end-16-filled" color="white" fontSize={36} />
                            </button>
                        </div>

                    </div>

                </div>
            </div >
        </>
    )
}

export default Ballroom
