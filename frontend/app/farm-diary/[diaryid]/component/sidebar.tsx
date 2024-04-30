"use client";

import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { CiCalendar } from "react-icons/ci";
import { CiCircleList } from "react-icons/ci";
import { GoPlus } from "react-icons/go";
import { RiFileList3Line } from "react-icons/ri";
import { CiSearch } from "react-icons/ci";
import dot from "../../../../public/icons/dot.svg";
import Image from "next/image";

export default function Sidebar() {
  const router = useRouter();
  const params = useParams<{ id: string; date: string }>();

  function classNames(...classes: Array<string>) {
    return classes.filter(Boolean).join(" ");
  }

  const [current, setCurrent] = useState<boolean>(true);

  const [navigation, setNavigation] = useState([
    {
      name: "달력",
      href: `/farm-diary/1`,
      current: true,
      icon: <CiCalendar className="h-6 w-6" />,
    },
    {
      name: "일지",
      href: `/farm-diary/1/1`,
      current: false,
      icon: <CiCircleList className="h-6 w-6" />,
    },
  ]);

  const handleEvent = (href: string, index: number) => {
    const newNavigation = navigation.map((item, idx) => ({
      ...item,
      current: idx === index,
    }));
    setNavigation(newNavigation);

    router.push(href);
  };

  const farms = ["호철 밭", "현아 밭", "현지 밭"];

  return (
    <>
      {current ? (
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
                            ? "block mr-auto text-l antialiased leading-relaxed text-balck-100 cursor-pointer"
                            : "block mr-auto text-l antialiased leading-relaxed text-gray-300 cursor-pointer"
                        )}
                        onClick={() => {
                          handleEvent(item.href, idx);
                          setCurrent(!current);
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
                <RiFileList3Line className="h-6 w-6" />
              </div>
              <span className="font-extrabold text-base">밭 목록</span>
              <div className="grid ml-auto place-items-center justify-self-end">
                <div className="relative grid items-center px-2 py-1rounded-full select-none whitespace-nowrap">
                  <GoPlus className="h-6 w-6 cursor-pointer" />
                </div>
              </div>
            </div>
            {farms.map((idx, item) => (
              <div
                key={idx}
                className="flex items-center w-full p-3 leading-tight rounded-lg outline-none text-start space-x-32"
              >
                <div className="flex space-x-0">
                  <div className="grid mr-4 place-items-center">
                    <CiSearch className="w-6 h-6" />
                  </div>
                  <div className="font-bold text-s place-content-center cursor-pointer">
                    {farms[item]}
                  </div>
                </div>

                <Image
                  src={dot}
                  height={20}
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
      ) : (
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
                            ? "block mr-auto text-l antialiased leading-relaxed text-balck-100 cursor-pointer"
                            : "block mr-auto text-l antialiased leading-relaxed text-gray-300 cursor-pointer"
                        )}
                        onClick={() => {
                          handleEvent(item.href, idx);
                          setCurrent(!current);
                        }}
                      >
                        {item.name}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
