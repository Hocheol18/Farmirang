import React, { useEffect, useState } from "react";
import TitleBox from "./TitleBox";
import Button from "@/app/_components/common/Button";
import Input from "@/app/_components/common/Input";
import ShowArrangement from "../../../_components/common/ShowArrangement";
import { Dialog, Transition } from "@headlessui/react";

import BackgroundShapes from "./second/BackgroundShapes";
import MyModal from "@/app/_components/common/Modal";
import { FarmCoordinateType, cropIndexType } from "./StepBox";

interface Props {
  handleStep: (step: number) => void;
  step: number; //2단계에서 보여주는 추천된 텃밭인지 3단계에서 보여주는 완성된 텃밭인지
  userAccessToken: string;
  crops: cropIndexType[];
  clickableField: boolean[][];
  grid: number[][];
  farmCoordinateArray: FarmCoordinateType[];
}

const ShowStylePage = ({
  handleStep,
  step,
  userAccessToken,
  crops,
  clickableField,
  grid,
  farmCoordinateArray,
}: Props) => {
  //임시
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

  // grid의 가로의 칸의 수마다 다르게 줄 넓이
  const [eachWidth, setEachWidth] = useState<string>("");

  // grid의 가로의 칸의 수마다 다르게 줄 공간(돋보기를 위한)
  const [eachRight, seteachRight] = useState<string>("");

  useEffect(() => {
    console.log(crops);
    console.log(grid);
    console.log(clickableField);
  }, []);

  useEffect(() => {
    if (grid[0].length >= 1 && grid[0].length <= 10) {
      setEachWidth("w-[50%]");
      seteachRight("right-[25%]");
    } else if (grid[0].length <= 20) {
      setEachWidth("w-[65%]");
      seteachRight("right-[17.5%]");
    } else if (grid[0].length <= 30) {
      setEachWidth("w-[80%]");
      seteachRight("right-[10%]");
    } else if (grid[0].length <= 50) {
      setEachWidth("w-[90%]");
      seteachRight("right-[5%]");
    }
  }, []);

  return (
    <div className="flex flex-col justify-around items-center overflow-y-auto w-full h-full">
      <div className={`relative flex items-start justify-center w-full`}>
        {/* <div className="flex-1"></div> */}
        <TitleBox
          basicText1={step === 2 ? `추천된` : `완성된`}
          pointText="텃밭꾸미기"
          basicText2=""
        />

        <MyModal
          buttonText="한눈에 보기 🔍"
          buttonBgStyles={`absolute ${eachRight} bg-white-100 rounded-full px-2 py-2 border border-gray-200 shadow`}
          buttonTextStyles="text-sm font-bold "
          Title=""
          subTitle=""
          contents={
            <ShowArrangement
              grid={grid}
              crops={crops}
              type="full"
              checkArray={clickableField}
            />
          }
          subTitlecss=""
          Titlecss="font-bold"
          Modalcss="flex flex-col justify-center h-[90vh]"
          Titlebottom=""
          next="확인"
          noButton={true}
          grid={grid}
          buttonStyle="reset"
        />
      </div>

      {/* 이안에 추천된 텃밭꾸미기 들어갈 것 */}
      <div
        className={`flex justify-center items-start ${eachWidth} p-5 bg-white-100 rounded-lg shadow my-5 overflow-hidden`}
      >
        <div className="w-full h-full overflow-y-auto overflow-x-auto">
          <ShowArrangement
            grid={grid}
            crops={crops}
            type="content"
            checkArray={clickableField}
          />
          {/* <DesignBox grid={grid} cropsList={cropsList} /> */}
          {/* 텃밭 배치 한눈에 보는 모달 */}
        </div>
      </div>

      {/* 버튼들 */}
      <div className="flex justify-around w-full">
        {step === 2 ? (
          <Button
            text="커스텀하기"
            bgStyles="bg-white-100 px-6"
            textStyles="text-green-500 font-semibold"
            handleClick={handleCustom}
          />
        ) : null}
        <div className="flex items-center gap-3 ">
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

export default ShowStylePage;
