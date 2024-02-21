"use client";

import React, { useContext, useState } from "react";

type Asset360ContextType = {
    photo: string;
    setPhoto: React.Dispatch<React.SetStateAction<string>>;
    video: string;
    setVideo: React.Dispatch<React.SetStateAction<string>>;
};

const Asset360Context = React.createContext<Asset360ContextType>({
    photo: "",
    setPhoto: () => { },
    video: "",
    setVideo: () => { },
});

export const useAsset360Context = () => useContext(Asset360Context);

export const Asset360Provider = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    const [photo, setPhoto] = useState("");
    const [video, setVideo] = useState("");

    return (
        <Asset360Context.Provider
            value={{
                photo,
                setPhoto,
                video,
                setVideo,
            }}
        >
            {children}
        </Asset360Context.Provider>
    );
};
