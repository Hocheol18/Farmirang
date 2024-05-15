"use client";

import { useState } from "react";
import SecondFirstPage from "./SecondFirstPage";
import ShowStylePage from "../ShowStylePage";

interface Props {
  handleStep: (step: number) => void;
}

const SecondPage = ({ handleStep }: Props) => {
  // 몇 번째 second 페이지 보여줄지 (false => 1번째, true=> 2번째)
  const [isCheck, setIsCheck] = useState<boolean>(false);

  const handleCheck = () => {
    setIsCheck(true);
  };

  return (
    <div className=" flex flex-col w-[95%] h-[95%]  ">
      {!isCheck ? (
        <SecondFirstPage handleCheck={handleCheck} />
      ) : (
        <ShowStylePage handleStep={handleStep} step={2} />
      )}
    </div>
  );
};

export default SecondPage;
