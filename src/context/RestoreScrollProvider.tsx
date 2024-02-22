"use client";

import React, { useContext, useState } from "react";

type RestoreScrollContextType = {
    scrollY: number;
    setScrollY: React.Dispatch<React.SetStateAction<number>>;
    currentSlide: number;
    setCurrentSlide: React.Dispatch<React.SetStateAction<number>>;
};

const RestoreScrollContext = React.createContext<RestoreScrollContextType>({
    scrollY: 0,
    setScrollY: () => { },
    currentSlide: 0,
    setCurrentSlide: () => { },
});

export const useRestoreScrollContext = () => useContext(RestoreScrollContext);

export const RestoreScrollProvider = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    const [scrollY, setScrollY] = useState(0);
    const [currentSlide, setCurrentSlide] = useState(0);

    return (
        <RestoreScrollContext.Provider
            value={{
                scrollY,
                setScrollY,
                currentSlide,
                setCurrentSlide,
            }}
        >
            {children}
        </RestoreScrollContext.Provider>
    );
};
