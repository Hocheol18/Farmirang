"use client";

import Button from "@/app/_components/common/Button";
import TitleBox from "../TitleBox";
import FertilizerContent from "./FertilizerContent";

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

import helpPoster from "../../../../../public/icons/tmpHelp.png";

import { FaQuestion } from "react-icons/fa6";
import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Image, { StaticImageData } from "next/image";
import useOutsideClick from "@/app/_hooks/useOutsideClick";
import { FieldCropsListType } from "../StepBox";
import { getRecommendFertilizer } from "@/api/farm-design";
import { Fertilizers } from "@/type/farmDesginType";

interface Crops {
  id: number;
  name: string;
  isClick: boolean;
  pic: StaticImageData;
  nitrogen: number;
  phosphate: number;
  potassium: number;
  addNitrogen: number;
  addPhosphate: number;
  addPotassium: number;
}

interface Props {
  cropsNameList: string[];
  fieldCropsList: FieldCropsListType[];
}

const FourthPage = ({ cropsNameList, fieldCropsList }: Props) => {
  const router = useRouter();

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

  // cropsList: 작물 배열
  const [cropsList, setCropsList] = useState<Crops[]>([]);

  //isOpen: 드롭다운 열림 여부
  const [isOpen, setIsOpen] = useState<boolean>(false);

  // selectedItem: 선택한 작물
  const [selectedItem, setSelectedItem] = useState<Crops>();

  useEffect(() => {
    const fetchRecommendFertilizer = async () => {
      const result: Fertilizers = await getRecommendFertilizer({
        crops: cropsNameList,
      });

      console.log(result);

      // 처음 렌더링 할때 작물 배열에 넣기
      const initialCropsList: Crops[] = fieldCropsList
        .filter((item) => cropsNameList.includes(item.name))
        .map((item) => {
          const fertilizer = result[item.name];
          console.log(fertilizer);
          return {
            id: item.id,
            name: item.name,
            isClick: false,
            pic: picList[item.id - 1],
            addNitrogen: fertilizer ? fertilizer[0].addNitrogen : 0,
            addPhosphate: fertilizer ? fertilizer[0].addPhosphate : 0,
            addPotassium: fertilizer ? fertilizer[0].addPotassium : 0,
            nitrogen: fertilizer ? fertilizer[0].nitrogen : 0,
            phosphate: fertilizer ? fertilizer[0].phosphate : 0,
            potassium: fertilizer ? fertilizer[0].potassium : 0,
          };
        });

      console.log(result);
      console.log(initialCropsList);

      setCropsList(initialCropsList);
      setSelectedItem(initialCropsList[0]);
    };

    fetchRecommendFertilizer();
  }, [cropsNameList, fieldCropsList]);

  // toggleSelectBox: 드롭다운 열리는 함수
  const toggleSelectBox = () => {
    setIsOpen(!isOpen);
  };

  // handleItemClick: 드롭다운 안에 들어 있는 작물 클릭시 변하는 함수
  const handleItemClick = (item: Crops) => {
    // 해당 item이 선택되고
    setSelectedItem(item);

    // 드롭다운은 닫힌다
    setIsOpen(false);
  };

  const selectRef = useRef(null);
  useOutsideClick<HTMLDivElement>(selectRef, () => {
    if (isOpen) {
      setIsOpen(false);
    }
  });

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

  // 텃밭 등록하러 가기 함수
  const handleRouter = () => {
    router.push("/farm-enroll");
  };

  return (
    <div className="flex flex-col justify-around items-center w-[90%] h-[90%]">
      {/* 제목 + 셀렉트 */}
      <div className="flex w-full px-[5%]">
        <div className="flex gap-1 items-end">
          <TitleBox basicText1="비료" pointText="성분량" basicText2="확인" />
          <button
            className="hover:bg-yellow-500 bg-yellow-200 flex items-center rounded-[50%] px-2 py-2 "
            onClick={handleHelp}
          >
            <FaQuestion color="FFF3C2" />
          </button>
        </div>
        <div className="flex-1"></div>
        {/* 셀렉트박스 */}
        <div className="relative w-36">
          <div
            className="flex h-11 bg-green-200 hover:bg-gray-300 rounded-xl shadow justify-center items-center cursor-pointer"
            onClick={toggleSelectBox}
          >
            <div className="flex flex-1 py-1 justify-center bg-white-100 mx-2 rounded-lg gap-1 items-center">
              {/* 선택한 게 있으면 보여줘! */}
              {selectedItem ? (
                <>
                  <Image
                    className="w-[25%]"
                    src={selectedItem.pic}
                    alt={selectedItem.name}
                  />
                  <div className="text-sm font-bold">{selectedItem.name}</div>
                </>
              ) : (
                <div className="font-bold">...</div>
              )}
            </div>

            <Image className="pr-2" src={DownIcon} alt="아래" />
          </div>

          {/* 드롭 리스트 */}
          {isOpen && (
            <ul
              ref={selectRef}
              className="absolute z-10 top-full w-full mt-1  bg-white-100 overflow-y-scroll max-h-72 rounded-md shadow "
            >
              {cropsList.map((item, index) => (
                <li
                  key={item.id}
                  className="px-3 py-3 hover:bg-green-100 cursor-pointer"
                  onClick={() => handleItemClick(item)}
                >
                  <div key={index} className="flex gap-3">
                    <Image className="w-[20%]" src={item.pic} alt={item.name} />
                    <div className="text-sm font-bold">{item.name}</div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
      <div className="relative flex flex-col items-center w-[90%] h-[85%] rounded-[20px] bg-white-100">
        {/* 도움말 클릭시 나타나기 */}
        {isHelp && (
          <>
            <div
              ref={helpRef}
              className="absolute top-0 w-full h-full overflow-y-auto rounded-xl"
            >
              <Image src={helpPoster} alt="도움말" />
            </div>
            <button
              className="absolute px-2 rounded-md top-5 right-10 font-tmoney font-extrabold text-xl text-green-400 hover:text-green-500 hover:bg-green-100"
              onClick={handleHelp}
            >
              X
            </button>
          </>
        )}
        {/* 도움말 클릭 아닐 때 */}
        {selectedItem ? (
          <FertilizerContent selectedCrop={selectedItem} />
        ) : (
          <div className="w-full h-full flex justify-center items-center text-xl font-bold text-gray-500">
            선택한 작물이 없어서 비료 추천을 볼 수가 없어요!
          </div>
        )}
        <div className="pb-5">
          <Button
            text="텃밭 등록하러 가기"
            bgStyles="bg-green-400 px-2"
            textStyles="text-white-100 font-semibold"
            handleClick={handleRouter}
          />
        </div>
      </div>
    </div>
  );
};

export default FourthPage;
