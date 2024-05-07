import Image, { StaticImageData } from "next/image";

import Potato from "../../../public/icons/farms/crops-potato.svg";
import SweetPotato from "../../../public/icons/farms/crops-sweet-potato.svg";
import CheongyangChillPepper from "../../../public/icons/farms/crops-cheongyang-chili-pepper.svg";
import Carrot from "../../../public/icons/farms/crops-carrot.svg";
import Strawberry from "../../../public/icons/farms/crops-strawberry.svg";
import Peanut from "../../../public/icons/farms/crops-peanut.svg";
import CherryTomato from "../../../public/icons/farms/crops-cherry-tomato.svg";
import Leek from "../../../public/icons/farms/crops-leek.svg";
import Blueberry from "../../../public/icons/farms/crops-blueberry.svg";
import Lettuce from "../../../public/icons/farms/crops-lettuce.svg";
import Ginger from "../../../public/icons/farms/crops-ginger.svg";
import Onion from "../../../public/icons/farms/crops-onion.svg";
import YoungRadish from "../../../public/icons/farms/crops-young-radish.svg";
import Cucumber from "../../../public/icons/farms/crops-cucumber.svg";
import Corn from "../../../public/icons/farms/crops-corn.svg";
import Korean from "../../../public/icons/farms/crops-korean-melon.svg";

interface Props {
  type: string;
  id: number;
  name: string;
  N: number;
  P: number;
  K: number;
}

const FertilizerBox = ({ type, id, name, N, P, K }: Props) => {
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

  return (
    <div className="flex flex-col py-[2%] gap-3 items-center w-[30%] h-full max-h-[500px]">
      <div className="font-extrabold text-lg">
        {type === "front" ? "밑거름" : "웃거름"} 비료 성분량
      </div>
      <div className="flex flex-col items-center w-full h-full">
        <div
          className={`w-[90%] h-5 ${
            type === "front" ? "bg-yellow-100" : "bg-green-200"
          }  shadow rounded-md`}
        ></div>
        <div
          className={`flex-1 py-[10%] flex flex-col gap-[10%] justify-center items-center ${
            type === "front" ? `bg-yellow-200` : `bg-green-400`
          } ${type === "front" ? null : `text-white-100`}
           w-[85%] shadow-xl`}
        >
          <div className="font-extrabold text-lg">슈퍼 {name} 비료</div>
          <div className="flex flex-col w-full items-center gap-1 ">
            <div className="flex text-sm font-bold w-full justify-around px-[20%]">
              <div>{N}</div>
              <div>ㅡ</div>
              <div>{P}</div>
              <div>ㅡ</div>
              <div>{K}</div>
            </div>
            <div className="flex text-sm w-full justify-around px-[16%]">
              <div>질소</div>
              <div>인산</div>
              <div>칼리</div>
            </div>
          </div>
          <div className="flex justify-center items-center w-14 h-14 bg-white-100 rounded-full border border-white-100">
            {/* 작물 이미지 */}
            <Image
              className="w-11 h-11 justify-center items-center"
              src={currentPic}
              alt={name}
            />
          </div>
        </div>
        <div
          className={`w-[90%] h-5 ${
            type === "front" ? "bg-yellow-100" : "bg-green-200"
          }  shadow rounded-md`}
        ></div>
      </div>
    </div>
  );
};

export default FertilizerBox;
