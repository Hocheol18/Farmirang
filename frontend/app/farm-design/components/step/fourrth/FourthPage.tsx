"use client";

import Button from "@/app/_components/common/Button";
import TitleBox from "../TitleBox";
import FertilizerBox from "./FertilizerContent";

const FourthPage = () => {
  // 임시 함수...
  const tmpHandleFunction = () => {};

  return (
    <div className="flex flex-col border border-black-100 justify-around items-center w-[90%] h-[90%]">
      {/* 제목 + 셀렉트 */}
      <div className="flex w-full px-[5%]">
        <TitleBox basicText1="비료" pointText="성분량" basicText2="확인" />

        <div className="flex-1"></div>
        <div>셀렉트박스</div>
      </div>
      <div className="flex flex-col items-center w-[90%] h-[85%] rounded-[20px] bg-white-100">
        <FertilizerBox />
        <div>
          <Button
            text="텃밭 등록하러 가기"
            bgStyles="bg-green-400 px-2"
            textStyles="text-white-100 font-semibold"
            handleClick={tmpHandleFunction}
          />
        </div>
      </div>
    </div>
  );
};

export default FourthPage;
