"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import SunIcon from "../../../../public/icons/weather/Sun.svg";
import RainIcon from "../../../../public/icons/weather/Rain.svg";
import SnowIcon from "../../../../public/icons/weather/Snowman.svg";
import { GiPlainCircle } from "react-icons/gi";
import { GoChevronLeft } from "react-icons/go";
import { GoChevronRight } from "react-icons/go";
import MyModal from "@/app/_components/common/Modal";
import ImageComponent from "@/app/_components/common/Image";
import Editor from "@/app/_components/common/Editor";
import { fetchCalendar } from "@/api/farm-diary";

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

export default function Calendar() {
  fetchCalendar().then((res) => console.log(res));

  const [showDatepicker, setShowDatepicker] = useState<boolean>(false);
  const [datepickerValue, setDatepickerValue] = useState("");
  const [month, setMonth] = useState(new Date().getMonth());
  const [year, setYear] = useState(new Date().getFullYear());
  const [noOfDays, setNoOfDays] = useState<Array<number>>([]);
  const [blankDays, setBlankDays] = useState<Array<number>>([]);

  const weatherList = {
    sun: <Image src={SunIcon} width={30} height={30} alt="sun" />,
    rain: <Image src={RainIcon} width={30} height={30} alt="rain" />,
    snow: <Image src={SnowIcon} width={30} height={30} alt="snow" />,
  };

  const dateToStr = (date: any) => {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    return year + "년 " + month + "월 ";
  };

  const getDateValue = (date: number) => {
    const selectedDate = new Date(year, month, date);
    setDatepickerValue(dateToStr(selectedDate));
    setShowDatepicker(false);
  };

  const isToday = (date: number) => {
    const today = new Date();
    const d = new Date(year, month, date);
    return today.toDateString() === d.toDateString();
  };

  useEffect(() => {
    function initDate() {
      const today = new Date();
      setDatepickerValue(dateToStr(today));
    }

    function getNoOfDays() {
      const daysInMonth = new Date(year, month + 1, 0).getDate();
      const dayOfWeek = new Date(year, month).getDay();
      const blankdaysArray = Array.from({ length: dayOfWeek }, (_, i) => i);
      const daysArray = Array.from({ length: daysInMonth }, (_, i) => i + 1);

      setBlankDays(blankdaysArray);
      setNoOfDays(daysArray);
    }

    initDate();
    getNoOfDays();
  }, [month, year]);

  return (
    <>
      <div className="lg:flex lg:h-full lg:flex-col">
        <header className="flex items-center justify-between border-b border-gray-300 px-6 py-4 lg:flex-none">
          <h1 className="text-base font-semibold leading-6 text-gray-900">
            <time>
              {year}년 {MONTH_NAMES[month]}월
            </time>
          </h1>
          <div className="flex items-center">
            <div className="relative flex items-center rounded-md bg-white shadow-sm md:items-stretch">
              <button
                type="button"
                disabled={month === 0}
                onClick={() => setMonth(month - 1)}
                className="flex h-9 w-12 items-center justify-center rounded-l-md border border-gray-300 pr-1 hover:text-gray-500 focus:relative md:w-9 md:pr-0 md:hover:bg-gray-50"
              >
                <GoChevronLeft />
              </button>

              <span className="relative -mx-px h-5 w-px bg-gray-300 md:hidden"></span>
              <button
                type="button"
                disabled={month === 11}
                onClick={() => setMonth(month + 1)}
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
                    <div className="font-bold text-h5 mt-10 mb-4">
                      일지 쓰기
                    </div>
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
        </header>
        <div className="lg:flex lg:flex-auto lg:flex-col">
          <div className="grid grid-cols-7 gap-px border-b border-gray-300 bg-white-100 text-center text-xs font-semibold leading-6 text-gray-700 lg:flex-none">
            <div className="flex justify-center bg-white py-2 text-base">
              <span>월요일</span>
            </div>
            <div className="flex justify-center bg-white py-2 text-base">
              <span>화요일</span>
            </div>
            <div className="flex justify-center bg-white py-2 text-base">
              <span>수요일</span>
            </div>
            <div className="flex justify-center bg-white py-2 text-base">
              <span>목요일</span>
            </div>
            <div className="flex justify-center bg-white py-2 text-base">
              <span>금요일</span>
            </div>
            <div className="flex justify-center bg-white py-2 text-base">
              <span>토요일</span>
            </div>
            <div className="flex justify-center bg-white py-2 text-base">
              <span>일요일</span>
            </div>
          </div>
          <div className="flex bg-white-100 text-xs leading-6 text-gray-700 lg:flex-auto">
            <div className="hidden w-full lg:grid lg:grid-cols-7 lg:grid-rows-6 lg:gap-px">
              <div className="relative bg-gray-100 px-3 py-2 text-gray-500 border-b border-gray-300 border-r border-gray-300">
                <time dateTime="2021-12-27 ">27</time>
              </div>
              <div className="relative bg-gray-100 px-3 py-2 text-gray-500 border-b border-gray-300 border-r border-gray-300">
                <time dateTime="2021-12-28">28</time>
              </div>
              <div className="relative bg-gray-100 px-3 py-2 text-gray-500 border-b border-gray-300 border-r border-gray-300">
                <time dateTime="2021-12-29">29</time>
              </div>
              <div className="relative bg-gray-100 px-3 py-2 text-gray-500 border-b border-gray-300 border-r border-gray-300">
                <time dateTime="2021-12-30">30</time>
              </div>
              <div className="relative bg-gray-100 px-3 py-2 text-gray-500 border-b border-gray-300 border-r border-gray-300">
                <time dateTime="2021-12-31">31</time>
              </div>
              <div className="relative bg-white px-3 py-2 border-b border-gray-300 border-r border-gray-300">
                <div className="group flex">
                  <div className="flex-auto">1</div>
                  <div className="flex-none">{weatherList.rain}</div>
                </div>
              </div>
              <div className="relative bg-white px-3 py-2 border-b border-gray-300 border-r border-gray-300">
                <div className="group flex">
                  <div className="flex-auto">2</div>
                  <div className="flex-none">{weatherList.sun}</div>
                </div>
              </div>
              <div className="relative bg-white px-3 py-2 border-b border-gray-300 border-r border-gray-300">
                <time dateTime="2022-01-03">3</time>
                <ol className="mt-2">
                  <li>
                    <a href="#" className="group flex">
                      <div className="flex-auto truncate hover:text-green-400 text-s">
                        새로운 알람이 있어요!
                      </div>
                      <div className="ml-3 flex-none place-content-center">
                        <GiPlainCircle className="h-2 w-2 fill-red-500" />
                      </div>
                    </a>
                  </li>
                </ol>
              </div>
              <div className="relative bg-white px-3 py-2 border-b border-gray-300 border-r border-gray-200">
                <div className="text-s font-bold">4</div>
              </div>
              <div className="relative bg-white px-3 py-2 border-b border-gray-300 border-r border-gray-200">
                <div className="text-s font-bold">5</div>
              </div>
              <div className="relative bg-white px-3 py-2 border-b border-gray-300 border-r border-gray-200">
                <div className="text-s font-bold">6</div>
              </div>
              <div className="relative bg-white px-3 py-2 border-b border-gray-300 border-r border-gray-200">
                <div>7</div>
              </div>
              <div className="relative bg-white px-3 py-2 border-b border-gray-300 border-r border-gray-300">
                <time dateTime="2022-01-08">8</time>
              </div>
              <div className="relative bg-white px-3 py-2 border-b border-gray-300 border-r border-gray-300">
                <time dateTime="2022-01-09">9</time>
              </div>
              <div className="relative bg-white px-3 py-2 border-b border-gray-300 border-r border-gray-300">
                <time dateTime="2022-01-10">10</time>
              </div>
              <div className="relative bg-white px-3 py-2 border-b border-gray-300 border-r border-gray-300">
                <time dateTime="2022-01-11">11</time>
              </div>
              <div className="relative bg-white px-3 py-2 border-b border-gray-300 border-r border-gray-300">
                <time
                  dateTime="2022-01-12"
                  className="flex h-6 w-6 items-center justify-center rounded-full bg-green-300 font-semibold text-white"
                >
                  12
                </time>
                <ol className="mt-2">
                  <li>
                    <a href="#" className="group flex">
                      <p className="flex-auto truncate font-medium text-gray-900 text-s">
                        일기 보기
                      </p>
                      <div className="place-content-center">
                        <GoChevronRight />
                      </div>
                    </a>
                  </li>
                </ol>
              </div>
              <div className="relative bg-white px-3 py-2 border-b border-gray-300 border-r border-gray-300">
                <time dateTime="2022-01-13">13</time>
              </div>
              <div className="relative bg-white px-3 py-2 border-b border-gray-300 border-r border-gray-300">
                <time dateTime="2022-01-14">14</time>
              </div>
              <div className="relative bg-white px-3 py-2 border-b border-gray-300 border-r border-gray-300">
                <time dateTime="2022-01-15">15</time>
              </div>
              <div className="relative bg-white px-3 py-2 border-b border-gray-300 border-r border-gray-300">
                <time dateTime="2022-01-16">16</time>
              </div>
              <div className="relative bg-white px-3 py-2 border-b border-gray-300 border-r border-gray-300">
                <time dateTime="2022-01-17">17</time>
              </div>
              <div className="relative bg-white px-3 py-2 border-b border-gray-300 border-r border-gray-300">
                <time dateTime="2022-01-18">18</time>
              </div>
              <div className="relative bg-white px-3 py-2 border-b border-gray-300 border-r border-gray-300">
                <time dateTime="2022-01-19">19</time>
              </div>
              <div className="relative bg-white px-3 py-2 border-b border-gray-300 border-r border-gray-300">
                <time dateTime="2022-01-20">20</time>
              </div>
              <div className="relative bg-white px-3 py-2 border-b border-gray-300 border-r border-gray-300">
                <time dateTime="2022-01-21">21</time>
              </div>
              <div className="relative bg-white px-3 py-2 border-b border-gray-300 border-r border-gray-300">
                <div>22</div>
              </div>
              <div className="relative bg-white px-3 py-2 border-b border-gray-300 border-r border-gray-200">
                <time dateTime="2022-01-23">23</time>
              </div>
              <div className="relative bg-white px-3 py-2 border-b border-gray-300 border-r border-gray-200">
                <time dateTime="2022-01-24">24</time>
              </div>
              <div className="relative bg-white px-3 py-2 border-b border-gray-300 border-r border-gray-200">
                <time dateTime="2022-01-25">25</time>
              </div>
              <div className="relative bg-white px-3 py-2 border-b border-gray-300 border-r border-gray-200">
                <time dateTime="2022-01-26">26</time>
              </div>
              <div className="relative bg-white px-3 py-2 border-b border-gray-300 border-r border-gray-200">
                <time dateTime="2022-01-27">27</time>
              </div>
              <div className="relative bg-white px-3 py-2 border-b border-gray-300 border-r border-gray-200">
                <time dateTime="2022-01-28">28</time>
              </div>
              <div className="relative bg-white px-3 py-2 border-b border-gray-300 border-r border-gray-200">
                <time dateTime="2022-01-29">29</time>
              </div>
              <div className="relative bg-white px-3 py-2 border-b border-gray-300 border-r border-gray-200">
                <time dateTime="2022-01-30">30</time>
              </div>
              <div className="relative bg-white px-3 py-2 border-b border-gray-300 border-r border-gray-200">
                <time dateTime="2022-01-31">31</time>
              </div>
              <div className="relative bg-gray-100 px-3 py-2 text-gray-500 border-b border-gray-300 border-r border-gray-200">
                <time dateTime="2022-02-01">1</time>
              </div>
              <div className="relative bg-gray-100 px-3 py-2 text-gray-500 border-b border-gray-300 border-r border-gray-200">
                <time dateTime="2022-02-02">2</time>
              </div>
              <div className="relative bg-gray-100 px-3 py-2 text-gray-500 border-b border-gray-300 border-r border-gray-200">
                <time dateTime="2022-02-03">3</time>
              </div>
              <div className="relative bg-gray-100 px-3 py-2 text-gray-500 border-b border-gray-300 border-r border-gray-200">
                <div>4</div>
              </div>
              <div className="relative bg-gray-100 px-3 py-2 text-gray-500 border-b border-gray-300 border-r border-gray-200">
                <time dateTime="2022-02-05">5</time>
              </div>
              <div className="relative bg-gray-100 px-3 py-2 text-gray-500 border-b border-gray-300 border-r border-gray-200">
                <time dateTime="2022-02-06">6</time>
              </div>
            </div>
            <div className="isolate grid w-full grid-cols-7 grid-rows-6 gap-px lg:hidden">
              {/* <!--
          Always include: "flex h-14 flex-col py-2 px-3 hover:bg-gray-100 focus:z-10"
          Is current month, include: "bg-white"
          Is not current month, include: "bg-gray-50"
          Is selected or is today, include: "font-semibold"
          Is selected, include: "text-white"
          Is not selected and is today, include: "text-indigo-600"
          Is not selected and is current month, and is not today, include: "text-gray-900"
          Is not selected, is not current month, and is not today: "text-gray-500"
        --> */}
              <button
                type="button"
                className="flex h-14 flex-col bg-gray-50 px-3 py-2 text-gray-500 hover:bg-gray-100 focus:z-10 border-r border-gray-200"
              >
                {/* <!--
            Always include: "ml-auto"
            Is selected, include: "flex h-6 w-6 items-center justify-center rounded-full"
            Is selected and is today, include: "bg-indigo-600"
            Is selected and is not today, include: "bg-gray-900"
          --> */}
                <time dateTime="2021-12-27" className="ml-auto">
                  27
                </time>
                <span className="sr-only">0 events</span>
              </button>
              <button
                type="button"
                className="flex h-14 flex-col bg-gray-50 px-3 py-2 text-gray-500 hover:bg-gray-100 focus:z-10 border-r border-gray-200"
              >
                <time dateTime="2021-12-28" className="ml-auto">
                  28
                </time>
                <span className="sr-only">0 events</span>
              </button>
              <button
                type="button"
                className="flex h-14 flex-col bg-gray-50 px-3 py-2 text-gray-500 hover:bg-gray-100 focus:z-10 border-r border-gray-200"
              >
                <time dateTime="2021-12-29" className="ml-auto">
                  29
                </time>
                <span className="sr-only">0 events</span>
              </button>
              <button
                type="button"
                className="flex h-14 flex-col bg-gray-50 px-3 py-2 text-gray-500 hover:bg-gray-100 focus:z-10"
              >
                <time dateTime="2021-12-30" className="ml-auto">
                  30
                </time>
                <span className="sr-only">0 events</span>
              </button>
              <button
                type="button"
                className="flex h-14 flex-col bg-gray-50 px-3 py-2 text-gray-500 hover:bg-gray-100 focus:z-10"
              >
                <time dateTime="2021-12-31" className="ml-auto">
                  31
                </time>
                <span className="sr-only">0 events</span>
              </button>
              <button
                type="button"
                className="flex h-14 flex-col bg-white px-3 py-2 text-gray-900 hover:bg-gray-100 focus:z-10"
              >
                <time dateTime="2022-01-01" className="ml-auto">
                  1
                </time>
                <span className="sr-only">0 events</span>
              </button>
              <button
                type="button"
                className="flex h-14 flex-col bg-white px-3 py-2 text-gray-900 hover:bg-gray-100 focus:z-10"
              >
                <time dateTime="2022-01-02" className="ml-auto">
                  2
                </time>
                <span className="sr-only">0 events</span>
              </button>
              <button
                type="button"
                className="flex h-14 flex-col bg-white px-3 py-2 text-gray-900 hover:bg-gray-100 focus:z-10"
              >
                <time dateTime="2022-01-03" className="ml-auto">
                  3
                </time>
                <span className="sr-only">2 events</span>
                <span className="-mx-0.5 mt-auto flex flex-wrap-reverse">
                  <span className="mx-0.5 mb-1 h-1.5 w-1.5 rounded-full bg-gray-400"></span>
                  <span className="mx-0.5 mb-1 h-1.5 w-1.5 rounded-full bg-gray-400"></span>
                </span>
              </button>
              <button
                type="button"
                className="flex h-14 flex-col bg-white px-3 py-2 text-gray-900 hover:bg-gray-100 focus:z-10"
              >
                <time dateTime="2022-01-04" className="ml-auto">
                  4
                </time>
                <span className="sr-only">0 events</span>
              </button>
              <button
                type="button"
                className="flex h-14 flex-col bg-white px-3 py-2 text-gray-900 hover:bg-gray-100 focus:z-10"
              >
                <time dateTime="2022-01-05" className="ml-auto">
                  5
                </time>
                <span className="sr-only">0 events</span>
              </button>
              <button
                type="button"
                className="flex h-14 flex-col bg-white px-3 py-2 text-gray-900 hover:bg-gray-100 focus:z-10"
              >
                <time dateTime="2022-01-06" className="ml-auto">
                  6
                </time>
                <span className="sr-only">0 events</span>
              </button>
              <button
                type="button"
                className="flex h-14 flex-col bg-white px-3 py-2 text-gray-900 hover:bg-gray-100 focus:z-10"
              >
                <time dateTime="2022-01-07" className="ml-auto">
                  7
                </time>
                <span className="sr-only">1 event</span>
                <span className="-mx-0.5 mt-auto flex flex-wrap-reverse">
                  <span className="mx-0.5 mb-1 h-1.5 w-1.5 rounded-full bg-gray-400"></span>
                </span>
              </button>
              <button
                type="button"
                className="flex h-14 flex-col bg-white px-3 py-2 text-gray-900 hover:bg-gray-100 focus:z-10"
              >
                <time dateTime="2022-01-08" className="ml-auto">
                  8
                </time>
                <span className="sr-only">0 events</span>
              </button>
              <button
                type="button"
                className="flex h-14 flex-col bg-white px-3 py-2 text-gray-900 hover:bg-gray-100 focus:z-10"
              >
                <time dateTime="2022-01-09" className="ml-auto">
                  9
                </time>
                <span className="sr-only">0 events</span>
              </button>
              <button
                type="button"
                className="flex h-14 flex-col bg-white px-3 py-2 text-gray-900 hover:bg-gray-100 focus:z-10"
              >
                <time dateTime="2022-01-10" className="ml-auto">
                  10
                </time>
                <span className="sr-only">0 events</span>
              </button>
              <button
                type="button"
                className="flex h-14 flex-col bg-white px-3 py-2 text-gray-900 hover:bg-gray-100 focus:z-10"
              >
                <time dateTime="2022-01-11" className="ml-auto">
                  11
                </time>
                <span className="sr-only">0 events</span>
              </button>
              <button
                type="button"
                className="flex h-14 flex-col bg-white px-3 py-2 font-semibold text-indigo-600 hover:bg-gray-100 focus:z-10"
              >
                <time dateTime="2022-01-12" className="ml-auto">
                  12
                </time>
                <span className="sr-only">1 event</span>
                <span className="-mx-0.5 mt-auto flex flex-wrap-reverse">
                  <span className="mx-0.5 mb-1 h-1.5 w-1.5 rounded-full bg-gray-400"></span>
                </span>
              </button>
              <button
                type="button"
                className="flex h-14 flex-col bg-white px-3 py-2 text-gray-900 hover:bg-gray-100 focus:z-10"
              >
                <time dateTime="2022-01-13" className="ml-auto">
                  13
                </time>
                <span className="sr-only">0 events</span>
              </button>
              <button
                type="button"
                className="flex h-14 flex-col bg-white px-3 py-2 text-gray-900 hover:bg-gray-100 focus:z-10"
              >
                <time dateTime="2022-01-14" className="ml-auto">
                  14
                </time>
                <span className="sr-only">0 events</span>
              </button>
              <button
                type="button"
                className="flex h-14 flex-col bg-white px-3 py-2 text-gray-900 hover:bg-gray-100 focus:z-10"
              >
                <time dateTime="2022-01-15" className="ml-auto">
                  15
                </time>
                <span className="sr-only">0 events</span>
              </button>
              <button
                type="button"
                className="flex h-14 flex-col bg-white px-3 py-2 text-gray-900 hover:bg-gray-100 focus:z-10"
              >
                <time dateTime="2022-01-16" className="ml-auto">
                  16
                </time>
                <span className="sr-only">0 events</span>
              </button>
              <button
                type="button"
                className="flex h-14 flex-col bg-white px-3 py-2 text-gray-900 hover:bg-gray-100 focus:z-10"
              >
                <time dateTime="2022-01-17" className="ml-auto">
                  17
                </time>
                <span className="sr-only">0 events</span>
              </button>
              <button
                type="button"
                className="flex h-14 flex-col bg-white px-3 py-2 text-gray-900 hover:bg-gray-100 focus:z-10"
              >
                <time dateTime="2022-01-18" className="ml-auto">
                  18
                </time>
                <span className="sr-only">0 events</span>
              </button>
              <button
                type="button"
                className="flex h-14 flex-col bg-white px-3 py-2 text-gray-900 hover:bg-gray-100 focus:z-10"
              >
                <time dateTime="2022-01-19" className="ml-auto">
                  19
                </time>
                <span className="sr-only">0 events</span>
              </button>
              <button
                type="button"
                className="flex h-14 flex-col bg-white px-3 py-2 text-gray-900 hover:bg-gray-100 focus:z-10"
              >
                <time dateTime="2022-01-20" className="ml-auto">
                  20
                </time>
                <span className="sr-only">0 events</span>
              </button>
              <button
                type="button"
                className="flex h-14 flex-col bg-white px-3 py-2 text-gray-900 hover:bg-gray-100 focus:z-10"
              >
                <time dateTime="2022-01-21" className="ml-auto">
                  21
                </time>
                <span className="sr-only">0 events</span>
              </button>
              <button
                type="button"
                className="flex h-14 flex-col bg-white px-3 py-2 font-semibold text-white hover:bg-gray-100 focus:z-10"
              >
                <time
                  dateTime="2022-01-22"
                  className="ml-auto flex h-6 w-6 items-center justify-center rounded-full bg-gray-900"
                >
                  22
                </time>
                <span className="sr-only">2 events</span>
                <span className="-mx-0.5 mt-auto flex flex-wrap-reverse">
                  <span className="mx-0.5 mb-1 h-1.5 w-1.5 rounded-full bg-gray-400"></span>
                  <span className="mx-0.5 mb-1 h-1.5 w-1.5 rounded-full bg-gray-400"></span>
                </span>
              </button>
              <button
                type="button"
                className="flex h-14 flex-col bg-white px-3 py-2 text-gray-900 hover:bg-gray-100 focus:z-10 border-r border-gray-200"
              >
                <time dateTime="2022-01-23" className="ml-auto">
                  23
                </time>
                <span className="sr-only">0 events</span>
              </button>
              <button
                type="button"
                className="flex h-14 flex-col bg-white px-3 py-2 text-gray-900 hover:bg-gray-100 focus:z-10 border-r border-gray-200"
              >
                <time dateTime="2022-01-24" className="ml-auto">
                  24
                </time>
                <span className="sr-only">0 events</span>
              </button>
              <button
                type="button"
                className="flex h-14 flex-col bg-white px-3 py-2 text-gray-900 hover:bg-gray-100 focus:z-10 border-r border-gray-200"
              >
                <time dateTime="2022-01-25" className="ml-auto">
                  25
                </time>
                <span className="sr-only">0 events</span>
              </button>
              <button
                type="button"
                className="flex h-14 flex-col bg-white px-3 py-2 text-gray-900 hover:bg-gray-100 focus:z-10 border-r border-gray-200"
              >
                <time dateTime="2022-01-26" className="ml-auto">
                  26
                </time>
                <span className="sr-only">0 events</span>
              </button>
              <button
                type="button"
                className="flex h-14 flex-col bg-white px-3 py-2 text-gray-900 hover:bg-gray-100 focus:z-10"
              >
                <time dateTime="2022-01-27" className="ml-auto">
                  27
                </time>
                <span className="sr-only">0 events</span>
              </button>
              <button
                type="button"
                className="flex h-14 flex-col bg-white px-3 py-2 text-gray-900 hover:bg-gray-100 focus:z-10"
              >
                <time dateTime="2022-01-28" className="ml-auto">
                  28
                </time>
                <span className="sr-only">0 events</span>
              </button>
              <button
                type="button"
                className="flex h-14 flex-col bg-white px-3 py-2 text-gray-900 hover:bg-gray-100 focus:z-10"
              >
                <time dateTime="2022-01-29" className="ml-auto">
                  29
                </time>
                <span className="sr-only">0 events</span>
              </button>
              <button
                type="button"
                className="flex h-14 flex-col bg-white px-3 py-2 text-gray-900 hover:bg-gray-100 focus:z-10"
              >
                <time dateTime="2022-01-30" className="ml-auto">
                  30
                </time>
                <span className="sr-only">0 events</span>
              </button>
              <button
                type="button"
                className="flex h-14 flex-col bg-white px-3 py-2 text-gray-900 hover:bg-gray-100 focus:z-10"
              >
                <time dateTime="2022-01-31" className="ml-auto">
                  31
                </time>
                <span className="sr-only">0 events</span>
              </button>
              <button
                type="button"
                className="flex h-14 flex-col bg-gray-50 px-3 py-2 text-gray-500 hover:bg-gray-100 focus:z-10"
              >
                <time dateTime="2022-02-01" className="ml-auto">
                  1
                </time>
                <span className="sr-only">0 events</span>
              </button>
              <button
                type="button"
                className="flex h-14 flex-col bg-gray-50 px-3 py-2 text-gray-500 hover:bg-gray-100 focus:z-10"
              >
                <time dateTime="2022-02-02" className="ml-auto">
                  2
                </time>
                <span className="sr-only">0 events</span>
              </button>
              <button
                type="button"
                className="flex h-14 flex-col bg-gray-50 px-3 py-2 text-gray-500 hover:bg-gray-100 focus:z-10"
              >
                <time dateTime="2022-02-03" className="ml-auto">
                  3
                </time>
                <span className="sr-only">0 events</span>
              </button>
              <button
                type="button"
                className="flex h-14 flex-col bg-gray-50 px-3 py-2 text-gray-500 hover:bg-gray-100 focus:z-10"
              >
                <time dateTime="2022-02-04" className="ml-auto">
                  4
                </time>
                <span className="sr-only">1 event</span>
                <span className="-mx-0.5 mt-auto flex flex-wrap-reverse">
                  <span className="mx-0.5 mb-1 h-1.5 w-1.5 rounded-full bg-gray-400"></span>
                </span>
              </button>
              <button
                type="button"
                className="flex h-14 flex-col bg-gray-50 px-3 py-2 text-gray-500 hover:bg-gray-100 focus:z-10"
              >
                <time dateTime="2022-02-05" className="ml-auto">
                  5
                </time>
                <span className="sr-only">0 events</span>
              </button>
              <button
                type="button"
                className="flex h-14 flex-col bg-gray-50 px-3 py-2 text-gray-500 hover:bg-gray-100 focus:z-10"
              >
                <time dateTime="2022-02-06" className="ml-auto">
                  6
                </time>
                <span className="sr-only">0 events</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
