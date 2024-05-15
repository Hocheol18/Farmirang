"use client";

import { GoPlus } from "react-icons/go";
import { useState } from "react";
import Input from "@/app/_components/common/Input";
import Button from "@/app/_components/common/Button";
import DaumPost from "@/app/_components/common/address";
import SelectMenu from "@/app/_components/common/SelectMenus";
import DatePicker from "@/app/_components/common/SelectDate";
import ImageComponent from "@/app/_components/common/Image";

interface Props {
  areaAddress: string;
  townAddress: string;
}

export default function DonationWrite() {
  const [direction, setDirection] = useState<number>(1);
  const [name, setName] = useState<string>("");
  const people = [
    {
      id: 1,
      name: "Wade Cooper",
    },
    {
      id: 2,
      name: "Arlene Mccoy",
    },
    {
      id: 3,
      name: "Devon Webb",
    },
    {
      id: 4,
      name: "Tom Cook",
    },
    {
      id: 5,
      name: "Tanya Fox",
    },
    {
      id: 6,
      name: "Hellen Schmidt",
    },
    {
      id: 7,
      name: "Caroline Schultz",
    },
    {
      id: 8,
      name: "Mason Heaney",
    },
    {
      id: 9,
      name: "Claudie Smitham",
    },
    {
      id: 10,
      name: "Emil Schaefer",
    },
  ];

  const [addressObj, setAddressObj] = useState<Props>({
    areaAddress: "",
    townAddress: "",
  });

  const handleDirectionChange = (value: number) => {
    setDirection(value);
  };

  return (
    <>
      <div className="flex justify-center mt-20">
        <div className="space-y-12 w-1/3">
          <div className="">
            <h2 className="text-h1 font-semibold text-black-100">
              기부 신청하기
            </h2>

            <div className="grid grid-cols-1 gap-y-8 sm:grid-cols-6">
              <div className="col-span-full mt-10">
                <ImageComponent
                  topsecondcss="w-full"
                  title={"메인 사진"}
                  titlecss={"font-bold text-h5"}
                  topcss={"mt-8"}
                  heightcss={""}
                  handleEvent={() => {}}
                />
                <ImageComponent
                  topsecondcss="w-full"
                  title={"상세 사진"}
                  titlecss={"font-bold text-h5"}
                  topcss={"mt-20"}
                  heightcss={""}
                  handleEvent={() => {}}
                />

                <div className="col-span-full mt-20">
                  <div className="flex w-full justify-between">
                    <div className="block text-h5 font-bold leading-12 text-black-100 flex flex-col justify-center">
                      기부 받을 주소
                    </div>
                    <div className="block flex justify-end">
                      <DaumPost setAddressObj={setAddressObj} />
                    </div>
                  </div>

                  <div className="mt-4">
                    <input
                      value={addressObj.areaAddress}
                      onChange={() => {}}
                      className="flex rounded-lg border border-green-300 w-full focus:outline-none focus:ring-green-400 focus:ring-1 h-10 p-4"
                      placeholder="주소 찾기를 눌러주세요"
                    />
                  </div>
                  <div className="mt-4">
                    <input
                      value={addressObj.townAddress}
                      onChange={() => {}}
                      className="flex rounded-lg border border-green-300 w-full focus:outline-none focus:ring-green-400 focus:ring-1 h-10 p-4"
                      placeholder="주소 찾기를 눌러주세요"
                    />
                  </div>
                  <div className="mt-4">
                    <input
                      type="text"
                      onChange={() => {}}
                      className="flex rounded-lg border border-green-300 w-full focus:outline-none focus:ring-green-400 focus:ring-1 h-10 p-4"
                      placeholder="상세 주소를 입력해주세요"
                    />
                  </div>
                </div>

                <div className="">
                  <Input
                    labeltext={"기부 글 제목"}
                    topcss="mt-20"
                    labelcss={
                      "block text-h5 leading-12 text-black-100 font-bold"
                    }
                    inputcss={
                      "h-[2.8rem] flex rounded-lg border border-green-300 w-full focus:outline-none focus:ring-green-400 focus:ring-1 h-10 p-4"
                    }
                    placeholder={"밭 이름을 정해주세요"}
                    type={"text"}
                    value={name}
                    onChange={setName}
                  />
                </div>
              </div>

              <div className="col-span-full mt-8">
                <div className="block text-h5 font-bold leading-12 text-black-100">
                  기부 받을 작물 목록
                </div>
                <div className="flex mt-2 justify-between">
                  <div className="w-1/2 mr-[1rem]">
                    <SelectMenu
                      value={direction}
                      onChange={handleDirectionChange}
                      labelcss={"text-h4 text-black-100"}
                      topScript={""}
                      items={people}
                      bordercss="border-gray-400 h-[2.5rem]"
                    />
                  </div>
                  <div className="relative mt-2 w-1/2 ml-[1rem]">
                    <div className="flex rounded-md border border-green-300">
                      <input
                        type={"text"}
                        name={"IoT"}
                        id={"IoT"}
                        className="flex rounded-lg border border-green-300 w-full focus:outline-none focus:ring-green-400 focus:ring-1 h-10 p-4 placeholder:text-sm"
                        placeholder={"작물 갯수를 적어주세요`"}
                      />
                    </div>
                  </div>
                </div>
                <div
                  className="flex border border-green-300 h-10 rounded-md mt-4 justify-center cursor-pointer"
                  onClick={() => {}}
                >
                  <div className="flex flex-col justify-center">
                    <GoPlus className="h-8 w-8" />
                  </div>
                </div>
              </div>

              <div className="col-span-full mt-8">
                <div className="block text-h5 font-bold leading-12 text-black-100">
                  기부 시작일
                </div>
                <div className="flex justfiy-between">
                  <DatePicker />
                  <div className="w-[3rem]"></div>
                  <DatePicker />
                </div>
              </div>

              <div className="col-span-full mt-8">
                <div className="block text-h5 font-bold leading-12 text-black-100">
                  기부글 소개
                </div>
                <div className="mt-2">
                  <textarea
                    id="about"
                    name="about"
                    rows={6}
                    className="flex rounded-md border border-green-300 w-full focus:outline-none focus:ring-green-400 focus:ring-1 p-4"
                    defaultValue={""}
                  />
                </div>
                <p className="mt-1 text-[0.8rem] leading-6 text-gray-400">
                  기부를 자세하게 소개해주세요
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-center mt-[10rem] pb-[10rem]">
        <Button
          text="확인"
          bgStyles="bg-green-400 w-32"
          textStyles="text-white-100"
          handleClick={() => {}}
        />
      </div>
      <div></div>
    </>
  );
}
