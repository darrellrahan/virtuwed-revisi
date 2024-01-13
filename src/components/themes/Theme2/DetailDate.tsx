"use client";

import Image from "next/image";
import React, { useState } from "react";
import { Fade } from "react-awesome-reveal";
import Countdown from "react-countdown";
import Link from "next/link";
import { useSelector } from "react-redux";
import { RootState } from "@/src/app/[lang]/redux/reducers";
import { benton, lovelyCoffee } from "../Theme2";

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
    <section id="detail-date" className="relative">
      <div className="absolute inset-0 bg-[url('/assets/undanganDigital/theme2/date-bg.svg')] bg-no-repeat bg-cover bg-center hidden lg:block"></div>
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,60,76,0.78)_0%,rgba(0,60,76,0.85)_74.88%,#003C4C_109.92%)] hidden lg:block"></div>
      <Image
        src="/assets/undanganDigital/theme2/date-flower-left.svg"
        alt="flower"
        width={250}
        height={250}
        className="absolute bottom-0 left-0 hidden lg:inline-block"
      />
      <Image
        src="/assets/undanganDigital/theme2/date-flower-right.svg"
        alt="flower"
        width={250}
        height={250}
        className="absolute bottom-0 right-0 hidden lg:inline-block"
      />
      <div className="absolute bottom-0 inset-x-0 h-[125px] bg-[url('/assets/undanganDigital/theme2/date-flower.png')] lg:hidden"></div>
      <div className="px-6 lg:px-32 pt-12 lg:pt-32 pb-40 lg:pb-48 text-[#D5AF6F] z-10 relative">
        <Fade direction="down">
          <h1 className={`text-center text-8xl mb-8 ${lovelyCoffee.className}`}>
            Save <br className="lg:hidden" />
            The Date
          </h1>
        </Fade>
        <Fade direction="up">
          <h3 className={`${benton.className} text-center text-[4.25rem] lg:text-[5rem] leading-[1] font-light mb-16 text-[#84A7A1]`}>
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
              className={`${benton.className} border-r-2 border-b-2 pb-3 border-[#84A7A1] lg:pb-4 ${isTabVirtual ? "underline" : ""
                }`}
            >
              Online
            </button>
            <button
              onClick={() => setIsTabVirtual(false)}
              className={`${benton.className} border-b-2 pb-3 lg:pb-4 border-[#84A7A1] ${!isTabVirtual ? "underline" : ""
                }`}
            >
              Offline
            </button>
          </div>
        </Fade>
        <Fade direction="up">
          <div className="text-center space-y-4 mb-16 text-[#84a7a1]">
            <h1 className={`${benton.className} text-3xl lg:text-4xl font-semibold`}>
              {isTabVirtual ? "Intimate Reception" : "It's Wedding Day"}
            </h1>
            <p className={`${benton.className} font-medium text-xl lg:text-2xl`}>
              We invite you to the following <br />
              {isTabVirtual && "Virtual"} Wedding Reception
            </p>
          </div>
        </Fade>
        <Fade direction="up">
          <div className="mb-12 lg:mb-20 lg:flex lg:justify-center lg:gap-16">
            <div
              className={`space-y-8 font-semibold ${isTabVirtual ? "hidden" : "block"
                }`}
            >
              <h1 className={`${benton.className} text-center text-4xl`}>Akad nikah</h1>
              <div className="flex flex-col items-center justify-center gap-4 lg:gap-8">
                <span className={`${benton.className} text-xl py-2 border-y lg:text-3xl border-[#DBBB85] lg:font-semibold uppercase tracking-[6px]`}>
                  {new Date(
                    wedding.undangan_digital.daftar_acara[0]?.event_date
                  ).toLocaleDateString("id-ID", {
                    weekday: "long",
                  })}
                </span>
                <span className={`${benton.className} text-8xl`}>
                  {new Date(
                    wedding.undangan_digital.daftar_acara[0]?.event_date
                  ).getDate()}
                </span>
                <span className={`${benton.className} text-xl py-2 border-y lg:text-3xl border-[#DBBB85] lg:font-semibold uppercase tracking-[6px]`}>
                  {new Date(
                    wedding.undangan_digital.daftar_acara[0]?.event_date
                  ).toLocaleDateString("id-ID", {
                    month: "long",
                  })}
                </span>
              </div>
              <p className={`${benton.className} text-center text-3xl`}>
                {
                  wedding.undangan_digital.daftar_acara[0]?.event_time.split(
                    ":"
                  )[0]
                }
                :
                {
                  wedding.undangan_digital.daftar_acara[0]?.event_time.split(
                    ":"
                  )[1]
                }
              </p>
            </div>
            <div
              className={`my-12 h-[2px] lg:w-[1.5px] lg:h-[405px] lg:my-0 bg-[#84A7A1] ${isTabVirtual ? "hidden" : "block"
                }`}
            />
            <div className="font-semibold space-y-8">
              <h1 className={`text-center text-4xl ${benton.className}`}>Resepsi</h1>
              <div className="flex flex-col items-center justify-center gap-4 lg:gap-8">
                <span className={`${benton.className} text-xl py-2 border-y lg:text-3xl border-[#DBBB85] lg:font-semibold uppercase tracking-[6px]`}>
                  {wedding.reception_begin_at.day}
                </span>
                <span className={`${benton.className} text-8xl`}>
                  {wedding.reception_begin_at.date.split("-")[0]}
                </span>
                <span className={`${benton.className} text-xl py-2 border-y lg:text-3xl border-[#DBBB85] lg:font-semibold uppercase tracking-[6px]`}>
                  {wedding.reception_begin_at.month}
                </span>
              </div>
              <p className={`${benton.className} text-center text-3xl`}>
                {wedding.reception_begin_at.time} -{" "}
                {wedding.reception_end_at.time}
              </p>
            </div>
          </div>
        </Fade>
        <Fade direction="up">
          <div className="flex justify-center">
            <Link
              href={
                isTabVirtual
                  ? wedding.resepsi_virtual.wedding_live_streaming_link?.full_url || "#"
                  : wedding.undangan_digital.reception_location_maps_url
              }
              className={`${benton.className} rounded-md border-2 border-[#D5AF6F] bg-[#D5AF6F] text-[#003C4C] py-3 px-6 text-2xl font-bold`}
            >
              {isTabVirtual ? "Hadiri Resepsi" : "View Maps"}
            </Link>
          </div>
        </Fade>
      </div>
    </section>
  );
}

export default DetailDate;
