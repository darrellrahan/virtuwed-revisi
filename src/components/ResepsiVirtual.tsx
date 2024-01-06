'use client'
import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, cn, useDisclosure } from '@nextui-org/react';
import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react'
import { RootState } from '@/src/app/[lang]/redux/reducers';
// import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Popover, PopoverTrigger, PopoverContent } from "@nextui-org/react";
import 'remixicon/fonts/remixicon.css'
import { useSelector } from 'react-redux';
import { FileUploader } from 'react-drag-drop-files';
import { Player } from 'video-react';
import "../../node_modules/video-react/dist/video-react.css";
import { RadioGroup } from '@headlessui/react';

import { RadioGroup as RadioGroupNextUI, Radio } from "@nextui-org/react";

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

    // crush: string;
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


const ResepsiVirtual: React.FC<PanoProps> = ({ dataPano }) => {
    const panoRef = useRef(null);

    const ucapkanSelamat = useRef(null);
    const berikanHadiah = useRef(null);
    const checkout = useRef(null);
    const lihatKenanganVirtual = useRef(null);
    const keluarResepsi = useRef(null);

    // KORIDOR
    const bridePicture1 = useRef(null);

    const wedding = useSelector((state: RootState) => state.value.wedding);
    const guest = useSelector((state: RootState) => state.value.guest);
    const IMAGE_URL = 'sgp1.vultrobjects.com/virtuwed-storage';

    const [digitalGift, setDigitalGift] = useState(gifts[0])
    const mainGifts = gifts.slice(0, 4)

    // UCAPAN SELAMAT
    const [ucapanSelamat, setUcapanSelamat] = useState('')

    // PREVIEW HANDLER
    const fileTypes = ["JPG", "JPEG", "PNG", "GIF", "TIFF", "PSD", "EPS", "AI", "RAW", "INDD", "MP4", "MOV", "AVI", "WMV", "AVCHD", "WebM", "FLV"];
    const [file, setFile] = useState<File | null>(null)
    const handleChange = (file: File) => {
        setFile(file);
    };

    // const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const modalUcapanSelamat = useDisclosure()
    const modalInformativeUcapanSelamat = useDisclosure()
    const modalHadiah = useDisclosure()
    const modalInformativeHadiah = useDisclosure()
    const modalKonfirmasi = useDisclosure()

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

                // const switchScene = (scene: any) => {
                //     // stopAutorotate();
                //     scene.view.setParameters(scene.data.initialViewParameters);
                //     scene.scene.switchTo();
                //     // startAutorotate();
                //     // updateSceneName(scene);
                //     // updateSceneList(scene);
                // }

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

            const switchScene = (scene: any) => {
                // stopAutorotate();
                // scene.view.setParameters(scene.initialViewParameters);
                scene.scene.switchTo();
                // startAutorotate();
                // updateSceneName(scene);
                // updateSceneList(scene);
            }

            switchScene(panoScenes[0]);
            // ==================================================================================================

            const containerKoridor = panoScenes[0].scene.hotspotContainer();
            if (containerKoridor) {
                containerKoridor.createHotspot(bridePicture1.current, { yaw: 1.1165199114658257, pitch: 0.009338294282953186 },
                    { perspective: { radius: 3175, extraTransforms: "rotateY(-25deg)" } });

            } else {
                console.error("Element with ID 'iframespot' not found.");
            }

            const containerFront = panoScenes[1].scene.hotspotContainer();
            if (containerFront) {
                containerFront.createHotspot(ucapkanSelamat.current, { yaw: 0, pitch: -0.056795042541741836 },
                    { perspective: { radius: 300, extraTransforms: "rotateY(0deg)" } });
                containerFront.createHotspot(berikanHadiah.current, { yaw: 1.4731802513717511, pitch: 0.17922631245596676 },
                    { perspective: { radius: 300, extraTransforms: "rotateY(0deg)" } });

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

            } else {
                console.error("Element with ID 'iframespot' not found.");
            }

            // // CHECK COORDS
            // var pano = panoRef.current;
            // pano.addEventListener('click', (e) => {
            //     var view = viewer.view();
            //     console.log(view.screenToCoordinates({ x: e.clientX, y: e.clientY }))
            // });

            // // Clean up resources when component unmounts
            // return () => {
            //     viewer.destroy();
            // };
        }


    }, [dataPano]);

    return (
        <>
            <div className="light h-full w-full absolute" ref={panoRef} ></div>

            {/* KORIDOR */}
            <div ref={bridePicture1} className='relative w-[1350px] h-[1080px]'>
                <Image
                    src={`https://sgp1.vultrobjects.com/virtuwed-storage/` + wedding.media.prewedding_photos[0]}
                    alt="Moment pengantin"
                    className="object-cover object-center min-w-full w-full h-full"
                    width={500}
                    height={500}
                    priority
                />
            </div >

            {/* FRONT */}
            <div ref={ucapkanSelamat}>
                <Button startContent={<i className="ri-message-2-line ri-lg"></i>} color='secondary' className='rounded' onPress={modalUcapanSelamat.onOpen}>
                    <p className='l2-r font-deAetna'>Ucapkan Selamat</p>
                </Button>
            </div>
            <div ref={berikanHadiah}>
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
                                                value={ucapanSelamat}
                                                onChange={
                                                    (e) => setUcapanSelamat(e.target.value)
                                                }
                                            />
                                        </form>
                                    </div>

                                    <Button className='rounded' color='secondary' startContent={<i className="ri-send-plane-line ri-xl"></i>} onPress={modalInformativeUcapanSelamat.onOpen}>
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
                className='bg-White py-8'
                hideCloseButton
                isOpen={modalInformativeUcapanSelamat.isOpen}
                onOpenChange={modalInformativeUcapanSelamat.onOpenChange}>
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
                                        startContent={<>{file != undefined
                                            ? <i className='ri-arrow-right-s-line ri-xl' />
                                            : ucapanSelamat != ''
                                                ? <i className='ri-arrow-right-s-line ri-xl' />
                                                : <i className='ri-check-line ri-xl' />}</>}
                                        className='rounded w-full bg-transparent text-tertiary border-tertiary border' variant='bordered' onPress={onClose}>
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
            <Modal
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

                                    <RadioGroupNextUI
                                        color="secondary"
                                        defaultValue="buket bunga"
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

                                    </RadioGroupNextUI>


                                    <Button className='rounded mt-3' color='secondary' startContent={<i className="ri-gift-line ri-xl" />} onPress={modalInformativeHadiah.onOpen}>
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
            </Modal >

            {/* MODAL INFORMATIVE HADIAH */}
            <Modal
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
                                                file != undefined
                                                    ? 'Ganti Ucapan'
                                                    :
                                                    ucapanSelamat != '' ? 'Ganti Ucapan' : 'Beri Ucapan'
                                            }
                                        </p>
                                    </Button>
                                    <Button
                                        startContent={<>{file != undefined
                                            ? <i className='ri-arrow-right-s-line ri-xl' />
                                            : ucapanSelamat != ''
                                                ? <i className='ri-arrow-right-s-line ri-xl' />
                                                : <i className='ri-check-line ri-xl' />}</>}
                                        className='rounded w-full bg-transparent text-tertiary border-tertiary border' variant='bordered' onPress={onClose}>
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

            {/* BACK */}
            < div ref={checkout} >
                <Button startContent={<i className="ri-checkbox-line ri-lg"></i>} color='secondary' className='rounded' onPress={modalKonfirmasi.onOpen}>
                    <p className='l2-r font-deAetna'>Check Out</p>
                </Button>

            </ div >

            {/* MODAL KONFIRMASI */}
            <Modal className='light light:text-black mx-6 bg-White'
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
                                            {/* <button id='buttonChangeUcapanSelamat' className='rounded btn btn-accent h-full py-2'>
                                                <i className="ri-message-3-line ri-xl"></i>
                                                <p className='l2-r font-deAetna'>Ganti Ucapan</p>
                                            </button>
                                            <button id='buttonChangeDigitalGift' className='rounded btn btn-accent h-full py-2'>
                                                <i className="ri-gift-line ri-xl"></i>
                                                <p className='l2-r font-deAetna'>Ganti Hadiah</p>
                                            </button> */}

                                            <Button className='rounded w-full bg-transparent text-tertiary border-tertiary border' variant='bordered' startContent={<i className="ri-message-3-line ri-xl"></i>} onPress={onClose}>
                                                <p className='l2-r font-deAetna'>Ganti Ucapan</p>
                                            </Button>
                                            <Button className='rounded w-full bg-transparent text-tertiary border-tertiary border' variant='bordered' startContent={<i className="ri-gift-line ri-xl"></i>} onPress={onClose}>
                                                <p className='l2-r font-deAetna'>Ganti Hadiah</p>
                                            </Button>
                                        </div>

                                        {/* <button onClick={handleKonfirmasi} id='konfirmasiButton' className='btn btn-secondary rounded'> */}
                                        {/* <button id='konfirmasiButton' className='btn btn-secondary rounded'>
                                                <i className="ri-check-line ri-xl"></i>
                                                <p className='l2-r font-deAetna'>konfirmasi</p>
                                            </button> */}

                                        <Button className='rounded' color='secondary' startContent={<i className="ri-check-line ri-xl"></i>} onPress={onClose}>
                                            <p className='l2-r font-deAetna'>Konfirmasi</p>
                                        </Button>
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
                            {/* <ModalFooter>
                                <Button color="danger" variant="light" onPress={onClose}>
                                    No
                                </Button>
                                <Button className='bg-sky-500' color="primary" onPress={onClose}>
                                    Yes
                                </Button>
                            </ModalFooter> */}
                        </>
                    )}
                </ModalContent >
            </Modal >

            <div ref={lihatKenanganVirtual}>
                <Button startContent={<i className="ri-eye-line ri-lg"></i>} color='secondary' className='rounded'>
                    <p className='l2-r font-deAetna'>Lihat Kenangan Virtual</p>
                </Button>
            </div>
            <div ref={keluarResepsi}>
                <Button startContent={<i className="ri-logout-box-r-line ri-lg"></i>} color='secondary' className='rounded'>
                    <p className='l2-r font-deAetna'>Keluar Resepsi</p>
                </Button>
            </div>

        </>

    )
}

export default ResepsiVirtual