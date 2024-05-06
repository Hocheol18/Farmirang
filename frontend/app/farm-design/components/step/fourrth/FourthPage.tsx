"use client";

import Button from "@/app/_components/common/Button";
import TitleBox from "../TitleBox";
import FertilizerBox from "./FertilizerContent";

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

import DownIcon from "../../../../../public/icons/down.svg";

import { FaQuestion } from "react-icons/fa6";
import { useEffect, useState } from "react";
import Image, { StaticImageData } from "next/image";

interface Crops {
  id: number;
  name: string;
  isClick: boolean;
  pic: StaticImageData;
}

const FourthPage = () => {
  // 임시 함수...
  const tmpHandleFunction = () => {};

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

  const cropsName: string[] = [
    "감자",
    "고구마",
    "청양고추",
    "당근",
    "딸기",
    "땅콩",
    "방울토마토",
    "부추",
    "블루베리",
    "상추",
    "생강",
    "양파",
    "열무",
    "오이",
    "옥수수",
    "참외",
  ];

  // ***임시 선택 배열 ****
  const arr: Crops[] = [];

  // cropsList: 작물 배열
  const [cropsList, setCropsList] = useState<Crops[]>([]);

  // 처음 렌더링 할때 작물 배열에 넣기
  useEffect(() => {
    const initialCropsList: Crops[] = [];
    for (let i = 1; i <= 16; i++) {
      initialCropsList.push({
        id: i,
        name: cropsName[i - 1],
        isClick: false,
        pic: picList[i - 1],
      });
    }
    setCropsList(initialCropsList);
  }, []);

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState<Crops>();

  const toggleSelectBox = () => {
    setIsOpen(!isOpen);
  };

  const handleItemClick = (item: Crops) => {
    setSelectedItem(item);
    setIsOpen(false);
  };

  return (
    <div className="flex flex-col border border-black-100 justify-around items-center w-[90%] h-[90%]">
      {/* 제목 + 셀렉트 */}
      <div className="flex w-full px-[5%]">
        <div className="flex gap-1 items-end">
          <TitleBox basicText1="비료" pointText="성분량" basicText2="확인" />
          <button className="hover:bg-yellow-500 bg-yellow-200 flex items-center rounded-[50%] px-2 py-2 ">
            <FaQuestion color="FFF3C2" />
          </button>
        </div>
        <div className="flex-1"></div>
        {/* 셀렉트박스 */}
        <div className="w-36 flex bg-green-200 rounded-xl shadow justify-center items-center">
          <div className="flex flex-1 py-1 justify-center bg-white-100 mx-3 rounded-xl items-center">
            <Image className="w-[25%]" src={Potato} alt="감자" />
            <div className="text-sm font-bold">감자</div>
          </div>
          <Image className="pr-2" src={DownIcon} alt="아래" />
        </div>
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
