"use client";

import { useState } from "react";
import FirstPage from "./first/FirstPage";
import FourthPage from "./fourrth/FourthPage";
import SecondPage from "./second/SecondPage";
import ThirdPage from "./third/ThirdPage";

interface Props {
  currentStep: number;
  handleStep: (step: number) => void;
}

const StepBox = ({ currentStep, handleStep }: Props) => {
  // 각 단계별 컴포넌트들
  const content: JSX.Element[] = [
    <FirstPage key="first" handleStep={handleStep} />,
    <SecondPage key="second" handleStep={handleStep} />,
    <ThirdPage key="third" handleStep={handleStep} />,
    <FourthPage key="fourth" />,
  ];

  return (
    <div className="border-2 h-full rounded-[25px] bg-gray-100 flex flex-col w-[75%] items-center justify-center shadow shadow-md">
      {/* 여기는 1단계~4단계 내용 들어갈 부분 */}
      {content[currentStep - 1]}
    </div>
  );
};

export default StepBox;
