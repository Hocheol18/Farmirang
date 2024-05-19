"use client";

import ShowArrangement from "@/app/_components/common/ShowArrangement";
import ThumbnailTrue from "@/public/icons/design-star.png";
import ThumbnailFalse from "@/public/icons/design-star-empty.png";
import EditPen from "@/public/icons/edit-pen-icon.png";

import Image from "next/image";
import { useState } from "react";
import Button from "@/app/_components/common/Button";

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
  handleChangeTumbnail: () => void;
  handleChangeName: (newName: string) => void;
  handleDelete: () => void;
}

const DesignDetailModal = ({
  date,
  farmName,
  checkArray,
  crops,
  grid,
  isThumbnail,
  handleChangeTumbnail,
  handleChangeName,
  handleDelete,
}: Props) => {
  const [isEditClick, setIsEditClick] = useState<boolean>(false);
  const [name, setName] = useState<string>(farmName);

  const handleUpdateName = (newName: string) => {
    setName(newName);
  };

  const handleNameSave = () => {
    handleChangeName(name);
    setIsEditClick(false);
  };

  return (
    <div className="relative flex flex-col">
      <div className="absolute right-0">
        {isThumbnail ? (
          <button onClick={handleChangeTumbnail}>
            <Image className="w-6 h-6" src={ThumbnailTrue} alt="대표" />
          </button>
        ) : (
          <button onClick={handleChangeTumbnail}>
            <Image className="w-6 h-6" src={ThumbnailFalse} alt="대표X" />
          </button>
        )}
      </div>
      <div className="flex justify-center  items-center pb-7">
        {isEditClick ? (
          <div>
            <input
              className="border-2 px-3 py-2 rounded-lg mr-3 w-44"
              type="text"
              value={name}
              onChange={(e) => handleUpdateName(e.target.value)}
            />
            <Button
              bgStyles="bg-green-300 hover:bg-green-400"
              handleClick={handleNameSave}
              text={"확인"}
              textStyles="text-white-100"
            />
          </div>
        ) : (
          <>
            <div className="flex justify-center font-bold text-2xl">
              {farmName}
            </div>
            <button
              onClick={() => setIsEditClick(true)}
              className="bg-gray-200 hover:bg-gray-300 p-1 rounded-full ml-2"
            >
              <Image className="w-6 h-6" src={EditPen} alt="이름 수정" />
            </button>
          </>
        )}
      </div>
      <ShowArrangement
        grid={grid}
        crops={crops}
        type={"mypage"}
        checkArray={checkArray}
      />
      <div className="flex justify-end text-gray-400 pt-2">{date}</div>
      <div className="flex justify-end mt-3">
        <Button
          text={"삭제"}
          bgStyles="bg-red-500 hover:bg-red-600"
          textStyles="text-white-100 font-bold"
          handleClick={handleDelete}
        />
      </div>
    </div>
  );
};

export default DesignDetailModal;
