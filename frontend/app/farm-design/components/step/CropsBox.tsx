"use client";

import Image, { StaticImageData } from "next/image";

import Potato from "../../../../public/icons/farms/crops-potato.svg";
import SweetPotato from "../../../../public/icons/farms/crops-sweet-potato.svg";
import CheongyangChillPepper from "../../../../public/icons/farms/crops-cheongyang-chili-pepper.svg";
import Carrot from "../../../../public/icons/farms/crops-carrot.svg";
import Strawberry from "../../../../public/icons/farms/crops-strawberry.svg";
import Peanut from "../../../../public/icons/farms/crops-peanut.svg";
import CherryTomato from "../../../../public/icons/farms/crops-cherry-tomato.svg";
import Leek from "../../../../public/icons/farms/crops-leek.svg";
import Blueberry from "../../../../public/icons/farms/crops-blueberry.svg";
import Lettuce from "../../../../public/icons/farms/crops-lettuce.svg";
import Ginger from "../../../../public/icons/farms/crops-ginger.svg";
import Onion from "../../../../public/icons/farms/crops-onion.svg";
import YoungRadish from "../../../../public/icons/farms/crops-young-radish.svg";
import Cucumber from "../../../../public/icons/farms/crops-cucumber.svg";
import Corn from "../../../../public/icons/farms/crops-corn.svg";
import Korean from "../../../../public/icons/farms/crops-korean-melon.svg";

import Star from "../../../../public/icons/star-icon.svg";

import { useEffect, useState } from "react";

interface Props {
  id: number;
  index: number;
  name: string;
  isClick: boolean;
  isRecommend: boolean;
  handleClick: (index: number) => void;
}

const CropsBox = ({
  id,
  index,
  name,
  isClick,
  isRecommend,
  handleClick,
}: Props) => {
  const picList: StaticImageData[] = [
    Potato,
    SweetPotato,
    CheongyangChillPepper,
    Carrot,
    Strawberry,
    Peanut,
    CherryTomato,
    Leek,
    Blueberry,
    Lettuce,
    Ginger,
    Onion,
    YoungRadish,
    Cucumber,
    Corn,
    Korean,
  ];

  //현재 작물 사진
  const currentPic: StaticImageData = picList[id - 1];
  const [clickShadow, setClickShadow] = useState<string>("shadow");
  const [clickTextColor, setClickTextColor] =
    useState<string>("text-white-100");
  const [clickBackColor, setClickBackColor] = useState<string>(`bg-white-100`);

  useEffect(() => {
    if (isClick) {
      setClickShadow("shadow-inner");
      setClickTextColor("text-white-100");
      setClickBackColor("bg-green-300");
    } else {
      setClickShadow("shadow-lg");
      setClickTextColor("text-black-100");
      setClickBackColor("bg-white-100");
    }
  }, [isClick]);

  return (
    <div className="m-3">
      <button
        onClick={() => handleClick(index)}
        className={`${isRecommend ? "border-yellow-200" : "border-gray-200"}
          ${isClick ? `hover:bg-green-400` : `hover:bg-green-100`}
          
        relative w-20 h-24 px-2.5 py-1 ${clickBackColor} rounded-lg ${clickShadow} border flex-col justify-start items-center gap-1 inline-flex`}
      >
        {/* 추천은 '별'로 */}
        {isRecommend && (
          <Image className="absolute  -left-4 -top-4" src={Star} alt="추천" />
        )}
        <div className="flex-col justify-center items-center gap-2.5 inline-flex">
          <div className="flex justify-center items-center w-14 h-14 bg-white-100 rounded-full border border-white-100">
            {/* 작물 이미지 */}
            <Image
              className="w-11 h-11 justify-center items-center"
              src={currentPic}
              alt={name}
            />
          </div>
          {/* 방울토마토는 길이가 길어서.. */}
          {!(id === 7) ? (
            <div
              className={`text-center ${clickTextColor} text-sm font-bold leading-tight`}
            >
              {name}
            </div>
          ) : (
            <div
              className={`text-center ${clickTextColor} text-xs font-bold leading-tight`}
            >
              {name}
            </div>
          )}
        </div>
      </button>
    </div>
  );
};

export default CropsBox;
