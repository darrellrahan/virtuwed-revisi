"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
// import { lora } from "../font";
import { VideoAsset } from "@/src/app/[lang]/[weddingslug]/[guestslug]/kenanganvirtual/VideoAsset";
import { lora } from "@/src/app/[lang]/[weddingslug]/[guestslug]/kenanganvirtual/font";

function VIdeo360() {
    const panoRef = useRef(null);
    const clickToStart = useRef<HTMLDivElement>(null);
    const [overlay, setOverlay] = useState(false);

    useEffect(() => {
        const Marzipano = require("marzipano");

        // Create viewer.
        var viewer = new Marzipano.Viewer(panoRef.current);

        // Create asset and source.
        var asset = new (VideoAsset as any)();
        var source = new Marzipano.SingleAssetSource(asset);

        // Create geometry.
        // This is a trivial equirectangular geometry with a single level.
        // The level size need not match the actual video dimensions because it is
        // only used to determine the most appropriate level to render, and no such
        // choice has to be made in this case.
        var geometry = new Marzipano.EquirectGeometry([{ width: 1 }]);

        // Create view.
        // We display the video at a fixed vertical fov.
        var limiter = Marzipano.RectilinearView.limit.vfov(
            (90 * Math.PI) / 180,
            (90 * Math.PI) / 180
        );
        var view = new Marzipano.RectilinearView({ fov: Math.PI / 2 }, limiter);

        // Create scene.
        var scene = viewer.createScene({
            source: source,
            geometry: geometry,
            view: view,
        });

        // Display scene.
        scene.switchTo();

        // Start playback on click.
        // Playback cannot start automatically because most browsers require the play()
        // method on the video element to be called in the context of a user action.
        document.body.addEventListener("click", tryStart);
        document.body.addEventListener("touchstart", tryStart);

        // Whether playback has started.
        var started = false;

        // Try to start playback.
        function tryStart() {
            if (started) {
                return;
            }
            started = true;

            var video = document.createElement("video");
            video.src = "/video.mp4";
            video.crossOrigin = "anonymous";

            video.autoplay = true;
            video.loop = true;

            // Prevent the video from going full screen on iOS.
            video.playsInline = true;

            video.muted = true;

            video.play();

            waitForReadyState(video, video.HAVE_METADATA, 100, function () {
                waitForReadyState(video, video.HAVE_ENOUGH_DATA, 100, function () {
                    asset.setVideo(video);
                });
            });
        }

        // Wait for an element to reach the given readyState by polling.
        // The HTML5 video element exposes a `readystatechange` event that could be
        // listened for instead, but it seems to be unreliable on some browsers.
        function waitForReadyState(
            element: any,
            readyState: any,
            interval: any,
            done: any
        ) {
            var timer = setInterval(function () {
                if (element.readyState >= readyState) {
                    clearInterval(timer);
                    done(null, true);
                }
            }, interval);
        }
    }, []);

    return (
        <main className="h-screen">
            <div className="h-full w-full absolute" ref={panoRef}></div>
            <div
                ref={clickToStart}
                className="w-full h-full flex items-center justify-center bg-white cursor-pointer z-10 relative"
                onClick={() => {
                    clickToStart.current!.style.display = "none";
                    setOverlay(true);
                }}
            >
                <p>Click anywhere on the page to start playing the video.</p>
            </div>
            {overlay && (
                <div
                    className={`${lora.className} absolute z-20 top-0 inset-x-0 h-14 bg-[rgb(24,25,38)] px-4 flex items-center`}
                >
                    <Link href="/gallery">
                        <Image
                            priority
                            src="/ic-back.svg"
                            alt="back to gallery"
                            width={24}
                            height={24}
                        />
                    </Link>
                </div>
            )}
            {overlay && (
                <div
                    className={`${lora.className} absolute z-20 bottom-0 inset-x-0 h-12 bg-[rgb(24,25,38)] flex items-center justify-center text-white font-medium`}
                >
                    360 video
                </div>
            )}
        </main>
    );
}

export default VIdeo360;
