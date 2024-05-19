import { diaryTotalDataType } from "@/type/farm-diary";
import Image from "next/image";
import humidity from "../../../../../public/icons/humidity.png";
import soil from "../../../../../public/icons/soil.png";

interface Props {
  childrenDiaryTotalData: diaryTotalDataType;
}

export default function TemperatureComponent({
  childrenDiaryTotalData,
}: Props) {
  return (
    <>
      <div className="flex h-full justify-between px-[4rem]">
        <div className="flex justify-center w-1/2">
          <div className="flex flex-col justify-center mr-6">
            <Image src={soil} alt="" width={200} height={150}></Image>
          </div>

          <div className="flex flex-col justfiy-center">
            <div className="flex my-auto">
              <div className="text-h4 font-bold mr-4">땅 습도</div>
              <div className="font-bold text-blue-800 text-h5 my-auto">
                {`${
                  Math.floor(
                    Number(childrenDiaryTotalData.fieldHumidity) * 10
                  ) / 10
                }%`}
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-center w-1/2">
          <div className="flex flex-col justify-center">
            <Image src={humidity} alt="" width={250} height={250}></Image>
          </div>

          <div className="flex flex-col justify-between py-10">
            <div>
              <div className="text-h4 font-bold">대기 습도</div>
              <div className="font-bold text-blue-800 text-h5">
                {`${
                  Math.floor(Number(childrenDiaryTotalData.humidity) * 10) / 10
                }%`}
              </div>
            </div>

            <div>
              <div className="text-h4 font-bold">대기 온도</div>
              <div className="font-bold text-green-500 text-h5">
                {`${
                  Math.floor(Number(childrenDiaryTotalData.temperature) * 10) /
                  10
                }°C`}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
