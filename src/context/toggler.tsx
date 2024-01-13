"use client";

import React, { useContext, useState, useEffect } from "react";

type TogglerContextType = {
  mobileNavbar: boolean;
  setMobileNavbar: React.Dispatch<React.SetStateAction<boolean>>;
  videoModal: boolean;
  setVideoModal: React.Dispatch<React.SetStateAction<boolean>>;
  showAnswer: {
    q1: boolean;
    q2: boolean;
    q3: boolean;
    q4: boolean;
    q5: boolean;
  };
  setShowAnswer: React.Dispatch<
    React.SetStateAction<{
      q1: boolean;
      q2: boolean;
      q3: boolean;
      q4: boolean;
      q5: boolean;
    }>
  >;
};

const TogglerContext = React.createContext<TogglerContextType>({
  mobileNavbar: false,
  setMobileNavbar: () => { },
  videoModal: false,
  setVideoModal: () => { },
  showAnswer: { q1: false, q2: false, q3: false, q4: false, q5: false },
  setShowAnswer: () => { },
});

export const useTogglerContext = () => useContext(TogglerContext);

export const TogglerProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [mobileNavbar, setMobileNavbar] = useState(false);
  const [videoModal, setVideoModal] = useState(false);
  const [showAnswer, setShowAnswer] = useState({
    q1: false,
    q2: false,
    q3: false,
    q4: false,
    q5: false,
  });

  useEffect(() => {
    document.body.style.overflowY =
      mobileNavbar || videoModal ? "hidden" : "auto";
  }, [mobileNavbar, videoModal]);

  return (
    <TogglerContext.Provider
      value={{
        mobileNavbar,
        setMobileNavbar,
        videoModal,
        setVideoModal,
        showAnswer,
        setShowAnswer,
      }}
    >
      {children}
    </TogglerContext.Provider>
  );
};
