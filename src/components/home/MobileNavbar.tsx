"use client";

import { useTogglerContext } from "@/src/context/toggler";
import { CaretRight, X } from "@phosphor-icons/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

function MobileNavbar({ dict, lang }: { dict: string[]; lang: string }) {
  const { mobileNavbar, setMobileNavbar } = useTogglerContext();
  const { push } = useRouter();
  const [selectedLang, setSelectedLang] = useState(lang);
  const [langDropdown, setLangDropdown] = useState(false);

  useEffect(() => {
    push(`/${selectedLang}`);
  }, [selectedLang]);

  return (
    <section
      id="mobile-navbar"
      className={`fixed inset-y-0 right-0 bg-white ${mobileNavbar ? "left-0" : "left-[150%]"
        } z-[9999] transition-all duration-300 ease-linear px-6 py-8`}
    >
      <section
        id="lang-dropdown"
        className={`fixed inset-x-0 bottom-0 ${langDropdown ? "top-0" : "top-[150%]"
          } z-[99999] bg-black/75 duration-300 ease-linear`}
      >
        <div className="absolute inset-x-0 bottom-0 top-1/2 bg-white z-[999999] rounded-t-[30px] p-8">
          <button onClick={() => setLangDropdown(false)}>
            <X size={32} />
          </button>
          <h1 className="text-3xl font-bold mb-8 mt-4">
            {lang === "en" ? "Language Options" : "Pilihan Bahasa"}
          </h1>
          <div className="flex flex-col gap-6">
            <button
              onClick={() => {
                setSelectedLang("id");
              }}
              className="flex items-center gap-4"
            >
              <span
                className={`w-6 h-6 rounded-full flex items-center justify-center border border-[#7c7c7c] ${lang === "en" ? "bg-white" : "bg-blue-600"
                  }`}
              >
                <span className="w-2.5 h-2.5 rounded-full bg-white"></span>
              </span>
              <Image
                priority={true}
                src="/assets/landingpage/id.png"
                alt="id"
                width={24}
                height={24}
              />
              <span>Bahasa Indonesia</span>
            </button>
            <button
              onClick={() => {
                setSelectedLang("en");
              }}
              className="flex items-center gap-4"
            >
              <span
                className={`w-6 h-6 rounded-full flex items-center justify-center border border-[#7c7c7c] ${lang === "en" ? "bg-blue-600" : "bg-white"
                  }`}
              >
                <span className="w-2.5 h-2.5 rounded-full bg-white"></span>
              </span>
              <Image
                priority={true}
                src="/assets/landingpage/en.png"
                alt="en"
                width={24}
                height={24}
              />
              <span>English</span>
            </button>
          </div>
        </div>
      </section>
      <div className="flex justify-between items-center mb-16">
        <Image
          priority={true}
          src="/assets/logopack/Virtuwed_Main_Logo.png"
          alt="logo"
          width={70}
          height={40}
        />
        <button onClick={() => setMobileNavbar(false)}>
          <X size={40} />
        </button>
      </div>
      <div className="flex flex-col gap-8 font-bold text-3xl">
        {dict.map((data) => (
          <Link href="/" key={data} className="capitalize">
            {data}
          </Link>
        ))}
        <button
          onClick={() => setLangDropdown(true)}
          className="flex justify-between items-center"
        >
          <span>{lang === "en" ? "Language" : "Bahasa"}</span>
          <CaretRight size={32} />
        </button>
      </div>
    </section>
  );
}

export default MobileNavbar;
