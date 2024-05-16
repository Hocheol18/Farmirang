"use client";

import Image, { StaticImageData } from "next/image";

import Potato from "../../../../../public/icons/farms/crops-potato.svg";
import SweetPotato from "../../../../../public/icons/farms/crops-sweet-potato.svg";
import CheongyangChillPepper from "../../../../../public/icons/farms/crops-cheongyang-chili-pepper.svg";
import Carrot from "../../../../../public/icons/farms/crops-carrot.svg";
import Strawberry from "../../../../../public/icons/farms/crops-strawberry.svg";
import Peanut from "../../../../../public/icons/farms/crops-peanut.svg";
import CherryTomato from "../../../../../public/icons/farms/crops-cherry-tomato.svg";
import Leek from "../../../../../public/icons/farms/crops-leek.svg";
import Blueberry from "../../../../../public/icons/farms/crops-blueberry.svg";
import Lettuce from "../../../../../public/icons/farms/crops-lettuce.svg";
import Ginger from "../../../../../public/icons/farms/crops-ginger.svg";
import Onion from "../../../../../public/icons/farms/crops-onion.svg";
import YoungRadish from "../../../../../public/icons/farms/crops-young-radish.svg";
import Cucumber from "../../../../../public/icons/farms/crops-cucumber.svg";
import Corn from "../../../../../public/icons/farms/crops-corn.svg";
import Korean from "../../../../../public/icons/farms/crops-korean-melon.svg";

import { useEffect, useState } from "react";
import Input from "@/app/_components/common/Input";
import SelectMenu from "@/app/_components/common/SelectMenus";

interface Props {
  id: number;
  name: string;
  priorityArr: Priority[];
  priority: number;
  onChange: (priority: any) => void;
  inputNumber: number | "";
  handleChangeInput: (inputNumber: number | "") => void;
  placeholder: number;
}

interface Priority {
  id: number;
  name: string;
}

const CropsInput = ({
  id,
  name,
  priorityArr,
  priority,
  onChange,
  inputNumber,
  handleChangeInput,
  placeholder,
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

  const topcss = "flex-1 shrink-0 my-2";
  const labelcss = "font-semibold text-black-100 text-sm";
  const inputCSS = `text-xs w-24 rounded-lg bg-white-100 border-0 bg-transparent h-[2rem] py-1 pl-3 text-black-100 placeholder:text-gary-500 sm:text-sm sm:leading-6 shadow`;

  const tmpHandleFunction = () => {};

  return (
    <div className="flex gap-2 items-center justify-center flex-wrap bg-white-100 rounded-lg px-2 py-1">
      <Image className="flex-1 w-10 h-10" src={picList[id - 1]} alt={name} />
      {/* 방울토마토는 글자가 길어.. */}
      {id === 7 ? (
        <div className="flex-1 text-md font-extrabold">{name}</div>
      ) : (
        <div className="flex-1 text-lg font-extrabold">{name}</div>
      )}
      <Input
        topcss={topcss}
        labeltext="개수"
        labelcss={labelcss}
        inputcss={inputCSS}
        placeholder={`최대 ${placeholder}개`}
        type="number"
        value={inputNumber}
        onChange={handleChangeInput}
      />
      <div className="flex-1">
        <SelectMenu
          labelcss={labelcss}
          topScript={"우선순위"}
          items={priorityArr}
          bordercss="border-gray-300"
          onChange={onChange}
          value={priority}
        />
      </div>
    </div>
  );
};

export default CropsInput;
