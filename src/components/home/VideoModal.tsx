"use client";

import { useTogglerContext } from "@/src/context/toggler";
import { X } from "@phosphor-icons/react";
import React from "react";

function VideoModal({ src }: { src: string }) {
  const { videoModal, setVideoModal } = useTogglerContext();

  return (
    <section
      id="hero-video"
      className={`fixed inset-0 bg-black/75 flex items-center justify-center p-6 ${videoModal ? "opacity-100 z-[99999]" : "opacity-0 z-[-99999]"
        } duration-300 ease-linear`}
    >
      <button
        onClick={() => setVideoModal(false)}
        className="absolute top-8 right-6 lg:right-10"
      >
        <X size={48} color="#fff" />
      </button>
      <iframe
        width="560"
        height="315"
        src={src}
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
        className="w-full h-[200px] lg:w-[1000px] lg:h-[500px]"
      ></iframe>
    </section>
  );
}

export default VideoModal;
