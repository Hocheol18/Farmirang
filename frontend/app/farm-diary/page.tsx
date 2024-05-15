"use client";

import Link from "next/link";
import Modal from "../_components/common/Modal";
import DaumPost from "../_components/common/address";
import { useEffect, useState } from "react";
import Input from "../_components/common/Input";
import Editor from "../_components/common/Editor";
import { fetchCalendar } from "@/api/farm-diary";
import { postField } from "@/api/farm-field";
import { postFieldType } from "@/type/farm-field";

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

  const datafun = {
    title: "string",
    content: "string",
    address: "string",
    startAt: "2024-05-15T14:07:38.608Z",
    user: 1,
    design: 22,
    iot: "dc:a6:32:f0:f5:b8",
  };

  const postFieldFunction = async (data: postFieldType) => {
    postField(data);
  };

  return (
    <>
      <div className="h-full">
        <div
          className="border border-black-100 w-[10rem] h-[10rem]"
          onClick={() => postFieldFunction(datafun)}
        >
          밭 생성
        </div>
        <Link href={"/farm-diary/1"}>밭1</Link>
        <Link href={"/farm-diary/1"}>밭1</Link>
        <Link href={"/farm-diary/1"}>밭1</Link>

        <div className="h-[100rem]">김현지</div>

        <div className="h-[100rem]">1</div>

        {/*  */}
        <Modal
          Titlebottom={""}
          subTitlecss={"text-base font-bold"}
          Titlecss={"text-h3 font-extrabold"}
          buttonText={"버튼"}
          buttonBgStyles={"w-20 b-green-400"}
          buttonTextStyles={"text-h4"}
          Title="센서 구매"
          subTitle="밭에 심을 센서를 구매하는 폼입니다"
          Modalcss="w-[30rem]"
          contents={
            <>
              <Input
                name=""
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

              <div className="block flex justify-between mt-10">
                <div className="font-bold text-h5">주소 등록</div>
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
          next={"확인"}
        />
      </div>
    </>
  );
}
