'use client'
import React, { useEffect, useState } from 'react'
import * as THREE from 'three';

const page = () => {
    const [isClient, setIsClient] = useState(false);
    // const [pengantin] = useState(new THREE.Mesh(new THREE.BoxGeometry(100, 100, 100), new THREE.MeshBasicMaterial()));
    // const pengantinPosition = new THREE.Vector3(-300, 100, 100);

    useEffect(() => {
        setIsClient(true);
    }, []);

    useEffect(() => {
        if (isClient) {
            const PANOLENS = require('panolens'); // Use require for server-side compatibility

            const viewer = new PANOLENS.Viewer({ container: document.getElementById('ballroom'), enableReticle: false, output: 'console', viewIndicator: true });


            const tengah = new PANOLENS.ImagePanorama('https://pchen66.github.io/Panolens/examples/asset/textures/equirectangular/sunset.jpg');

            const depan = new PANOLENS.ImagePanorama('https://pchen66.github.io/Panolens/examples/asset/textures/equirectangular/tunnel.jpg');

            const belakang = new PANOLENS.ImagePanorama('https://t3.ftcdn.net/jpg/03/66/15/30/360_F_366153001_8Sz67wI8s4CWm768IZlch9DXwlvExD4w.jpg');


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

            const infospotBehind = new PANOLENS.Infospot(500, PANOLENS.DataImage.Info);
            infospotBehind.position.set(-100, -500, 5000);
            infospotBehind.addHoverText("belakang");

            infospotBehind.addEventListener('click', function () {
                viewer.setPanorama(belakang);
            });

            tengah.add(infospotBehind, infospotFront);
            depan.add(infospotMid2);
            belakang.add(infospotMid);

            viewer.add(tengah, depan, belakang);
        }
    }, [isClient]);

    return (
        <main className='container w-full min-w-full h-screen mx-auto overflow-hidden'>
            <section id='ballroom' className='w-full h-full'></section>
        </main>
    )
}

export default page