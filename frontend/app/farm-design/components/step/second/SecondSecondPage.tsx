import React from "react";
import TitleBox from "../TitleBox";
import Button from "@/app/_components/common/Button";
import Input from "@/app/_components/common/Input";
import ShowArrangement from "./ShowArrangement";
import DesignBox from "./DesignBox";

interface Props {
  handleStep: (step: number) => void;
}

const SecondSecondPage = ({ handleStep }: Props) => {
  // 임시...
  const tmpHandleFunction = () => {};

  // 커스텀하러 가기
  const handleCustom = () => {
    handleStep(3);
  };

  // 저장하기
  const handleSave = () => {
    handleStep(4);
  };

  const InputCSS = `w-36 rounded-lg bg-white-100 border-0 bg-transparent h-[2rem] py-1 pl-3 text-black-100 placeholder:text-gary-500 sm:text-sm sm:leading-6 shadow`;

  const grid = [
    [1, 2, 3, 4, 5, 6, 7, 8, 0],
    [1, 2, 3, 4, 5, 6, 7, 8, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [9, 10, 11, 12, 13, 13, 14, 14, 0],
    [9, 10, 11, 12, 13, 13, 14, 14, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
  ];

  const crops = {
    1: "🌱",
    2: "❤",
    3: "🥒",
    10: "🍎",
    5: "🥕",
    13: "🌽",
    14: "🍅",
  };

  const cropsList = [
    { r: 0, c: 0, cropId: 1 },
    { r: 0, c: 1, cropId: 1 },
    { r: 0, c: 2, cropId: 1 },
    { r: 0, c: 3, cropId: 1 },
    { r: 0, c: 4, cropId: 1 },
    { r: 0, c: 5, cropId: 1 },
    { r: 0, c: 6, cropId: 1 },
    { r: 0, c: 7, cropId: 1 },
    { r: 3, c: 0, cropId: 1 },
    { r: 3, c: 1, cropId: 1 },
    { r: 3, c: 2, cropId: 1 },
    { r: 3, c: 3, cropId: 1 },
    { r: 3, c: 4, cropId: 2 },
    { r: 3, c: 6, cropId: 2 },
  ];

  return (
    <div className="flex flex-col justify-around items-center overflow-y-auto w-full h-full">
      <TitleBox basicText1="추천된" pointText="텃밭꾸미기" basicText2="" />

      {/* 이안에 추천된 텃밭꾸미기 들어갈 것 */}
      <div className="flex justify-center items-center w-[80%] h-[70%] bg-white-100 rounded-lg shadow p-10">
        {/* <ShowArrangement grid={grid} crops={crops} /> */}
        <DesignBox grid={grid} cropsList={cropsList} />
      </div>
      {/* 버튼들 */}
      <div className="flex justify-around w-full">
        <Button
          text="커스텀하기"
          bgStyles="bg-white-100 px-6"
          textStyles="text-green-500 font-semibold"
          handleClick={handleCustom}
        />
        <div className="flex items-center gap-3">
          <div className="font-bold">텃밭 이름: </div>
          {/* value, onChange 바꿔야 함 */}
          <Input
            topcss={""}
            labeltext={""}
            labelcss={""}
            inputcss={InputCSS}
            placeholder={"이름을 지정해주세요"}
            type={"text"}
            value={""}
            onChange={tmpHandleFunction}
          />
          <Button
            text="저장하기"
            bgStyles="bg-green-400 px-6"
            textStyles="text-white-100 font-semibold"
            handleClick={handleSave}
          />
        </div>
      </div>
    </div>
  );
};

export default SecondSecondPage;
