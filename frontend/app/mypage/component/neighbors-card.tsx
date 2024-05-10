import Button from "@/app/_components/common/Button";
import { FaCameraRetro } from "react-icons/fa";

interface Props {
  title: string;
  content: string;
  date: string;
  photo: boolean;
}

export default function NeighborsCard({ title, content, date, photo }: Props) {
  return (
    <div className="w-full h-auto px-[37px] py-[35px] bg-white rounded-[20px] border-4 border-green-700 flex-col justify-start items-start gap-2.5 inline-flex">
      <div className="self-stretch h-[100px] flex-col justify-center items-center gap-5 flex">
        <div className="self-stretch justify-between items-center inline-flex">
          <div className="justify-center items-center gap-[13px] flex">
            <div className="flex gap-[10px] items-center text-[length:var(--m-h3-font-size)]  leading-10">
              {title}
              {photo && <FaCameraRetro size={30} />}
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
        <div className="self-stretch justify-between items-center inline-flex">
          <div className="h-auto text-center text-[length:var(--m-h4-font-size)] leading-loose">
            <p className="text-ellipsis overflow-hidden ...">{content} </p>
          </div>
          <div className="w-fit text-center text-gray-400 text-[length:var(--m-h5-font-size)] leading-loose">
            {date} 작성
          </div>
        </div>
      </div>
    </div>
  );
}
