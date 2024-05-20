import Button from "@/app/_components/common/Button";
import { LiaSeedlingSolid } from "react-icons/lia";
import { MdOutlineSensors } from "react-icons/md";
import { SlDirections } from "react-icons/sl";

interface Props {
  imgSrc: string;
  memo: string;
}

export default function BoardDesignCard({ imgSrc, memo }: Props) {
  return (
    <div className="w-[416px] h-[420px] p-[15px] bg-white rounded-[15px] flex-col justify-center items-center gap-1.5 inline-flex">
      <div className="self-stretch overflow-hidden bg-zinc-300 rounded-xl h-[264px] flex-col justify-center items-center gap-8 flex">
        <img className="self-stretch grow shrink basis-0" src={imgSrc} />
      </div>
      <div className="self-stretch h-[58px] py-[15px] flex-col justify-center items-center gap-[5px] flex">
        <div className="self-stretch text-center text-black text-xl font-bold font-['MICEGothic'] leading-7">
          {memo}
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
  );
}
