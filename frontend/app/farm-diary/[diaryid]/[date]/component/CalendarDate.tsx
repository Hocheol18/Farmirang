import Image from "next/image";
import dummy from "../../../../../public/dummyimage/dummy.png";
import SunIcon from "../../../../../public/icons/weather/Sun.svg";
import RainIcon from "../../../../../public/icons/weather/Rain.svg";
import SnowIcon from "../../../../../public/icons/weather/Snowman.svg";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";

export default function CalendarDate() {
  const year = 2024;
  const month = 8;
  const date = 18;
  const nowDate = 20;

  const maplist = [{}, {}, {}, {}, {}, {}, {}, {}];

  const weatherList = {
    sun: <Image src={SunIcon} width={45} height={45} alt="sun" />,
    rain: <Image src={RainIcon} width={45} height={45} alt="rain" />,
    snow: <Image src={SnowIcon} width={45} height={45} alt="snow" />,
  };

  return (
    <div className="lg:flex lg:h-full w-full">
      <div className="w-3/5 p-8 ml-8 mt-8">
        <div>
          <span className="text-h4 font-bold">밭 생성</span>
          <span className="ml-4 text-green-400 text-h3">+ {nowDate}</span>
          <span className="ml-2 text-h4 font-bold">일 째</span>
        </div>
        <div className="text-h3 font-bold mt-10">심은 작물</div>
        <div className="flex justify-between h-2/5 w-full">
          <div className="rounded-xl cursor-pointer flex flex-col justify-center w-10">
            <div className="absolute">
              <ChevronLeftIcon className="w-10 h-10" />
            </div>
          </div>
          <div className="overflow-x-auto flex flex-1 mt-2 scrollbar-hide w-10/12">
            {maplist.map((item, idx) => (
              <>
                <div
                  key={idx}
                  className="border border-gray-300 shadow-lg rounded-xl w-[13rem] flex-shrink-0 mr-6 bg-green-100"
                ></div>
              </>
            ))}
          </div>
          <div className="rounded-xl cursor-pointer flex flex-col justify-center w-10">
            <div className="absolute">
              <ChevronRightIcon className="w-10 h-10" />
            </div>
          </div>
        </div>

        <div className="border border-gray-400 shadow-xl rounded-xl mt-16 h-1/3"></div>
      </div>
      <div className="w-2/5 p-8 mr-8 mt-8 h-4/5">
        <div className="flex justify-end">
          <span className="text-h4 font-bold">{year}/</span>
          <span className="text-h4 font-bold">{month}/</span>
          <span className="text-h4 font-bold">{date}</span>
        </div>
        <div className="text-h3 font-bold mt-10">나의 일지</div>
        <div className="border border-gray-400 shadow-xl rounded-xl h-full p-6 mt-2">
          <div className="relative h-2/5 mt-2">
            <Image src={dummy} alt="" fill></Image>
          </div>
          <div className="flex justify-between mt-8">
            <div className="text-h3">영농 일기</div>
            <div className="">{weatherList.sun}</div>
          </div>
          <div className="text-h6 mt-[1rem]">
            잘 다녀왔는데 정말 좋았음. 이 날 너무 더워서 상당히 힘들었는데,
            그래도 우리 가족 덕분에 잘 버텼다 ^^. 우리 가족 화이팅 !!
          </div>
        </div>
      </div>
    </div>
  );
}
