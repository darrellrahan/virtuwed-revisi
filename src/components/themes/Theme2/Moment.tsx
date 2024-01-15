"use client";

import { RootState } from "@/src/app/[lang]/redux/reducers";
import { ArrowLeft, ArrowRight } from "@phosphor-icons/react";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { Fade } from "react-awesome-reveal";
import { useSelector } from "react-redux";
import { lovelyCoffee } from "../Theme2";

function Moment() {
  const wedding = useSelector((state: RootState) => state.value.wedding);
  const guest = useSelector((state: RootState) => state.value.guest);


  const maxIndex = wedding.media.prewedding_photos.length - 1;

  const [carouselIndex, setCarouselIndex] = useState(0);
  const sliderRef = useRef<HTMLDivElement>(null);

  function nextSlide() {
    setCarouselIndex(carouselIndex === maxIndex ? 0 : carouselIndex + 1);
  }
  function prevSlide() {
    setCarouselIndex(carouselIndex === 0 ? maxIndex : carouselIndex - 1);
    const slider = sliderRef.current;
    slider!.scrollLeft = slider!.scrollLeft - 250;
  }

  useEffect(() => {
    const id = setInterval(nextSlide, 5000);

    return () => {
      clearInterval(id);
    };
  }, [carouselIndex]);

  useEffect(() => {
    const slider = sliderRef.current;
    slider!.scrollLeft = slider!.scrollLeft + 250;
  }, []);

  return (
    <section id="story">
      <div className="pb-48 relative pt-24 text-[#D5AF6F]">
        <Image
          src="/assets/undanganDigital/theme2/moments-accent.svg"
          alt="accent"
          width={500}
          height={500}
          className="absolute -bottom-36 lg:-bottom-60"
        />
        <div className="flex flex-col lg:flex-row justify-between gap-8 lg:gap-0 lg:items-center mb-16 px-6 lg:px-16">
          <Fade direction="left">
            <h1
              className={`text-[4.25rem] lg:text-9xl ${lovelyCoffee.className}`}
            >
              Our Moments
            </h1>
          </Fade>
          <Fade direction="right">
            <div className="flex justify-between lg:gap-8">
              <button onClick={prevSlide}>
                <ArrowLeft size={36} weight="bold" />
              </button>
              <button
                onClick={() => {
                  nextSlide();
                  const slider = sliderRef.current;
                  slider!.scrollLeft = slider!.scrollLeft + 250;
                }}
              >
                <ArrowRight size={36} weight="bold" />
              </button>
            </div>
          </Fade>
        </div>
        <div className="flex items-center relative overflow-hidden h-[370px] mx-6 lg:hidden">
          {wedding.media.prewedding_photos.map(
            (data: any, index: any) => {
              let className = "translate-x-full opacity-0";

              if (index === carouselIndex) {
                className = "translate-x-0 opacity-100";
              }
              if (
                index === carouselIndex - 1 ||
                (index === maxIndex && carouselIndex === 0)
              ) {
                className = "-translate-x-full opacity-0";
              }

              return (
                <div
                  style={{
                    backgroundImage: `url('https://sgp1.vultrobjects.com/virtuwed-storage/${data}')`,
                  }}
                  key={data}
                  className={`${className} absolute inset-0 duration-300 ease-linear mx-auto bg-cover bg-center rounded-[15px]`}
                ></div>
              );
            }
          )}
        </div>
        <div
          ref={sliderRef}
          className="scrollbar-none gap-8 h-[470px] scroll-smooth hidden lg:flex overflow-x-auto"
        >
          {wedding.media.prewedding_photos.map((data: any) => {
            return (
              <div
                style={{
                  backgroundImage: `url('https://sgp1.vultrobjects.com/virtuwed-storage/${data}')`,
                }}
                key={data}
                className="flex-none h-full w-[370px] bg-cover bg-center rounded-[15px]"
              ></div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default Moment;
