"use client";

// import { setData, fetchData as fetchAction, setNewData, fetchNewData } from '@/app/redux/actions';
import {
  setData,
  fetchData as fetchAction,
  setNewData,
  fetchNewData,
} from "../../redux/actions";
// import { RootState } from '@/app/redux/reducers';
import { RootState } from "../../redux/reducers";

import { ButtonDaisy } from "@/src/components/ButtonComponent";
import LoadingSkeleton from "@/src/components/LoadingSkeleton";
import Theme1 from "@/src/components/themes/Theme1";
import Theme2 from "@/src/components/themes/Theme2";
import axios from "axios";
import React, { Suspense, useEffect, useState } from "react";
import { redirect } from "next/navigation";

import { useDispatch, useSelector } from "react-redux";
import Image from "next/image";
import Link from "next/link";
import { Locale } from "@/i18n.config";

const Page = ({
  params,
}: {
  params: { weddingslug: string; guestslug: string; lang: Locale };
}) => {
  const dispatch = useDispatch();

  const API_BASE_URL = "https://panel.virtuwed.id/api";
  const API_ENDPOINT = `/wedding?wedding_slug=${params.weddingslug}&${
    params.guestslug && params.guestslug ? "guest_slug=" + params.guestslug : ""
  }`;
  const ANALYTIC = `/wedding/analytic?wedding_slug=${params.weddingslug}&guest_slug=${params.guestslug}&feature_hit=undangan_digital`;

  const [message, setMessage] = useState<string | null>(null);
  const [dataGuest, setDataGuest] = useState<any>(null);

  const wedding = useSelector((state: RootState) => state.value.wedding);
  const guest = useSelector((state: RootState) => state.value.guest);
  const theme = useSelector((state: RootState) => state.value.theme);

  interface ThemeComponents {
    [key: string]: ({ lang }: { lang: Locale }) => JSX.Element;
  }

  const themeComponents: ThemeComponents = {
    "Theme 1": Theme1,
    "Theme 2": Theme2,
    // 'Theme 3': Theme3,
    // Add Theme3Component, Theme4Component, ..., Theme20Component as needed
    // For any unknown theme, fall back to DefaultComponent
    // 'default': DefaultTheme,
  };

  useEffect(() => {
    dispatch(fetchAction());

    const fetchData = async () => {
      try {
        const response = await axios.get(API_BASE_URL + API_ENDPOINT);

        if (response.data.message === "guest_slug_required") {
          setMessage(response.data.message);
        } else if (response.data.message === "wedding_not_found") {
          setMessage(response.data.message);
        } else if (response.data.message === "wedding_is_private") {
          setMessage(response.data.message);
        } else if (response.data.message === "please_register_a_new_guest") {
          setMessage(response.data.message);
        } else {
          setDataGuest(response.data.data.guest);
          dispatch(setData(response.data.data));
          // setMessage(response.data.data.message)

          hitAnalytic();
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    const hitAnalytic = async () => {
      try {
        const response = await axios.get(API_BASE_URL + ANALYTIC);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    dispatch(setNewData(params.weddingslug));
    fetchData();
  }, []);

  const ThemeComponent = themeComponents[theme.nama_theme];

  // switch (message) {
  //     case 'guest_slug_required':
  //         return (
  //             <Suspense fallback={<LoadingSkeleton />}>
  //                 <div>GUEST SLUG REQUIRED</div>
  //             </Suspense>
  //         )
  //     case 'wedding_not_found':
  //         return (
  //             <Suspense fallback={<LoadingSkeleton />}>
  //                 <div>wedding not found</div>
  //             </Suspense>
  //         )
  //     case 'wedding_is_private':
  //         return (
  //             <Suspense fallback={<LoadingSkeleton />}>
  //                 <div>WEDDING PRIVATE</div>
  //             </Suspense>
  //         )

  //     case 'please_register_a_new_guest':
  //         return (
  //             <Suspense fallback={<LoadingSkeleton />}>
  //                 <div>KAMU TIDAK TERDAFTAR DALAM TAMU</div>
  //                 <Link href={`/register-guest`} className="btn btn-primary" >Daftar</Link>
  //             </Suspense>
  //         )

  //     default:
  //         return (
  //             <Suspense fallback={<LoadingSkeleton />}>
  //                 {/* {theme.nama_theme &&
  //                 } */}
  //                 <ThemeComponent />
  //             </Suspense>
  //         );
  // }

  if (message != null) {
    switch (message) {
      case "wedding_is_private":
        return (
          <Suspense fallback={<LoadingSkeleton />}>
            <main className="container min-w-full mx-auto min-h-[100dvh] max-w-screen-xl bg-White">
              <section className="grid gap-6 h-[100dvh] content-center justify-items-center px-6">
                <Image
                  src={"/assets/virtuwed/private_wedding.jpeg"}
                  alt="Virtuwed Private"
                  className="object-cover object-center w-3/4 h-44 max-w-sm rounded"
                  width={500}
                  height={500}
                  priority
                />
                <div className="grid gap-2 text-center max-w-sm mb-4">
                  <h3 className="text-N700 font-bold capitalize">
                    Link Tidak Valid
                  </h3>
                  <p className="p3-r text-N700">
                    Mohon periksa kembali link undangan anda. Cek kembali pesan
                    pada WhatsApp anda yang dikirim oleh akun bernama “Virtuwed”
                  </p>
                </div>
                <Link
                  href={"/"}
                  className="btn btn-block btn-secondary rounded-sm md:btn-wide"
                >
                  <Image
                    src={"/assets/logopack/Virtuwed_Main_Logo_White.png"}
                    alt="Virtuwed Logo"
                    className="object-cover object-center w-6 h-auto"
                    width={500}
                    height={500}
                    priority
                  />
                  Virtuwed.id
                </Link>
              </section>
            </main>
          </Suspense>
        );

      case "please_register_a_new_guest":
        return redirect("/register-guest");
      default:
        return <LoadingSkeleton />;
    }
  } else if (!theme.nama_theme) {
    return <LoadingSkeleton />;
  } else {
    return <ThemeComponent lang={params.lang} />;
  }
};

export default Page;
