'use client'
import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from '@nextui-org/react';
import React, { useEffect, useRef, useState } from 'react'
// import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Popover, PopoverTrigger, PopoverContent } from "@nextui-org/react";
import 'remixicon/fonts/remixicon.css'

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

const ResepsiVirtual: React.FC<PanoProps> = ({ dataPano }) => {
    const panoRef = useRef(null);

    const ucapkanSelamat = useRef(null);
    const berikanHadiah = useRef(null);
    const checkout = useRef(null);
    const lihatKenanganVirtual = useRef(null);
    const keluarResepsi = useRef(null);

    const { isOpen, onOpen, onOpenChange } = useDisclosure();

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

                // const urlPrefix = "//www.marzipano.net/media";
                const urlPrefix = "/assets/ResepsiVirtual/equirectangular";
                const source = Marzipano.ImageUrlSource.fromString(
                    // `${urlPrefix}/${id}/{z}/{f}/{y}/{x}.jpg`,
                    // { cubeMapPreviewUrl: `${urlPrefix}/${id}/preview.jpg` },
                    `${urlPrefix}/${id}`,
                    {
                        cubeMapPreviewUrl: `${urlPrefix}/${id}`
                    }
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

            const containerFront = panoScenes[1].scene.hotspotContainer();
            if (containerFront) {
                containerFront.createHotspot(ucapkanSelamat.current, { yaw: -0.22203056970193202, pitch: -0.10401943690370175 });
                containerFront.createHotspot(berikanHadiah.current, { yaw: 1.380138804190528, pitch: 0.14947205954750586 });

            } else {
                console.error("Element with ID 'iframespot' not found.");
            }


            const containerBack = panoScenes[2].scene.hotspotContainer();
            if (containerBack) {
                // INFOSPOT 
                containerBack.createHotspot(checkout.current, { yaw: 1.5343213110499754, pitch: 0.11186694513875928 });
                containerBack.createHotspot(lihatKenanganVirtual.current, { yaw: 2.935034127070681, pitch: -0.29955839003537754 });
                containerBack.createHotspot(keluarResepsi.current, { yaw: 3.0045679366218216, pitch: -0.11868394638760549 });

            } else {
                console.error("Element with ID 'iframespot' not found.");
            }

            // // CHECK COORDS
            // var pano = panoRef.current;
            // pano.addEventListener('click', (e) => {
            //     var view = viewer.view();
            //     console.log(view.screenToCoordinates({ x: e.clientX, y: e.clientY }))
            // });

            // Clean up resources when component unmounts
            return () => {
                viewer.destroy();
            };
        }


    }, [dataPano]);

    return (
        <>
            <div className="light h-full w-full absolute" ref={panoRef} ></div>

            {/* FRONT */}
            <div ref={ucapkanSelamat}>
                <Button startContent={<i className="ri-message-2-line ri-lg"></i>} className='bg-white' onPress={onOpen}>
                    Ucapkan Selamat
                </Button>
            </div>
            <div ref={berikanHadiah}>
                <Button startContent={<i className="ri-gift-line ri-lg"></i>} className='bg-white' onPress={onOpen}>
                    Berikan Hadiah
                </Button>
            </div>
            <Modal className='light light:text-black' scrollBehavior='inside' isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="font-bold font-sans text-large">Ice Cream?</ModalHeader>
                            <ModalBody>
                                <p>
                                    Saat open house ITB 2023, aku melihat duduk dibarisan depanku dan itulah hari dimana aku memutuskan untuk masuk kesana.
                                </p>
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="light" onPress={onClose}>
                                    No
                                </Button>
                                <Button className='bg-sky-500' color="primary" onPress={onClose}>
                                    Yes
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>

            {/* BACK */}
            <div ref={checkout}>
                <Button startContent={<i className="ri-checkbox-line ri-lg"></i>} className='bg-white' onPress={onOpen}>
                    Check Out
                </Button>
            </div>

            <div ref={lihatKenanganVirtual}>
                <Button startContent={<i className="ri-eye-line ri-lg"></i>} className='bg-white' onPress={onOpen}>
                    Lihat Kenangan Virtual
                </Button>
            </div>
            <div ref={keluarResepsi}>
                <Button startContent={<i className="ri-logout-box-r-line ri-lg"></i>} className='bg-white' onPress={onOpen}>
                    Keluar Resepsi
                </Button>
            </div>

        </>

    )
}

export default ResepsiVirtual