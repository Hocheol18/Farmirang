"use client";
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
        </div>
      </div>
    </>
  );
}
