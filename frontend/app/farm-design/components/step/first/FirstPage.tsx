"use client";

import { useRef, useState } from "react";
import Image from "next/image";

import TitleBox from "../TitleBox";
import FirstInputBox from "./FirstInputBox";
import useOutsideClick from "@/app/_hooks/useOutsideClick";

import { FaQuestion } from "react-icons/fa6";
import GuidLineImg from "@/public/icons/farm-design-guideline.svg";

interface Props {
  handleStep: (step: number) => void;
  userAccessToken: string;
  handleUpdateFieldDesignId: (newDesignId: number) => void;
  handleUpdateFieldClickableArray: (
    newFieldClickableArray: boolean[][]
  ) => void;
  handleUpdateFieldGridArray: (newFieldGridArray: number[][]) => void;
}

const FirstPage = ({
  handleStep,
  userAccessToken,
  handleUpdateFieldDesignId,
  handleUpdateFieldClickableArray,
  handleUpdateFieldGridArray,
}: Props) => {
  // 도움말 관련 설명 나오기
  const [isHelp, setIsHelp] = useState<boolean>(false);

  const handleHelp = () => {
    setIsHelp(!isHelp);
  };
  // 도움말 화면 외부 클릭시 창 닫힘
  const helpRef = useRef(null);
  useOutsideClick<HTMLDivElement>(helpRef, () => {
    if (isHelp) {
      setIsHelp(false);
    }
  });

  return (
    <div className=" flex flex-col w-[90%] h-[90%]">
      <div className="flex gap-1 items-end">
        {/* 1단계 타이틀 */}
        <TitleBox
          basicText1="텃밭 정보를"
          pointText="입력"
          basicText2="해주세요"
        />
        <button
          className="hover:bg-yellow-500 bg-yellow-200 flex items-center rounded-[50%] px-2 py-2 "
          onClick={handleHelp}
        >
          <FaQuestion color="FFF3C2" />
        </button>
      </div>
      <div className=" relative mt-3 h-full overflow-y-auto">
        {/* 도움말 클릭시 나타나기 */}
        {isHelp ? (
          <>
            <div
              ref={helpRef}
              className="absolute top-0 w-full h-full overflow-y-auto rounded-xl"
            >
              <Image src={GuidLineImg} alt="도움말" />
            </div>
            <button
              className="absolute px-2 rounded-md top-5 right-10 font-tmoney font-extrabold text-xl text-green-400 hover:text-green-500 hover:bg-green-100"
              onClick={handleHelp}
            >
              X
            </button>
          </>
        ) : (
          <FirstInputBox
            handleStep={handleStep}
            userAccessToken={userAccessToken}
            handleUpdateFieldDesignId={handleUpdateFieldDesignId}
            handleUpdateFieldClickableArray={handleUpdateFieldClickableArray}
            handleUpdateFieldGridArray={handleUpdateFieldGridArray}
          />
        )}
      </div>
    </div>
  );
};

export default FirstPage;
