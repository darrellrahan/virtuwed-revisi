"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Zoom } from "react-awesome-reveal";
// import { useDataContext } from "../context";
// import { lovelyCoffee } from "../fonts";
import { RootState } from "@/src/app/[lang]/redux/reducers";
import { useSelector } from "react-redux";
import { benton, lovelyCoffee, playFair } from "../Theme2";
import Link from "next/link";



function Opening(props: { lang: string }) {
  const wedding = useSelector((state: RootState) => state.value.wedding);
  const guest = useSelector((state: RootState) => state.value.guest);

  // const { data } = useDataContext();
  const [className, setClassName] = useState("bottom-0");

  useEffect(() => {
    document.body.style.overflowY = "hidden";
  }, []);

  // if (!data) return null;

  return (
    <section id="opening">
      <div
        className={`fixed inset-x-0 top-0 ${className} lg:grid lg:grid-cols-2 overflow-hidden z-50 duration-[0.75s] ease-linear bg-[#003C4C]`}
      >
        <div className="hidden lg:block absolute inset-0 bg-[url('/assets/undanganDigital/theme2/opening-tree.svg')] bg-cover bg-no-repeat"></div>
        <div className="hidden lg:block absolute inset-0 bg-[linear-gradient(180deg,_rgba(0,60,76,0.88)_0%,rgba(0,60,76,0.88)_51.47%,#003C4C_100%)]"></div>
        <Image
          src="/assets/undanganDigital/theme2/opening-flower-tl.svg"
          alt="flower"
          width={250}
          height={250}
          className="hidden lg:inline-block absolute top-0 right-0"
        />
        <div className="h-[67.5%] lg:h-full relative pt-16 px-6">
          <div className="z-30 relative lg:hidden">
            <h3 className={`${benton.className} text-3xl text-center font-semibold text-[#D5AF6F]`}>
              We Invite you to
              <br />
              wedding celebration
            </h3>
            <div className="flex gap-8 items-end text-[#D5AF6F] mb-4">
              <h1 className={`text-[6rem] leading-[1] font-semibold ${benton.className}`}>
                {wedding.wedding_name.split(" ")[0]}
              </h1>
              <span
                className={`text-[7.5rem] leading-[1] ${lovelyCoffee.className}`}
              >
                {wedding.wedding_name.split(" ")[1]}
              </span>
            </div>
            <h1 className={`${benton.className} text-[#D5AF6F] text-[6rem] leading-[1] font-semibold text-center mb-8 -translate-x-3`}>
              {wedding.wedding_name.split(" ")[2]}
            </h1>
          </div>
          <Image
            src="/assets/undanganDigital/theme2/opening-flower.svg"
            alt="flower"
            width={500}
            height={500}
            className="absolute -bottom-24 -right-4 lg:-bottom-32 lg:-right-8"
          />
          <div
            style={{
              backgroundImage: `url('https://sgp1.vultrobjects.com/virtuwed-storage/${wedding.undangan_digital.cover_undangan_digital}')`,
            }}
            className="absolute z-10 inset-0 bg-left lg:bg-center bg-cover bg-no-repeat rounded-bl-[50px] lg:rounded-bl-none rounded-br-[270px]"
          ></div>
          <div className="absolute z-20 inset-0 bg-black/75 lg:bg-black/0 rounded-bl-[50px] lg:rounded-bl-none rounded-br-[270px]"></div>
        </div>
        <div className="h-[32.5%] lg:h-full flex items-center lg:flex-col lg:justify-between px-6 lg:px-32 lg:py-16 z-30 relative">
          <Zoom>
            <div className="hidden lg:block text-[#D5AF6F]">
              <h3 className={`${benton.className} text-3xl text-center font-medium`}>
                We Invite you to
                <br />
                wedding celebration
              </h3>
              <div className="flex gap-8 items-end mb-4">
                <h1 className={`text-[6rem] leading-[1] font-semibold ${benton.className}`}>
                  {wedding.wedding_name.split(" ")[0]}
                </h1>
                <span
                  className={`text-[7.5rem] leading-[1] ${lovelyCoffee.className}`}
                >
                  and
                </span>
              </div>
              <h1 className={`text-[6rem] leading-[1] font-semibold text-center mb-8 -translate-x-3 ${benton.className}`}>
                {wedding.wedding_name.split(" ")[2]}
              </h1>
            </div>
          </Zoom>
          <Zoom className="w-full">
            <div className="w-full text-2xl font-semibold">
              <Link href={`/${props.lang}/${wedding.wedding_slug}/${guest.guest_slug}/resepsivirtual`} className={`w-full block mb-4 rounded-md border-2 border-[#D5AF6F] bg-[#D5AF6F] text-center text-2xl text-[#003C4C] py-3 ${benton.className}`}>
                Hadiri Resepsi
              </Link>
              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={() => {
                    setClassName("bottom-[100%]");
                    document.body.style.overflowY = "auto";
                  }}
                  className={`${benton.className} rounded-md text-center border-2 border-[#84A7A1] text-[#84A7A1] py-3`}
                >
                  Undangan
                </button>
                <Link href={`/${props.lang}/${wedding.wedding_slug}/${guest.guest_slug}/menu/kenanganvirtual?place=panoScenes[0]`} className={`rounded-md border-2 border-[#84A7A1] text-center text-2xl text-[#84A7A1] py-3 ${benton.className}`}>
                  Gallery
                </Link>
              </div>
            </div>
          </Zoom>
        </div>
      </div>
    </section>
  );
}

export default Opening;
