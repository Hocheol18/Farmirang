"use client";

import Input from "../_components/common/Input";
import DatePicker from "../_components/common/SelectDate";
import SelectMenu from "../_components/common/SelectMenus";
import DaumPost from "../_components/common/address";
import { useEffect, useState } from "react";
import Button from "../_components/common/Button";
import { postFieldType } from "@/type/farm-field";

interface Props {
  areaAddress: string;
  townAddress: string;
}

export default function FarmEnroll() {
  const [farmDesign, setFarmDesign] = useState<number>(1);
  const [totalValue, setTotalValue] = useState<postFieldType>({
    title: "",
    content: "",
    address: "",
    startAt: "",
    user: 0,
    design: 0,
    iot: "string",
  });

  const stringHandleEvent = (event: React.ChangeEvent<HTMLInputElement>) => {
    const name = event.target.name;
    const value = event.target.value;
    setTotalValue((prev: postFieldType) => ({
      ...prev,
      [name]: value,
    }));
  };

  useEffect(() => {
    console.log(totalValue);
  }, [totalValue]);
  // const [farmName, setFarmName] = useState<string>();
  // const [cropName, setCropName] = useState<string>();
  // const [IoTName, setIoTName] = useState<string>();
  // const [startDate, setStartDate] = useState<string>();
  // const [currentAddress, setCurrentAddress] = useState<string>();
  // const [farmIntroduce, setFarmIntroduce] = useState<string>();

  const [addressObj, setAddressObj] = useState<Props>({
    areaAddress: "",
    townAddress: "",
  });

  const handleDirectionChange = (value: number) => {
    setFarmDesign(value);
  };

  return (
    <>
      <div className="flex justify-center mt-20">
        <div className="space-y-12 w-1/3">
          <div className="">
            <h2 className="text-h1 font-semibold text-black-100">밭 등록</h2>

            <div className="grid grid-cols-1 gap-y-8 sm:grid-cols-6">
              <div className="col-span-full mt-10">
                <Input
                  name={"title"}
                  labeltext={"밭 이름"}
                  topcss="mt-8"
                  labelcss={"block text-h5 font-bold leading-12 text-black-100"}
                  inputcss={
                    "h-[3rem] flex rounded-lg border border-green-300 w-full focus:outline-none focus:ring-green-400 focus:ring-1 h-10 p-4"
                  }
                  placeholder={"밭 이름을 정해주세요"}
                  type={"text"}
                  value={totalValue.title}
                  onChange={stringHandleEvent}
                />
              </div>
              <div className="col-span-full mt-8">
                <SelectMenu
                  value={farmDesign}
                  onChange={handleDirectionChange}
                  labelcss={"text-h5 font-bold text-black-100"}
                  topScript={"꾸민 텃밭 목록"}
                  items={[{ id: 0, name: "Hocheol" }]}
                  bordercss="border-gray-400 h-[3rem]"
                />
              </div>

              <div className="col-span-full mt-8">
                <div className="block text-h5 font-bold leading-12 text-black-100">
                  IoT 기기 등록
                </div>
                <div className="flex mt-2 h-[3rem]">
                  <div className="relative mt-2 w-full">
                    <div className="flex rounded-md border border-green-300 ">
                      <input
                        type={"text"}
                        name={"IoT"}
                        id={"IoT"}
                        className="flex rounded-lg border border-green-300 w-full focus:outline-none focus:ring-green-400 focus:ring-1 h-10 p-4 placeholder:text-base"
                        placeholder={"센서 UUID를 입력해주세요"}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-span-full mt-8">
                <div className="block text-h5 font-bold leading-12 text-black-100">
                  경작 시작 시기
                </div>
                <div className="mt">
                  <DatePicker />
                </div>
              </div>

              <div className="col-span-full mt-8">
                <div className="flex w-full justify-between">
                  <div className="block text-h5 font-bold leading-12 text-black-100 flex flex-col justify-center">
                    내 밭 주소
                  </div>
                  <div className="block flex justify-end">
                    <DaumPost setAddressObj={setAddressObj} />
                  </div>
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
                <div className="block text-h5 font-bold leading-12 text-black-100">
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
