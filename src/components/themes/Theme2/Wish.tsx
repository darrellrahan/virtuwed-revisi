"use client";

import { CaretDown } from "@phosphor-icons/react/dist/ssr";
import React, { useEffect, useState } from "react";
import { Fade, Zoom } from "react-awesome-reveal";
import axios from 'axios';
import { benton, lovelyCoffee } from "../Theme2";
import { useSelector } from "react-redux";
import { RootState } from "@/src/app/[lang]/redux/reducers";

interface InvitationData {
  nama: string;
  status_kehadiran: "Hadir" | "Tidak Hadir" | "Ragu"; // Assuming status can only be one of these values
  ucapan_invitation_text: string;
}

interface UcapanUndanganDigital {
  total: number;
  tidak_hadir: number;
  hadir: number;
  ragu: number;
  data: InvitationData[];
}


function Wish() {

  const wedding = useSelector((state: RootState) => state.value.wedding);
  const guest = useSelector((state: RootState) => state.value.guest);


  const [ucapanUndanganDigital, setUcapanUndanganDigital] = useState<UcapanUndanganDigital | null>(null);
  const [inputValue, setInputValue] = useState({
    presence: 1,
    wishes: "",
  });

  const dataUcapanUndanganDigital = async () => {
    const API_BASE_URL = 'https://panel.virtuwed.id/api';
    const API_ENDPOINT = `/wedding?wedding_slug=${wedding.wedding_slug}&guest_slug=${guest.guest_slug}`;

    try {
      const response = await axios.get(API_BASE_URL + API_ENDPOINT);
      console.log(response.data.data.wedding.undangan_digital.ucapan_undangan_digital);
      setUcapanUndanganDigital(response.data.data.wedding.undangan_digital.ucapan_undangan_digital);

    } catch (error) {
      console.error(error);
    }
  }

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.wishes.trim() === '') {
      // If either name or message is empty, do not proceed with the fetch request
      alert('Jangan lupa isi pesan yaa')
    } else {
      try {

        const postUcapanUndanganDigital = await axios.post(`https://panel.virtuwed.id/api/guest/ucapan/undangan`, {
          wedding_slug: wedding.wedding_slug,
          guest_slug: guest.guest_slug,
          ucapan: inputValue.wishes,
          status_kehadiran: inputValue.presence,
        })

        console.log('Data added:' + postUcapanUndanganDigital);
        setInputValue({ ...inputValue, wishes: "" })

        dataUcapanUndanganDigital()

      } catch (error) {
        console.error('Error adding data:', error);
        // Handle error or show an error message
      }
    }
  };

  useEffect(() => {
    dataUcapanUndanganDigital()
  }, []);


  return (
    <section id="wish" className="relative">
      <div className="absolute top-80 inset-x-0 h-[650px] bg-[url('/assets/undanganDigital/theme2/wishes-bg.svg')] bg-cover bg-no-repeat lg:hidden"></div>
      <div className="absolute top-48 inset-x-0 h-[850px] bg-[url('/assets/undanganDigital/theme2/wishes-bg-desktop.svg')] bg-cover bg-no-repeat hidden lg:block"></div>
      <div className="px-6 lg:px-16 pt-16 lg:pt-32 z-10 relative">
        <Fade direction="up">
          <h1
            className={`text-[#D5AF6F] text-7xl lg:text-8xl ${lovelyCoffee.className} text-center mb-8 lg:mb-16`}
          >
            Wedding Wishes
          </h1>
        </Fade>
        <Fade direction="up">
          <div className="grid grid-cols-3 gap-4 lg:gap-8 mb-12 lg:w-[600px] lg:mx-auto">
            <div className="bg-[#D5AF6F] p-4">
              <div className={` bg-white h-[115px] lg:h-[180px] flex items-center justify-center text-5xl lg:text-7xl mb-4 ${benton.className}`}>
                {
                  ucapanUndanganDigital?.hadir
                }
              </div>
              <p className={`${benton.className} text-3xl font-semibold text-center text-[#003C4C]`}>
                Hadir
              </p>
            </div>
            <div className="bg-[#D5AF6F] p-4">
              <div className={`${benton.className} bg-white h-[115px] lg:h-[180px] flex items-center justify-center text-5xl lg:text-7xl mb-4`}>
                {
                  ucapanUndanganDigital?.tidak_hadir
                }
              </div>
              <p className={`${benton.className} text-3xl font-semibold text-center text-[#003C4C]`}>
                Absen
              </p>
            </div>
            <div className="bg-[#D5AF6F] p-4">
              <div className={`${benton.className} bg-white h-[115px] lg:h-[180px] flex items-center justify-center text-5xl lg:text-7xl mb-4`}>
                {
                  ucapanUndanganDigital?.ragu
                }
              </div>
              <p className={`text-3xl font-semibold text-center text-[#003C4C] ${benton.className}`}>
                Ragu
              </p>
            </div>
          </div>
          <div className="space-y-4 mb-12 lg:mb-32 lg:w-[600px] lg:mx-auto">
            <div className="relative h-[60px]">
              <span className="absolute top-3.5 right-4">
                <CaretDown size={32} />
              </span>
              <select
                onChange={(e) =>
                  setInputValue({
                    ...inputValue,
                    presence: Number(e.target.value),
                  })
                }
                value={inputValue.presence}
                className={`${benton.className} h-full w-full rounded-md px-4 flex items-center appearance-none cursor-pointer text-xl font-semibold`}
              >
                <option value={1}>Hadir</option>
                <option value={0}>Absen</option>
                <option value={2}>Ragu</option>
              </select>
            </div>
            <div>
              <textarea
                onChange={(e) =>
                  setInputValue({ ...inputValue, wishes: e.target.value })
                }
                value={inputValue.wishes}
                placeholder="Your wish..."
                className={`${benton.className} w-full h-[225px] rounded-md placeholder:text-black p-4 text-xl font-semibold`}
              />
            </div>
            <div>
              <button
                onClick={handleFormSubmit}
                className={`${benton.className} rounded-md border-2 border-[#D5AF6F] bg-[#D5AF6F] text-[#003C4C] py-3 text-center w-full text-2xl font-bold`}
              >
                Kirim
              </button>
            </div>
          </div>
        </Fade>
        <Zoom>
          <h3 className={`${benton.className} text-[#D5AF6F] text-3xl lg:text-4xl lg:font-semibold lg:mb-10 font-bold mb-8`}>
            {
              ucapanUndanganDigital?.data.length
            }{" "}
            Wishes
          </h3>
        </Zoom>
        <Zoom>
          <div className="space-y-4 mb-8 lg:mb-16 lg:space-y-0 lg:grid lg:grid-cols-3 lg:gap-8">
            {ucapanUndanganDigital?.data.map(
              (data: any) => (
                <div key={data.nama} className="p-6 bg-white rounded-md">
                  <h4 className={`${benton.className} text-2xl font-bold mb-1`}>{data.nama}</h4>
                  <p className={`${benton.className} text-[1.35rem] font-light overflow-hidden`}>
                    {data.ucapan_invitation_text}
                  </p>
                </div>
              )
            )}
          </div>
        </Zoom>
        {/* <div className="flex justify-center">
          <button className="text-3xl border-b border-[#D5AF6F] text-[#D5AF6F]">
            See more
          </button>
        </div> */}
      </div>
    </section>
  );
}

export default Wish;
