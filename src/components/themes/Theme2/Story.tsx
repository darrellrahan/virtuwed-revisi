"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/src/app/[lang]/redux/reducers";
import { benton, lovelyCoffee } from "../Theme2";

function Story() {

  const wedding = useSelector((state: RootState) => state.value.wedding);
  const guest = useSelector((state: RootState) => state.value.guest);



  const maxIndex = wedding.undangan_digital.kisah_cinta.length - 1;

  const [carouselIndex, setCarouselIndex] = useState(0);
  const [indexDesktop, setIndexDesktop] = useState(0);
  const [prevBtn, setPrevBtn] = useState({
    year: wedding.undangan_digital.kisah_cinta[
      maxIndex
    ].kisah_cinta_date.split("-")[0],
    number: `#${wedding.undangan_digital.kisah_cinta.length}`,
  });
  const [nextBtn, setNextBtn] = useState({
    year: wedding.undangan_digital.kisah_cinta[1].kisah_cinta_date.split(
      "-"
    )[0],
    number: "#2",
  });

  function nextSlide() {
    setCarouselIndex(carouselIndex === maxIndex ? 0 : carouselIndex + 1);
  }
  function prevSlide() {
    setCarouselIndex(carouselIndex === 0 ? maxIndex : carouselIndex - 1);
  }

  useEffect(() => {
    setPrevBtn({
      year: wedding.undangan_digital.kisah_cinta[
        carouselIndex === 0 ? maxIndex : carouselIndex - 1
      ].kisah_cinta_date.split("-")[0],
      number: `#${carouselIndex === 0 ? maxIndex + 1 : carouselIndex}`,
    });
    setNextBtn({
      year: wedding.undangan_digital.kisah_cinta[
        carouselIndex === maxIndex ? 0 : carouselIndex + 1
      ].kisah_cinta_date.split("-")[0],
      number: `#${carouselIndex === maxIndex ? 1 : carouselIndex + 2}`,
    });
  }, [carouselIndex]);

  return (
    <section id="story" className="relative">
      <Image
        src="/assets/undanganDigital/theme2/moments-accent.svg"
        alt="accent"
        width={500}
        height={500}
        className="absolute -bottom-60 hidden lg:inline-block"
      />
      <div className="bg-white text-[#003C4C] py-12 lg:px-12 mb-24 lg:mb-48 lg:ml-48 z-10 relative">
        <h1
          className={`${lovelyCoffee.className} text-center lg:text-left text-8xl mb-12`}
        >
          Love Stories
        </h1>
        <div className="lg:hidden relative h-[750px] flex items-center overflow-hidden">
          <button
            className="absolute top-0 left-0 text-center text-black z-10"
            onClick={prevSlide}
          >
            <span className={`${benton.className} text-4xl font-bold`}>{prevBtn.year}</span> <br />{" "}
            <span className={`text-xl ${benton.className}`}>{prevBtn.number}</span>
          </button>
          <button
            className="absolute top-0 right-0 text-center text-black z-10"
            onClick={nextSlide}
          >
            <span className={`${benton.className} text-4xl font-bold`}>{nextBtn.year}</span> <br />{" "}
            <span className={`text-xl ${benton.className}`}>{nextBtn.number}</span>
          </button>
          {wedding.undangan_digital.kisah_cinta.map(
            (item: any, index: number) => {
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
                  key={item.kisah_cinta_judul}
                  className={`absolute inset-0 duration-[0.5s] ease-linear ${className}`}
                >
                  <div className="flex flex-col gap-4 items-center">
                    <h1 className={`${benton.className} text-6xl font-semibold text-black`}>
                      {item.kisah_cinta_date.split("-")[0]}
                    </h1>
                    <div className="w-[1.25px] h-[100px] bg-black"></div>
                    <p className={`${benton.className} text-xl text-black`}>#{index + 1}</p>
                    <p className={`${benton.className} text-2xl font-semibold px-12`}>
                      {item.kisah_cinta_cerita}
                    </p>
                  </div>
                </div>
              );
            }
          )}
        </div>
        <div className="flex-col gap-8 relative hidden lg:flex">
          <p className={`${benton.className} absolute left-[24rem] top-0 right-12 bottom-12 text-2xl font-semibold`}>
            {
              wedding.undangan_digital.kisah_cinta[indexDesktop]
                .kisah_cinta_cerita
            }
          </p>
          {wedding.undangan_digital.kisah_cinta.map(
            (data: any, index: number) => {
              return (
                <button
                  onClick={() => setIndexDesktop(index)}
                  className="flex gap-4 items-center text-black"
                >
                  <span
                    className={`${index === indexDesktop ? "text-5xl" : "text-4xl"
                      } font-semibold ${benton.className}`}
                  >
                    {data.kisah_cinta_date.split("-")[0]}
                  </span>
                  <span
                    className={`${index === indexDesktop ? "w-[200px]" : "w-0"
                      } h-[1.5px] bg-black duration-300 ease-linear ${benton.className}`}
                  ></span>
                  <span
                    className={`font-semibold ${index === indexDesktop ? "text-2xl" : "text-base"
                      } ${benton.className}`}
                  >
                    #{index + 1}
                  </span>
                </button>
              );
            }
          )}
        </div>
      </div>
    </section>
  );
}

export default Story;
