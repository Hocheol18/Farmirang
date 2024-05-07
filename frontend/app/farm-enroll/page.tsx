"use client";

import Input from "../_components/common/Input";
import DatePicker from "../_components/common/SelectDate";
import SelectMenu from "../_components/common/SelectMenus";
import { GoPlus } from "react-icons/go";
import DaumPost from "../_components/common/address";
import { useState } from "react";
import Button from "../_components/common/Button";

interface Props {
  areaAddress: string;
  townAddress: string;
}

export default function FarmEnroll() {
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
            <h2 className="text-h1 font-semibold text-black-100">밭 등록</h2>

            {/* <p className="mt-1 text-sm leading-6 text-gray-600">
            This information will be displayed publicly so be careful what you share.
          </p> */}

            <div className="grid grid-cols-1 gap-y-8 sm:grid-cols-6">
              <div className="col-span-full mt-10">
                <Input
                  labeltext={"밭 이름"}
                  topcss="mt-8"
                  labelcss={"block text-h4 leading-12 text-black-100"}
                  inputcss={
                    "h-[2.8rem] flex rounded-lg border border-green-300 w-full focus:outline-none focus:ring-green-400 focus:ring-1 h-10 p-2"
                  }
                  placeholder={"밭 이름을 정해주세요"}
                  type={"text"}
                  value={name}
                  onChange={setName}
                />
              </div>
              <div className="col-span-full mt-8">
                <SelectMenu
                  value={direction}
                  onChange={handleDirectionChange}
                  labelcss={"text-h4 text-black-100"}
                  topScript={"꾸민 텃밭 목록"}
                  items={people}
                  bordercss="border-gray-400"
                />
              </div>

              <div className="col-span-full mt-8">
                <div className="block text-h4 leading-12 text-black-100">
                  IoT 기기 등록
                </div>
                <div className="flex mt-2 justify-between">
                  <div className="relative mt-2 w-1/3">
                    <div className="flex rounded-md border border-green-300">
                      <input
                        type={"text"}
                        name={"IoT"}
                        id={"IoT"}
                        className="flex rounded-lg border border-green-300 w-full focus:outline-none focus:ring-green-400 focus:ring-1 h-10 p-2 placeholder:text-sm"
                        placeholder={"센서 UUID를 입력해주세요"}
                      />
                    </div>
                  </div>
                  <div className="w-1/3">
                    <SelectMenu
                      value={direction}
                      onChange={handleDirectionChange}
                      labelcss={"text-h4 text-black-100"}
                      topScript={""}
                      items={people}
                      bordercss="border-gray-400"
                    />
                  </div>
                </div>
                <div className="flex border border-green-300 h-10 rounded-md mt-4 justify-center cursor-pointer">
                  <div className="flex flex-col justify-center">
                    <GoPlus className="h-8 w-8" />
                  </div>
                </div>
              </div>

              <div className="col-span-full mt-8">
                <div className="block text-h4 leading-12 text-black-100">
                  경작 시작 시기
                </div>
                <div className="mt">
                  <DatePicker />
                </div>
              </div>

              <div className="col-span-full mt-8">
                <div className="block text-h4 leading-12 text-black-100">
                  위치
                </div>
                <div className="block flex justify-end">
                  <DaumPost setAddressObj={setAddressObj} />
                </div>

                <div className="mt-4">
                  <input
                    value={addressObj.areaAddress}
                    onChange={() => {}}
                    className="flex rounded-lg border border-green-300 w-full focus:outline-none focus:ring-green-400 focus:ring-1 h-10 p-2"
                    placeholder="주소 찾기를 눌러주세요"
                  />
                </div>
                <div className="mt-4">
                  <input
                    value={addressObj.townAddress}
                    onChange={() => {}}
                    className="flex rounded-lg border border-green-300 w-full focus:outline-none focus:ring-green-400 focus:ring-1 h-10 p-2"
                    placeholder="주소 찾기를 눌러주세요"
                  />
                </div>
                <div className="mt-4">
                  <input
                    type="text"
                    onChange={() => {}}
                    className="flex rounded-lg border border-green-300 w-full focus:outline-none focus:ring-green-400 focus:ring-1 h-10 p-2"
                    placeholder="상세 주소를 입력해주세요"
                  />
                </div>
              </div>

              <div className="col-span-full mt-8">
                <div className="block text-h4 leading-12 text-black-100">
                  텃밭 소개
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
                  텃밭을 설명할 글을 적어주세요
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-center mt-[10rem] pb-[13rem]">
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
