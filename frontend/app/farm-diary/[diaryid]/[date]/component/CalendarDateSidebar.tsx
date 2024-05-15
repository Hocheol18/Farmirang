"use client";

import { CiCalendar, CiCircleList } from "react-icons/ci";
import Image from "next/image";
import Character from "../../../../../public/sidebar/sidebarCharacter.png";
import { useParams, useRouter } from "next/navigation";

export default function CalendarDateSidebar() {
  const router = useRouter();
  const { diaryid } = useParams<{ diaryid: string }>() as {
    diaryid: string;
  };
  const navigation = [
    {
      name: "달력",
      current: false,
      icon: <CiCalendar className="h-10 w-10" />,
    },
    {
      name: "일지",
      current: true,
      icon: <CiCircleList className="h-10 w-10" />,
    },
  ];

  function classNames(...classes: Array<string>) {
    return classes.filter(Boolean).join(" ");
  }

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
                        : "block mr-auto text-h5 antialiased leading-relaxed text-gray-300 cursor-pointer"
                    )}
                    onClick={() => {
                      item.current
                        ? null
                        : router.push(`/farm-diary/${diaryid}`);
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
      <div className="flex justify-center mb-4">
        <Image src={Character} alt="" width={200} height={300}></Image>
      </div>
    </div>
  );
}
