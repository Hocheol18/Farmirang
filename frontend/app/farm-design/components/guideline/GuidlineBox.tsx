"use client";

import Button from "@/app/_components/common/Button";
import GuidlineContent from "./GuidlineContent";

const GuidlineBox = () => {
  //이전으로 돌아가는 함수
  const prevHandle = () => {};

  const nextHandle = () => {};

  return (
    // 가이드라인박스 전체!
    <div className="border-2 rounded-[25px] bg-gray-100 flex flex-col items-center w-full mx-[10%] justify-center gap-5 shadow shadow-md">
      {/* 가이드라인 사진 넣을 부분임 */}
      <GuidlineContent />
      {/* 버튼들 */}
      <div className="flex gap-5">
        <Button
          text="이전"
          bgStyles="bg-white-100"
          textStyles="text-green-500 font-semibold text-lg"
          handleClick={prevHandle}
        />
        <Button
          text="다음"
          bgStyles="bg-green-400"
          textStyles="text-white-100 font-semibold text-lg"
          handleClick={nextHandle}
        />
      </div>
    </div>
  );
};

export default GuidlineBox;
