import Image from "next/image";
import potato from "../../../public/icons/farms/crops-potato.svg";

export default function Participate() {
  const count = 30;
  const number = 25;
  return (
    <>
      <div className="relative mt-44">
        <div className="text-h2 z-10">{number} 명이 참가했어요</div>
        <div className="bg-green-200 w-[21rem] h-6 rounded-xl absolute top-8 left-0 z-[-1] opacity-70"></div>
      </div>
      <div className="border border-black-100 border mt-6"></div>
      <div className="flex justify-center">
        <div className="flex flex-wrap content-start">
          <div className="mx-[3.2rem] my-[2rem] border border-green-400 rounded-[10rem] w-[96px] h-[96px] shrink-0"></div>
          <div className="mx-[3.2rem] my-[2rem] border border-green-400 rounded-[10rem] w-[96px] h-[96px] shrink-0"></div>
          <div className="mx-[3.2rem] my-[2rem] border border-green-400 rounded-[10rem] w-[96px] h-[96px] shrink-0"></div>
          <div className="mx-[3.2rem] my-[2rem] border border-green-400 rounded-[10rem] w-[96px] h-[96px] shrink-0"></div>
          <div className="mx-[3.2rem] my-[2rem] border border-green-400 rounded-[10rem] w-[96px] h-[96px] shrink-0"></div>
          <div className="mx-[3.2rem] my-[2rem] border border-green-400 rounded-[10rem] w-[96px] h-[96px] shrink-0"></div>
          <div className="mx-[3.2rem] my-[2rem] border border-green-400 rounded-[10rem] w-[96px] h-[96px] shrink-0"></div>
        </div>
      </div>
      <div className="border border-black-100 border"></div>
      <div className="flex justify-between p-6">
        <div className="w-1/3 flex gap-[2rem]">
          <div className="border border-black-100 w-[50px] h-[50px] rounded-[10rem]"></div>
          <div className="flex flex-col justify-center">
            <div className="text-h4">기부왕병창</div>
          </div>
        </div>
        <div className="w-1/3 flex justify-end gap-[2rem]">
          <div className="stroke-black flex flex-col justify-center">
            <Image src={potato} alt="" width={45} height={45}></Image>
          </div>
          <div className="">
            <div className="text-h4">{count}개</div>
          </div>
        </div>
      </div>
      <div className="flex justify-between p-6">
        <div className="w-1/3 flex gap-[2rem]">
          <div className="border border-black-100 w-[50px] h-[50px] rounded-[10rem]"></div>
          <div className="flex flex-col justify-center">
            <div className="text-h4">기부왕병창</div>
          </div>
        </div>
        <div className="w-1/3 flex justify-end gap-[2rem]">
          <div className="stroke-black flex flex-col justify-center">
            <Image src={potato} alt="" width={45} height={45}></Image>
          </div>
          <div className="">
            <div className="text-h4">{count}개</div>
          </div>
        </div>
      </div>
      <div className="border border-black-100 border"></div>
    </>
  );
}
