'use client'
import React, { useEffect, useState } from 'react'
import * as THREE from 'three';
import { RadioGroup } from '@headlessui/react'
import Typed from 'typed.js';
import { CheckIcon } from '@heroicons/react/24/solid';
import Image from 'next/image';
import { ArrowTopRightOnSquareIcon } from '@heroicons/react/20/solid';
import Link from 'next/link';


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
        name: 'Ucapan saja',
        price: '0'
    },
    {
        name: 'Bunga Tulip',
        price: '50000'
    },
    {
        name: 'Kulkas',
        price: '100000'
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

            const souvenirContainer = document.getElementById('souvenirContainer');
            const digitalGiftContainer = document.getElementById('digitalGiftContainer');

            const digitalGiftButton = document.getElementById('digitalGiftButton');
            const souvenirButton = document.getElementById('souvenirButton');

            let directLocation: any;


            buttonKoridor?.addEventListener('click', function () {
                viewer.setPanorama(directLocation)
            });

            buttonPelaminan?.addEventListener('click', function () {
                buttonPelaminan?.classList.toggle('hidden');
                delayExecute(mejaHadiahInfospot.focus.bind(mejaHadiahInfospot), tweeningDelay);
                digitalGiftContainer?.classList.toggle('hidden');
            });

            digitalGiftButton?.addEventListener('click', function () {
                viewer.setPanorama(back);
            });

            souvenirButton?.addEventListener('click', function () {
                souvenirContainer?.classList.toggle('hidden');
                delayExecute(keluarRuanganInfospot.focus.bind(keluarRuanganInfospot), tweeningDelay);
                type(endingText.ending, function () { viewer.OrbitControls.enabled = true; });
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
            const viewer = new PANOLENS.Viewer({ container: document.getElementById('ballroom'), enableReticle: false, output: 'console', controlBar: false, });
            viewer.OrbitControls.enabled = false;


            //ASSET SETUP 
            const back = new PANOLENS.ImagePanorama('/assets/ballroom/Back.png');
            // back.addEventListener('enter-fade-start', function () {
            //     pov == 'daridepan' ?
            //         viewer.tweenControlCenter(lookAtPositions[1], 0)
            //         :
            //         viewer.tweenControlCenter(lookAtPositions[2], 0)

            // });

            const front = new PANOLENS.ImagePanorama('/assets/ballroom/Front.png');
            // front.addEventListener('enter-fade-start', function () {
            //     viewer.tweenControlCenter(lookAtPositions[0], 0);
            // });

            const koridor = new PANOLENS.ImagePanorama('/assets/ballroom/Koridor.png');
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
                // type( frontText.pelaminan, onPelaminanComplete, 2000 );
                type(frontText.pelaminan, function () { buttonPelaminan?.classList.toggle('hidden'); }, 2000);

            }

            const onLoadBack = () => {
                digitalGiftContainer?.classList.toggle('hidden');
                viewer.tweenControlCenter(new THREE.Vector3(-116.83, 138.59, -4988.43), 0);
                souvenirContainer?.classList.toggle('hidden');
            }


            // ===========================================================================================================================
            const onWelcomeComplete = () => {

                delayExecute(koridorKiriInfospot.focus.bind(koridorKiriInfospot), tweeningDelay);
                type(koridorText.koridorKiri, onKoridorKananTourComplete);

            }

            const onKoridorKananTourComplete = () => {

                delayExecute(koridorKananInfospot.focus.bind(koridorKananInfospot), tweeningDelay);
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
            const koridorKiriInfospot = new PANOLENS.Infospot();
            const koridorKananInfospot = new PANOLENS.Infospot();

            // FRONT INFOSPOTS
            const mejaHadiahInfospot = new PANOLENS.Infospot();
            const videocallInfospot = new PANOLENS.Infospot(500, '/assets/ballroom/button/buttonVideocall.png');
            const livestreamInfospot = new PANOLENS.Infospot(500, '/assets/ballroom/button/buttonLivestream.png');

            //   BACK INFOSPOTS
            const mejaSouvenirInfospot = new PANOLENS.Infospot();
            const keluarRuanganInfospot = new PANOLENS.Infospot(500, '/assets/ballroom/button/buttonKeluarRuangan.png');
            const lihatRuanganInfospot = new PANOLENS.Infospot(500, '/assets/ballroom/button/buttonLihatRuangan.png');
            // keluarRuanganInfospot = new PANOLENS.Infospot( 10e-7 );  // Make it not visible


            // KORIDOR
            koridorKiriInfospot.position.set(2020.89, 1609.87, 4273.18);
            koridorKiriInfospot.addHoverElement(document.getElementById('profilPengantinPria'), 140);

            koridorKananInfospot.position.set(1971.94, 1601.09, -4301.75);
            koridorKananInfospot.addHoverElement(document.getElementById('profilPengantinWanita'), 140);

            // FRONT
            mejaHadiahInfospot.position.set(208.08, -1561.25, -4738.41);
            mejaHadiahInfospot.addHoverText('Kasih Hadiah Digital disini', 50);

            videocallInfospot.position.set(4501.65, 2168.44, -3.57);

            livestreamInfospot.position.set(4957.06, 623.64, -2.76);

            // BACK
            mejaSouvenirInfospot.position.set(63.26, -1587.21, -4736.43);
            mejaSouvenirInfospot.addHoverText('Mengambil souvenir disini', 50);

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
            koridor.add(koridorKiriInfospot, koridorKananInfospot);

            front.addEventListener('load', onLoadFront);
            front.add(mejaHadiahInfospot, livestreamInfospot, videocallInfospot);

            back.add(mejaSouvenirInfospot, keluarRuanganInfospot, lihatRuanganInfospot);
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

                {/* BUTTON LINKING */}
                <div className='absolute bottom-0 mb-6 px-4 md:px-0 min-w-full grid justify-items-center'>
                    <button id='buttonKoridor' className='hidden w-full md:max-w-screen-sm pt-3 pb-2.5 px-6 bg-white text-primary font-amiamie border-4 border-primary text-center rounded-lg hover:btn-shadow-secondary transition-all ease-in-out duration-300'>Menuju Pelaminan</button>
                </div>

                {/* BUTTON LINKING */}
                <div className='absolute bottom-0 mb-6 px-4 md:px-0 min-w-full grid justify-items-center'>
                    <button id='buttonPelaminan' className='hidden w-full md:max-w-screen-sm pt-3 pb-2.5 px-6 bg-white text-primary font-amiamie border-4 border-primary text-center rounded-lg hover:btn-shadow-secondary transition-all ease-in-out duration-300'>Menuju Hadiah Digital</button>
                </div>
            </section>

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
                            className="shadow appearance-none rounded w-full min-h-[100px] p-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="Ucapan untuk mempelai"
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
                            // value={'nama'}
                            onChange={
                                // (e) => setName(e.target.value)
                                (e) => console.log(e)
                            }
                        />
                        <textarea
                            data-aos-once="true"
                            data-aos="fade-up" data-aos-duration="1200"
                            className="shadow appearance-none rounded w-full min-h-[100px] p-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="Alamat lengkap pengiriman"
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
                                                    <div className="flex items-center">
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
                    <button id='digitalGiftButton' style={{ background: 'linear-gradient(313deg, #FFF -70%, #D1B0B0 100%)' }} className='pt-3 pb-2.5 px-6 text-white text-center font-amiamie inline-block rounded-lg hover:btn-shadow-primary transition-all ease-in-out duration-300'>Kirim ucapan dan hadiah digital</button>
                </div>
            </ div>
        </>
    )
}

export default Ballroom


// TODO:
// animasi masuk 360
