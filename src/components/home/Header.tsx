"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import { List } from "@phosphor-icons/react";
import { useTogglerContext } from "@/src/context/toggler";
import Link from "next/link";
import { useRouter } from "next/navigation";

function Header({ dict, lang }: { dict: string[]; lang: string }) {
  const { setMobileNavbar } = useTogglerContext();
  const [style, setStyle] = useState("py-8");
  const { push } = useRouter();
  const [selectedLang, setSelectedLang] = useState(lang);

  useEffect(() => {
    push(`/${selectedLang}`);
  }, [selectedLang]);

  useEffect(() => {
    const onPageScroll = () => {
      setStyle(
        window.pageYOffset > 20
          ? "py-4 shadow-[1.95px_1.95px_2.6px_rgba(0,0,0,.15)]"
          : "py-8"
      );
    };
    window.addEventListener("scroll", onPageScroll);

    return () => {
      window.removeEventListener("scroll", onPageScroll);
    };
  }, []);

  return (
    <section
      id="header"
      className={`${style} px-6 lg:px-12 fixed inset-x-0 top-0 z-[999] bg-white flex items-center justify-between duration-300 ease-linear`}
    >
      <Image
        priority={true}
        // src="/assets/logo.svg"
        src="/assets/logopack/Virtuwed_Main_Logo.png"
        alt="logo"
        width={70}
        height={40}
      />
      <div className="hidden lg:flex gap-8 text-lg font-medium">
        {dict.map((data) => (
          <Link key={data} className="capitalize" href="/">
            {data}
          </Link>
        ))}
        <select
          value={selectedLang}
          onChange={(e) => {
            setSelectedLang(e.target.value);
          }}
          className="bg-transparent w-12 cursor-pointer border-none outline-none"
        >
          <option value="id">ID</option>
          <option value="en">EN</option>
        </select>
      </div>
      <button className="lg:hidden" onClick={() => setMobileNavbar(true)}>
        <List size={40} />
      </button>
    </section>
  );
}

export default Header;
