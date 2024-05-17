import Image from "next/image";
import potato from "../../../public/icons/farms/crops-potato.svg";
import signature from "../../../public/donation/signature.png";
import { cropData } from "../[donationId]/component/Crop";
import React from "react";

interface Props {
  donationData: Array<{
    crop_id: number;
    id: number;
    amount: number;
    unit: string;
    current: number;
  }>;
}

export default function DonationList({ donationData }: Props) {
  // 기부 작물 가져오는 함수
  const combinedData = donationData
    .filter((donation) => cropData.some((crop) => crop.id === donation.crop_id))
    .map((donation) => {
      const crop = cropData.find((crop) => crop.id === donation.crop_id);
      return {
        ...donation,
        cropName: crop?.name,
        cropImage: crop?.image,
      };
    });
  //
  return (
    <>
      <div className="relative mt-44">
        <div className="text-h2">모금중인 기부</div>
        <div className="bg-green-200 w-[15rem] h-6 rounded-xl absolute top-8 left-0 z-[-1] opacity-70"></div>
      </div>
      <div className="border border-black-100 border mt-6"></div>
      {combinedData.map((item, idx: number) => (
        <React.Fragment key={idx}>
          {item.amount > item.current ? (
            <div className="my-10 flex justify-between relative">
              <div className="flex justify-between w-[10rem]">
                <div className="w-[80px] h-[80px] border border-black-100 rounded-full relative flex items-center justify-center">
                  <div className="stroke-black">{item.cropImage}</div>
                </div>

                <div className="text-h5 font-semibold flex flex-col justify-center">
                  {item.cropName}
                </div>
              </div>
              <div className="flex">
                <span className="text-h5 flex flex-col justify-center mr-2">
                  {item.amount - item.current}
                </span>
                <span className="text-h5 flex flex-col justify-center">개</span>
              </div>
            </div>
          ) : (
            <div className="my-10 flex justify-between">
              <div className="flex justify-between w-[10.5rem] relative">
                <div className="stroke-black flex flex-col justify-center">
                  {item.cropImage}
                </div>
                <div className="relative z-10">
                  <div className="text-h5 font-semibold flex flex-col justify-center w-[90px]">
                    <div className="flex justify-center text-gray-400">
                      {item.cropName}
                    </div>
                  </div>
                  <Image
                    className="absolute inset-0 m-auto h-auto w-[90px] min-h-0 -rotate-45"
                    src={signature}
                    alt=""
                    style={{ width: "90px", height: "90px" }}
                  ></Image>
                </div>
              </div>
              <div className="flex">
                <span className="text-h5 flex flex-col justify-center mr-2 text-gray-400">
                  {item.current}
                </span>
                <span className="text-h5 flex flex-col justify-center text-gray-400">
                  개
                </span>
              </div>
            </div>
          )}
        </React.Fragment>
      ))}

      <div className="border border-black-100 border"></div>
    </>
  );
}
