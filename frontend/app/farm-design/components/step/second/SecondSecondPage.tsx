import React from "react";
import TitleBox from "../TitleBox";
import Button from "@/app/_components/common/Button";

const SecondSecondPage = () => {
  // 임시...함수
  const tmpHandleFunction = () => {};
  return (
    <div className="flex flex-col justify-around items-center overflow-y-auto w-full h-full">
      <TitleBox basicText1="추천된" pointText="텃밭꾸미기" basicText2="" />

      {/* 이안에 추천된 텃밭꾸미기 들어갈 것 */}
      <div className="flex justify-center items-center w-[80%] h-[70%] bg-white-100 rounded-lg shadow">
        추천된 텃밭꾸미기 보여주는 곳
      </div>
      {/* 버튼들 */}
      <div className="flex gap-3">
        <Button
          text="저장하기"
          bgStyles="bg-green-400 px-6"
          textStyles="text-white-100 font-semibold"
          handleClick={tmpHandleFunction}
        />
        <Button
          text="커스텀하기"
          bgStyles="bg-white-100 px-6"
          textStyles="text-green-500 font-semibold"
          handleClick={tmpHandleFunction}
        />
      </div>
    </div>
  );
};

export default SecondSecondPage;
