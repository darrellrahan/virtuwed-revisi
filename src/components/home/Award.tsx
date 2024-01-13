import Image from "next/image";
import React from "react";
// import { lora } from "../fonts";

function Award({ dict }: { dict: string }) {
  return (
    <section
      id="award"
      className="p-6 my-24 lg:my-0 lg:px-12 bg-[#F6F6F6] block lg:flex justify-center gap-32"
    >
      <div className="flex justify-between items-center gap-4">
        <Image
          priority={true}
          src="/assets/landingpage/award-left.svg"
          alt="award"
          width={60}
          height={100}
        />
        <p className={` text-[#D2BB65] text-lg font-deAetna`}>
          {dict}
        </p>
        <Image
          priority={true}
          src="/assets/landingpage/award-right.svg"
          alt="award"
          width={60}
          height={100}
        />
      </div>
      <div className="lg:flex justify-between items-center gap-4 hidden">
        <Image
          priority={true}
          src="/assets/landingpage/award-left.svg"
          alt="award"
          width={60}
          height={100}
        />
        <p className={` text-[#D2BB65] text-lg font-deAetna`}>
          {dict}
        </p>
        <Image
          priority={true}
          src="/assets/landingpage/award-right.svg"
          alt="award"
          width={60}
          height={100}
        />
      </div>
      <div className="lg:flex justify-between items-center gap-4 hidden">
        <Image
          priority={true}
          src="/assets/landingpage/award-left.svg"
          alt="award"
          width={60}
          height={100}
        />
        <p className={`text-[#D2BB65] text-lg font-deAetna`}>
          {dict}
        </p>
        <Image
          priority={true}
          src="/assets/landingpage/award-right.svg"
          alt="award"
          width={60}
          height={100}
        />
      </div>
    </section>
  );
}

export default Award;
