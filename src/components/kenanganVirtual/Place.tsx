"use client";

import { Locale } from "@/i18n.config";
import { data } from "@/src/app/[lang]/[weddingslug]/[guestslug]/kenanganvirtual/data";
import { lora } from "@/src/app/[lang]/[weddingslug]/[guestslug]/kenanganvirtual/font";
import { useAsset360Context } from "@/src/context/Asset360Provider";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useRef } from "react";


function Place({ params }: { params: { weddingslug: string, guestslug: string, lang: Locale } }) {
    const panoRef = useRef(null);
    const { push } = useRouter();
    const { photo } = useAsset360Context();

    useEffect(() => {
        var setMode = function () {
            if (mql.matches) {
                document.body.classList.remove("desktop");
                document.body.classList.add("mobile");
            } else {
                document.body.classList.remove("mobile");
                document.body.classList.add("desktop");
            }
        };
        var mql = matchMedia("(max-width: 500px), (max-height: 500px)");
        setMode();
        mql.addListener(setMode);

        // Detect whether we are on a touch device.
        document.body.classList.add("no-touch");
        window.addEventListener("touchstart", function () {
            document.body.classList.remove("no-touch");
            document.body.classList.add("touch");
        });

        // Viewer options.
        var viewerOpts = {
            controls: {
                mouseViewMode: data.settings.mouseViewMode,
            },
        };

        // Initialize viewer.
        const Marzipano = require("marzipano");
        var viewer = new Marzipano.Viewer(panoRef.current, viewerOpts);

        // Create scenes.
        var scenes = data.scenes.map(function (data) {
            var source = Marzipano.ImageUrlSource.fromString(
                `https://sgp1.vultrobjects.com/virtuwed-storage/${photo}`,
                {
                    cubeMapPreviewUrl: `https://sgp1.vultrobjects.com/virtuwed-storage/${photo}`,
                }
            );

            var geometry = new Marzipano.EquirectGeometry(data.levels);

            var limiter = Marzipano.RectilinearView.limit.traditional(
                data.faceSize,
                (100 * Math.PI) / 180,
                (120 * Math.PI) / 180
            );
            var view = new Marzipano.RectilinearView(
                data.initialViewParameters,
                limiter
            );

            var scene = viewer.createScene({
                source: source,
                geometry: geometry,
                view: view,
                pinFirstLevel: true,
            });

            return {
                data: data,
                scene: scene,
                view: view,
            };
        });

        var autorotate = Marzipano.autorotate({
            yawSpeed: 0.03,
            targetPitch: 0,
            targetFov: Math.PI / 2,
        });

        viewer.startMovement(autorotate);
        viewer.setIdleMovement(3000, autorotate);

        function switchScene(scene: any) {
            scene.view.setParameters(scene.data.initialViewParameters);
            scene.scene.switchTo();
        }

        // Display the initial scene.
        switchScene(scenes[0]);
    }, []);

    return (
        <div className="h-screen-relative">
            <div className="h-full w-full absolute" ref={panoRef}></div>

            <div
                className={`${lora.className} absolute bottom-0 inset-x-0 h-16 bg-[#FFF9F9] flex items-center text-[#F66F6F] rounded-tl-[45px] font-medium px-8 text-lg`}
            >
                <Link href={`/${params.lang}/${params.weddingslug}/${params.guestslug}/kenanganvirtual/gallery`} className="flex items-center gap-2">
                    <Image
                        src="/assets/kenanganVirtual/ic-back-pink.svg"
                        alt="link"
                        width={24}
                        height={24}
                        priority
                    />
                    <span>Back to gallery</span>
                </Link>
                <Image
                    src="/assets/kenanganVirtual/flower.png"
                    alt="flower"
                    width={120}
                    height={120}
                    priority
                    className="absolute bottom-0 right-0"
                />
            </div>
        </div>
    );
}

export default Place;
