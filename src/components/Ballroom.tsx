'use client'
import React, { useEffect, useState } from 'react'
import * as THREE from 'three';
import { RadioGroup } from '@headlessui/react'
import Typed from 'typed.js';
import { CheckIcon } from '@heroicons/react/24/solid';
import Image from 'next/image';
import { ArrowTopRightOnSquareIcon } from '@heroicons/react/20/solid';
import Link from 'next/link';
import { Icon } from '@iconify/react';


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


const plans = [
    {
        img: '/assets/ballroom/gift/ucapan.png',
        name: 'Ucapan saja',
        price: '0',
        btn: 'Kirim Ucapan saja'
    },
    {
        img: '/assets/ballroom/gift/bunga.png',
        name: 'Bunga Mawar',
        price: '50000',
        btn: 'Kirim ucapan dan mawar'
    },
    {
        img: '/assets/ballroom/gift/tv.png',
        name: 'Televisi',
        price: '100000',
        btn: 'Kirim ucapan dan televisi'
    },
]


const Ballroom = () => {
    const [isClient, setIsClient] = useState(false);

    const [selected, setSelected] = useState(plans[0])

    useEffect(() => {
        setIsClient(true);
    }, []);

    useEffect(() => {
        if (isClient) {
            const tweeningDelay = 300, typeStartDelay = 1000, typeSpeed = 50;
            const buttonKoridor = document.getElementById('buttonKoridor');
            const buttonPelaminan = document.getElementById('buttonPelaminan');

            //infospot information mempelai
            const koridorInfoModal = document.getElementById('koridorInfoModal')
            const koridorInfoCloseButton = document.getElementById('koridorInfoCloseButton')

            const livestreamPlaceholder = document.getElementById('livestreamPlaceholder')
            const videocallPlaceholder = document.getElementById('videocallPlaceholder')

            const souvenirContainer = document.getElementById('souvenirContainer');
            const digitalGiftContainer = document.getElementById('digitalGiftContainer');
            const ucapanEnding = document.getElementById('ucapanEnding');

            const digitalGiftButton = document.getElementById('digitalGiftButton');
            const souvenirButton = document.getElementById('souvenirButton');
            const ucapanEndingButton = document.getElementById('ucapanEndingButton');

            const livestreamCloseButton = document.getElementById('livestreamCloseButton');
            const videocallCloseButton = document.getElementById('videocallCloseButton');

            let directLocation: any;


            buttonKoridor?.addEventListener('click', function () {
                viewer.setPanorama(directLocation)
            });

            livestreamCloseButton?.addEventListener('click', function () {
                livestreamPlaceholder?.classList.toggle('hidden');
            });

            videocallCloseButton?.addEventListener('click', function () {
                videocallPlaceholder?.classList.toggle('hidden');
            });

            buttonPelaminan?.addEventListener('click', function () {
                buttonPelaminan?.classList.toggle('hidden');
                delayExecute(mejaHadiahInfospot.focus.bind(mejaHadiahInfospot), tweeningDelay);
                digitalGiftContainer?.classList.toggle('hidden');
                viewer.OrbitControls.enabled = false;
            });

            digitalGiftButton?.addEventListener('click', function () {
                digitalGiftContainer?.classList.toggle('hidden');
                delayExecute(mejaSouvenirPOVInfospot.focus.bind(mejaSouvenirPOVInfospot), tweeningDelay);
                setTimeout(function () {
                    viewer.setPanorama(back);
                }, 1500);
            });

            souvenirButton?.addEventListener('click', function () {
                keluarRuanganInfospot.hide()
                lihatRuanganInfospot.hide()
                souvenirContainer?.classList.toggle('hidden');
                delayExecute(keluarRuanganInfospot.focus.bind(ucapanEndingInfospot), tweeningDelay);
                setTimeout(function () {
                    ucapanEnding?.classList.toggle('hidden');
                }, 1500);
                // type(endingText.ending, functi   on () { viewer.OrbitControls.enabled = true; });
            });

            ucapanEndingButton?.addEventListener('click', function () {
                ucapanEnding?.classList.toggle('hidden');
                viewer.OrbitControls.enabled = true;
                keluarRuanganInfospot.show()
                lihatRuanganInfospot.show()
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
            const back = new PANOLENS.ImagePanorama('/assets/ballroom/Back.jpg');
            // back.addEventListener('enter-fade-start', function () {
            //     pov == 'daridepan' ?
            //         viewer.tweenControlCenter(lookAtPositions[1], 0)
            //         :
            //         viewer.tweenControlCenter(lookAtPositions[2], 0)

            // });

            const front = new PANOLENS.ImagePanorama('/assets/ballroom/Front.jpg');
            // front.addEventListener('enter-fade-start', function () {
            //     viewer.tweenControlCenter(lookAtPositions[0], 0);
            // });

            const koridor = new PANOLENS.ImagePanorama('/assets/ballroom/Koridor.jpg');
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
                type(koridorText.welcome, onWelcomeComplete, 2000);

            }

            const onLoadFront = () => {
                buttonKoridor?.classList.toggle('hidden');
                viewer.OrbitControls.enabled = false;
                viewer.tweenControlCenter(new THREE.Vector3(4787.98, 1426.00, 16.95), 0);
                // type(frontText.pelaminan, function () { buttonPelaminan?.classList.toggle('hidden'); viewer.OrbitControls.enabled = true; }, 2000);
                buttonPelaminan?.classList.toggle('hidden'); viewer.OrbitControls.enabled = true;
            }

            const onLoadBack = () => {
                viewer.tweenControlCenter(new THREE.Vector3(-5000, 0, 0), 0);
                setTimeout(function () {
                    delayExecute(mejaSouvenirInfospot.focus.bind(mejaSouvenirInfospot), tweeningDelay);
                    // viewer.tweenControlCenter(new THREE.Vector3(-116.83, 138.59, -4988.43), 0);
                }, 1000);
                setTimeout(function () {
                    souvenirContainer?.classList.toggle('hidden');
                }, 2000);
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
            const mejaHadiahInfospot = new PANOLENS.Infospot();
            const videocallInfospot = new PANOLENS.Infospot(900, '/assets/ballroom/button/buttonVideocall.png');
            const livestreamInfospot = new PANOLENS.Infospot(900, '/assets/ballroom/button/buttonLivestream.png');
            const mejaSouvenirPOVInfospot = new PANOLENS.Infospot(10e-7);

            //   BACK INFOSPOTS
            const keluarRuanganInfospot = new PANOLENS.Infospot(900, '/assets/ballroom/button/buttonKeluarRuangan.png');
            const lihatRuanganInfospot = new PANOLENS.Infospot(900, '/assets/ballroom/button/buttonLihatRuangan.png');
            const mejaSouvenirInfospot = new PANOLENS.Infospot();
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
            // koridorKiriInfospot1.addEventListener('click', function () {
            //     document.getElementById('profilPengantinPria'), 140
            // });

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
            koridorInfoCloseButton?.addEventListener('click', function () {
                koridorInfoModal?.classList.toggle('hidden')
            });

            // FRONT
            mejaHadiahInfospot.position.set(208.08, -1561.25, -4738.41);
            mejaHadiahInfospot.addHoverText('Kasih Hadiah Digital disini', 50);

            videocallInfospot.position.set(4501.65, 2168.44, -3.57);
            videocallInfospot.addEventListener('click', function () {
                videocallPlaceholder?.classList.toggle('hidden');
            });


            livestreamInfospot.position.set(4957.06, 623.64, -2.76);
            livestreamInfospot.addEventListener('click', function () {
                livestreamPlaceholder?.classList.toggle('hidden');
            });

            mejaSouvenirPOVInfospot.position.set(-4995.67, 107.19, -2.18);

            // BACK
            mejaSouvenirInfospot.position.set(63.26, -1587.21, -4736.43);
            mejaSouvenirInfospot.addHoverText('Mengambil souvenir disini', 50);

            ucapanEndingInfospot.position.set(-4829.37, 1281.33, 5.80);

            keluarRuanganInfospot.position.set(-5000.00, 1811.57, 10.79);
            keluarRuanganInfospot.addEventListener('click', function () {
                window.location.href = '/homepage';
            });

            lihatRuanganInfospot.position.set(-4946.40, 713.02, -4.30);
            lihatRuanganInfospot.addEventListener('click', function () {
                viewer.setPanorama(koridor);
                koridor.add(infospotBack);
                front.add(infospotMid2);
                back.add(infospotKoridor, infospotFront);
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
            front.add(mejaHadiahInfospot, livestreamInfospot, videocallInfospot, mejaSouvenirPOVInfospot);

            back.add(mejaSouvenirInfospot, ucapanEndingInfospot, keluarRuanganInfospot, lihatRuanganInfospot);
            back.addEventListener('load', onLoadBack);


            viewer.add(koridor, front, back);
        }
    }, [isClient]);

    return (
        <>
            <section id='ballroom' className='w-full h-full relative'>

                <div className='absolute top-1/2 w-full flex justify-center items-center p-5'>
                    <div id="typed" className='text-white text-2xl'></div>
                </div>


            </section>

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
            <div className='absolute bottom-0 mb-6 px-4 md:px-0 min-w-full grid justify-items-center'>
                <button id='buttonKoridor' className='hidden w-full md:max-w-screen-sm pt-3 pb-2.5 px-6 bg-white text-primary font-amiamie border-4 border-primary text-center rounded-lg hover:btn-shadow-secondary transition-all ease-in-out duration-300'>Menuju Pelaminan</button>
            </div>

            {/* BUTTON LINKING */}
            <div className='absolute bottom-0 mb-6 px-4 md:px-0 min-w-full grid justify-items-center'>
                <button id='buttonPelaminan' className='hidden w-full md:max-w-screen-sm pt-3 pb-2.5 px-6 bg-white text-primary font-amiamie border-4 border-primary text-center rounded-lg hover:btn-shadow-secondary transition-all ease-in-out duration-300'>Menuju Hadiah Digital</button>
            </div>

            {/* MODAL SOUVENIR */}
            <div id="souvenirContainer" className='absolute w-full rounded-lg overflow-y-auto px-4 z-10 hidden'
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

                <div className="text-center text-black bg-gray-100 rounded-lg overflow-auto w-full grid gap-6 p-6 ">
                    <h3 className='text-xl lg:text-2xl font-deAetna'>Sebagai bentuk rasa hormat, kami akan mengirimkan souvenir pernikahan kepada Alamat Bapak/Ibu.</h3>
                    <p className='font-light font-amiamie'>Silahkan Untuk Mengisi Alamat Lengkap Pengiriman Souvenir.</p>
                    <form className='grid gap-6'>
                        <textarea
                            data-aos-once="true"
                            data-aos="fade-up" data-aos-duration="1200"
                            className="shadow appearance-none rounded w-full min-h-[100px] p-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="Alamat lengkap pengiriman"
                        // value={'alamat'}
                        // onChange={
                        //     (e) => console.log(e)
                        //     // (e) => setMessage(e.target.value)
                        // }
                        />
                    </form>
                    <button id='souvenirButton' style={{ background: 'linear-gradient(313deg, #FFF -70%, #D1B0B0 100%)' }} className='pt-3 pb-2.5 px-6 text-white text-center font-amiamie inline-block rounded-lg hover:btn-shadow-primary transition-all ease-in-out duration-300'>Simpan Alamat Pengiriman</button>
                </div>
            </div >

            {/* MODAL HADIAH DIGITAL */}
            < div id="digitalGiftContainer" className='absolute w-full rounded-lg overflow-y-auto px-4 z-10 hidden'
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

                <div className="text-center text-black bg-gray-100 rounded-lg w-full grid gap-6 p-6 ">
                    <h3 className='text-xl lg:text-2xl font-deAetna'>Terimakasih Bapak Elang Fajar Buana atas kehadirannya.</h3>
                    <p className='font-light font-amiamie'>Berikan Ucapan Terbaik Kepada Mempelai.</p>
                    <form className='grid gap-6'>
                        <input
                            data-aos-once="true"
                            data-aos="fade-up" data-aos-duration="1200"
                            className="shadow appearance-none rounded w-full p-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            type="text"
                            placeholder="Name"
                            value={'Elang Fajar Buana'}
                            onChange={
                                // (e) => setName(e.target.value)
                                (e) => console.log(e)
                            }
                        />
                        <textarea
                            data-aos-once="true"
                            data-aos="fade-up" data-aos-duration="1200"
                            className="shadow appearance-none rounded w-full min-h-[100px] p-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="Tulis Ucapan Kepada Pengantin"
                            // value={'alamat'}
                            onChange={
                                (e) => console.log(e)
                                // (e) => setMessage(e.target.value)
                            }
                        />

                        <RadioGroup value={selected} onChange={setSelected}>
                            <RadioGroup.Label className="sr-only">Server size</RadioGroup.Label>
                            <div className="space-y-2">
                                {plans.map((plan) => (
                                    <RadioGroup.Option
                                        key={plan.name}
                                        value={plan}
                                        className={({ active, checked }) =>
                                            `${active
                                                ? 'ring-2 ring-white ring-opacity-60 ring-offset-2 ring-offset-sky-300'
                                                : ''
                                            }
                  ${checked ? 'bg-sky-900 bg-opacity-75 text-white' : 'bg-white'
                                            }
                    relative flex cursor-pointer rounded-lg px-5 py-4 shadow-md focus:outline-none`
                                        }
                                    >
                                        {({ active, checked }) => (
                                            <>
                                                <div className="flex w-full items-center justify-between">
                                                    <div className="flex gap-2 items-center">
                                                        <div>
                                                            <Image
                                                                src={plan.img}
                                                                alt="Gift"
                                                                className="w-12 h-auto"
                                                                width={220}
                                                                height={220}
                                                                priority
                                                            />
                                                        </div>
                                                        <div className="text-sm text-start">
                                                            <RadioGroup.Label
                                                                as="p"
                                                                className={`font-medium  ${checked ? 'text-white' : 'text-gray-900'
                                                                    }`}
                                                            >
                                                                {plan.name}
                                                            </RadioGroup.Label>
                                                            <RadioGroup.Description
                                                                as="span"
                                                                className={`inline ${checked ? 'text-sky-100' : 'text-gray-500'
                                                                    }`}
                                                            >
                                                                <span>
                                                                    Rp {plan.price}
                                                                </span>
                                                            </RadioGroup.Description>
                                                        </div>
                                                    </div>
                                                    {checked && (
                                                        <div className="shrink-0 text-white">
                                                            <CheckIcon className="h-6 w-6" />
                                                        </div>
                                                    )}
                                                </div>
                                            </>
                                        )}
                                    </RadioGroup.Option>
                                ))}
                            </div>
                        </RadioGroup>

                        <span className='text-xs text-black/70'>*Hadiah ini merupakan simbolis, mempelai akan menerima uang tunai.</span>
                    </form>
                    <button id='digitalGiftButton' style={{ background: 'linear-gradient(313deg, #FFF -70%, #D1B0B0 100%)' }} className='pt-3 pb-2.5 px-6 text-white text-center font-amiamie inline-block rounded-lg hover:btn-shadow-primary transition-all ease-in-out duration-300'>{selected.btn}</button>
                </div>
            </ div>

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
                }}>

                <div className="bg-gray-100 rounded-lg overflow-auto w-full grid text-center items-start gap-6 p-6 ">

                    <div className='grid gap-6 w-full'>
                        <div>
                            {/* <h3 className='text-xl lg:text-2xl font-deAetna'>Alysha Karmina</h3> */}
                            <h3 className='text-3xl lg:text-4xl font-deAetna'>Thank You</h3>
                        </div>
                        <p className='font-light font-amiamie'>Kami sangat senang dan berterima kasih atas kehadiran Anda di acara istimewa ini. Keikutsertaan Anda membuat momen ini semakin berarti dan berkesan bagi pasangan pengantin. Semoga Anda menikmati perayaan ini dengan penuh sukacita dan kebahagiaan.</p>

                        <button id='ucapanEndingButton' style={{ background: 'linear-gradient(313deg, #FFF -70%, #D1B0B0 100%)' }} className='pt-3 pb-2.5 px-6 text-white text-center font-amiamie inline-block rounded-lg hover:btn-shadow-primary transition-all ease-in-out duration-300'>Tutup</button>
                    </div>
                </div>
            </div>

            {/* PLACEHOLDER LIVESTREAM */}
            <div id="livestreamPlaceholder" className='hidden absolute w-full h-full rounded-lg overflow-y-auto z-10'
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

                <div className="relative bg-gray-100 rounded-lg overflow-auto w-full h-full grid text-center items-center gap-6 p-6 ">

                    <div className='grid gap-6 w-full'>
                        <h3 className='font-deAetna text-3xl lg:text-4xl'>Live Streaming</h3>

                        <iframe
                            className="h-48 md:h-64"
                            width="100%"
                            height="auto"
                            src="https://www.youtube.com/embed/zq40UhEGuAI"
                            title="Live Stream"
                            allow="fullscreen; accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            allowFullScreen={true}
                        ></iframe>
                    </div>

                    <div className='absolute bottom-0 mb-6 px-4 md:px-0 min-w-full grid justify-items-center'>
                        <button id='livestreamCloseButton' className='w-full md:max-w-screen-sm pt-3 pb-2.5 px-6 bg-white text-primary font-amiamie border-4 border-primary text-center rounded-lg hover:btn-shadow-secondary transition-all ease-in-out duration-300'>Keluar Live Streaming</button>
                    </div>

                </div>
            </div>

            {/* PLACEHOLDER VIDEOCALL */}
            <div id="videocallPlaceholder" className='hidden absolute w-full h-screen overflow-y-auto z-50'
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

                        <video
                            autoPlay
                            loop
                            muted
                            playsInline
                            style={{ height: '160px', width: '112px', objectFit: 'cover', objectPosition: 'center', borderRadius: '4px' }}
                        >
                            <source src="assets/ballroom/videocall/guestVideo.mp4" type="video/mp4" />
                            Your browser does not support the video tag.
                        </video>

                        {/* <Image
                            src="/assets/ballroom/videocall/kangAgy.jpg"
                            alt="mempelai"
                            className="object-cover object-center h-40 w-28 rounded"
                            width={500}
                            height={500}
                            priority
                        /> */}
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


// TODO:
// animasi masuk 360
