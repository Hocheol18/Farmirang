"use client";

import Input from "@/app/_components/common/Input";
import { use, useEffect, useState } from "react";

interface InputType {
  placeholder: string;
  type: string;
  value: any;
  labeltext: string;
  handleChange: (value: any) => void;
}

const FirstInputBox = () => {
  const [farmArea, setFarmArea] = useState<number>(); //밭 넓이
  const [furrrowWidth, setFurrowWidth] = useState<number>(); //고랑 너비
  const [ridgeWidth, setRidgeWidth] = useState<number>(); //두둑 너비

  //밭 넓이 변경 함수
  const handleFarmAreaChange = (value: any) => {
    setFarmArea(value);
  };

  //고랑 너비 변경 함수
  const handleFurrowWidthChange = (value: any) => {
    setFurrowWidth(value);
  };

  //두둑 너비 변경 함수
  const handleRidgeWidthChange = (value: any) => {
    setRidgeWidth(value);
  };

  //인풋 배열
  const inputArr: InputType[] = [
    {
      placeholder: "밭의 넓이 (평)",
      type: "number",
      value: farmArea,
      labeltext: "밭 넓이",
      handleChange: handleFarmAreaChange,
    },
    {
      placeholder: "고랑의 너비 (cm)",
      type: "number",
      value: furrrowWidth,
      labeltext: "고랑 너비",
      handleChange: handleFurrowWidthChange,
    },
    {
      placeholder: "두둑의 너비 (cm)",
      type: "number",
      value: ridgeWidth,
      labeltext: "두둑 너비",
      handleChange: handleRidgeWidthChange,
    },
  ];

  const topcss = "";
  const labelcss = "font-semibold text-black-100";
  const inputCSS = `rounded-lg bg-white-100 flex-1 border-0 bg-transparent h-[2.8rem] py-1.5 pl-3 text-black-100 placeholder:text-gary-500 sm:text-sm sm:leading-6 h-10 shadow`;

  return (
    <div className="border border-black-100 flex justify-between">
      {inputArr.map((item, index) => (
        <div key={index}>
          <Input
            topcss={topcss}
            labeltext={item.labeltext}
            labelcss={labelcss}
            inputcss={inputCSS}
            placeholder={item.placeholder}
            type={item.type}
            value={item.value}
            onChange={item.handleChange}
          />
        </div>
      ))}
    </div>
  );
};

export default FirstInputBox;
