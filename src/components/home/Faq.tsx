"use client";

import { CaretDown, ChatCircle } from "@phosphor-icons/react";
// import { Fade } from "react-awesome-reveal";
import { Fade } from 'react-awesome-reveal'
import React from "react";
import { useTogglerContext } from "@/src/context/toggler";
// import { lora } from "../fonts";

function Faq({
  dict,
}: {
  dict: {
    question: string;
    answer: string;
  }[];
}) {
  const { showAnswer, setShowAnswer } = useTogglerContext();

  function getParams(id: number): {
    q1: boolean;
    q2: boolean;
    q3: boolean;
    q4: boolean;
    q5: boolean;
  } {
    switch (id) {
      case 1:
        return {
          q1: !showAnswer.q1,
          q2: false,
          q3: false,
          q4: false,
          q5: false,
        };
      case 2:
        return {
          q1: false,
          q2: !showAnswer.q2,
          q3: false,
          q4: false,
          q5: false,
        };
      case 3:
        return {
          q1: false,
          q2: false,
          q3: !showAnswer.q3,
          q4: false,
          q5: false,
        };
      case 4:
        return {
          q1: false,
          q2: false,
          q3: false,
          q4: !showAnswer.q4,
          q5: false,
        };
      case 5:
        return {
          q1: false,
          q2: false,
          q3: false,
          q4: false,
          q5: !showAnswer.q5,
        };
    }
    return { q1: false, q2: false, q3: false, q4: false, q5: false };
  }

  function getState(id: number) {
    switch (id) {
      case 1:
        return showAnswer.q1;
      case 2:
        return showAnswer.q2;
      case 3:
        return showAnswer.q3;
      case 4:
        return showAnswer.q4;
      case 5:
        return showAnswer.q5;
    }
  }

  return (
    <section id="faq" className="px-6 lg:px-28 py-32">
      <Fade direction="down">
        <h1
          className={`text-4xl font-semibold text-center mb-16 `}
        >
          <span className="flex items-center justify-center gap-4 leading-relaxed">
            <span>You Got</span> <ChatCircle size={40} />{" "}
          </span>{" "}
          Questions?
        </h1>
      </Fade>
      <Fade direction="up">
        {dict.map((data, index) => (
          <div
            key={data.question}
            className="border-b-2 border-black py-6 lg:py-8 text-xl font-semibold text-left"
          >
            <button
              onClick={() => setShowAnswer(getParams(index + 1))}
              className="w-full block flex items-center gap-8 text-left"
            >
              <span className="basis-[10%]">0{index + 1}</span>
              <span className="basis-[80%]">{data.question}</span>
              <span className="basis-[10%] flex justify-end">
                <CaretDown size={32} />
              </span>
            </button>
            <div
              className={`${getState(index + 1)
                ? "max-h-[11rem] lg:max-h-[5rem] pt-6"
                : "max-h-0 pt-0"
                } transiion-all duration-300 ease-linear overflow-hidden flex gap-8 text-base font-normal`}
            >
              <div className="basis-[10%]"></div>
              <p className="basis-[85%]">{data.answer}</p>
              <div className="basis-[5%]"></div>
            </div>
          </div>
        ))}
      </Fade>
    </section>
  );
}

export default Faq;
