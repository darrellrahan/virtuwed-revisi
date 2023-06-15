'use client'
import React, { useEffect, useState } from 'react'
import * as THREE from 'three';


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



const Ballroom = () => {
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    useEffect(() => {
        if (isClient) {
            let pov = 'daridepan'
            const PANOLENS = require('panolens'); // Use require for server-side compatibility
            const lookAtPositions = [
                new THREE.Vector3(5000, 0, 0), //depan
                new THREE.Vector3(5000, 0, 0), //mid
                new THREE.Vector3(-5000, 0, 0) //lorong
            ];


            const viewer = new PANOLENS.Viewer({ container: document.getElementById('ballroom'), enableReticle: false, output: 'console', viewIndicator: true });


            //ASSET SETUP 
            const tengah = new PANOLENS.ImagePanorama('/assets/ballroom/tengah.jpg');
            tengah.addEventListener('enter-fade-start', function () {
                pov == 'daridepan' ?
                    viewer.tweenControlCenter(lookAtPositions[1], 0)
                    :
                    viewer.tweenControlCenter(lookAtPositions[2], 0)

            });

            const depan = new PANOLENS.ImagePanorama('/assets/ballroom/depan.jpg');
            depan.addEventListener('enter-fade-start', function () {
                viewer.tweenControlCenter(lookAtPositions[0], 0);
            });

            const lorong = new PANOLENS.ImagePanorama('/assets/ballroom/lorong.jpg');
            lorong.addEventListener('enter-fade-start', function () {
                viewer.tweenControlCenter(lookAtPositions[2], 0);
            });


            // LINKING SETUP
            const infospotMid = new PANOLENS.Infospot(500, PANOLENS.DataImage.Info);
            infospotMid.position.set(5000, 0, 0);
            infospotMid.addHoverText("tengah");

            infospotMid.addEventListener('click', function () {
                viewer.setPanorama(tengah);
                pov = 'daridepan'
            });

            const infospotMid2 = new PANOLENS.Infospot(500, PANOLENS.DataImage.Info);
            infospotMid2.position.set(-5000, 0, 0);
            infospotMid2.addHoverText("tengah");

            infospotMid2.addEventListener('click', function () {
                viewer.setPanorama(tengah);
                pov = 'daribelakang'
            });

            const infospotFront = new PANOLENS.Infospot(500, PANOLENS.DataImage.Info);
            infospotFront.position.set(5000, 0, 0);
            infospotFront.addHoverText("depan");

            infospotFront.addEventListener('click', function () {
                viewer.setPanorama(depan);
            });

            const infospotHallway = new PANOLENS.Infospot(500, PANOLENS.DataImage.Info);
            infospotHallway.position.set(-5000, 0, 0);
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