import Button from "@/app/_components/common/Button";
import { Badge } from "@/app/_components/common/Badge";

interface Props {
  imgSrc: string;
  title: string;
  content: string;
  date: string;
  exchanging: boolean;
}

export default function ExchangeCard({
  imgSrc,
  title,
  content,
  date,
  exchanging,
}: Props) {
  return (
    <div className="w-full h-auto px-[37px] py-[35px] bg-white rounded-[20px] border-4 border-green-700 flex-col justify-start items-start gap-2.5 inline-flex">
      <div className="self-stretch justify-between items-center inline-flex">
        <div className="justify-start items-center gap-[19px] flex">
          {/* 사진 */}
          <div className="w-[122px] h-[122px] overflow-hidden bg-zinc-300 rounded-xl bg-clip-border">
            <img
              className="object-cover object-center w-full h-full"
              src={imgSrc}
              alt="nature image"
            />
          </div>
          {/*  */}
          <div className="flex-col justify-center items-start gap-3 inline-flex">
            {/* 제목 및 뱃지 */}
            <div className="self-stretch justify-center items-center gap-3 inline-flex">
              <div className="grow shrink basis-0 text-[length:var(--m-h3-font-size)] leading-10">
                {title}
              </div>
              {exchanging === true ? (
                <Badge
                  variant={"solid"}
                  colorScheme={"green"}
                  className="ml-auto p-5"
                  contentClassName="font-m-h5 leading-5"
                >
                  교환중
                </Badge>
              ) : (
                <Badge
                  variant={"solid"}
                  colorScheme={"orange"}
                  className="ml-auto p-5"
                  contentClassName="font-m-h5 leading-5"
                >
                  교환완료
                </Badge>
              )}
            </div>
            {/* 내용 */}
            <div className="flex gap-[8px] self-stretch text-center text-[length:var(--m-h4-font-size)] leading-loose">
              <p className="text-green-300">원해요! </p> {content}
            </div>
          </div>
        </div>
        <div className="flex-col justify-center items-end gap-[19px] inline-flex">
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
          <div className="w-fit text-center text-gray-400 text-[length:var(--m-h5-font-size)] leading-loose">
            {date} 작성
          </div>
        </div>
      </div>
    </div>
  );
}
