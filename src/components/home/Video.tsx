"use client";

import Image from "next/image";
import React from "react";
// import { lora } from "../fonts";
import VideoModal from "./VideoModal";
import { Fade } from "react-awesome-reveal";
import { useTogglerContext } from "@/src/context/toggler";

function Video({ dict }: { dict: string }) {
  const { setVideoModal } = useTogglerContext();

  return (
    <section id="video" className="py-32 relative overflow-hidden">
      <VideoModal src="https://www.youtube.com/embed/zp7IhIxQk6Y?si=9_Ps9SeXENiIsFuW" />
      <div className="z-10 relative px-6 lg:px-48">
        <Fade direction="down">
          <h1
            className={`text-center text-3xl font-semibold  mb-16`}
          >
            {dict}
          </h1>
        </Fade>
        <Fade direction="up">
          <div className="flex items-center justify-center h-[270px] lg:h-[500px] bg-[url('/assets/landingpage/video-thumbnail.svg')] bg-cover bg-center rounded-[10px]">
            <button onClick={() => setVideoModal(true)}>
              <Image
                priority={true}
                src="/assets/landingpage/play-video.svg"
                alt="play video"
                width={90}
                height={90}
              />
            </button>
          </div>
        </Fade>
      </div>
      <Image
        priority={true}
        src="/assets/landingpage/video-line.svg"
        alt="line"
        width={750}
        height={300}
        className="absolute bottom-0 lg:hidden"
      />
      <Image
        priority={true}
        src="/assets/landingpage/video-line-lg.svg"
        alt="line"
        width={1500}
        height={300}
        className="absolute bottom-0 hidden lg:inline-block"
      />
    </section>
  );
}

export default Video;
