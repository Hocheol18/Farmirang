import { deleteFieldData } from "@/api/farm-field";
import Button from "@/app/_components/common/Button";
import { LiaSeedlingSolid } from "react-icons/lia";
import { MdOutlineSensors } from "react-icons/md";
import { SlDirections } from "react-icons/sl";

interface Props {
  fieldId: number;
  farmName: string;
  userId: number;
  cultivating: boolean;
  sensor: string;
  direction: string;
  startdate: string;
}

export default function FarmCard({
  fieldId,
  startdate,
  userId,
  farmName,
  cultivating,
  sensor,
  direction,
}: Props) {
  const deleteFunction = async (userId: number, fieldId: number) => {
    const result = await deleteFieldData(userId, fieldId);
    if (result?.success) {
      alert("삭제 성공");
      window.location.reload();
    } else {
      alert("삭제 실패. 다시 시도해주세요");
    }
  };
  return (
    <div className="w-full h-auto px-[37px] py-[35px] bg-white rounded-[20px] border-4 border-green-700 flex-col justify-start items-start gap-2.5 inline-flex mb-10">
      <div className="self-stretch h-fit flex-col justify-start items-end flex">
        <div className="self-stretch pb-5 justify-between items-center inline-flex">
          <div className="w-[477px] h-12 items-end flex gap-[5px]">
            <div className="font-bold text-black-100 text-h4">{farmName}</div>
            <div className="text-gray-400 font-bold text-h6 ml-4">
              {startdate.slice(0, 10)} 시작
            </div>
          </div>
          <div className="h-12 justify-between items-center flex gap-[10px]">
            <Button
              text={"삭제"}
              bgStyles={"bg-green-500"}
              textStyles={"text-font-m5 text-white-100"}
              handleClick={() => {
                deleteFunction(userId, fieldId);
              }}
            />
          </div>
        </div>
        <div className="self-stretch h-[62px] flex-col justify-start items-center gap-4 flex">
          <div className="self-stretch h-[0px] border border-zinc-400"></div>
          <div className="self-stretch justify-between items-center inline-flex">
            <div className="h-[46px] justify-center items-center gap-5 flex">
              <LiaSeedlingSolid size={33} />
              <div className="w-[70px] text-black text-xl font-bold font-['MICEGothic'] leading-loose">
                {cultivating ? "재배중" : "재배 전"}
              </div>
            </div>
            <div className="h-[45px] justify-center items-center gap-[15px] flex">
              <MdOutlineSensors size={33} />

              <div className="grow shrink basis-0 text-black text-xl font-bold font-['MICEGothic'] leading-loose">
                {sensor.length >= 1 ? "센서 있음" : "센서 없음"}
              </div>
            </div>
            <div className="justify-center items-center gap-[15px] flex">
              <SlDirections size={33} />

              <div className="text-black text-xl font-bold font-['MICEGothic'] leading-loose">
                {JSON.parse(direction).areaAddress}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
