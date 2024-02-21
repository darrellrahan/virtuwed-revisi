"use client";

import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { Icon } from "@iconify/react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-cards";
import "swiper/css/navigation";
import Link from "next/link";
import "../../app/[lang]/swiper-carousel.css";
import { useAsset360Context } from "@/src/context/Asset360Provider";
import { useRestoreScrollContext } from "@/src/context/RestoreScrollProvider";
import { lora } from "@/src/app/[lang]/[weddingslug]/[guestslug]/kenanganvirtual/font";
import { EffectCards, Navigation, Scrollbar } from "swiper";
import { Locale } from "@/i18n.config";

function Memory({
    assets,
    title,
}: {
    assets: { bg: string; url: string; src: string }[];
    title: string;
}) {
    const [explore360, setExplore360] = useState("hidden");
    const openingTouch = useRef<HTMLDivElement>(null);
    const { setPhoto, setVideo } = useAsset360Context();
    const { galleryState, setGalleryState } = useRestoreScrollContext();

    useEffect(() => {
        const id = setTimeout(() => {
            openingTouch.current!.style.display = "none";
            setExplore360("flex");
        }, 2500);

        return () => {
            clearTimeout(id);
        };
    }, []);

    return (
        <section id="preview" className="relative">
            <h1
                className={`${lora.className} text-[#F66F6F] text-3xl font-bold text-center`}
            >
                #{title}
            </h1>
            <div className="px-8 py-16 relative">
                <Swiper
                    initialSlide={galleryState.currentSlide}
                    effect={"cards"}
                    grabCursor={true}
                    scrollbar={{
                        draggable: true,
                    }}
                    modules={[EffectCards, Scrollbar, Navigation]}
                    className="mySwiper"
                    onSlideChange={(swiper: any) => {
                        setGalleryState({
                            ...galleryState,
                            currentSlide: swiper.activeIndex,
                        });
                    }}
                    navigation={true}
                >
                    {assets.map((slide, index) => (
                        <SwiperSlide
                            key={index}
                            style={{ backgroundImage: `url('${slide.bg}')` }}
                            className="bg-cover rounded-md relative"
                        >
                            <Image
                                priority
                                src={
                                    slide.url.includes("photo") ? "/assets/kenanganVirtual/ic-img.svg" : "/assets/kenanganVirtual/ic-video.svg"
                                }
                                alt="media"
                                width={40}
                                height={40}
                                className="absolute top-6 left-6 z-20"
                            />
                            <Link
                                href={slide.url}
                                className="absolute inset-0 items-center justify-center flex"
                                onClick={() => {
                                    if (slide.src.includes("https")) {
                                        return setVideo(slide.src);
                                    }
                                    setPhoto(slide.src);
                                }}
                            >
                                <div
                                    className={`${explore360} flex-col items-center gap-4 z-10 text-white`}
                                >
                                    <Image
                                        src="/assets/kenanganVirtual/ic-360.svg"
                                        alt="360 asset"
                                        width={56}
                                        height={56}
                                    />
                                    <span>Explore 360</span>
                                </div>
                                <div className="absolute inset-0 bg-black/50 rounded-md"></div>
                            </Link>
                        </SwiperSlide>
                    ))}
                    <h1
                        className={`text-2xl font-semibold ${lora.className} absolute -bottom-[4.75rem] right-0`}
                    >
                        {galleryState.currentSlide + 1}/{assets.length}
                    </h1>
                    <div
                        ref={openingTouch}
                        className="pointer-events-none absolute w-full h-full z-40"
                        style={{
                            maxWidth: "400px",
                            maxHeight: "300px",
                            minWidth: "200px",
                            minHeight: "250px",
                            WebkitOverflowScrolling: "touch",
                            top: "50%",
                            left: "50%",
                            transform: "translate(-50%, -50%)",
                        }}
                    >
                        <div className="relative overflow-auto w-full h-full grid text-center justify-items-center content-center">
                            <Icon
                                icon="carbon:touch-1-filled"
                                color="white"
                                fontSize={128}
                                className="animate-pulse animate-wiper"
                            />
                            <h4 className="text-white lg:text-2xl">
                                Geser untuk menggunakan
                                <br />
                                resepsi virtual
                            </h4>
                        </div>
                    </div>
                </Swiper>
            </div>
        </section>
    );
}

export default Memory;
