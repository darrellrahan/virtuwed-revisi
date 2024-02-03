'use client'
import { Button, ButtonGroup, Input, Modal, ModalBody, ModalContent, ModalHeader, useDisclosure } from '@nextui-org/react';
import Image from 'next/image';
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { RootState } from '@/src/app/[lang]/redux/reducers';
import 'remixicon/fonts/remixicon.css'
import { useSelector } from 'react-redux';
import { FileUploader } from 'react-drag-drop-files';
import { Player } from 'video-react';
import "../../node_modules/video-react/dist/video-react.css";
import { RadioGroup } from '@headlessui/react';
import YouTubePlayer from './YoutubePlayer';
import { useRouter } from 'next/navigation';
import { Icon } from '@iconify/react';
import axios from 'axios';
import { log } from 'console';

interface PanoProps {
    dataPano: {
        settings: {
            mouseViewMode: string;
            autorotateEnabled: boolean;
            fullscreenButton: boolean;
            viewControlButtons: boolean;
        };
        scenes: {
            id: string;
            name: string;
            levels: {
                tileSize: number;
                size: number;
                fallbackOnly?: boolean;
            }[];
            faceSize: number;
            initialViewParameters: {
                pitch: number;
                yaw: number;
                fov: number;
            };
            linkHotspots?: {
                yaw: number;
                pitch: number;
                rotation: number;
                target: string;
            }[];
            infoHotspots?: {
                yaw: number;
                pitch: number;
                title: string;
                text: string;
            }[];
        }[];
    };

    lang: string
}

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


const ResepsiVirtual: React.FC<PanoProps> = ({ dataPano, lang }) => {
    const panoRef = useRef<HTMLDivElement | null>(null);

    const opening = useRef<HTMLDivElement | null>(null);
    const birthdayCard = useRef<HTMLDivElement | null>(null);
    const cardFront = useRef<HTMLDivElement | null>(null);
    const openingTouch = useRef<HTMLDivElement | null>(null);

    const ucapkanSelamat = useRef<HTMLDivElement | null>(null);
    const berikanHadiah = useRef<HTMLDivElement | null>(null);
    const checkout = useRef<HTMLDivElement | null>(null);
    const lihatKenanganVirtual = useRef<HTMLDivElement | null>(null);
    const keluarResepsi = useRef<HTMLDivElement | null>(null);


    const INFORMATIVEUCAPANSELAMAT = useRef<HTMLDivElement | null>(null);

    const gantiUcapan = useRef<HTMLButtonElement | null>(null);
    const gantiHadiah = useRef<HTMLButtonElement | null>(null);


    const lookToHadiah = useRef<HTMLButtonElement | null>(null);
    const lookToHadiah2 = useRef<HTMLButtonElement | null>(null);
    const lookToKonfirmasi = useRef<HTMLButtonElement | null>(null);
    const lookToKonfirmasi2 = useRef<HTMLButtonElement | null>(null);
    const lookToEnd = useRef<HTMLButtonElement | null>(null);

    const backButton = useRef<HTMLButtonElement>(null);
    const nextButton = useRef<HTMLButtonElement>(null);


    // KORIDOR
    const bridePicture1 = useRef(null);
    const bridePicture2 = useRef(null);
    const bridePicture3 = useRef(null);
    const bridePicture4 = useRef(null);
    const bridePicture5 = useRef(null);
    const bridePicture6 = useRef(null);
    const bridePicture7 = useRef(null);

    // FRONT
    const bridePicture8 = useRef(null);
    const bridePicture9 = useRef(null);
    const bridePicture10 = useRef(null);
    const bridePicture11 = useRef(null);

    // BACK
    const bridePicture12 = useRef(null);
    const bridePicture13 = useRef(null);
    const bridePicture14 = useRef(null);
    const bridePicture15 = useRef(null);
    const bridePicture16 = useRef(null);
    const bridePicture17 = useRef(null);
    const bridePicture18 = useRef(null);


    const wedding = useSelector((state: RootState) => state.value.wedding);
    const guest = useSelector((state: RootState) => state.value.guest);
    const IMAGE_URL = 'sgp1.vultrobjects.com/virtuwed-storage';

    const router = useRouter();

    const [digitalGift, setDigitalGift] = useState(gifts[0])
    const mainGifts = gifts.slice(0, 4)

    // UCAPAN SELAMAT
    const [ucapanSelamat, setUcapanSelamat] = useState('')

    // CHECKOUT VALIDATION
    const [loading, setLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);


    // BUTTON NAVIGATION CHECKUP
    const [isBackButtonDisabled, setIsBackButtonDisabled] = useState(true);
    const [isNextButtonDisabled, setIsNextButtonDisabled] = useState(false);


    // PREVIEW HANDLER
    const fileTypes = ["JPG", "JPEG", "PNG", "GIF", "TIFF", "PSD", "EPS", "AI", "RAW", "INDD", "MP4", "MOV", "AVI", "WMV", "AVCHD", "WebM", "FLV"];
    const [file, setFile] = useState<File | null>(null)
    const handleChange = (file: File) => {
        setFile(file);
    };

    const modalUcapanSelamat = useDisclosure()
    const modalInformativeUcapanSelamat = useDisclosure()
    const modalHadiah = useDisclosure()
    const modalInformativeHadiah = useDisclosure()
    const modalKonfirmasi = useDisclosure()
    const modalLivestream = useDisclosure()

    const modalInformativeError = useDisclosure()

    // LIHAT KV & KELUAR RV
    const handleLihatKV = () => {
        router.push(`/${lang}/${wedding.wedding_slug}/${guest.guest_slug}/menu/kenanganvirtual?place=panoScenes[0]`);
    };
    const handleKeluarRV = () => {
        router.push(`/${lang}/${wedding.wedding_slug}/${guest.guest_slug}/`);
    };

    const handleKonfirmasi = async () => {
        // e.preventDefault();
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
                console.log(postUcapanResepsiVirtual.data);
            }

            // Set loading to false when the submission is done, whether it succeeded or failed
            setIsSuccess(true)
        } catch (error) {
            setIsSuccess(false)
            console.log('error gan');
            modalInformativeError.onOpen()

            // alert(error)
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const {
            settings: { mouseViewMode },
            scenes,
        } = dataPano;

        // Check if window is defined (client-side)
        if (typeof window !== 'undefined') {
            const Marzipano = require('marzipano'); // Use require to import Marzipano dynamically on the client-side
            const viewerOpts = {
                controls: { mouseViewMode },
            };

            const viewer = new Marzipano.Viewer(panoRef.current, viewerOpts);

            const panoScenes = scenes.map((sceneData: any) => {
                const { id, name, levels, faceSize, initialViewParameters, linkHotspots, infoHotspots } = sceneData;

                const urlPrefix = "/assets/ResepsiVirtual/equirectangular";
                const source = Marzipano.ImageUrlSource.fromString(
                    `${urlPrefix}/${id}`,
                    { cubeMapPreviewUrl: `${urlPrefix}/${id}` }
                );

                const limiter = Marzipano.RectilinearView.limit.traditional(
                    faceSize,
                    (100 * Math.PI) / 180,
                    (120 * Math.PI) / 180
                );
                const view = new Marzipano.RectilinearView(initialViewParameters, limiter);
                const geometry = new Marzipano.EquirectGeometry(levels);

                const scene = viewer.createScene({
                    source,
                    geometry,
                    view,
                    pinFirstLevel: true,
                });

                const createLinkHotspotElement = (hotspot: any) => {

                    // Create wrapper element to hold icon and tooltip.
                    var wrapper = document.createElement('div');
                    wrapper.classList.add('hotspot');
                    wrapper.classList.add('link-hotspot');

                    // Create image element.
                    var icon = document.createElement('img');
                    icon.src = '/assets/kenanganVirtual/link.png';
                    icon.classList.add('link-hotspot-icon');

                    // Set rotation transform.
                    // var transformProperties = ['-ms-transform', '-webkit-transform', 'transform'];
                    // for (var i = 0; i < transformProperties.length; i++) {
                    //     var property = transformProperties[i];
                    //     icon.style[property] = 'rotate(' + hotspot.rotation + 'rad)';
                    // }



                    // Add click event handler.
                    wrapper.addEventListener('click', function () {
                        switchScene(findSceneById(hotspot.target));
                    });

                    // Prevent touch and scroll events from reaching the parent element.
                    // This prevents the view control logic from interfering with the hotspot.
                    // stopTouchAndScrollEventPropagation(wrapper);

                    // Create tooltip element.
                    var tooltip = document.createElement('div');
                    tooltip.classList.add('hotspot-tooltip');
                    tooltip.classList.add('link-hotspot-tooltip');


                    const sceneData = findSceneDataById(hotspot.target);
                    if (sceneData) {
                        tooltip.innerHTML = sceneData.name;
                    }
                    // tooltip.innerHTML = findSceneDataById(hotspot.target).name;

                    wrapper.appendChild(icon);
                    wrapper.appendChild(tooltip);

                    return wrapper;
                }

                const findSceneById = (id: string) => {
                    for (var i = 0; i < scenes.length; i++) {
                        if (panoScenes[i].sceneData.id === id) {
                            return panoScenes[i];
                        }
                    }
                    return null;
                }

                const findSceneDataById = (id: string) => {
                    for (var i = 0; i < scenes.length; i++) {
                        if (scenes[i].id === id) {
                            return scenes[i];
                        }
                    }
                    return null;
                }


                // Create link hotspots.
                linkHotspots.forEach(function (hotspot: any) {
                    var element = createLinkHotspotElement(hotspot);
                    scene.hotspotContainer().createHotspot(element, { yaw: hotspot.yaw, pitch: hotspot.pitch });
                });

                return {
                    sceneData,
                    scene,
                    view,
                };
            });


            let tempattempat: String

            const nextButtonLogic = () => {
                console.log(tempattempat + '<-- itu bang')

                switch (tempattempat) {
                    case "Koridor.webp":
                        switchScene(panoScenes[1]);
                        setIsBackButtonDisabled(false)
                        console.log("ke depan yaa");

                        setTimeout(function () {
                            modalUcapanSelamat.onOpen();
                            checklookToHadiah()
                        }, 1500);
                        break;

                    case "Front.webp":
                        console.log("ke koridor yaa");

                        modalUcapanSelamat.onOpen();
                        checklookToHadiah()
                        break;

                    case "Back.webp":
                        console.log("ke finish yaa");
                        modalKonfirmasi.onOpen();
                        setTimeout(() => {
                            handleClickCheckout()
                        }, 0);
                        break;

                    default:
                        console.log("this if default");
                        break;
                }
            };
            const backButtonLogic = () => {
                console.log(tempattempat + '<-- itu bang')

                switch (tempattempat) {
                    case "Koridor.webp":
                        break;

                    case "Front.webp":
                        switchScene(panoScenes[0]);
                        setIsBackButtonDisabled(true)
                        break;

                    case "Back.webp":
                        switchScene(panoScenes[1])
                        setIsNextButtonDisabled(false)
                        panoScenes[1].scene.lookTo({ yaw: 0, pitch: -0.056795042541741836 }, { transitionDuration: 0 })

                        setTimeout(function () {
                            modalUcapanSelamat.onOpen()
                            setTimeout(() => {
                                checklookToHadiah()
                            }, 0);
                        }, 1500);
                        break;

                    default:
                        console.log("this if default");
                        break;
                }
            };


            const switchScene = (scene: any) => {
                // stopAutorotate();
                // scene.view.setParameters(scene.initialViewParameters);
                // updateSceneName(scene);
                scene.scene.switchTo();
                // setTempat(scene.sceneData.id)
                tempattempat = scene.sceneData.id
                console.log('kita lagi ada di: ' + tempattempat);
                // Add a single event listener for the current scene

            }

            switchScene(panoScenes[0])
            nextButton.current?.addEventListener('click', nextButtonLogic);
            backButton.current?.addEventListener('click', backButtonLogic);



            const onLoad = () => {
                setTimeout(function () {
                    birthdayCard.current?.classList.add('birthdayCard');
                    birthdayCard.current?.classList.add('titleGuestBook');
                    cardFront.current?.classList.add('cardFront');
                }, 1000);
                setTimeout(function () {
                    opening.current?.classList.remove('opacity-100');
                    opening.current?.classList.add('opacity-0');
                    openingTouch.current?.classList.remove('hidden');
                    panoRef.current?.classList.remove('saturate-0');
                }, 4000);
                setTimeout(function () {
                    opening.current?.classList.add('hidden');
                }, 4500);
                setTimeout(function () {
                    openingTouch.current?.classList.add('hidden');
                }, 7000);
            }

            onLoad()

            // ===================================================================================================================

            var options = {
                transitionDuration: 1000
            }



            // LOOK TO HADIAH
            const handleClicklookToHadiah = (e: Event) => {
                e.preventDefault()

                const lookToHadiah2Func = () => {
                    if (berikanHadiah.current && berikanHadiah.current?.classList.contains('invisible')) {
                        berikanHadiah.current?.classList.remove('invisible');
                    }
                    modalUcapanSelamat.onClose()
                    panoScenes[1].scene.lookTo({ yaw: 1.4731802513717511, pitch: 0.17922631245596676 }, options);

                    setTimeout(function () {
                        modalHadiah.onOpen()
                        setTimeout(() => {
                            checklookToKonfirmasi()
                        }, 0);
                    }, 1500);
                }

                setTimeout(() => {
                    lookToHadiah2.current?.addEventListener('click', lookToHadiah2Func)
                }, 100);
            };

            const checklookToHadiah = () => {
                setTimeout(() => {
                    lookToHadiah.current?.addEventListener('click', handleClicklookToHadiah);
                    lookToHadiah.current?.addEventListener('touchstart', handleClicklookToHadiah);
                }, 0);
            };


            // LOOK TO KONFIRMASI 
            const handleClicklookToKonfirmasi = (e: Event) => {
                e.preventDefault()

                const lookToKonfirmasi2Func = () => {
                    modalHadiah.onClose()
                    panoScenes[1].scene.lookTo({ yaw: -3.1149072553601655, pitch: -0.0070584653244445406 }, options);

                    setTimeout(function () {
                        switchScene(panoScenes[2]);
                        panoScenes[2].scene.lookTo({ pitch: -0.1851510231312865, yaw: 3.1373107204237645, }, { transitionDuration: 0 })

                        setTimeout(function () {
                            panoScenes[2].scene.lookTo({ yaw: 1.6829013691100227, pitch: 0.21238892003715293 }, options);
                            setTimeout(function () {
                                modalKonfirmasi.onOpen()
                                setTimeout(() => {
                                    handleClickCheckout()
                                }, 0);
                            }, 1500);
                        }, 1500);
                    }, 1500);
                }
                setTimeout(() => {
                    lookToKonfirmasi2.current?.addEventListener('click', lookToKonfirmasi2Func)
                }, 100);
            };

            const checklookToKonfirmasi = () => {
                setTimeout(() => {
                    lookToKonfirmasi.current?.addEventListener('click', handleClicklookToKonfirmasi);
                    lookToKonfirmasi.current?.addEventListener('touchstart', handleClicklookToKonfirmasi);
                }, 0);
            };

            // LOOK TO END
            const handleClickCheckout = () => {
                setTimeout(() => {
                    lookToEnd.current?.addEventListener('click', async function () {
                        try {
                            await handleKonfirmasi();

                            modalKonfirmasi.onClose()
                            if (keluarResepsi.current && keluarResepsi.current?.classList.contains('invisible')) {
                                keluarResepsi.current?.classList.remove('invisible');
                            }
                            if (lihatKenanganVirtual.current && lihatKenanganVirtual.current?.classList.contains('invisible')) {
                                lihatKenanganVirtual.current?.classList.remove('invisible');
                            }
                            panoScenes[2].scene.lookTo({ yaw: 3.1373107204237645, pitch: -0.1851510231312865 }, options);
                            setIsNextButtonDisabled(true)
                        } catch (error) {
                            console.error('Error in click event listener:', error);
                            alert('Error during click event');
                        }
                    });


                    gantiUcapan.current?.addEventListener('click', function () {
                        switchScene(panoScenes[1])
                        setIsNextButtonDisabled(false)
                        panoScenes[1].scene.lookTo({ yaw: 0, pitch: -0.056795042541741836 }, { transitionDuration: 0 })

                        setTimeout(function () {
                            modalUcapanSelamat.onOpen()
                            setTimeout(() => {
                                checklookToHadiah()
                            }, 0);
                        }, 1500);
                    })

                    gantiHadiah.current?.addEventListener('click', function () {
                        switchScene(panoScenes[1])
                        setIsNextButtonDisabled(false)
                        panoScenes[1].scene.lookTo({ yaw: 1.4731802513717511, pitch: 0.17922631245596676 }, { transitionDuration: 0 })

                        setTimeout(function () {
                            modalHadiah.onOpen()
                            setTimeout(() => {
                                checklookToKonfirmasi()
                            }, 0);
                        }, 1500);
                    })
                }, 0);
            };




            ucapkanSelamat.current?.addEventListener('click', checklookToHadiah)
            ucapkanSelamat.current?.addEventListener('touchstart', checklookToHadiah)

            berikanHadiah.current?.addEventListener('click', checklookToKonfirmasi)
            berikanHadiah.current?.addEventListener('touchstart', checklookToKonfirmasi)

            checkout.current?.addEventListener('click', handleClickCheckout)
            checkout.current?.addEventListener('touchstart', handleClickCheckout)

            // ==================================================================================================

            const containerKoridor = panoScenes[0].scene.hotspotContainer();
            if (containerKoridor) {
                containerKoridor.createHotspot(bridePicture1.current, { yaw: -1.164598164451725, pitch: -0.3047599598934614 },
                    { perspective: { radius: 2080, extraTransforms: "rotateY(25deg) rotateX(15deg) rotateZ(7deg)" } });
                containerKoridor.createHotspot(bridePicture2.current, { yaw: -0.7283039004229686, pitch: -0.06379271830326516 },
                    { perspective: { radius: 3830, extraTransforms: "rotateY(46deg) rotateX(3deg) rotateZ(3deg)" } });
                containerKoridor.createHotspot(bridePicture3.current, { yaw: -0.38660091738350033, pitch: 0.0854400652578704 },
                    { perspective: { radius: 4550, extraTransforms: "rotateY(7deg) rotateX(12deg) rotateZ(-0.75deg)" } });
                containerKoridor.createHotspot(bridePicture4.current, { yaw: 0.16648722780547587, pitch: 0.04460063328119723 },
                    { perspective: { radius: 8850, extraTransforms: "rotateY(-45deg) rotateX(12deg) rotateZ(2deg)" } });
                containerKoridor.createHotspot(bridePicture5.current, { yaw: 0.3852822083866734, pitch: 0.08653882466922802 },
                    { perspective: { radius: 4550, extraTransforms: "rotateY(-7deg) rotateX(12deg) rotateZ(0.75deg)" } });
                containerKoridor.createHotspot(bridePicture6.current, { yaw: 0.7285051078120084, pitch: -0.06574146003724834 },
                    { perspective: { radius: 3830, extraTransforms: "rotateY(-46deg) rotateX(3deg) rotateZ(-3deg)" } });
                containerKoridor.createHotspot(bridePicture7.current, { yaw: 1.1642880111712266, pitch: -0.30463877068957146 },
                    { perspective: { radius: 2080, extraTransforms: "rotateY(-25deg) rotateX(15deg) rotateZ(-7deg)" } });

            } else {
                console.error("Element with ID 'iframespot' not found.");
            }

            const containerFront = panoScenes[1].scene.hotspotContainer();
            if (containerFront) {
                containerFront.createHotspot(ucapkanSelamat.current, { yaw: 0, pitch: -0.056795042541741836 },
                    { perspective: { radius: 300, extraTransforms: "rotateY(0deg)" } });
                containerFront.createHotspot(berikanHadiah.current, { yaw: 1.4731802513717511, pitch: 0.17922631245596676 },
                    { perspective: { radius: 300, extraTransforms: "rotateY(0deg)" } });
                containerFront.createHotspot(bridePicture8.current, { yaw: 2.7664720145284134, pitch: -0.13936477893798127 },
                    { perspective: { radius: 9000, extraTransforms: "rotateY(-18deg) rotateX(8deg) rotateZ(-3deg)" } });
                containerFront.createHotspot(bridePicture9.current, { yaw: 2.896924155498631, pitch: -0.1448877727448732 },
                    { perspective: { radius: 8700, extraTransforms: "rotateY(-12deg) rotateX(8deg) rotateZ(-2deg)" } });
                containerFront.createHotspot(bridePicture10.current, { yaw: -2.898176835461687, pitch: -0.1445024049846424 },
                    { perspective: { radius: 8700, extraTransforms: "rotateY(12deg) rotateX(8deg) rotateZ(2deg)" } });
                containerFront.createHotspot(bridePicture11.current, { yaw: -2.767850265539211, pitch: -0.13883335444879563 },
                    { perspective: { radius: 9000, extraTransforms: "rotateY(18deg) rotateX(8deg) rotateZ(3deg)" } });

            } else {
                console.error("Element with ID 'iframespot' not found.");
            }


            const containerBack = panoScenes[2].scene.hotspotContainer();
            if (containerBack) {
                // INFOSPOT 
                containerBack.createHotspot(checkout.current, { yaw: 1.6829013691100227, pitch: 0.21238892003715293 },
                    { perspective: { radius: 300, extraTransforms: "rotateY(5deg)" } });
                containerBack.createHotspot(lihatKenanganVirtual.current, { yaw: 3.1373107204237645, pitch: -0.1851510231312865 },
                    { perspective: { radius: 300, extraTransforms: "rotateY(0deg)" } });
                containerBack.createHotspot(keluarResepsi.current, { yaw: 3.1409142956927933, pitch: 0.004879153410453085 },
                    { perspective: { radius: 300, extraTransforms: "rotateY(0deg)" } });


                containerBack.createHotspot(bridePicture12.current, { yaw: 0.7700412269389645, pitch: 0.17738112076748713 },
                    { perspective: { radius: 2200, extraTransforms: "rotateY(-16deg) rotateX(6deg) rotateZ(3deg)" } });

                containerBack.createHotspot(bridePicture13.current, { yaw: 2.0441387920684173, pitch: -0.3269953170850819 },
                    { perspective: { radius: 3950, extraTransforms: "rotateY(-64deg) rotateX(8deg) rotateZ(-16deg)" } });

                containerBack.createHotspot(bridePicture14.current, { yaw: 2.250330714266445, pitch: -0.43670196647323856 },
                    { perspective: { radius: 2980, extraTransforms: "rotateY(-53.5deg) rotateX(15deg) rotateZ(-19.5deg)" } });

                containerBack.createHotspot(bridePicture15.current, { yaw: 2.739585960629082, pitch: -0.037810082463801464 },
                    { perspective: { radius: 6650, extraTransforms: "rotateY(65.5deg) rotateX(0.5deg) rotateZ(2deg)" } });

                containerBack.createHotspot(bridePicture16.current, { yaw: -2.7404817812359674, pitch: -0.0385358756343539 },
                    { perspective: { radius: 6650, extraTransforms: "rotateY(-65.5deg) rotateX(0.5deg) rotateZ(-2deg)" } });

                containerBack.createHotspot(bridePicture17.current, { yaw: -2.250996098602439, pitch: -0.4365461346165951 },
                    { perspective: { radius: 2980, extraTransforms: "rotateY(53.5deg) rotateX(15deg) rotateZ(19.5deg)" } });

                containerBack.createHotspot(bridePicture18.current, { yaw: -2.045404274690286, pitch: -0.3277844486449055 },
                    { perspective: { radius: 3950, extraTransforms: "rotateY(64deg) rotateX(8deg) rotateZ(16deg)" } });

            } else {
                console.error("Element with ID 'iframespot' not found.");
            }

            // CHECK COORDS
            // var pano = panoRef.current;
            // pano?.addEventListener('click', (e: any) => {
            //     var view = viewer.view();
            //     console.log(view.screenToCoordinates({ x: e.clientX, y: e.clientY }))
            // });




            return () => {
                ucapkanSelamat.current?.removeEventListener('click', checklookToHadiah)
                ucapkanSelamat.current?.removeEventListener('touchstart', checklookToHadiah)
                lookToHadiah.current?.removeEventListener('click', handleClicklookToHadiah);
                lookToHadiah.current?.removeEventListener('touchstart', handleClicklookToHadiah);

                berikanHadiah.current?.removeEventListener('click', checklookToKonfirmasi)
                berikanHadiah.current?.removeEventListener('touchstart', checklookToKonfirmasi)
                lookToKonfirmasi.current?.addEventListener('click', handleClicklookToKonfirmasi);
                lookToKonfirmasi.current?.addEventListener('touchstart', handleClicklookToKonfirmasi);


                checkout.current?.removeEventListener('click', handleClickCheckout)
                checkout.current?.removeEventListener('touchstart', handleClickCheckout)

                nextButton.current?.removeEventListener('click', nextButtonLogic);
                backButton.current?.removeEventListener('click', backButtonLogic);
            }
        }


        // }, [dataPano]);
    }, [])



    return (
        <>
            {/* <div className="light h-full w-full absolute " ref={panoRef} ></div> */}
            <div className="light h-full w-full absolute saturate-0 transition-all duration-1000 delay-[3000ms]" ref={panoRef} ></div>

            {/* OPENING */}
            <div ref={opening} className='transition-opacity duration-500 opacity-100 absolute w-full h-full z-50'
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
                        ref={birthdayCard}
                        style={{
                            transformStyle: 'preserve-3d',
                            transform: 'perspective(2500px)',
                            transition: '1s',
                        }}
                        // className='relative w-64 h-96 cursor-pointer birthdayCard titleGuestBook'>
                        className='relative w-64 h-96 cursor-pointer'>
                        <div
                            ref={cardFront}
                            style={{
                                transformOrigin: 'left',
                                transition: '.6s',
                            }}
                            // className='cardFront grid justify-center content-center relative bg-guestBookCover bg-contain bg-no-repeat bg-center w-full h-full overflow-hidden '>
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
            <div ref={openingTouch} id="openingTouch" className='hidden pointer-events-none absolute w-full h-full z-40'
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

            {/* NAVIGATION */}
            <div className='fixed bottom-0 left-0 w-full p-3'>
                <div className='bg-White py-3 rounded-lg max-w-lg mx-auto'>
                    <ButtonGroup className='w-full !h-full' size='lg'>
                        <Button ref={backButton} isDisabled={isBackButtonDisabled} startContent={<i className="ri-arrow-left-s-line ri-xl"></i>} className='w-full text-N800 bg-White'>
                            <p className='l3-r font-deAetna'>Kembali</p>
                        </Button>
                        <Button radius='sm' className='!rounded !h-full gap-1.5 grid grid-flow-row w-full bg-gradient-to-r from-primaryGradient-start to-primaryGradient-end text-white py-2' onPress={modalLivestream.onOpen}>
                            <i className="ri-live-line ri-xl"></i>
                            <p className='l3-r font-deAetna'>Livestream</p>
                        </Button>
                        <Button ref={nextButton} isDisabled={isNextButtonDisabled} endContent={<i className="ri-arrow-right-s-line ri-xl"></i>} className='w-full text-N800 bg-White'>
                            <p className='l3-r font-deAetna'>Selanjutnya</p>
                        </Button>
                    </ButtonGroup>
                </div>

            </div>
            <Modal
                className='h-dvh bg-White overflow-scroll m-0 p-0'
                size={'full'}
                placement='top-center'
                hideCloseButton
                isOpen={modalLivestream.isOpen}
                onOpenChange={modalLivestream.onOpenChange}
                radius='sm'
            >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalBody className='p-0 m-0'>
                                <div className='w-full h-full relative'>
                                    {/* NAVBAR */}
                                    <div className='bg-dark flex gap-x-2.5 justify-items-center justify-center items-center w-full h-14 fixed top-0 left-0'>
                                        {/* <button onClick={() => document.querySelector('#livestreamContainer')?.classList.toggle('hidden')} className='z-10 absolute left-6 flex justify-self-start'>
                                            <i className="ri-arrow-left-s-line ri-xl text-white"></i>
                                        </button> */}
                                        <Button className='z-10 absolute left-2 flex justify-self-start' onPress={modalLivestream.onClose} isIconOnly color='secondary' variant='light' aria-label="Close">
                                            <i className="ri-arrow-left-s-line ri-xl text-white"></i>
                                        </Button>
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
                                        <Input size='sm' type="text" variant={'flat'} placeholder="Type your comment..." />
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
                                                <Button className='rounded mt-3 z-10' color='secondary' startContent={<i className="ri-gift-line ri-xl"></i>}>
                                                    <p className='l2-r font-deAetna'>kirim hadiah</p>
                                                </Button>
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
                            </ModalBody >
                        </>
                    )}
                </ModalContent >
            </Modal >

            {/* KORIDOR */}
            <div ref={bridePicture1} className='relative w-[1024px] h-[768px]'>
                <Image
                    src={`https://sgp1.vultrobjects.com/virtuwed-storage/` + wedding.media.prewedding_photos[0]}
                    alt="Moment pengantin"
                    className="object-cover object-center min-w-full w-full h-full"
                    width={500}
                    height={500}
                    priority
                    id='bridePicture1Click'
                />
            </div >
            <div ref={bridePicture2} className='relative w-[1350px] h-[1080px]'>
                <Image
                    src={`https://sgp1.vultrobjects.com/virtuwed-storage/` + wedding.media.prewedding_photos[1]}
                    alt="Moment pengantin"
                    className="object-cover object-center min-w-full w-full h-full"
                    width={500}
                    height={500}
                    priority
                    id='bridePicture1Click'
                />
            </div >
            <div ref={bridePicture3} className='relative h-[1024px] w-[768px]'>
                <Image
                    src={`https://sgp1.vultrobjects.com/virtuwed-storage/` + wedding.media.prewedding_photos[2]}
                    alt="Moment pengantin"
                    className="object-cover object-center min-w-full w-full h-full"
                    width={500}
                    height={500}
                    priority
                    id='bridePicture1Click'
                />
            </div >
            <div ref={bridePicture4} className='relative h-[1024px] w-[768px]'>
                <Image
                    src={`https://sgp1.vultrobjects.com/virtuwed-storage/` + wedding.media.prewedding_photos[3]}
                    alt="Moment pengantin"
                    className="object-cover object-center min-w-full w-full h-full"
                    width={500}
                    height={500}
                    priority
                    id='bridePicture1Click'
                />
            </div >
            <div ref={bridePicture5} className='relative h-[1024px] w-[768px]'>
                <Image
                    src={`https://sgp1.vultrobjects.com/virtuwed-storage/` + wedding.media.prewedding_photos[4]}
                    alt="Moment pengantin"
                    className="object-cover object-center min-w-full w-full h-full"
                    width={500}
                    height={500}
                    priority
                    id='bridePicture1Click'
                />
            </div >
            <div ref={bridePicture6} className='relative w-[1350px] h-[1080px]'>
                <Image
                    src={`https://sgp1.vultrobjects.com/virtuwed-storage/` + wedding.media.prewedding_photos[5]}
                    alt="Moment pengantin"
                    className="object-cover object-center min-w-full w-full h-full"
                    width={500}
                    height={500}
                    priority
                    id='bridePicture1Click'
                />
            </div >
            <div ref={bridePicture7} className='relative w-[1024px] h-[768px]'>
                <Image
                    src={`https://sgp1.vultrobjects.com/virtuwed-storage/` + wedding.media.prewedding_photos[6]}
                    alt="Moment pengantin"
                    className="object-cover object-center min-w-full w-full h-full"
                    width={500}
                    height={500}
                    priority
                    id='bridePicture1Click'
                />
            </div >

            {/* FRONT */}
            <div ref={ucapkanSelamat}>
                <Button startContent={<i className="ri-message-2-line ri-lg"></i>} color='secondary' className='rounded' onPress={modalUcapanSelamat.onOpen}>
                    <p className='l2-r font-deAetna'>Ucapkan Selamat</p>
                </Button>
            </div>
            <div ref={berikanHadiah} className='invisible'>
                <Button startContent={<i className="ri-gift-line ri-lg"></i>} color='secondary' className='rounded' onPress={modalHadiah.onOpen}>
                    <p className='l2-r font-deAetna'>Berikan Hadiah</p>
                </Button>
            </div>
            {/* MODAL UCAPAN SELAMAT */}
            <Modal className='light light:text-black mx-6 bg-White'
                scrollBehavior='inside'
                isOpen={modalUcapanSelamat.isOpen}
                onOpenChange={modalUcapanSelamat.onOpenChange}
                placement='center'
                radius='sm'
            >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader>
                                <div className='text-center w-full'>
                                    <h3 className='text-N800 capitalize'>berikan ucapan selamat</h3>
                                    <p className='text-N700 p3-r'>Anda dapat memberikan ucapan melalui video ataupun foto</p>
                                </div>
                            </ModalHeader>
                            <ModalBody>
                                < div className='grid gap-3 w-full border border-tertiary rounded-b pt-6 px-3 pb-3 overflow-x-hidden' >
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
                                                value={ucapanSelamat}
                                                onChange={
                                                    (e) => setUcapanSelamat(e.target.value)
                                                }
                                            />

                                        </form>
                                    </div>

                                    <Button ref={lookToHadiah} id='lookToHadiah' onPress={modalInformativeUcapanSelamat.onOpen} className='rounded' color='secondary' startContent={<i className="ri-send-plane-line ri-xl"></i>} >
                                        <p className='l2-r font-deAetna'>kirim ucapan</p>
                                    </Button>




                                </ div >

                                {/* DECORATION */}
                                < div className='grid' >
                                    < Image
                                        src={
                                            '/assets/virtuwed/accent/vintage-ornaments.png'
                                        }
                                        alt="decoration"
                                        width={110}
                                        height={110}
                                        className='opacity-50 h-auto w-52 grid justify-self-center -scale-y-100'
                                    />
                                </ div>
                            </ModalBody >
                        </>
                    )}
                </ModalContent >
            </Modal >

            {/* MODAL INFORMATIVE UCAPAN SELAMAT */}
            <Modal
                ref={INFORMATIVEUCAPANSELAMAT}
                className='bg-White py-8'
                hideCloseButton
                isOpen={modalInformativeUcapanSelamat.isOpen}
                onOpenChange={modalInformativeUcapanSelamat.onOpenChange}
            >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalBody className='grid justify-items-center'>
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
                                    <Button startContent={<i className='ri-message-3-line ri-xl' />} className='rounded w-full' color='secondary' onPress={onClose}>
                                        <p className='l2-r font-deAetna'>
                                            {
                                                file != undefined
                                                    ? 'Ganti Ucapan'
                                                    :
                                                    ucapanSelamat != '' ? 'Ganti Ucapan' : 'Beri Ucapan'
                                            }
                                        </p>
                                    </Button>
                                    <Button
                                        ref={lookToHadiah2}
                                        onPress={onClose}
                                        startContent={<>{file != undefined
                                            ? <i className='ri-arrow-right-s-line ri-xl' />
                                            : ucapanSelamat != ''
                                                ? <i className='ri-arrow-right-s-line ri-xl' />
                                                : <i className='ri-check-line ri-xl' />}</>}
                                        className='rounded w-full bg-transparent text-tertiary border-tertiary border' variant='bordered'>
                                        <p className='l2-r font-deAetna'>
                                            {
                                                file != undefined
                                                    ? 'Lanjut'
                                                    :
                                                    ucapanSelamat != '' ? 'Lanjut' : 'Yakin'
                                            }
                                        </p>
                                    </Button>
                                </form>
                            </ModalBody>
                        </>
                    )}

                </ModalContent>
            </Modal >

            {/* MODAL HADIAH */}
            < Modal
                className='h-dvh bg-White overflow-scroll py-4'
                size={'full'}
                placement='top-center'
                isOpen={modalHadiah.isOpen}
                onClose={modalHadiah.onClose}
            >
                <ModalContent className='bg-White'>
                    {(onClose) => (
                        <>
                            <ModalHeader>
                                <div className='text-center w-full'>
                                    <h3 className='text-N800 capitalize'>berikan hadiah digital</h3>
                                    <p className='text-N700 p3-r'>Hadiah digital hanya merupakan simbolis, pengantin akan menerima nominal dari hadiah yang anda berikan</p>
                                </div>
                            </ModalHeader>
                            <ModalBody className='grid justify-items-center'>
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

                                    {/* TRY USING NEXTUI LIB */}
                                    {/* <RadioGroupNextUI
                                        color="secondary"
                                        defaultValue="buket bunga"
                                        className='w-full grid gap-3'
                                    >
                                        <div className="grid grid-cols-2 gap-y-3 gap-x-1">
                                            {mainGifts.map((gift) => (
                                                <Radio value={gift.name}
                                                    style={{ background: `linear-gradient(357deg, #000 -23.05%, rgba(0, 0, 0, 0.00) 97.17%), url('${gift.img}') center/cover no-repeat`, }}
                                                    className='grid max-w-full h-36 rounded-md bg-center bg-cover p-1.5 items-end m-0 justify-start cursor-pointer data-[selected=true]:border-secondary data-[selected=true]:border-solid border-4 border-none'>
                                                    <div className='grid justify-items-start text-white text-start'>
                                                        <p className='l4-r font-deAetna capitalize'>{gift.name}</p>
                                                        <p className='text-[8px] capitalize'>{gift.price}</p>
                                                    </div>
                                                </Radio>
                                            ))}
                                        </div>

                                        <div className='flex gap-2.5 justify-center items-center'>
                                            <div className='h-1 w-11 rounded-full bg-secondary'></div>
                                            <p className='l3-r font-deAetna'>Atau</p>
                                            <div className='h-1 w-11 rounded-full bg-secondary'></div>
                                        </div>

                                        <Radio value={'a'}
                                            className='flex w-full border border-tertiary px-3 rounded items-center py-3 relative cursor-pointer data-[selected=true]:bg-tertiary data-[selected=true]:text-White text-tertiary'>
                                            <i className="ri-message-3-line ri-xl absolute"></i>
                                            <p className='capitalize w-full text-center font-deAetna l3-r'>{gifts[5].name}</p>
                                        </Radio>

                                    </RadioGroupNextUI> */}


                                    <Button ref={lookToKonfirmasi} className='rounded mt-3' color='secondary' startContent={<i className="ri-gift-line ri-xl" />} onPress={modalInformativeHadiah.onOpen}>
                                        <p className='l2-r font-deAetna'>kirim hadiah</p>
                                    </Button>
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
                            </ModalBody>
                        </>
                    )}
                </ModalContent>
            </ Modal >

            {/* MODAL INFORMATIVE HADIAH */}
            < Modal
                className='bg-White py-8'
                hideCloseButton
                isOpen={modalInformativeHadiah.isOpen}
                onOpenChange={modalInformativeHadiah.onOpenChange} >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalBody className='grid justify-items-center'>
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
                                                ? `Apakah anda yakin hanya memberi ucapan saja kepada ${wedding.wedding_name}?`
                                                : `${wedding.wedding_name} sangat senang dengan pemberian anda`
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

                                <form className='flex gap-1 w-full' method="dialog">
                                    {/* if there is a button, it will close the modal */}
                                    <Button startContent={<i className='ri-message-3-line ri-xl' />} className='rounded w-full' color='secondary' onPress={onClose}>
                                        <p className='l2-r font-deAetna'>
                                            {
                                                digitalGift === gifts[5]
                                                    ? 'Beri Hadiah'
                                                    : 'Ganti Hadiah'
                                            }
                                        </p>
                                    </Button>
                                    <Button
                                        ref={lookToKonfirmasi2}
                                        onPress={onClose}
                                        startContent={<>{digitalGift === gifts[5]
                                            ? <i className='ri-check-line ri-xl' />
                                            : <i className='ri-arrow-right-s-line ri-xl' />}</>}
                                        className='rounded w-full bg-transparent text-tertiary border-tertiary border' variant='bordered'>
                                        <p className='l2-r font-deAetna'>
                                            {
                                                digitalGift === gifts[5]
                                                    ? 'Yakin'
                                                    : 'Lanjut'
                                            }
                                        </p>
                                    </Button>
                                </form>
                            </ModalBody>
                        </>
                    )}
                </ModalContent>
            </ Modal >

            <div ref={bridePicture8} className='relative h-[1024px] w-[768px]'>
                <Image
                    src={`https://sgp1.vultrobjects.com/virtuwed-storage/` + wedding.media.prewedding_photos[7]}
                    alt="Moment pengantin"
                    className="object-cover object-center min-w-full w-full h-full"
                    width={500}
                    height={500}
                    priority
                    id='bridePicture1Click'
                />
            </div >

            <div ref={bridePicture9} className='relative h-[1024px] w-[768px]'>
                <Image
                    src={`https://sgp1.vultrobjects.com/virtuwed-storage/` + wedding.media.prewedding_photos[8]}
                    alt="Moment pengantin"
                    className="object-cover object-center min-w-full w-full h-full"
                    width={500}
                    height={500}
                    priority
                    id='bridePicture1Click'
                />
            </div >

            <div ref={bridePicture10} className='relative h-[1024px] w-[768px]'>
                <Image
                    src={`https://sgp1.vultrobjects.com/virtuwed-storage/` + wedding.media.prewedding_photos[9]}
                    alt="Moment pengantin"
                    className="object-cover object-center min-w-full w-full h-full"
                    width={500}
                    height={500}
                    priority
                    id='bridePicture1Click'
                />
            </div >

            <div ref={bridePicture11} className='relative h-[1024px] w-[768px]'>
                <Image
                    src={`https://sgp1.vultrobjects.com/virtuwed-storage/` + wedding.media.prewedding_photos[10]}
                    alt="Moment pengantin"
                    className="object-cover object-center min-w-full w-full h-full"
                    width={500}
                    height={500}
                    priority
                    id='bridePicture1Click'
                />
            </div >

            {/* BACK */}
            < div ref={checkout} >
                <Button startContent={<i className="ri-checkbox-line ri-lg"></i>} color='secondary' className='rounded' onPress={modalKonfirmasi.onOpen}>
                    <p className='l2-r font-deAetna'>Check Out</p>
                </Button>

            </ div >

            {/* MODAL KONFIRMASI */}
            < Modal className='light light:text-black mx-6 bg-White'
                scrollBehavior='inside'
                isOpen={modalKonfirmasi.isOpen}
                onOpenChange={modalKonfirmasi.onOpenChange}
                placement='center'
                radius='sm'
            >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader>
                                <div className='text-center w-full'>
                                    <h3 className='text-N800 capitalize'>Konfirmasi</h3>
                                    <p className='text-N700 p3-r w-full'>Tolong konfirmasi ucapan selamat dan hadiah yang akan anda berikan</p>
                                </div>
                            </ModalHeader>
                            <ModalBody>
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
                                        <div className='z-20 flex overflow-hidden gap-1 content-stretch'>
                                            <Button ref={gantiUcapan} className='rounded w-full bg-transparent text-tertiary border-tertiary border' variant='bordered' startContent={<i className="ri-message-3-line ri-xl"></i>} onPress={onClose}>
                                                <p className='l2-r font-deAetna'>Ganti Ucapan</p>
                                            </Button>
                                            <Button ref={gantiHadiah} className='rounded w-full bg-transparent text-tertiary border-tertiary border' variant='bordered' startContent={<i className="ri-gift-line ri-xl"></i>} onPress={onClose}>
                                                <p className='l2-r font-deAetna'>Ganti Hadiah</p>
                                            </Button>
                                        </div>

                                        {/* <Button ref={lookToEnd} className='rounded' color='secondary' startContent={<i className="ri-check-line ri-xl"></i>} onPress={onClose} > */}

                                        {loading ?
                                            <Button color="secondary" className='rounded' isLoading>
                                                <p className='l2-r font-deAetna'>Loading</p>
                                            </Button>
                                            :

                                            <Button ref={lookToEnd} className='rounded' color='secondary' startContent={<i className="ri-check-line ri-xl"></i>} >
                                                <p className='l2-r font-deAetna'>Konfirmasi</p>
                                            </Button>
                                        }
                                    </div>
                                </div>

                                {/* DECORATION */}
                                < div className='grid' >
                                    < Image
                                        src={
                                            '/assets/virtuwed/accent/vintage-ornaments.png'
                                        }
                                        alt="decoration"
                                        width={110}
                                        height={110}
                                        className='opacity-50 h-auto w-52 grid justify-self-center -scale-y-100'
                                    />
                                </ div>
                            </ModalBody >
                        </>
                    )}
                </ModalContent >
            </ Modal >
            {/* MODAL INFORMATIVE ERROR */}
            <Modal
                className='bg-White py-8'
                hideCloseButton
                isOpen={modalInformativeError.isOpen}
                onOpenChange={modalInformativeError.onOpenChange}
            >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalBody className='grid justify-items-center'>
                                <Image
                                    src={
                                        '/assets/virtuwed/accent/vintage-ornaments.png'
                                    }
                                    alt="emoticon"
                                    width={110}
                                    height={110}
                                    className='opacity-50 h-auto w-52'
                                />

                                <div className='grid gap-2 justify-items-center justify-center text-center'>
                                    <i className="ri-error-warning-fill text-red-500 text-9xl"></i>
                                    <h4 className="text-N800">
                                        Oh no!
                                    </h4>
                                    <p className="p3-r text-N600">
                                        An error has occured while sending message and gift.
                                    </p>
                                </div>

                                <form className='flex gap-1 w-full' method="dialog">
                                    {/* if there is a button, it will close the modal */}
                                    <Button startContent={<i className='ri-message-3-line ri-xl' />} className='rounded w-full' color='secondary' onPress={onClose}>
                                        Try again
                                    </Button>
                                </form>
                            </ModalBody>
                        </>
                    )}

                </ModalContent>
            </Modal >

            <div ref={lihatKenanganVirtual} className='invisible'>
                <Button onPress={handleLihatKV} startContent={<i className="ri-eye-line ri-lg"></i>} color='secondary' className='rounded'>
                    <p className='l2-r font-deAetna'>Lihat Kenangan Virtual</p>
                </Button>
            </div>
            <div ref={keluarResepsi} className='invisible'>
                <Button onPress={handleKeluarRV} startContent={<i className="ri-logout-box-r-line ri-lg"></i>} color='secondary' className='rounded'>
                    <p className='l2-r font-deAetna'>Keluar Resepsi</p>
                </Button>
            </div>

            <div ref={bridePicture12} className='relative h-[1024px] w-[768px]'>
                <Image
                    src={`https://sgp1.vultrobjects.com/virtuwed-storage/` + wedding.media.prewedding_photos[3]}
                    alt="Moment pengantin"
                    className="object-cover object-center min-w-full w-full h-full"
                    width={500}
                    height={500}
                    priority
                    id='bridePicture1Click'
                />
            </div >
            <div ref={bridePicture13} className='relative h-[1024px] w-[768px]'>
                <Image
                    src={`https://sgp1.vultrobjects.com/virtuwed-storage/` + wedding.media.prewedding_photos[7]}
                    alt="Moment pengantin"
                    className="object-cover object-center min-w-full w-full h-full"
                    width={500}
                    height={500}
                    priority
                    id='bridePicture1Click'
                />
            </div >
            <div ref={bridePicture14} className='relative h-[1024px] w-[768px]'>
                <Image
                    src={`https://sgp1.vultrobjects.com/virtuwed-storage/` + wedding.media.prewedding_photos[8]}
                    alt="Moment pengantin"
                    className="object-cover object-center min-w-full w-full h-full"
                    width={500}
                    height={500}
                    priority
                    id='bridePicture1Click'
                />
            </div >

            <div ref={bridePicture15} className='relative w-[1350px] h-[1080px]'>
                <Image
                    src={`https://sgp1.vultrobjects.com/virtuwed-storage/` + wedding.media.prewedding_photos[5]}
                    alt="Moment pengantin"
                    className="object-cover object-center min-w-full w-full h-full"
                    width={500}
                    height={500}
                    priority
                    id='bridePicture1Click'
                />
            </div >

            <div ref={bridePicture16} className='relative w-[1350px] h-[1080px]'>
                <Image
                    src={`https://sgp1.vultrobjects.com/virtuwed-storage/` + wedding.media.prewedding_photos[1]}
                    alt="Moment pengantin"
                    className="object-cover object-center min-w-full w-full h-full"
                    width={500}
                    height={500}
                    priority
                    id='bridePicture1Click'
                />
            </div >
            <div ref={bridePicture17} className='relative h-[1024px] w-[768px]'>
                <Image
                    src={`https://sgp1.vultrobjects.com/virtuwed-storage/` + wedding.media.prewedding_photos[9]}
                    alt="Moment pengantin"
                    className="object-cover object-center min-w-full w-full h-full"
                    width={500}
                    height={500}
                    priority
                    id='bridePicture1Click'
                />
            </div >
            <div ref={bridePicture18} className='relative h-[1024px] w-[768px]'>
                <Image
                    src={`https://sgp1.vultrobjects.com/virtuwed-storage/` + wedding.media.prewedding_photos[10]}
                    alt="Moment pengantin"
                    className="object-cover object-center min-w-full w-full h-full"
                    width={500}
                    height={500}
                    priority
                    id='bridePicture1Click'
                />
            </div >

        </>

    )
}

export default ResepsiVirtual