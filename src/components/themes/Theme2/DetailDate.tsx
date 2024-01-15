"use client";

import Image from "next/image";
import React, { useState } from "react";
import { Fade } from "react-awesome-reveal";
import Countdown from "react-countdown";
import Link from "next/link";
import { useSelector } from "react-redux";
import { RootState } from "@/src/app/[lang]/redux/reducers";
import { benton, lovelyCoffee } from "../Theme2";
import Offline from "./Offline";
import Online from "./Online";

function DetailDate() {
  const wedding = useSelector((state: RootState) => state.value.wedding);
  const guest = useSelector((state: RootState) => state.value.guest);

  const [isTabVirtual, setIsTabVirtual] = useState(true);



  function renderer({
    days,
    hours,
    minutes,
    seconds,
    completed,
  }: {
    days: any;
    hours: any;
    minutes: any;
    seconds: any;
    completed: any;
  }) {
    return completed ? (
      <span>The event has passed.</span>
    ) : (
      <span>
        {days}:{hours}:{minutes}:{seconds}
      </span>
    );
  }

  return (
    <section id="detail-date" className="relative pb-32">
      {/* <div className="absolute inset-0 bg-[url('/assets/date-bg.svg')] bg-no-repeat bg-cover bg-center hidden lg:block"></div> */}
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,60,76,0.78)_0%,rgba(0,60,76,0.85)_74.88%,#003C4C_109.92%)] hidden lg:block"></div>
      <Image
        src="/assets/date-flower-left.svg"
        alt="flower"
        width={250}
        height={250}
        className="absolute bottom-0 left-0 hidden lg:inline-block"
      />
      <Image
        src="/assets/date-flower-right.svg"
        alt="flower"
        width={250}
        height={250}
        className="absolute bottom-0 right-0 hidden lg:inline-block"
      />
      <div className="absolute bottom-0 inset-x-0 h-[125px] bg-[url('/assets/date-flower.png')] lg:hidden"></div>
      <div className="px-6 lg:px-32 pt-12 lg:pt-32 pb-40 lg:pb-48 text-[#D5AF6F] z-10 relative">
        <Fade direction="down">
          <h1 className={`text-center text-8xl mb-8 ${lovelyCoffee.className}`}>
            Save <br className="lg:hidden" />
            The Date
          </h1>
        </Fade>
        <Fade direction="up">
          <h3 className="text-center text-[4.25rem] lg:text-[5rem] leading-[1] font-light mb-16 text-[#84A7A1]">
            <Countdown
              date={
                new Date(
                  `${wedding.reception_begin_at.date.split("-")[2]}-${wedding.reception_begin_at.date.split("-")[1]
                  }-${wedding.reception_begin_at.date.split("-")[0]}`
                )
              }
              renderer={renderer}
            />
          </h3>
        </Fade>
        <Fade direction="up">
          <div className="grid grid-cols-2 text-2xl lg:text-3xl mb-10 lg:mb-16">
            <button
              onClick={() => setIsTabVirtual(true)}
              className={`border-r-2 border-b-2 pb-3 border-[#84A7A1] lg:pb-4 ${isTabVirtual ? "underline" : ""
                }`}
            >
              Online
            </button>
            <button
              onClick={() => setIsTabVirtual(false)}
              className={`border-b-2 pb-3 lg:pb-4 border-[#84A7A1] ${!isTabVirtual ? "underline" : ""
                }`}
            >
              Offline
            </button>
          </div>
        </Fade>
        {isTabVirtual ? <Online /> : <Offline />}
      </div>
    </section>
  );
}

export default DetailDate;
