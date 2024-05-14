"use client";

import Image from "next/image";
import { CiCalendar, CiCircleList, CiSearch } from "react-icons/ci";
import { GoPlus } from "react-icons/go";
import { RiFileList3Line } from "react-icons/ri";
import dot from "../../../../public/icons/dot.svg";
import { useParams, useRouter } from "next/navigation";
import { fetchFieldData } from "@/api/farm-diary";
import { useEffect, useState } from "react";
import { fetchFarmListType } from "@/type/farm-diary";

export default function CalendarSideBar() {
  const [fetchFarmList, setFetchFarmList] = useState<fetchFarmListType[]>();
  const fetchData = async () => {
    // userId 입력 받기
    fetchFieldData(9).then((res) => setFetchFarmList(res.data.fields));
  };

  useEffect(() => {
    console.log(fetchFarmList);
  }, [fetchFarmList]);

  const router = useRouter();
  const { diaryid } = useParams<{ diaryid: string }>() as { diaryid: string };

  const navigation = [
    {
      name: "달력",
      current: true,
      icon: <CiCalendar className="h-10 w-10" />,
    },
    {
      name: "일지",
      current: false,
      icon: <CiCircleList className="h-10 w-10" />,
    },
  ];

  function classNames(...classes: Array<string>) {
    return classes.filter(Boolean).join(" ");
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="flex flex-col justify-between mt-10 h-full">
      <div className="flex flex-col gap-1 p-2 text-base">
        {navigation.map((item, idx) => (
          <div key={idx}>
            <div className="relative block w-full">
              <div className="flex items-center w-full p-0 leading-tight transition-all rounded-lg outline-none">
                <div className="flex items-center justify-between w-full p-3 antialiased font-semibold leading-snug text-left">
                  <div className="grid mr-4 place-items-center">
                    {item.icon}
                  </div>
                  <div
                    className={classNames(
                      item.current
                        ? "block mr-auto text-h5 antialiased leading-relaxed text-balck-100 cursor-pointer"
                        : "block mr-auto text-h5 antialiased leading-relaxed text-gray-300"
                    )}
                    onClick={() => {
                      item.current ? router.push(`${diaryid}`) : null;
                    }}
                  >
                    {item.name}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}

        <hr className="my-4 border-gray-400" />
        <div className="flex items-center w-full p-3 leading-tight transition-all rounded-lg outline-none text-start">
          <div className="grid mr-4 place-items-center">
            <RiFileList3Line className="h-8 w-8" />
          </div>
          <span className="font-extrabold text-h6">밭 목록</span>
          <div className="grid ml-auto place-items-center justify-self-end">
            <div className="relative grid items-center py-1rounded-full select-none whitespace-nowrap">
              <GoPlus className="h-8 w-8 cursor-pointer" />
            </div>
          </div>
        </div>

        {fetchFarmList?.map((item, idx) => (
          <div
            key={idx}
            className="flex w-full p-3 leading-tight rounded-lg outline-none text-start justify-between"
          >
            <div className="flex">
              <div className="grid mr-4">
                <CiSearch className="w-8 h-8" />
              </div>
              <div className="font-bold text-l place-content-center cursor-pointer">
                {item.title}
              </div>
            </div>

            <Image
              src={dot}
              height={10}
              width={20}
              alt="dot"
              className="cursor-pointer"
            />
          </div>
        ))}
      </div>

      <div className="flex place-content-center">
        <div className="border-2 rounded-xl w-[220px] bg-green-400 h-[60px] place-content-center">
          <div className="flex place-content-center text-white-100 text-l font-bold">
            센서 추가
          </div>
        </div>
      </div>
    </div>
  );
}
