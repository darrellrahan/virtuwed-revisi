"use client";

import React, { useContext, useState } from "react";

type RestoreScrollContextType = {
    galleryState: {
        scrollY: number;
        currentSlide: number;
    };
    setGalleryState: React.Dispatch<
        React.SetStateAction<{
            scrollY: number;
            currentSlide: number;
        }>
    >;
};

const RestoreScrollContext = React.createContext<RestoreScrollContextType>({
    galleryState: {
        scrollY: 0,
        currentSlide: 0,
    },
    setGalleryState: () => { },
});

export const useRestoreScrollContext = () => useContext(RestoreScrollContext);

export const RestoreScrollProvider = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    const [galleryState, setGalleryState] = useState({
        scrollY: 0,
        currentSlide: 0,
    });

    return (
        <RestoreScrollContext.Provider
            value={{
                galleryState,
                setGalleryState,
            }}
        >
            {children}
        </RestoreScrollContext.Provider>
    );
};
