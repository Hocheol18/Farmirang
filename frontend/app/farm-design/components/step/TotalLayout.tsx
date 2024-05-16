"use client";

import { useState } from "react";
import StepBox from "./StepBox";
import Stepper from "./Stepper";

interface Props {
  userAccessToken: string;
}

const TotalLayout = ({ userAccessToken }: Props) => {
  // 현재 단계
  const [currentStep, setCurrentStep] = useState<number>(1);
  // 현재 콘텐츠(컴포넌트)

  const handleStep = (step: number) => {
    setCurrentStep(step);
  };

  return (
    <div className="flex w-full h-full items-center mx-[5%] gap-[5%] ">
      <Stepper nowStep={currentStep} />
      <StepBox
        currentStep={currentStep}
        handleStep={handleStep}
        userAccessToken={userAccessToken}
      />
    </div>
  );
};

export default TotalLayout;
