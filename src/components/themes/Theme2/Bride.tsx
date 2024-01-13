"use client";

import { InstagramLogo } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";
import React from "react";
import { Fade, Zoom } from "react-awesome-reveal";
import { useSelector } from "react-redux";
import { RootState } from "@/src/app/[lang]/redux/reducers";
import { benton } from "../Theme2";

function Bride() {
  const wedding = useSelector((state: RootState) => state.value.wedding);
  const guest = useSelector((state: RootState) => state.value.guest);


  return (
    <section id="bride" className="relative">
      <div className="absolute inset-0 bg-[url('/assets/undanganDigital/theme2/bride-bg.svg')] bg-cover"></div>
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,60,76,0.78)_0%,rgba(0,60,76,0.85)_74.88%,#003C4C_109.92%)]"></div>
      <div className="text-[#D5AF6F] z-20 relative lg:grid lg:grid-cols-2 lg:h-screen">
        <Fade
          direction="left"
          className="absolute bottom-8 left-8 hidden lg:block z-10"
        >
          <span className={`${benton.className} text-[#D5AF6F] text-3xl font-semibold`}>
            Putra dari
            <br />
            Bapak{" "}
            {wedding.undangan_digital.pengantin_pria.nama_ortu_bapak}
            <br />
            Ibu{" "}
            {wedding.undangan_digital.pengantin_pria.nama_ortu_ibu}
          </span>
        </Fade>
        <Fade
          direction="right"
          className="absolute bottom-8 right-8 hidden lg:block z-10 text-right"
        >
          <span className={`text-[#D5AF6F] text-3xl font-semibold ${benton.className}`}>
            Putri dari
            <br />
            Bapak{" "}
            {
              wedding.undangan_digital.pengantin_wanita
                .nama_ortu_bapak
            }
            <br />
            Ibu{" "}
            {wedding.undangan_digital.pengantin_wanita.nama_ortu_ibu}
          </span>
        </Fade>
        <div className="h-full relative lg:flex lg:items-center lg:justify-center">
          <div
            style={{
              backgroundImage: `url('https://sgp1.vultrobjects.com/virtuwed-storage/${wedding.undangan_digital.pengantin_pria.foto}')`,
            }}
            className={`hidden lg:block absolute inset-0 bg-cover bg-no-repeat bg-center`}
          ></div>
          <div className="absolute inset-0 bg-black/50 hidden lg:block"></div>
          <div
            style={{
              backgroundImage: `url('https://sgp1.vultrobjects.com/virtuwed-storage/${wedding.undangan_digital.pengantin_pria.foto}')`,
            }}
            className={`h-[15rem] bg-cover bg-[50%_25%] lg:hidden`}
          ></div>
          <Zoom>
            <div className="py-12 flex flex-col items-center gap-16 font-bold z-10 relative px-16">
              <div className="space-y-4 text-center">
                <h1 className={`text-4xl lg:text-5xl leading-[1.25] ${benton.className}`}>
                  {
                    wedding.undangan_digital.pengantin_pria
                      .nama_lengkap
                  }
                </h1>
                <h3 className={`text-2xl lg:hidden ${benton.className}`}>
                  Putra dari Bapak{" "}
                  {
                    wedding.undangan_digital.pengantin_wanita
                      .nama_ortu_bapak
                  }{" "}
                  dan Ibu{" "}
                  {
                    wedding.undangan_digital.pengantin_wanita
                      .nama_ortu_ibu
                  }
                </h3>
                <Link
                  href={`https://www.instagram.com/${wedding.undangan_digital.pengantin_pria.instagram}`}
                  className="flex items-center justify-center gap-2"
                >
                  <InstagramLogo size={32} />
                  <span className={`${benton.className} text-2xl lg:font-normal`}>
                    {
                      wedding.undangan_digital.pengantin_pria
                        .instagram
                    }
                  </span>
                </Link>
              </div>
              <span className={`text-8xl lg:hidden ${benton.className}`}>&</span>
            </div>
          </Zoom>
        </div>
        <div className="h-full relative lg:flex lg:items-center lg:justify-center">
          <div
            style={{
              backgroundImage: `url('https://sgp1.vultrobjects.com/virtuwed-storage/${wedding.undangan_digital.pengantin_wanita.foto}')`,
            }}
            className={`hidden lg:block absolute inset-0 bg-cover bg-no-repeat bg-center`}
          ></div>
          <div className="absolute inset-0 bg-black/50 hidden lg:block"></div>
          <div
            style={{
              backgroundImage: `url('https://sgp1.vultrobjects.com/virtuwed-storage/${wedding.undangan_digital.pengantin_wanita.foto}')`,
            }}
            className={`h-[15rem] bg-cover bg-[50%_25%] lg:hidden`}
          ></div>
          <Zoom>
            <div className="py-12 font-bold space-y-4 text-center z-10 relative px-16">
              <h1 className={`text-4xl lg:text-5xl ${benton.className}`}>
                {
                  wedding.undangan_digital.pengantin_wanita
                    .nama_lengkap
                }
              </h1>
              <h3 className={`text-2xl lg:hidden ${benton.className}`}>
                Putri dari Bapak{" "}
                {
                  wedding.undangan_digital.pengantin_wanita
                    .nama_ortu_bapak
                }{" "}
                dan Ibu{" "}
                {
                  wedding.undangan_digital.pengantin_wanita
                    .nama_ortu_ibu
                }
              </h3>
              <Link
                href={`https://www.instagram.com/${wedding.undangan_digital.pengantin_wanita.instagram}`}
                className="flex items-center justify-center gap-2"
              >
                <InstagramLogo size={32} />
                <span className={`${benton.className} text-2xl lg:font-normal`}>
                  {
                    wedding.undangan_digital.pengantin_wanita
                      .instagram
                  }
                </span>
              </Link>
            </div>
          </Zoom>
        </div>
      </div>
    </section>
  );
}

export default Bride;
