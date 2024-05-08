import React from "react";
import Image from "next/image";
import { PiMedalFill, PiCertificateFill } from "react-icons/pi";
import { FaHatCowboy } from "react-icons/fa6";

export default function Profile() {
  const userStatusList = ["member", "agency"];
  let userState = "agency";

  return (
    <div className="flex flex-col items-center gap-[90px] relative bg-white">
      {/* 유저 사진 헤더 */}
      <div className="flex flex-col items-start gap-[10px] p-[10px] relative self-stretch w-full flex-[0_0_auto]">
        {/* 밭 디자인 */}
        <Image
          className="w-[880px] h-[378px] mr-[-10.00px] relative object-cover"
          alt="User's Farm-design Image"
          src="/user/ground.jpg"
          width={880}
          height={378}
        />
        {/* 유저 프사 */}
        <div className="inline-flex items-start gap-[10px] absolute top-[295px] left-[360px]">
          <div className="relative w-[180px] h-[185px] bg-[#d9d9d9] rounded-[90px/92.5px]">
            <Image
              src="/user/user.png"
              alt="User Profile Image"
              className="w-full h-full rounded-[90px/92.5px]"
              width={180}
              height={185}
            />
          </div>
        </div>
      </div>

      {/* 유저 정보 */}
      <div className="flex flex-col items-center justify-center gap-[10px] relative self-stretch w-full flex-[0_0_auto]">
        <div className="inline-flex items-center justify-center gap-[10px] py-[19px] px-[10px] relative flex-[0_0_auto]">
          <div className="relative w-fit mt-[-1.00px] font-t-h2 font-[number:var(--t-h2-font-weight)] text-black text-[length:var(--t-h2-font-size)] tracking-[var(--t-h2-letter-spacing)] leading-[var(--t-h2-line-height)] whitespace-nowrap [font-style:var(--t-h2-font-style)]">
            유저 닉네임
          </div>
        </div>
        <div className="w-[300px] justify-center flex items-center relative">
          <div className="flex items-center gap-[10px] flex-[0_0_auto] relative w-full">
            <div className="w-full flex justify-between font-m-h3 tracking-[var(--m-h3-letter-spacing)] [font-style:var(--m-h3-font-style)] text-[length:var(--m-h3-font-size)] text-black font-[number:var(--m-h3-font-weight)] leading-[var(--m-h3-line-height)] w-fit">
              {userState === "member" && (
                <>
                  <div className="flex gap-2">
                    <FaHatCowboy />
                    도시농부
                  </div>
                  <div className="flex gap-2">
                    <PiMedalFill /> 기부횟수
                  </div>
                </>
              )}

              {userState === "agency" && (
                <div className="flex items-center gap-[10px] justify-center text-center">
                  <PiCertificateFill />
                  기관회원
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center gap-[10px] relative self-stretch w-full flex-[0_0_auto]">
        <div className="w-fit mt-[-1.00px] text-[length:var(--m-h4-font-size)] text-gray-400">
          최근 작성한 글
        </div>
        {/* 박스 하나 */}
        <div className="flex flex-col w-[880px] items-center justify-center gap-[20px] p-[20px] relative flex-[0_0_auto] rounded-[10px] overflow-hidden border border-solid border-green-300">
          <div className="flex flex-col w-[673px] h-[206px] items-start justify-center gap-[50px] relative">
            <div className="flex-wrap items-center justify-between gap-[398px_398px] flex relative self-stretch w-full flex-[0_0_auto]">
              <div className="relative w-fit mt-[-1.00px] font-m-h4 font-[number:var(--m-h4-font-weight)] text-black text-[length:var(--m-h4-font-size)] tracking-[var(--m-h4-letter-spacing)] leading-[var(--m-h4-line-height)] whitespace-nowrap [font-style:var(--m-h4-font-style)]">
                카테고리
              </div>
              <div className="relative w-fit mt-[-1.00px] font-m-h4 text-black text-[length:var(--m-h4-font-size)] tracking-[var(--m-h4-letter-spacing)] leading-[var(--m-h4-line-height)] whitespace-nowrap [font-style:var(--m-h4-font-style)]">
                작성일자
              </div>
            </div>
            <div className="flex-col items-start justify-center gap-[21px] flex relative self-stretch w-full flex-[0_0_auto]">
              <div className="w-[105px] mt-[-1.00px] text-[length:var(--m-h2-font-size)] tracking-[var(--m-h2-letter-spacing)] leading-[var(--m-h2-line-height)] relative font-m-h2 font-[number:var(--m-h2-font-weight)] text-black [font-style:var(--m-h2-font-style)]">
                글제목
              </div>
              <p className="w-[467px] text-[length:var(--m-h3-font-size)] tracking-[var(--m-h3-letter-spacing)] leading-[var(--m-h3-line-height)] relative font-m-h3 font-[number:var(--m-h3-font-weight)] text-black [font-style:var(--m-h3-font-style)]">
                글내용 조회 데이터에 있는지?? 없음 잘러
              </p>
            </div>
          </div>
        </div>
        {/* 박스 하나 */}
        <div className="flex flex-col w-[880px] items-center justify-center gap-[20px] p-[20px] relative flex-[0_0_auto] rounded-[10px] overflow-hidden border border-solid border-green-300">
          <div className="flex flex-col w-[673px] h-[206px] items-start justify-center gap-[50px] relative">
            <div className="flex-wrap items-center justify-between gap-[398px_398px] flex relative self-stretch w-full flex-[0_0_auto]">
              <div className="relative w-fit mt-[-1.00px] font-m-h4 font-[number:var(--m-h4-font-weight)] text-black text-[length:var(--m-h4-font-size)] tracking-[var(--m-h4-letter-spacing)] leading-[var(--m-h4-line-height)] whitespace-nowrap [font-style:var(--m-h4-font-style)]">
                카테고리
              </div>
              <div className="relative w-fit mt-[-1.00px] font-m-h4 text-black text-[length:var(--m-h4-font-size)] tracking-[var(--m-h4-letter-spacing)] leading-[var(--m-h4-line-height)] whitespace-nowrap [font-style:var(--m-h4-font-style)]">
                작성일자
              </div>
            </div>
            <div className="flex-col items-start justify-center gap-[21px] flex relative self-stretch w-full flex-[0_0_auto]">
              <div className="w-[105px] mt-[-1.00px] text-[length:var(--m-h2-font-size)] tracking-[var(--m-h2-letter-spacing)] leading-[var(--m-h2-line-height)] relative font-m-h2 font-[number:var(--m-h2-font-weight)] text-black [font-style:var(--m-h2-font-style)]">
                글제목
              </div>
              <p className="w-[467px] text-[length:var(--m-h3-font-size)] tracking-[var(--m-h3-letter-spacing)] leading-[var(--m-h3-line-height)] relative font-m-h3 font-[number:var(--m-h3-font-weight)] text-black [font-style:var(--m-h3-font-style)]">
                글내용 조회 데이터에 있는지?? 없음 잘러
              </p>
            </div>
          </div>
        </div>
        {/* 박스 하나 */}
        <div className="flex flex-col w-[880px] items-center justify-center gap-[20px] p-[20px] relative flex-[0_0_auto] rounded-[10px] overflow-hidden border border-solid border-green-300">
          <div className="flex flex-col w-[673px] h-[206px] items-start justify-center gap-[50px] relative">
            <div className="flex-wrap items-center justify-between gap-[398px_398px] flex relative self-stretch w-full flex-[0_0_auto]">
              <div className="relative w-fit mt-[-1.00px] font-m-h4 font-[number:var(--m-h4-font-weight)] text-black text-[length:var(--m-h4-font-size)] tracking-[var(--m-h4-letter-spacing)] leading-[var(--m-h4-line-height)] whitespace-nowrap [font-style:var(--m-h4-font-style)]">
                카테고리
              </div>
              <div className="relative w-fit mt-[-1.00px] font-m-h4 text-black text-[length:var(--m-h4-font-size)] tracking-[var(--m-h4-letter-spacing)] leading-[var(--m-h4-line-height)] whitespace-nowrap [font-style:var(--m-h4-font-style)]">
                작성일자
              </div>
            </div>
            <div className="flex-col items-start justify-center gap-[21px] flex relative self-stretch w-full flex-[0_0_auto]">
              <div className="w-[105px] mt-[-1.00px] text-[length:var(--m-h2-font-size)] tracking-[var(--m-h2-letter-spacing)] leading-[var(--m-h2-line-height)] relative font-m-h2 font-[number:var(--m-h2-font-weight)] text-black [font-style:var(--m-h2-font-style)]">
                글제목
              </div>
              <p className="w-[467px] text-[length:var(--m-h3-font-size)] tracking-[var(--m-h3-letter-spacing)] leading-[var(--m-h3-line-height)] relative font-m-h3 font-[number:var(--m-h3-font-weight)] text-black [font-style:var(--m-h3-font-style)]">
                글내용 조회 데이터에 있는지?? 없음 잘러
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
