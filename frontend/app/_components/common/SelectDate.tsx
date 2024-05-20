"use client";

import React, { useState, useEffect, Fragment } from "react";

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
const DAYS = ["일", "월", "화", "수", "목", "금", "토"];

interface Props {
  parentData: string;
  setParentData: (parentData: string) => void;
}

const DatePicker = ({ parentData, setParentData }: Props) => {
  const [showDatepicker, setShowDatepicker] = useState<boolean>(false);
  const [datepickerValue, setDatepickerValue] = useState("");
  const [month, setMonth] = useState(new Date().getMonth());
  const [year, setYear] = useState(new Date().getFullYear());
  const [noOfDays, setNoOfDays] = useState<Array<number>>([]);
  const [blankDays, setBlankDays] = useState<Array<number>>([]);

  const dateToStr = (date: any) => {
    const week = new Array("일", "월", "화", "수", "목", "금", "토");

    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const dayName = week[date.getDay()];

    return year + "년 " + month + "월 " + day + "일 " + dayName + "요일 ";
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

  const getDateValue = (date: number) => {
    const selectedDate = new Date(year, month, date);
    const isoString = selectedDate.toISOString();
    setParentData(isoString);
    setDatepickerValue(dateToStr(selectedDate));
    setShowDatepicker(false);
  };

  const isToday = (date: number) => {
    const today = new Date();
    const d = new Date(year, month, date);
    return today.toDateString() === d.toDateString();
  };

  return (
    <div className="container mx-auto py-2">
      <div className="w-full">
        <div className="relative">
          <input
            type="text"
            readOnly
            value={datepickerValue}
            onClick={() => setShowDatepicker(!showDatepicker)}
            className="w-full pl-4 pr-10 py-3 border border-gray-400 leading-none rounded-lg shadow-sm focus:outline-none focus:shadow-outline text-black-100 font-medium"
          />

          <div
            className="absolute top-0 right-0 px-3 py-2"
            onClick={() => setShowDatepicker(!showDatepicker)}
          >
            <svg
              className="h-6 w-6 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
          </div>

          {showDatepicker && (
            <div className="bg-white-100 mt-12 rounded-lg shadow p-4 absolute top-0 left w-full border border-gray-400">
              <div className="flex justify-between items-center mb-2 ml-4">
                <div>
                  <span className="text-lg font-bold text-black-100">
                    {MONTH_NAMES[month]}
                  </span>
                  <span className="text-lg font-semibold text-black-100">
                    월
                  </span>
                  <span className="ml-4 text-lg font-semibold text-black-100 font-normal">
                    {year}
                  </span>
                </div>
                <div>
                  <button
                    type="button"
                    className="transition ease-in-out duration-100 inline-flex cursor-pointer hover:bg-gray-200 p-1 rounded-full"
                    disabled={month === 0}
                    onClick={() => setMonth(month - 1)}
                  >
                    <svg
                      className="h-6 w-6 text-gray-500 inline-flex"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 19l-7-7 7-7"
                      />
                    </svg>
                  </button>
                  <button
                    type="button"
                    className="transition ease-in-out duration-100 inline-flex cursor-pointer hover:bg-gray-200 p-1 rounded-full"
                    disabled={month === 11}
                    onClick={() => setMonth(month + 1)}
                  >
                    <svg
                      className="h-6 w-6 text-gray-500 inline-flex"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </button>
                </div>
              </div>

              <div className="flex flex-wrap mb-3 mx-1 mt-6">
                {DAYS.map((day, index) => (
                  <div key={index} style={{ width: "14.26%" }} className="px-1">
                    <div className="text-black-100 p-1 font-medium text-center text-base">
                      {day}
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap mx-1">
                {blankDays.map((_, index) => (
                  <div
                    key={index}
                    className="text-center w-[14.28%] border mb-3 mt-3 border-transparent text-base"
                  ></div>
                ))}
                {noOfDays.map((date, index) => (
                  <div
                    key={index}
                    className="flex justify-center px-1 mb-3 mt-3 w-[14.28%] "
                  >
                    <div
                      onClick={() => getDateValue(date)}
                      className={`flex flex-col justify-center cursor-pointer text-center text-base leading-none rounded-full leading-loose transition ease-in-out duration-100 h-8 w-8 ${
                        isToday(date)
                          ? "bg-green-300 text-white"
                          : "text-gray-500 hover:bg-green-200"
                      }`}
                    >
                      {date}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DatePicker;
