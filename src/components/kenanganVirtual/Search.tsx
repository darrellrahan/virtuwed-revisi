import Image from "next/image";
import React from "react";

function Search() {
    return (
        <section id="search" className="mb-24">
            <div className="relative mb-4">
                <input
                    type="text"
                    className="p-3 pl-16 bg-[#EAEAEA] rounded-md placeholder:text-black placeholder:font-medium w-full text-lg"
                    placeholder="Search by..."
                />
                <Image
                    src="/assets/kenanganVirtual/ic-search.svg"
                    alt="search"
                    width={20}
                    height={20}
                    className="absolute top-3.5 left-5"
                    priority
                />
            </div>
            <button className="py-2 px-4 flex items-center gap-4 font-medium border border-[#7C7C7C] rounded-md">
                <Image src="/assets/kenanganVirtual/ic-plus.svg" alt="plus" width={16} height={16} priority />
                <span>Filter Memories</span>
            </button>
        </section>
    );
}

export default Search;
