'use client'
import { RootState } from '@/app/redux/reducers';
import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux'
import LoadingSkeleton from './LoadingSkeleton';
import Image from 'next/image';
import YouTubePlayer from './YoutubePlayer';
import { useRouter, useSearchParams } from 'next/navigation';

interface PanoProps {
    dataKenanganVirtual: {
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

    place: string
}





const KenanganVirtual: React.FC<PanoProps> = ({ dataKenanganVirtual, place }) => {
    const router = useRouter()

    const panoRef = useRef(null);
    const iframespot = useRef(null);
    const picturespot1 = useRef(null);
    const menuGallery = useRef(null);
    const picturespot2 = useRef(null);
    const picturespot3 = useRef(null);
    const picturespot4 = useRef(null);
    const picturespot5 = useRef(null);
    const picturespot6 = useRef(null);
    const textInfo = useRef(null);

    const wedding = useSelector((state: RootState) => state.value.wedding);
    const guest = useSelector((state: RootState) => state.value.guest);
    const IMAGE_URL = 'sgp1.vultrobjects.com/virtuwed-storage';

    // const searchParams = useSearchParams()
    // const place = searchParams.get('place')

    document.body.classList.add('no-touch');
    window.addEventListener('touchstart', function () {
        document.body.classList.remove('no-touch');
        document.body.classList.add('touch');
    });

    // const [isClient, setIsClient] = useState(false);

    // useEffect(() => {
    //     setIsClient(true);
    // }, []);

    useEffect(() => {
        const {
            settings: { mouseViewMode },
            scenes,
        } = dataKenanganVirtual;

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
                const urlPrefix = "/assets/kenanganVirtual";
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
                // const geometry = new Marzipano.CubeGeometry(levels);
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

                // if (scene && scene.scene) {
                //     scene.scene.switchTo();
                // } else {
                //     console.error("Tidak dapat beralih ke adegan karena 'scene' tidak terdefinisi atau 'null'.");
                // }
                // startAutorotate();
                // updateSceneName(scene);
                // updateSceneList(scene);
            }

            // switchScene(panoScenes[0]);
            const value = eval(place);
            switchScene(value);
            // ==================================================================================================

            // panoScenes[0].scene.switchTo();
            // place?.scene.switchTo();

            // panoScenes[0].scene.hotspotContainer().createHotspot(document.getElementById('iframespot'), { yaw: 0.0335, pitch: -0.102 }, { perspective: { radius: 1640, extraTransforms: "rotateX(5deg)" } })

            const container = panoScenes[0].scene.hotspotContainer();

            if (container) {
                // YOUTUBE
                container.createHotspot(iframespot.current, { yaw: 0, pitch: -0.04100000000000000 },
                    // { perspective: { radius: 2320, extraTransforms: "rotateX(2deg)" } });
                    { perspective: { radius: 696, extraTransforms: "rotateX(2deg)" } });


                // POTO1
                container.createHotspot(picturespot1.current, { yaw: 1.1165199114658257, pitch: 0.009338294282953186 },
                    { perspective: { radius: 3175, extraTransforms: "rotateY(-25deg)" } });


                // POTO2
                container.createHotspot(picturespot2.current, { yaw: 2.101661332410651, pitch: 0.008970128824859813 },
                    { perspective: { radius: 3350, extraTransforms: "rotateY(30deg)" } });


                // POTO3
                container.createHotspot(picturespot3.current, { yaw: 2.601822736805576, pitch: 0.009388910134699557 },
                    { perspective: { radius: 3325, extraTransforms: "rotateY(-30deg)" } });


                // POTO4
                container.createHotspot(picturespot4.current, { yaw: -2.696497999467635, pitch: 0.009920743633978546 },
                    { perspective: { radius: 3200, extraTransforms: "rotateY(25deg)" } });


                // POTO5
                container.createHotspot(picturespot5.current, { yaw: -2.1022758458091104, pitch: 0.008922370526379453 },
                    { perspective: { radius: 3325, extraTransforms: "rotateY(-30deg)" } });

                // POTO6
                container.createHotspot(picturespot6.current, { yaw: -1.117538709593365, pitch: 0.010069377139673819 },
                    { perspective: { radius: 3225, extraTransforms: "rotateY(25deg)" } });

                // INFOSPOT POTO1
                container.createHotspot(textInfo.current, { yaw: 1.2663669301631675, pitch: -0.1802312721318824 });

                // LINK HOTSPOT TO MENU
                container.createHotspot(menuGallery.current, { yaw: 0.5787631231131556, pitch: 0.1321688672861896 });

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
    }, [dataKenanganVirtual]);

    return (
        <>
            < div className="h-full w-full absolute" ref={panoRef} ></div>

            <div ref={iframespot} id="iframespot" className='relative w-[576px] h-[324px]'>
                {/* <iframe id="youtube"
                    className='rounded-lg'
                    width="576"
                    height="324"
                    // src={wedding.media.prewedding_videos[0]}
                    src={`https://www.youtube.com/embed/XtXfZTnM5xU?controls=0`}
                    allowFullScreen
                    title="YouTube video player"
                    allow="fullscreen; accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                ></iframe> */}

                <YouTubePlayer width={576} height={324} videoId={wedding.resepsi_virtual.wedding_live_streaming_link.query ? wedding.resepsi_virtual.wedding_live_streaming_link.query : "HqYhkpGgZXc"} />
            </div >

            <>
                <div onClick={() => router.push(`/${wedding.wedding_slug}/${guest.guest_slug}/menu`)} ref={menuGallery} className='hotspot link-hotspot'>
                    <img src="/assets/kenanganVirtual/link.png" alt="" className='link-hotspot-icon' />
                    <div className='hotspot-tooltip link-hotspot-tooltip'>
                        Menu
                    </div>
                </div>



                <div ref={picturespot1} className='relative w-[1350px] h-[1080px]'>
                    <Image
                        src={`https://sgp1.vultrobjects.com/virtuwed-storage/` + wedding.media.prewedding_photos[0]}
                        alt="Moment pengantin"
                        className="object-cover object-center min-w-full w-full h-full"
                        width={500}
                        height={500}
                        priority
                    />
                </div >
                <div ref={picturespot2} className={`relative w-[1350px] h-[1080px]`}>
                    <Image
                        src={`https://sgp1.vultrobjects.com/virtuwed-storage/` + wedding.media.prewedding_photos[1]}
                        alt="Moment pengantin"
                        className="object-cover object-center min-w-full w-full h-full"
                        width={500}
                        height={500}
                        priority
                    />
                </div>
                <div ref={picturespot3} className={`relative w-[1350px] h-[1080px]`}>
                    <Image
                        src={`https://sgp1.vultrobjects.com/virtuwed-storage/` + wedding.media.prewedding_photos[2]}
                        alt="Moment pengantin"
                        className="object-cover object-center min-w-full w-full h-full"
                        width={500}
                        height={500}
                        priority
                    />
                </div>
                <div ref={picturespot4} className={`relative w-[1350px] h-[1080px]`}>
                    <Image
                        src={`https://sgp1.vultrobjects.com/virtuwed-storage/` + wedding.media.prewedding_photos[3]}
                        alt="Moment pengantin"
                        className="object-cover object-center min-w-full w-full h-full"
                        width={500}
                        height={500}
                        priority
                    />
                </div>
                <div ref={picturespot5} className={`relative w-[1350px] h-[1080px]`}>
                    <Image
                        src={`https://sgp1.vultrobjects.com/virtuwed-storage/` + wedding.media.prewedding_photos[4]}
                        alt="Moment pengantin"
                        className="object-cover object-center min-w-full w-full h-full"
                        width={500}
                        height={500}
                        priority
                    />
                </div>
                <div ref={picturespot6} className={`relative w-[1350px] h-[1080px]`}>
                    <Image
                        src={`https://sgp1.vultrobjects.com/virtuwed-storage/` + wedding.media.prewedding_photos[5]}
                        alt="Moment pengantin"
                        className="object-cover object-center min-w-full w-full h-full"
                        width={500}
                        height={500}
                        priority
                    />
                </div>

                <div id="textInfo" ref={textInfo}>
                    <div className="hotspot">
                        <div className="out"></div>
                        <div className="in"></div>
                    </div>
                    <div className="tooltip-content">
                        <p>Dulu, anak SMA pemalu, Agy, naksir gadis populer, Yoriko. Saat kuliah, dia berjuang keras, berprestasi, dan berhasil memenangkan hati Yoriko. Cinta mereka mekar setelah melewati lika-liku karir kuliah.</p>
                    </div>
                </div>

            </>


        </>

    )

};

export default KenanganVirtual;
