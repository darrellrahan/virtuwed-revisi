'use client'
import { RootState } from '@/app/redux/reducers';
import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux'
import LoadingSkeleton from './LoadingSkeleton';
import Image from 'next/image';

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
}


const KenanganVirtual: React.FC<PanoProps> = ({ dataKenanganVirtual }) => {
    const panoRef = useRef(null);
    const iframespot = useRef(null);
    const picturespot1 = useRef(null);
    const picturespot2 = useRef(null);
    const picturespot3 = useRef(null);
    const picturespot4 = useRef(null);
    const picturespot5 = useRef(null);
    const picturespot6 = useRef(null);

    const wedding = useSelector((state: RootState) => state.value.wedding);
    const IMAGE_URL = 'sgp1.vultrobjects.com/virtuwed-storage';

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
                const { id, initialViewParameters, levels, faceSize } = sceneData;

                // const urlPrefix = "//www.marzipano.net/media";
                const urlPrefix = "/assets/kenanganVirtual";
                const source = Marzipano.ImageUrlSource.fromString(
                    // `${urlPrefix}/${id}/{z}/{f}/{y}/{x}.jpg`,
                    // { cubeMapPreviewUrl: `${urlPrefix}/${id}/preview.jpg` },
                    `${urlPrefix}/${id}.webp`,
                    {
                        cubeMapPreviewUrl: `${urlPrefix}/${id}.webp`
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

                return {
                    sceneData,
                    scene,
                    view,
                };
            });

            panoScenes[0].scene.switchTo();

            // panoScenes[0].scene.hotspotContainer().createHotspot(document.getElementById('iframespot'), { yaw: 0.0335, pitch: -0.102 }, { perspective: { radius: 1640, extraTransforms: "rotateX(5deg)" } })

            const container = panoScenes[0].scene.hotspotContainer();

            if (container) {
                // YOUTUBE
                container.createHotspot(iframespot.current, { yaw: 0, pitch: -0.04100000000000000 },
                    { perspective: { radius: 2320, extraTransforms: "rotateX(2deg)" } });


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

            } else {
                console.error("Element with ID 'iframespot' not found.");
            }


            // var pano = panoRef.current;
            // // CHECK COORDS
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

            <div ref={iframespot} id="iframespot" className='relative w-[1920px] h-[1080px] rounded-3xl'>
                <iframe id="youtube"
                    className='rounded-3xl'
                    width="1920"
                    height="1080"
                    src={wedding.media.prewedding_videos[0]}
                    allowFullScreen
                    title="YouTube video player"
                // allow="fullscreen; accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                ></iframe>
            </div >

            <>
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
            </>


        </>

    )

};

export default KenanganVirtual;
