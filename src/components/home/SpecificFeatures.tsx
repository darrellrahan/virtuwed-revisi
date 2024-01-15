"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
// import { lora } from "../fonts";
import { Fade } from "react-awesome-reveal";

function SpecificFeatures({
  dict,
}: {
  dict: {
    title: string;
    body: string;
  }[];
}) {
  const [src, setSrc] = useState("/assets/landingpage/value-1.png");

  const IMAGES_SRC = [
    "/assets/landingpage/value-1.png",
    "/assets/landingpage/value-2.png",
    "/assets/landingpage/value-3.png",
    "/assets/landingpage/value-4.png",
    "/assets/landingpage/value-5.gif",
  ];

  useEffect(() => {
    const onPageScroll = () => {
      if (window.scrollY < 2300) {
        return setSrc("/assets/landingpage/value-1.png");
      }
      if (window.scrollY >= 2300 && window.scrollY < 3040) {
        return setSrc("/assets/landingpage/value-2.png");
      }
      if (window.scrollY >= 3040 && window.scrollY < 3780) {
        return setSrc("/assets/landingpage/value-3.png");
      }
      if (window.scrollY >= 3780 && window.scrollY < 4520) {
        return setSrc("/assets/landingpage/value-4.png");
      }
      if (window.scrollY >= 4520 && window.scrollY < 5260) {
        return setSrc("/assets/landingpage/value-5-p.gif");
      }
    };
    window.addEventListener("scroll", onPageScroll);

    return () => {
      window.removeEventListener("scroll", onPageScroll);
    };
  }, []);

  return (
    <section id="specific-features" className="px-6 py-32 lg:py-24 relative">
      <div className="absolute bottom-0 inset-x-0 h-[220px] lg:h-[380px] bg-[url('/assets/landingpage/sf-wave.svg')] lg:bg-[url('/assets/landingpage/sf-wave-lg.svg')] bg-cover bg-no-repeat"></div>
      <div className="z-10 relative lg:flex items-start gap-24 justify-center">
        <Image
          priority={true}
          src={src}
          alt="virtuwed panel"
          width={600}
          height={545}
          className="hidden lg:inline-block sticky top-32 duration-300 ease-linear"
        />
        <div className="mt-16 lg:mt-0 lg:w-[500px] space-y-32 lg:space-y-0">
          {dict.map((data, index) => (
            <div key={data.title} className="lg:h-screen lg:flex items-center">
              <Image
                priority={true}
                src={IMAGES_SRC[index]}
                alt={data.title}
                width={345}
                height={275}
                className="mx-auto lg:hidden mb-8"
              />
              <div>
                <h1
                  className={`text-center lg:text-left text-3xl lg:text-4xl leading-snug font-semibold  mb-6 lg:leading-snug`}
                >
                  {data.title}
                </h1>
                <p className="text-[#7C7C7C] font-medium text-lg">
                  {data.body}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default SpecificFeatures;
