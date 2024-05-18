import Button from "@/app/_components/common/Button";
import { LiaSeedlingSolid } from "react-icons/lia";
import { MdOutlineSensors } from "react-icons/md";
import { SlDirections } from "react-icons/sl";

interface Props {
  fieldId: number;
  farmName: string;
  date: string;
  cultivating: boolean;
  sensor: boolean;
  direction: string;
}

export default function FarmCard({
  fieldId,
  date,
  farmName,
  cultivating,
  sensor,
  direction,
}: Props) {
  return (
    <div className="w-full h-auto px-[37px] py-[35px] bg-white rounded-[20px] border-4 border-green-700 flex-col justify-start items-start gap-2.5 inline-flex">
      <div className="self-stretch h-fit flex-col justify-start items-end flex">
        <div className="self-stretch pb-5 justify-between items-center inline-flex">
          <div className="w-[477px] h-12 items-end flex gap-[5px]">
            <div className="text-[length:var(--m-h3-font-size)] leading-10">
              {farmName}
            </div>
            <div className="text-gray-400 text-[length:var(--m-h5-font-size)] leading-loose ml-4">
              {date} 종료
            </div>
          </div>
          <div className="h-12 justify-between items-center flex gap-[10px]">
            <Button
              text={"수정"}
              bgStyles={"bg-green-200"}
              textStyles={"text-font-m5 text-green-500"}
              handleClick={() => {}}
            />
            <Button
              text={"삭제"}
              bgStyles={"bg-green-500"}
              textStyles={"text-font-m5 text-white-100"}
              handleClick={() => {}}
            />
          </div>
        </div>
        <div className="self-stretch h-[62px] flex-col justify-start items-center gap-4 flex">
          <div className="self-stretch h-[0px] border border-zinc-400"></div>
          <div className="self-stretch justify-between items-center inline-flex">
            <div className="h-[46px] justify-center items-center gap-5 flex">
              <LiaSeedlingSolid size={33} />
              <div className="w-[107px] text-black text-xl font-bold font-['MICEGothic'] leading-loose">
                {cultivating ? "재배중" : "재배 전"}
              </div>
            </div>
            <div className="h-[45px] justify-center items-center gap-[15px] flex">
              <MdOutlineSensors size={33} />

              <div className="grow shrink basis-0 text-black text-xl font-bold font-['MICEGothic'] leading-loose">
                {sensor ? "센서 있음" : "센서 없음"}
              </div>
            </div>
            <div className="justify-center items-center gap-[15px] flex">
              <SlDirections size={33} />

              <div className="text-black text-xl font-bold font-['MICEGothic'] leading-loose">
                {direction}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
