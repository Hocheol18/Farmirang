import { diaryAutosDataType } from "@/type/farm-diary";
import blueberry from "../../../../../public/icons/farms/crops-blueberry.svg";
import carrot from "../../../../../public/icons/farms/crops-carrot.svg";
import cheongyang from "../../../../../public/icons/farms/crops-cheongyang-chili-pepper.svg";
import cherryTomato from "../../../../../public/icons/farms/crops-cherry-tomato.svg";
import corn from "../../../../../public/icons/farms/crops-corn.svg";
import cucumber from "../../../../../public/icons/farms/crops-cucumber.svg";
import ginger from "../../../../../public/icons/farms/crops-ginger.svg";
import melon from "../../../../../public/icons/farms/crops-korean-melon.svg";
import leek from "../../../../../public/icons/farms/crops-leek.svg";
import lettuce from "../../../../../public/icons/farms/crops-lettuce.svg";
import onion from "../../../../../public/icons/farms/crops-onion.svg";
import peanut from "../../../../../public/icons/farms/crops-peanut.svg";
import potato from "../../../../../public/icons/farms/crops-potato.svg";
import strawberry from "../../../../../public/icons/farms/crops-strawberry.svg";
import sweetpotato from "../../../../../public/icons/farms/crops-sweet-potato.svg";
import youngRadish from "../../../../../public/icons/farms/crops-young-radish.svg";
import Image from "next/image";
import React from "react";

interface Props {
  childrenAutoDiaryData: diaryAutosDataType[];
}

const cropImage: CropImages = {
  blueberry: <Image src={blueberry} width={125} height={125} alt=""></Image>,
  carrot: <Image src={carrot} width={125} height={125} alt=""></Image>,
  청양고추: <Image src={cheongyang} width={125} height={125} alt=""></Image>,
  cherryTomato: (
    <Image src={cherryTomato} width={125} height={125} alt=""></Image>
  ),
  corn: <Image src={corn} width={125} height={125} alt=""></Image>,
  cucumber: <Image src={cucumber} width={125} height={125} alt=""></Image>,
  ginger: <Image src={ginger} width={125} height={125} alt=""></Image>,
  melon: <Image src={melon} width={125} height={125} alt=""></Image>,
  leek: <Image src={leek} width={125} height={125} alt=""></Image>,
  lettuce: <Image src={lettuce} width={125} height={125} alt=""></Image>,
  onion: <Image src={onion} width={125} height={125} alt=""></Image>,
  peanut: <Image src={peanut} width={125} height={125} alt=""></Image>,
  감자: <Image src={potato} width={125} height={125} alt=""></Image>,
  strawberry: <Image src={strawberry} width={125} height={125} alt=""></Image>,
  고구마: <Image src={sweetpotato} width={125} height={125} alt=""></Image>,
  youngRadish: (
    <Image src={youngRadish} width={125} height={125} alt=""></Image>
  ),
};

interface CropImages {
  [key: string]: any;
}

function splitAndCleanString(inputString: string): string[] {
  return inputString.split("\n");
}

export default function AutoDiary({ childrenAutoDiaryData }: Props) {
  return (
    <div className="overflow-x-auto flex flex-1 mt-4 w-10/12">
      {childrenAutoDiaryData.map((item, idx) => (
        <React.Fragment key={idx}>
          {idx % 2 === 0 ? (
            <div

              className="border border-gray-300 shadow-lg rounded-xl w-[14rem] flex-shrink-0 mr-6 bg-green-100"
            >
              <div className="h-3/5 flex flex-col justify-center">
                <div className="flex justify-center">
                  {cropImage[item.cropName]}
                </div>
              </div>
              <div className="h-2/5 justify-center flex flex-col justify-center">
                <div className="flex justify-center">
                  <div className="flex flex-col">
                    {splitAndCleanString(item.content).map((item, idx) => (
                      <div key={idx} className="text-h6 mt-2">
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div

              className="border border-gray-300 shadow-lg rounded-xl w-[14rem] flex-shrink-0 mr-6 bg-gray-200"
            >
              <div className="h-3/5 flex flex-col justify-center">
                <div className="flex justify-center">
                  {cropImage[item.cropName]}
                </div>
              </div>
              <div className="h-2/5 justify-center flex flex-col justify-center">
                <div className="flex justify-center">
                  <div className="flex flex-col">
                    {splitAndCleanString(item.content).map((item, idx) => (
                      <div key={idx} className="text-h6 mt-2">
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </React.Fragment>
      ))}
    </div>
  );
}
