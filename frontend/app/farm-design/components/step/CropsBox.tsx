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

interface Props {
  id: number;
  name: string;
  isClick: boolean;
  isRecommend: boolean;
}

const CropsBox = ({ id, name, isClick, isRecommend }: Props) => {
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

  const currentPic: StaticImageData = picList[id - 1];

  return (
    <button className="w-20 h-24 px-2.5 py-1 bg-white-100 rounded-lg shadow border border-gray-200 flex-col justify-start items-center gap-1 inline-flex">
      <div className="flex-col justify-center items-center gap-2.5 inline-flex">
        <div className="flex justify-center items-center w-14 h-14 bg-white rounded-full border border-white-100">
          <Image
            className="w-11 h-11 justify-center items-center"
            src={currentPic}
            alt={name}
          />
        </div>
        {!(id === 7) ? (
          <div className="text-center text-black text-sm font-bold leading-tight">
            {name}
          </div>
        ) : (
          <div className="text-center text-black text-xs font-bold leading-tight">
            {name}
          </div>
        )}
      </div>
    </button>
  );
};

export default CropsBox;
