import Image from "next/image";
import SunIcon from "../../../../../public/icons/weather/Sun.svg";
import RainIcon from "../../../../../public/icons/weather/Rain.svg";
import SnowIcon from "../../../../../public/icons/weather/Snowman.svg";
import CloudIcon from "../../../../../public/icons/weather/Partly Cloudy Day.svg";
import { diaryManualDataType } from "@/type/farm-diary";
import Button from "@/app/_components/common/Button";
import { postManualDiaryDelete } from "@/api/farm-diary";

interface Props {
  childrenDiaryManualData: diaryManualDataType | null;
  Temperature: number;
  manualId: number;
  setIsTure: (isTrue: boolean) => void;
}

type WeatherState = "sun" | "rain" | "snow" | "cloud";

export default function MyDiary({
  childrenDiaryManualData,
  Temperature,
  manualId,
  setIsTure,
}: Props) {
  const weatherList: Record<WeatherState, JSX.Element> = {
    sun: <Image src={SunIcon} width={45} height={45} alt="sun" />,
    rain: <Image src={RainIcon} width={45} height={45} alt="rain" />,
    snow: <Image src={SnowIcon} width={45} height={45} alt="snow" />,
    cloud: <Image src={CloudIcon} width={45} height={45} alt="cloud" />,
  };

  let currentState: WeatherState = "cloud";

  switch (true) {
    case Temperature >= 21:
      currentState = "sun";
      break;
    case Temperature < 21 && Temperature > 8:
      currentState = "cloud";
      break;
    case Temperature <= 8 && Temperature >= 0:
      currentState = "rain";
      break;
    case Temperature < 0:
      currentState = "snow";
      break;
    default:
      currentState = "cloud";
      break;
  }

  const deleteClick = async () => {
    const response = await postManualDiaryDelete(manualId);
    console.log(response);
    if (response) {
      if (response.success) {
        setIsTure(true);
        alert("삭제 성공");
        window.location.reload();
      } else {
        alert("삭제 실패, 다시 시도해주세요.");
      }
    }
  };

  return (
    <>
      <div className="">
        <div className="flex justify-between">
          <div className="text-h2 font-bold mt-10">나의 일지</div>
          <div>
            <Button
              text={"삭제"}
              bgStyles={"bg-red-100 w-[5rem] mt-12"}
              textStyles={"text-white-100 font-bold text-lg"}
              handleClick={deleteClick}
            />
          </div>
        </div>

        {childrenDiaryManualData ? (
          <div className="border border-gray-400 shadow-xl rounded-xl min-h-full p-6 mt-10">
            <div className="relative w-[32rem] h-[24rem] mx-auto aspect-video">
              <Image src={childrenDiaryManualData.photo} alt="" fill />
            </div>
            <div className="flex justify-between mt-8">
              <div className="text-h3">영농 일기</div>
              <div>{weatherList[currentState]}</div>
            </div>
            <div className="text-h6 mt-[1rem]">
              <div
                dangerouslySetInnerHTML={{
                  __html: childrenDiaryManualData.content,
                }}
              />
            </div>
          </div>
        ) : null}
      </div>
    </>
  );
}
