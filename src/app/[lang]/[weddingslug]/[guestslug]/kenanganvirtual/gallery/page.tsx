"use client";

import React, { useEffect } from "react";
import { useApiContext } from "@/src/context/ApiProvider";
import { useRestoreScrollContext } from "@/src/context/RestoreScrollProvider";
import Title from "@/src/components/kenanganVirtual/Title";
import Search from "@/src/components/kenanganVirtual/Search";
import Memory from "@/src/components/kenanganVirtual/Memory";
import { Locale } from "@/i18n.config";

function page({ params }: { params: { weddingslug: string, guestslug: string, lang: Locale } }) {
    const { data } = useApiContext();
    const { galleryState, setGalleryState } = useRestoreScrollContext();

    if (!data) return null;

    useEffect(() => {
        function handleScroll() {
            setGalleryState({ ...galleryState, scrollY: window.scrollY });
        }

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    useEffect(() => {
        window.scrollTo({
            top: galleryState.scrollY,
            behavior: "smooth",
        });
    }, []);

    return (
        <main className="p-8 lg:p-16 lg:pb-96 pb-72 relative overflow-hidden">
            <Title />
            <Search />
            <div className="space-y-48">
                {data?.data?.wedding.kenangan_virtual?.map((data: any) => {
                    const photos = data.kenangan_photos.map((photo: any) => {
                        return {
                            bg: `https://sgp1.vultrobjects.com/virtuwed-storage/${photo.thumbnail}`,
                            url: `/${params.lang}/${params.weddingslug}/${params.guestslug}/kenanganvirtual/gallery/photo`,
                            src: photo.equirect_photo,
                        };
                    });
                    const videos = data.kenangan_youtube_url.map((video: any) => {
                        return {
                            bg: `https://sgp1.vultrobjects.com/virtuwed-storage/${video.thumbnail}`,
                            url: `/${params.lang}/${params.weddingslug}/${params.guestslug}/kenanganvirtual/gallery/video`,
                            src: video.url,
                        };
                    });
                    return (
                        <Memory
                            key={data.kenangan_name}
                            assets={photos.concat(videos)}
                            title={data.kenangan_name}
                        />
                    );
                })}
            </div>
            <div className="absolute inset-x-0 bottom-0 h-[250px] lg:h-[600px] bg-[url('/assets/kenanganVirtual/footer-accent-sm.png')] lg:bg-[url('/assets/kenanganVirtual/footer-accent.png')] bg-cover"></div>
        </main>
    );
}

export default page;
