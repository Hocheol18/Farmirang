"use client";

import Editor from "@/app/_components/common/Editor";
import ImageComponent from "@/app/_components/common/Image";
import MyModal from "@/app/_components/common/Modal";
import { useState } from "react";
import { GoChevronLeft, GoChevronRight } from "react-icons/go";

interface Props {
  pastyear: number;
  pastmonth: number;
  pastsetYear: (pastyear: number) => void;
  pastsetMonth: (pastmonth: number) => void;
}

const MONTH_NAMES = [
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "11",
  "12",
];

export default function CalendarDateComponent({
  pastyear,
  pastmonth,
  pastsetYear,
  pastsetMonth,
}: Props) {
  return (
    <>
      <h1 className="text-base font-semibold leading-6 text-gray-900">
        <time>
          {pastyear}년 {MONTH_NAMES[pastmonth - 1]}월
        </time>
      </h1>
      <div className="flex items-center">
        <div className="relative flex items-center rounded-md bg-white shadow-sm md:items-stretch">
          <button
            type="button"
            disabled={pastmonth === 0}
            onClick={() => pastsetMonth(pastmonth - 1)}
            className="flex h-9 w-12 items-center justify-center rounded-l-md border border-gray-300 pr-1 hover:text-gray-500 focus:relative md:w-9 md:pr-0 md:hover:bg-gray-50"
          >
            <GoChevronLeft />
          </button>

          <span className="relative -mx-px h-5 w-px bg-gray-300 md:hidden"></span>
          <button
            type="button"
            disabled={pastmonth === 11}
            onClick={() => pastsetMonth(pastmonth + 1)}
            className="flex h-9 w-12 items-center justify-center rounded-r-md border border-gray-300 pl-1 hover:text-gray-500 focus:relative md:w-9 md:pl-0 md:hover:bg-gray-50"
          >
            <GoChevronRight />
          </button>
        </div>
        <div className="hidden md:ml-4 md:flex md:items-center">
          {/* Dropdown menu, show/hide based on menu state.

            Entering: "transition ease-out duration-100"
              From: "transform opacity-0 scale-95"
              To: "transform opacity-100 scale-100"
            Leaving: "transition ease-in duration-75"
              From: "transform opacity-100 scale-100"
              To: "transform opacity-0 scale-95" */}

          <div className="ml-3 h-6 w-px bg-gray-400"></div>
          <MyModal
            buttonText={"일기 추가"}
            buttonBgStyles={
              "ml-3 rounded-md px-3 py-2 text-sm font-semibold text-white shadow-sm hover:font-green-400 focus-visible:outline focus-visible:outline-2"
            }
            buttonTextStyles={""}
            Title={"일기 추가"}
            subTitle={""}
            contents={
              <>
                <ImageComponent
                  title={"일기 대표 사진"}
                  titlecss={"font-bold text-h5"}
                  topcss={"mt-[2rem] h-[20rem]"}
                  topsecondcss={"w-full"}
                  heightcss={"h-[18rem]"}
                  handleEvent={() => {}}
                />
                <div className="font-bold text-h5 mt-10 mb-4">일지 쓰기</div>
                <Editor />
              </>
            }
            subTitlecss={""}
            Titlecss={"font-bold text-h2"}
            Modalcss={"w-5/6"}
            Titlebottom={undefined}
            next={"작성"}
          />
        </div>
      </div>
    </>
  );
}
