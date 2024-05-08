import Image from "next/image";
import potato from "../../../public/icons/farms/crops-potato.svg";
import signature from "../../../public/donation/signature.png";

export default function DonationList() {
  const count = 6;
  return (
    <>
      <div className="relative mt-44">
        <div className="text-h2 z-10">모금중인 기부</div>
        <div className="bg-yellow-100 w-[17rem] h-6 rounded-xl absolute top-8 left-0 z-0 opacity-70"></div>
      </div>
      <div className="border border-black-100 border mt-6"></div>
      <div className="my-10 flex justify-between relative">
        <div className="flex justify-between w-[9rem]">
          <div className="stroke-black flex flex-col justify-center">
            <Image src={potato} alt="" width={45} height={45}></Image>
          </div>
          <div className="text-h5 font-semibold flex flex-col justify-center">
            감자
          </div>
        </div>
        <div className="text-h5 flex flex-col justify-center">{count}개</div>
      </div>
      <div className="my-10 flex justify-between">
        <div className="flex justify-between w-[10.5rem] relative">
          <div className="stroke-black flex flex-col justify-center">
            <Image src={potato} alt="" width={45} height={45}></Image>
          </div>
          <div className="relative z-10">
            <div className="text-h5 font-semibold flex flex-col justify-center w-[90px]">
              <div className="flex justify-center text-gray-400">감자</div>
            </div>
            <Image
              className="absolute inset-0 m-auto h-auto w-[90px] min-h-0 -rotate-45"
              src={signature}
              alt=""
              style={{ width: "90px", height: "90px" }} // Specify custom dimensions as inline styles
            ></Image>
          </div>
        </div>
        <div className="text-h5 flex flex-col justify-center text-gray-400">{count}개</div>
      </div>

      <div className="border border-black-100 border"></div>
    </>
  );
}
