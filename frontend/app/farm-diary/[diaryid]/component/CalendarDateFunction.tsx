'use client'

import Editor from "@/app/_components/common/Editor";
import ImageComponent from "@/app/_components/common/Image";
import MyModal from "@/app/_components/common/Modal";
import { useEffect, useState } from "react"
import { GoChevronLeft, GoChevronRight } from "react-icons/go";

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


export default function CalendarDateFunction() {

    const [showDatepicker, setShowDatepicker] = useState<boolean>(false);
    const [datepickerValue, setDatepickerValue] = useState("");
    const [month, setMonth] = useState(new Date().getMonth());
    const [year, setYear] = useState(new Date().getFullYear());
    const [noOfDays, setNoOfDays] = useState<Array<number>>([]);
    const [blankDays, setBlankDays] = useState<Array<number>>([]);


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
                                    handleEvent={() => { }}
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
    )
}