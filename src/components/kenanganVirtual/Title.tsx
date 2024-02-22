import { lora } from "@/src/app/[lang]/[weddingslug]/[guestslug]/kenanganvirtual/font";
import { RootState } from "@/src/app/[lang]/redux/reducers";
import React from "react";
import { useSelector } from "react-redux";



function Title() {
    const wedding = useSelector((state: RootState) => state.value.wedding);
    return (
        <section id="title" className={lora.className}>
            <h1 className="text-3xl font-bold mb-2">{wedding.wedding_name}</h1>
            <h3 className="text-2xl mb-8">Memories</h3>
        </section>
    );
}

export default Title;
