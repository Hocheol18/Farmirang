"use client";

import { GoChevronRight } from "react-icons/go";
import CalendarDateComponent from "./CalendarDateComponent";
import { useEffect, useState } from "react";
import { fetchCalendar } from "@/api/farm-diary";
import React from "react";
import { useParams, useRouter } from "next/navigation";
import Spinner from "@/app/_components/common/Spinner";

export default function Calendar() {
  const today = new Date();
  const [isTure, setIsTrue] = useState<boolean>(true);
  const [year, setYear] = useState<number>(today.getFullYear());
  const [month, setMonth] = useState<number>(today.getMonth() + 1);
  const todayDay = today.getDate();
  const todayMonth = today.getMonth() + 1;
  const [calendarDate, setCalendarDate] = useState([]);
  const { diaryid } = useParams<{ diaryid: string }>() as { diaryid: string };
  const setData = (res: any) => {
    setCalendarDate(res.data.result);
    setIsTrue(false);
  };

  const router = useRouter();

  useEffect(() => {
    fetchCalendar({ fieldId: Number(diaryid), year: year, month: month })
      .then(setData)
      .catch(console.error);
  }, [diaryid, year, month]);

  return (
    <>
      {isTure ? (
        <Spinner />
      ) : (
        <div className="lg:flex lg:h-full lg:flex-col">
          <header className="flex items-center justify-between border-b border-gray-300 px-6 py-4 lg:flex-none">
            <CalendarDateComponent
              pastyear={year}
              pastmonth={month}
              pastsetYear={setYear}
              pastsetMonth={setMonth}
            />
          </header>
          <div className="lg:flex lg:flex-auto lg:flex-col">
            <div className="grid grid-cols-7 gap-px border-b border-gray-300 bg-white-100 text-center text-xs font-semibold leading-6 text-gray-700 lg:flex-none">
              <div className="flex justify-center bg-white py-2 text-lg">
                <span>월요일</span>
              </div>
              <div className="flex justify-center bg-white py-2 text-lg">
                <span>화요일</span>
              </div>
              <div className="flex justify-center bg-white py-2 text-lg">
                <span>수요일</span>
              </div>
              <div className="flex justify-center bg-white py-2 text-lg">
                <span>목요일</span>
              </div>
              <div className="flex justify-center bg-white py-2 text-lg">
                <span>금요일</span>
              </div>
              <div className="flex justify-center bg-white py-2 text-lg">
                <span>토요일</span>
              </div>
              <div className="flex justify-center bg-white py-2 text-lg">
                <span>일요일</span>
              </div>
            </div>
            <div className="flex bg-white-100 text-xs leading-6 text-gray-700 lg:flex-auto">
              <div className="hidden w-full lg:grid lg:grid-cols-7 lg:grid-rows-6 lg:gap-px">
                {calendarDate.map((item: any, idx: number) =>
                  item.map((items: any, idxes: number) => (
                    <React.Fragment key={idx * 10 + idxes}>
                      {items === null ? (
                        <div className="relative bg-gray-100 px-3 py-2 text-gray-500 border-b border-gray-300 border-r border-gray-300"></div>
                      ) : items.diaryId !== null &&
                        Number(items.day) === todayDay &&
                        month === todayMonth ? (
                        <div className="relative bg-white px-3 py-2 border-b border-gray-300 border-r border-gray-300 py-4 px-4">
                          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-green-300 font-bold text-base text-white-100">
                            {items.day}
                          </div>
                          <ol className="mt-8">
                            <li>
                              <div
                                className="group flex flex-col justify-center cursor-pointer"
                                onClick={() =>
                                  router.push(`${diaryid}/${items.diaryId}`)
                                }
                              >
                                <div className="flex">
                                  <p className="flex-auto truncate font-extrabold text-gray-900 text-s">
                                    일기 보기
                                  </p>
                                  <div className="place-content-center">
                                    <GoChevronRight />
                                  </div>
                                </div>
                              </div>
                            </li>
                          </ol>
                        </div>
                      ) : items.diaryId !== null && items.day !== todayDay ? (
                        <div className="relative bg-white px-3 py-2 border-b border-gray-300 border-r border-gray-300 py-4 px-4">
                          <div className="flex h-6 w-6 items-center justify-center rounded-full font-bold text-base">
                            {items.day}
                          </div>
                          <ol className="mt-8">
                            <li>
                              <div
                                className="group flex cursor-pointer flex-col justify-center"
                                onClick={() =>
                                  router.push(`${diaryid}/${items.diaryId}`)
                                }
                              >
                                <div className="flex">
                                  <p className="flex-auto truncate font-extrabold text-gray-900 text-l">
                                    일기 보기
                                  </p>
                                  <div className="place-content-center">
                                    <GoChevronRight />
                                  </div>
                                </div>
                              </div>
                            </li>
                          </ol>
                        </div>
                      ) : Number(items.day) === todayDay &&
                        month === todayMonth ? (
                        <div className="relative bg-white px-3 py-2 border-b border-gray-300 border-r border-gray-300 py-4 px-4">
                          <div className="group flex">
                            <div className="flex h-8 w-8 font-bold text-base items-center justify-center rounded-full bg-green-300 text-white-100">
                              {items.day}
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="relative bg-white px-3 py-2 border-b border-gray-300 border-r border-gray-300 py-4 px-4">
                          <div className="group flex">
                            <div className="flex-auto font-bold text-base">
                              {items.day}
                            </div>
                          </div>
                        </div>
                      )}
                    </React.Fragment>
                  ))
                )}
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
      )}
    </>
  );
}
