"use client";

import { useParams } from "next/navigation";
import { useState } from "react";
import { CiCalendar } from "react-icons/ci";
import { CiCircleList } from "react-icons/ci";
import { GoPlus } from "react-icons/go";
import { RiFileList3Line } from "react-icons/ri";
import { CiSearch } from "react-icons/ci";
import dot from "../../../public/icons/dot.svg";
import Image from "next/image";

export default function Sidebar() {
  const params = useParams<{ id: string; date: string }>();

  const [navigation, setNavigation] = useState([
    {
      name: "달력",
      href: `/farm-diary/${params?.id}`,
      current: true,
      icon: <CiCalendar className="h-6 w-6" />,
    },
    {
      name: "일지",
      href: `/farm-diary/${params?.id}/1`,
      current: false,
      icon: <CiCircleList className="h-6 w-6" />,
    },
  ]);

  const farms = ["호철 밭", "현아 밭", "현지 밭"];

  return (
    <>
      <nav className="flex min-w-[240px] flex-col gap-1 p-2 mt-10 font-sans text-base font-normal text-blue-gray-700">
        {navigation.map((item, idx) => (
          <div key={idx}>
            <div className="relative block w-full">
              <div className="flex items-center w-full p-0 leading-tight transition-all rounded-lg outline-none">
                <div className="flex items-center justify-between w-full p-3 antialiased font-semibold leading-snug text-left">
                  <div className="grid mr-4 place-items-center">
                    {item.icon}
                  </div>
                  <p className="block mr-auto text-l antialiased leading-relaxed text-blue-gray-900">
                    {item.name}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}

        <hr className="my-4 border-gray-400" />
        <div
          role="button"
          className="flex items-center w-full p-3 leading-tight transition-all rounded-lg outline-none text-start"
        >
          <div className="grid mr-4 place-items-center">
            <RiFileList3Line className="h-6 w-6" />
          </div>
          <span className="font-extrabold text-base">밭 목록</span>
          <div className="grid ml-auto place-items-center justify-self-end">
            <div className="relative grid items-center px-2 py-1rounded-full select-none whitespace-nowrap">
              <GoPlus className="h-6 w-6" />
            </div>
          </div>
        </div>
        {farms.map((idx, item) => (
          <div
            key={idx}
            role="button"
            className="flex items-center w-full p-3 leading-tight rounded-lg outline-none text-start space-x-32"
          >
            <div className="flex space-x-0">
              <div className="grid mr-4 place-items-center">
                <CiSearch className="w-6 h-6" />
              </div>
              <div className="font-bold text-s place-content-center">{farms[item]}</div>
            </div>

            <Image
              src={dot}
              height={20}
              width={20}
              alt="dot"
            />
          </div>
        ))}
      </nav>
    </>
  );
}
