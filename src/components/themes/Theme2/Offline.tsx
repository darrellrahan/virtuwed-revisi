"use client";

import { RootState } from "@/src/app/[lang]/redux/reducers";
import { CaretLeft, CaretRight } from "@phosphor-icons/react";
import React, { useRef } from "react";
import { Fade } from "react-awesome-reveal";
import { useSelector } from "react-redux";
// import { useDataContext } from "../context";

function Offline() {
  const wedding = useSelector((state: RootState) => state.value.wedding);
  // const { data } = useDataContext();
  const slider = useRef<HTMLDivElement>(null);
  const slide = useRef<HTMLDivElement>(null);

  // if (!data) return null;

  function prev() {
    const slideWidth = slide.current!.clientWidth;
    slider.current!.scrollLeft -= slideWidth + 32;
  }

  function next() {
    const slideWidth = slide.current!.clientWidth;
    slider.current!.scrollLeft += slideWidth + 32;
  }

  return (
    <div className="relative">
      <div className="absolute inset-x-8 lg:inset-x-80 -bottom-32 flex justify-between text-4xl text-[#D5AF6F] z-50">
        <button onClick={prev}>
          <CaretLeft />
        </button>
        <button onClick={next}>
          <CaretRight />
        </button>
      </div>
      <Fade direction="up">
        <div className="text-center space-y-4 mb-16 text-[#84a7a1]">
          <h1 className="text-3xl lg:text-4xl font-semibold">
            It&apos;s Wedding Day
          </h1>
          <p className="font-medium text-xl lg:text-2xl">
            We invite you to the following <br />
            Wedding Reception
          </p>
        </div>
      </Fade>
      <div
        ref={slider}
        className="event-slider scroll-smooth flex gap-8 overflow-x-scroll event-slider"
      >
        <div
          ref={slide}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 flex-[1_0_100%]"
        >
          <div className="font-semibold space-y-8">
            <h1 className="text-center text-4xl">Resepsi</h1>
            <div className="flex flex-col items-center justify-center gap-4 lg:gap-8">
              <span className="text-xl py-2 border-y lg:text-3xl border-[#DBBB85] lg:font-semibold uppercase tracking-[6px]">
                {wedding.reception_begin_at.day}
              </span>
              <span className="text-8xl">
                {wedding.reception_begin_at.date.split("-")[0]}
              </span>
              <span className="text-xl py-2 border-y lg:text-3xl border-[#DBBB85] lg:font-semibold uppercase tracking-[6px]">
                {wedding.reception_begin_at.month}
              </span>
            </div>
            <p className="text-center text-3xl">
              {wedding.reception_begin_at.time} -{" "}
              {wedding.reception_end_at.time}
            </p>
          </div>
          <div className="font-semibold space-y-8 hidden md:block lg:block">
            <h1 className="text-center text-4xl">Resepsi</h1>
            <div className="flex flex-col items-center justify-center gap-4 lg:gap-8">
              <span className="text-xl py-2 border-y lg:text-3xl border-[#DBBB85] lg:font-semibold uppercase tracking-[6px]">
                {wedding.reception_begin_at.day}
              </span>
              <span className="text-8xl">
                {wedding.reception_begin_at.date.split("-")[0]}
              </span>
              <span className="text-xl py-2 border-y lg:text-3xl border-[#DBBB85] lg:font-semibold uppercase tracking-[6px]">
                {wedding.reception_begin_at.month}
              </span>
            </div>
            <p className="text-center text-3xl">
              {wedding.reception_begin_at.time} -{" "}
              {wedding.reception_end_at.time}
            </p>
          </div>
          <div className="font-semibold space-y-8 hidden lg:block">
            <h1 className="text-center text-4xl">Resepsi</h1>
            <div className="flex flex-col items-center justify-center gap-4 lg:gap-8">
              <span className="text-xl py-2 border-y lg:text-3xl border-[#DBBB85] lg:font-semibold uppercase tracking-[6px]">
                {wedding.reception_begin_at.day}
              </span>
              <span className="text-8xl">
                {wedding.reception_begin_at.date.split("-")[0]}
              </span>
              <span className="text-xl py-2 border-y lg:text-3xl border-[#DBBB85] lg:font-semibold uppercase tracking-[6px]">
                {wedding.reception_begin_at.month}
              </span>
            </div>
            <p className="text-center text-3xl">
              {wedding.reception_begin_at.time} -{" "}
              {wedding.reception_end_at.time}
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 flex-[1_0_100%]">
          <div className="font-semibold space-y-8">
            <h1 className="text-center text-4xl">Resepsi</h1>
            <div className="flex flex-col items-center justify-center gap-4 lg:gap-8">
              <span className="text-xl py-2 border-y lg:text-3xl border-[#DBBB85] lg:font-semibold uppercase tracking-[6px]">
                {wedding.reception_begin_at.day}
              </span>
              <span className="text-8xl">
                {wedding.reception_begin_at.date.split("-")[0]}
              </span>
              <span className="text-xl py-2 border-y lg:text-3xl border-[#DBBB85] lg:font-semibold uppercase tracking-[6px]">
                {wedding.reception_begin_at.month}
              </span>
            </div>
            <p className="text-center text-3xl">
              {wedding.reception_begin_at.time} -{" "}
              {wedding.reception_end_at.time}
            </p>
          </div>
          <div className="font-semibold space-y-8 hidden md:block lg:block">
            <h1 className="text-center text-4xl">Resepsi</h1>
            <div className="flex flex-col items-center justify-center gap-4 lg:gap-8">
              <span className="text-xl py-2 border-y lg:text-3xl border-[#DBBB85] lg:font-semibold uppercase tracking-[6px]">
                {wedding.reception_begin_at.day}
              </span>
              <span className="text-8xl">
                {wedding.reception_begin_at.date.split("-")[0]}
              </span>
              <span className="text-xl py-2 border-y lg:text-3xl border-[#DBBB85] lg:font-semibold uppercase tracking-[6px]">
                {wedding.reception_begin_at.month}
              </span>
            </div>
            <p className="text-center text-3xl">
              {wedding.reception_begin_at.time} -{" "}
              {wedding.reception_end_at.time}
            </p>
          </div>
          <div className="font-semibold space-y-8 hidden lg:block">
            <h1 className="text-center text-4xl">Resepsi</h1>
            <div className="flex flex-col items-center justify-center gap-4 lg:gap-8">
              <span className="text-xl py-2 border-y lg:text-3xl border-[#DBBB85] lg:font-semibold uppercase tracking-[6px]">
                {wedding.reception_begin_at.day}
              </span>
              <span className="text-8xl">
                {wedding.reception_begin_at.date.split("-")[0]}
              </span>
              <span className="text-xl py-2 border-y lg:text-3xl border-[#DBBB85] lg:font-semibold uppercase tracking-[6px]">
                {wedding.reception_begin_at.month}
              </span>
            </div>
            <p className="text-center text-3xl">
              {wedding.reception_begin_at.time} -{" "}
              {wedding.reception_end_at.time}
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 flex-[1_0_100%]">
          <div className="font-semibold space-y-8">
            <h1 className="text-center text-4xl">Resepsi</h1>
            <div className="flex flex-col items-center justify-center gap-4 lg:gap-8">
              <span className="text-xl py-2 border-y lg:text-3xl border-[#DBBB85] lg:font-semibold uppercase tracking-[6px]">
                {wedding.reception_begin_at.day}
              </span>
              <span className="text-8xl">
                {wedding.reception_begin_at.date.split("-")[0]}
              </span>
              <span className="text-xl py-2 border-y lg:text-3xl border-[#DBBB85] lg:font-semibold uppercase tracking-[6px]">
                {wedding.reception_begin_at.month}
              </span>
            </div>
            <p className="text-center text-3xl">
              {wedding.reception_begin_at.time} -{" "}
              {wedding.reception_end_at.time}
            </p>
          </div>
          <div className="font-semibold space-y-8 hidden md:block lg:block">
            <h1 className="text-center text-4xl">Resepsi</h1>
            <div className="flex flex-col items-center justify-center gap-4 lg:gap-8">
              <span className="text-xl py-2 border-y lg:text-3xl border-[#DBBB85] lg:font-semibold uppercase tracking-[6px]">
                {wedding.reception_begin_at.day}
              </span>
              <span className="text-8xl">
                {wedding.reception_begin_at.date.split("-")[0]}
              </span>
              <span className="text-xl py-2 border-y lg:text-3xl border-[#DBBB85] lg:font-semibold uppercase tracking-[6px]">
                {wedding.reception_begin_at.month}
              </span>
            </div>
            <p className="text-center text-3xl">
              {wedding.reception_begin_at.time} -{" "}
              {wedding.reception_end_at.time}
            </p>
          </div>
          <div className="font-semibold space-y-8 hidden lg:block">
            <h1 className="text-center text-4xl">Resepsi</h1>
            <div className="flex flex-col items-center justify-center gap-4 lg:gap-8">
              <span className="text-xl py-2 border-y lg:text-3xl border-[#DBBB85] lg:font-semibold uppercase tracking-[6px]">
                {wedding.reception_begin_at.day}
              </span>
              <span className="text-8xl">
                {wedding.reception_begin_at.date.split("-")[0]}
              </span>
              <span className="text-xl py-2 border-y lg:text-3xl border-[#DBBB85] lg:font-semibold uppercase tracking-[6px]">
                {wedding.reception_begin_at.month}
              </span>
            </div>
            <p className="text-center text-3xl">
              {wedding.reception_begin_at.time} -{" "}
              {wedding.reception_end_at.time}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Offline;
