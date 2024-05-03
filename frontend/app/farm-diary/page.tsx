"use client";

import Link from "next/link";
import Modal from "../_components/common/Modal";
import DaumPost from "../farm-enroll/component/Address";
import { useState } from "react";
import Input from "../_components/common/Input";

interface Props {
  areaAddress: string;
  townAddress: string;
}

export default function Diary() {
  const totalPrice = 1000;

  const [addressObj, setAddressObj] = useState<Props>({
    areaAddress: "",
    townAddress: "",
  });

  return (
    <>
      <Link href={"/farm-diary/1"}>밭1</Link>
      <Link href={"/farm-diary/1"}>밭1</Link>
      <Link href={"/farm-diary/1"}>밭1</Link>

      {/*  */}
      <Modal
        subTitlecss={"text-base font-bold"}
        Titlecss={"text-h3 font-extrabold"}
        buttonText={"버튼"}
        buttonBgStyles={"w-20 b-green-400"}
        buttonTextStyles={"text-h4"}
        Title="센서 구매"
        subTitle="밭에 심을 센서를 구매하는 폼입니다"
        contents={
          <>
            <Input
              labelcss={"text-lg font-semibold"}
              inputcss={
                "flex rounded-lg border border-green-300 w-full focus:outline-none focus:ring-green-400 focus:ring-1 h-10 p-2"
              }
              placeholder={"구매할 센서의 갯수를 적어주세요"}
              type={"number"}
              value={undefined}
              topcss={"mt-10"}
              labeltext={"센서갯수"}
              onChange={() => {}}
            />

            <div className="block flex justify-end mt-10">
              <DaumPost setAddressObj={setAddressObj} />
            </div>

            <div className="mt-2">
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

            <div className="mt-14">
              <div className="text-lg font-semibold">총 가격</div>

              <div className="relative mt-2">
                <div className="flex rounded-lg border border-gray-300">
                  <input
                    disabled
                    className={`h-10 rounded-lg focus:outline-none w-full focus:ring-green-400 focus:ring-1 ml-2 h-10`}
                    value={totalPrice}
                  />
                </div>
              </div>
            </div>
          </>
        }
      />
    </>
  );
}
