"use client";

import MyModal from "@/app/_components/common/Modal";
import ShowArrangement from "@/app/_components/common/ShowArrangement";
import DesignDetailModal from "../farm-designs/DesignDetailModal";

import ThumbnailTrue from "@/public/icons/design-star.png";
import ThumbnailFalse from "@/public/icons/design-star-empty.png";

import Image from "next/image";
import { useState } from "react";
import {
  UpdateDesignName,
  deleteDesign,
  updateThumbnailDesign,
} from "@/api/farm-design";
import { useRouter } from "next/router";

interface Props {
  farmName: string;
  date: string;
  grid: number[][];
  crops: {
    cropId: number;
    number: number;
  }[];
  checkArray: boolean[][];
  isThumbnail: boolean;
  designId: number;
  accessToken: string;
  handleChangeTumbnailId: (designId: number) => void;
  handleIsEdit: () => void;
}

export default function DesignCard({
  date,
  farmName,
  checkArray,
  crops,
  grid,
  isThumbnail,
  designId,
  accessToken,
  handleChangeTumbnailId,
  handleIsEdit,
}: Props) {
  const handleChangeTumbnail = async () => {
    await updateThumbnailDesign({
      accessToken: accessToken,
      designId: designId,
    });

    handleChangeTumbnailId(designId);
  };

  const handleChangeName = async (newName: string) => {
    await UpdateDesignName({
      accessToken: accessToken,
      designId: designId,
      request: {
        name: newName,
      },
    });
    handleIsEdit();
  };

  const handleDelete = async () => {
    await deleteDesign({
      accessToken: accessToken,
      designId: designId,
    });

    window.location.replace("/mypage/farm-designs");
  };

  return (
    <div className="relative flex flex-col text-gray-700 bg-white bg-clip-border rounded-xl w-10/12">
      <div className="flex py-3 px-6 justify-center">
        <p className="block text-[length:var(--m-h3-font-size)] text-green-400">
          {farmName}
        </p>
        {isThumbnail ? (
          <div className="absolute right-3 top-5">
            <Image className="w-6 h-6" src={ThumbnailTrue} alt="대표" />
          </div>
        ) : null}
      </div>
      <MyModal
        buttonText={
          <>
            <div className="flex h-full items-center relative mx-2 text-white bg-clip-border rounded-xl shadow-blue-gray-500/40">
              <div className="w-full">
                <ShowArrangement
                  grid={grid}
                  crops={crops}
                  type={"mypage"}
                  checkArray={checkArray}
                />
              </div>
            </div>
          </>
        }
        buttonBgStyles={``}
        buttonTextStyles="text-sm font-bold "
        Title={""}
        subTitle=""
        contents={
          <DesignDetailModal
            farmName={farmName}
            date={date}
            grid={grid}
            crops={crops}
            checkArray={checkArray}
            isThumbnail={isThumbnail}
            handleChangeTumbnail={handleChangeTumbnail}
            handleChangeName={handleChangeName}
            handleDelete={handleDelete}
          />
        }
        subTitlecss=""
        Titlecss="font-bold"
        Modalcss="w-1/2 overflow-y-auto"
        Titlebottom=""
        next="삭제"
        noButton={true}
        grid={grid}
        buttonStyle="reset"
        type="mypageModal"
      />

      <div className="flex py-3 px-6 justify-end">
        <p className="block text-h6 text-gray-400">{date}</p>
      </div>
    </div>
  );
}
