"use client";

import Button from "@/app/_components/common/Button";
import Input from "@/app/_components/common/Input";
import SelectMenu from "@/app/_components/common/SelectMenus";
import { useState } from "react";
import FarmShapeDraw from "./FarmShapeDraw";

interface InputType {
  placeholder: string;
  type: string;
  value: any;
  labeltext: string;
  handleChange: (value: any) => void;
}

interface Props {
  handleStep: (step: number) => void;
}

const FirstInputBox = ({ handleStep }: Props) => {
  const [farmArea, setFarmArea] = useState<number>(); //밭 넓이
  const [furrrowWidth, setFurrowWidth] = useState<number>(); //고랑 너비
  const [ridgeWidth, setRidgeWidth] = useState<number>(); //두둑 너비
  const [direction, setDirection] = useState<number>(1); //이랑, 고랑의 방향
  const [month, setMonth] = useState<number>(1); //월 선택

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

  //이랑, 고랑의 방향 변경 함수
  const handleDirectionChange = (value: any) => {
    setDirection(value);
  };

  //월 변경 함수
  const handleMonthChange = (value: any) => {
    setMonth(value);
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

  const topcss = "shrink-0";
  const labelcss = "font-semibold text-black-100 text-sm";
  const inputCSS = `rounded-lg bg-white-100 border-0 bg-transparent h-[2rem] py-1 pl-3 text-black-100 placeholder:text-gary-500 sm:text-sm sm:leading-6 shadow`;
  const xyInputCSS = `w-20 rounded-lg bg-white-100 border-0 bg-transparent h-[2rem] py-1 pl-3 text-black-100 placeholder:text-gary-500 sm:text-sm sm:leading-6 shadow`;

  // 이랑/고랑의 방향 - 가로, 세로
  const directionArr = [
    {
      id: 1,
      name: "가로",
    },
    {
      id: 2,
      name: "세로",
    },
  ];

  // 텃밭에 작물 심는 시기 (월별)
  const monthArr = [];
  for (let i = 1; i <= 12; i++) {
    monthArr.push({ id: i, name: `${i}월` });
  }

  // x, y 좌표

  const [coordinateArr, setCoordinateArr] = useState([
    { x: 0, y: 0 },
    { x: 0, y: 50 },
  ]);

  // 추천 단계로 넘어가기
  const handleRecommend = () => {
    handleStep(2);
  };

  // 커스텀 단계로 넘어가기
  const handleCustom = () => {
    handleStep(3);
  };

  // 이 함수 쓴 애들 다 바꿔야 함!!!!!!! (임시로 그냥 한 거라...)
  const handleCoordinateArrChange = () => {};

  return (
    // 전체
    <div className="flex flex-col h-full gap-7 mt-5">
      {/* input 5개 모여 있는 div */}
      <div className="flex justify-between items-center">
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
        <SelectMenu
          labelcss={labelcss}
          topScript={"이랑/고랑의 방향"}
          items={directionArr}
          bordercss="border-gray-300"
          onChange={handleDirectionChange}
          value={direction}
        />
        <SelectMenu
          labelcss={labelcss}
          topScript={"텃밭에 작물 심는 시기"}
          items={monthArr}
          bordercss="border-gray-300"
          onChange={handleMonthChange}
          value={month}
        />
      </div>
      {/* 좌표 그림판 및 좌표 표 (+버튼) div */}
      <div className=" flex h-full">
        {/* 좌표 그림판... 어케함? */}
        {/* <div className="border border-green-200  aspect-square rounded-[25px] bg-white-100  shadow shadow-md ">
          100x100칸
        </div> */}
        <div className="h-full p-[20px] mr-10 rounded-[25px] bg-white-100  shadow shadow-md ">
          <FarmShapeDraw />
        </div>
        {/* 텃밭 좌표+button 있는 곳 */}
        <div className="flex flex-col flex-1">
          {/* 텃밭 좌표 */}
          <div className="flex flex-col flex-1 items-center justify-center">
            <div className="font-extrabold mb-10">텃밭 좌표</div>
            {/* x, y 좌표 인풋 - 동적 컴포넌트는 따로 만들어야 함 */}
            <div className="flex items-center justify-center text-sm">
              <div className="flex items-center gap-3 mr-5">
                <div className="font-bold">x </div>
                {/* value, onChange 바꿔야 함 */}
                <Input
                  topcss={topcss}
                  labeltext={""}
                  labelcss={""}
                  inputcss={xyInputCSS}
                  placeholder={""}
                  type={"number"}
                  value={""}
                  onChange={handleCoordinateArrChange}
                />
              </div>
              <div className="flex items-center gap-3">
                <div className="font-bold">y </div>
                {/* value, onChange 바꿔야 함 */}
                <Input
                  topcss={topcss}
                  labeltext={""}
                  labelcss={labelcss}
                  inputcss={xyInputCSS}
                  placeholder={""}
                  type={"number"}
                  value={""}
                  onChange={handleCoordinateArrChange}
                />
              </div>
            </div>

            <Button
              text="+"
              bgStyles="mt-5 w-56 bg-green-300"
              textStyles="text-white-100 font-bold"
              handleClick={handleCoordinateArrChange}
            />
          </div>
          {/* 텃밭 좌표 끝 */}
          <div className="flex justify-center gap-5 my-3">
            <Button
              text="추천 받기"
              bgStyles="bg-green-400"
              textStyles="text-white-100 font-extrabold"
              handleClick={handleRecommend}
            />
            <Button
              text="커스텀하기"
              bgStyles="bg-white-100"
              textStyles="text-green-500 font-extrabold"
              handleClick={handleCustom}
            />
          </div>
        </div>
        {/* 텃밭 + 버튼 있는 곳 */}
      </div>
    </div>
  );
};

export default FirstInputBox;
