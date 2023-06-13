'use client'
import React, { useEffect, useState } from 'react'
import * as THREE from 'three';


//TODO:
// 1. image setup
// 2. image feature
// 3. livestream feature
// 4. storytelling
// 5. gift menu
// 6. leaderboard

const Ballroom = () => {
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    useEffect(() => {
        if (isClient) {
            const PANOLENS = require('panolens'); // Use require for server-side compatibility

            const viewer = new PANOLENS.Viewer({ container: document.getElementById('ballroom'), enableReticle: false, output: 'console', viewIndicator: true });


            const tengah = new PANOLENS.ImagePanorama('/assets/ballroom/tengah.jpg');

            const depan = new PANOLENS.ImagePanorama('/assets/ballroom/depan.jpg');

            const lorong = new PANOLENS.ImagePanorama('/assets/ballroom/lorong.jpg');


            const infospotMid = new PANOLENS.Infospot(500, PANOLENS.DataImage.Info);
            infospotMid.position.set(-100, -500, -5000);
            infospotMid.addHoverText("tengah");

            infospotMid.addEventListener('click', function () {
                viewer.setPanorama(tengah);
            });

            const infospotMid2 = new PANOLENS.Infospot(500, PANOLENS.DataImage.Info);
            infospotMid2.position.set(-100, -500, 5000);
            infospotMid2.addHoverText("tengah");

            infospotMid2.addEventListener('click', function () {
                viewer.setPanorama(tengah);
            });

            const infospotFront = new PANOLENS.Infospot(500, PANOLENS.DataImage.Info);
            infospotFront.position.set(-100, -500, -5000);
            infospotFront.addHoverText("depan");

            infospotFront.addEventListener('click', function () {
                viewer.setPanorama(depan);
            });

            const infospotHallway = new PANOLENS.Infospot(500, PANOLENS.DataImage.Info);
            infospotHallway.position.set(-100, -500, 5000);
            infospotHallway.addHoverText("belakang");

            infospotHallway.addEventListener('click', function () {
                viewer.setPanorama(lorong);
            });

            tengah.add(infospotHallway, infospotFront);
            depan.add(infospotMid2);
            lorong.add(infospotMid);

            viewer.add(tengah, depan, lorong);
        }
    }, [isClient]);

    return (
        <section id='ballroom' className='w-full h-full'></section>
    )
}

export default Ballroom