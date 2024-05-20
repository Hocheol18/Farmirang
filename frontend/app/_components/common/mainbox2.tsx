"use client";

import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import Image from "next/image";
import Link from "next/link";
import SCARECROW from "@/public/main/scarecrow.png";
import CARROT from "@/public/icons/farms/crops-carrot.svg";
import TRACT from "@/public/main/icons8-tractor-94.png";
import WHEEL from "@/public/main/icons8-wheelbarrow-94.png";
import WELL from "@/public/main/icons8-well-94.png";

export default function Mainbox2() {
  useEffect(() => {
    AOS.init({
      useClassNames: true,
    });
  }, []);

  return (
    <div className="grid grid-cols-3 gap-4 relative z-20 mt-30">
      {/* 첫번째 박스 */}
      <div
        className="flex w-[20rem] mx-auto flex-col gap-10 z-20 relative "
        data-aos="flip-up"
        data-aos-delay="300"
      >
        <Image
          src={CARROT}
          alt="CARROT"
          className="absolute w-24 h-24 rotate-12 left-[-3rem] top-[-2rem] z-20"
        />
        <Link href="/farm-design">
          <div className="rounded-xl w-full h-64 shadow-[0px_8px_20px_#3881404c] p-5 bg-[#FFFFFF] hover:shadow-[0px_20px_35px_#FFA5004c] hover:font-bold">
            <p className="text-green-500 text-2xl">나만의 텃밭</p>
            <div className="p-5 flex flex-col justify-center">
              <Image src={TRACT} alt="TRACT" className="" />
              <p>심을 작물을 추천받고 수확까지 함께해보세요!</p>
            </div>
          </div>
        </Link>
      </div>
      {/* 두번째 박스 */}
      <div
        className="flex w-[20rem] mx-auto flex-col gap-10 z-20"
        data-aos="flip-up"
        data-aos-delay="400"
      >
        <Link href="/donation">
          <div className="rounded-xl w-full h-64 shadow-[0px_8px_20px_#3881404c] p-5 bg-[#FFFFFF] hover:shadow-[0px_20px_35px_#FFA5004c] hover:font-bold">
            <p className="text-green-500 text-2xl">수확 나누기 </p>
            <div className="p-5 flex flex-col justify-center">
              <Image src={WHEEL} alt="WHEEL" className="" />
              <p>대박난 농사! 기쁨을 나눠볼까요?</p>
            </div>
          </div>
        </Link>
      </div>
      {/* 세번째박스 */}
      <div
        className="flex w-[20rem] mx-auto flex-col gap-10 z-20"
        data-aos="flip-up"
        data-aos-delay="500"
      >
        <Image
          src={SCARECROW}
          alt="SCARECROW"
          className="absolute w-24 h-24 rotate-12 right-[-3rem] bottom-[-2rem] z-20"
        />
        <Link href="/login">
          <div className="rounded-xl w-full h-64 shadow-[0px_8px_20px_#3881404c] p-5 bg-[#FFFFFF] hover:shadow-[0px_20px_35px_#FFA5004c] hover:font-bold">
            <p className="text-green-500 text-2xl">함께해요</p>
            <div className="p-5 flex flex-col justify-center">
              <Image src={WELL} alt="WELL" className="" />
              <p>회원가입하고 농사를 시작해보세요</p>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}
