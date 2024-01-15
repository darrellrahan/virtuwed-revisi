"use client";

import { RootState } from "@/src/app/[lang]/redux/reducers";
import { ArrowDown } from "@phosphor-icons/react/dist/ssr";
import React from "react";
import { Fade, Zoom } from "react-awesome-reveal";
import { useSelector } from "react-redux";
import { benton, lovelyCoffee } from "../Theme2";

function Hero() {
  const wedding = useSelector((state: RootState) => state.value.wedding);
  const guest = useSelector((state: RootState) => state.value.guest);



  return (
    <section id="hero">
      <div className="lg:h-screen lg:overflow-hidden px-6 pt-16 mb-12 text-[#D5AF6F] bg-[url('/assets/undanganDigital/theme2/hero-accent-bg.svg')] lg:bg-none bg-cover bg-no-repeat lg:px-16 lg:grid lg:grid-cols-2 lg:gap-48 lg:items-center relative">
        <div className="hidden lg:block absolute inset-y-0 left-0 w-[250px] bg-[url('/assets/undanganDigital/theme2/hero-accent-left.svg')] bg-cover bg-no-repeat"></div>
        <div className="hidden lg:block absolute inset-y-0 right-0 w-[250px] bg-[url('/assets/undanganDigital/theme2/hero-accent-right.svg')] bg-cover bg-no-repeat"></div>
        <div className="hidden lg:flex absolute inset-x-0 bottom-0 justify-center">
          <Fade direction="up">
            <button className={`rounded-[3.125rem] border-2 border-white text-white flex flex-col gap-6 py-4 px-5 items-center text-center animate-bounce ${benton.className}`}>
              <span className="text-2xl font-semibold">
                Our
                <br />
                Story
              </span>
              <span>
                <ArrowDown size={32} />
              </span>
            </button>
          </Fade>
        </div>
        <div className="lg:scale-[1.75] lg:-translate-y-12 z-20 relative mb-8 lg:mb-0">
          <Zoom>
            <h3 className={`text-3xl lg:text-2xl lg:font-medium text-center font-semibold ${benton.className}`}>
              Wedding Invitation
            </h3>
          </Zoom>
          <div className="flex gap-8 lg:justify-center items-end">
            <Fade direction="left">
              <h1 className={`text-[4rem]  leading-[1] font-semibold ${benton.className}`}>
                {wedding.wedding_name.split(" ")[0]}
              </h1>
            </Fade>
            <Fade direction="right">
              <span
                className={`text-[5.5rem] leading-[1] ${lovelyCoffee.className}`}
              >
                &
              </span>
            </Fade>
          </div>
          <Fade direction="up">
            <h1 className={`text-[4rem] leading-[1] font-semibold text-center ${benton.className}`}>
              {wedding.wedding_name.split(" ")[2]}
            </h1>
          </Fade>
        </div>
        <div
          style={{
            backgroundImage: `url('https://sgp1.vultrobjects.com/virtuwed-storage/${wedding.undangan_digital.cover_undangan_digital}')`,
          }}
          className={`h-[31.25rem] lg:h-full bg-cover bg-no-repeat lg:bg-center rounded-tl-full rounded-tr-full flex items-end justify-center p-4 z-20 relative`}
        >
          <button className="lg:hidden rounded-[3.125rem] border-2 border-white text-white flex flex-col gap-6 py-4 px-5 items-center text-center animate-bounce">
            <span className="text-2xl font-semibold">
              Our
              <br />
              Story
            </span>
            <span>
              <ArrowDown size={32} />
            </span>
          </button>
        </div>
      </div>
    </section>
  );
}

export default Hero;
