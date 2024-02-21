"use client";

import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { RootState } from "../app/[lang]/redux/reducers";

type ApiContextType = {
    data: any;
    setData: React.Dispatch<React.SetStateAction<any>>;
    getData: any;
};

const ApiContext = React.createContext<ApiContextType>({
    data: null,
    setData: () => { },
    getData: () => { },
});

export const useApiContext = () => useContext(ApiContext);

export const ApiProvider = ({ children }: { children: React.ReactNode }) => {
    const [data, setData] = useState(null);

    const wedding = useSelector((state: RootState) => state.value.wedding);
    const guest = useSelector((state: RootState) => state.value.guest);

    async function getData() {
        try {
            const response = await axios.get(
                `https://panel.virtuwed.id/api/wedding?wedding_slug=${wedding.wedding_slug}&guest_slug=${guest.guest_slug}`
            );
            setData(response.data);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        getData();
    }, []);

    return (
        <ApiContext.Provider
            value={{
                data,
                setData,
                getData,
            }}
        >
            {children}
        </ApiContext.Provider>
    );
};
