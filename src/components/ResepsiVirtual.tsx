'use client'
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
    const infoSchool = useRef(null);
    const infoPark = useRef(null);
    const infoCorePark = useRef(null);

    // const { isOpen, onOpen, onOpenChange } = useDisclosure();

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


            // const containerSchool = panoScenes[0].scene.hotspotContainer();
            // if (containerSchool) {
            //     // INFOSPOT 
            //     containerSchool.createHotspot(infoSchool.current, { yaw: -0.053460715856861185, pitch: 0.07998189071985529 });

            // } else {
            //     console.error("Element with ID 'iframespot' not found.");
            // }

            // const containerPark = panoScenes[1].scene.hotspotContainer();
            // if (containerPark) {
            //     containerPark.createHotspot(infoPark.current, { yaw: 0.3065692298970859, pitch: 0.08750032860305446 });
            //     containerPark.createHotspot(infoCorePark.current, { yaw: 2.9785878977200912, pitch: 0.014763598534795364 });

            // } else {
            //     console.error("Element with ID 'iframespot' not found.");
            // }


            // const containerKoridor = panoScenes[0].scene.hotspotContainer();
            // if (containerKoridor) {
            //     // INFOSPOT 
            //     containerKoridor.createHotspot(infoSchool.current, { yaw: -0.053460715856861185, pitch: 0.07998189071985529 });

            // } else {
            //     console.error("Element with ID 'iframespot' not found.");
            // }

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
        </>

    )
}

export default ResepsiVirtual