"use client";

import Image from "next/image";
import React from "react";
import { Fade } from "react-awesome-reveal";
import { RootState } from "@/src/app/[lang]/redux/reducers";
import { useSelector } from "react-redux";
import { lovelyCoffee } from "../Theme2";

function Gallery() {
  const wedding = useSelector((state: RootState) => state.value.wedding);
  const guest = useSelector((state: RootState) => state.value.guest);


  return (
    <section id="gallery">
      <div className="relative my-8">
        <Image
          src="/assets/undanganDigital/theme2/gallery-flower.png"
          alt="flower"
          width={150}
          height={150}
          className="absolute top-0 right-0 lg:hidden"
        />
        <Fade direction="up">
          <h1
            className={`text-[#D5AF6F] px-6 text-[5rem] lg:text-center lg:text-8xl mb-12 ${lovelyCoffee.className}`}
          >
            Our Gallery
          </h1>
        </Fade>
        <Fade direction="up">
          <iframe
            width="1000"
            height="1000"
            src={wedding.media.prewedding_videos[0]}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            className="h-[250px] lg:w-[900px] lg:mx-auto lg:h-[550px] w-full overflow-hidden"
          ></iframe>
        </Fade>
      </div>
    </section>
  );
}

export default Gallery;
