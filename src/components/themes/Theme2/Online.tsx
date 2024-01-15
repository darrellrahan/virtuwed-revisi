"use client";

import Link from "next/link";
import React from "react";
import { Fade } from "react-awesome-reveal";
// import { useDataContext } from "../context";
import { RootState } from "@/src/app/[lang]/redux/reducers";
import { useSelector } from "react-redux";

function Online() {
  const wedding = useSelector((state: RootState) => state.value.wedding);
  // const { data } = useDataContext();

  // if (!data) return null;

  return (
    <>
      <Fade direction="up">
        <div className="text-center space-y-4 mb-16 text-[#84a7a1]">
          <h1 className="text-3xl lg:text-4xl font-semibold">
            Intimate Reception
          </h1>
          <p className="font-medium text-xl lg:text-2xl">
            We invite you to the following <br />
            Virtual Wedding Reception
          </p>
        </div>
      </Fade>
      <div className="font-semibold space-y-8 mb-20">
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
      <Fade direction="up">
        <div className="flex justify-center">
          <Link
            href={
              wedding.resepsi_virtual.wedding_live_streaming_link?.full_url ?? ''
            }
            className="rounded-md border-2 border-[#D5AF6F] bg-[#D5AF6F] text-[#003C4C] py-3 px-6 text-2xl font-bold"
          >
            Hadiri Resepsi
          </Link>
        </div>
      </Fade>
    </>
  );
}

export default Online;
