"use client";

import { DESIGN_URL } from "@/utils/ServerApi";
import Button from "@/app/_components/common/Button";
import Modal from "@/app/_components/common/Modal";
import DesignUpload from "@/app/board/component/design-upload";
import MiniNavigation from "../component/mini-nav";
import DesignCard from "../component/design-card";

export default function MyFarmDesign() {
  return (
    <div>
      <div className="w-full p-[70px] inline-flex flex-col items-center justify-center gap-[115px] relative bg-white">
        <div className="flex flex-col items-center gap-[70px] px-[150px] py-0 relative self-stretch w-full flex-[0_0_auto]">
          <div className="mt-[-1.00px] font-t-h1 font-[number:var(--t-h1-font-weight)] text-green-500 text-[length:var(--t-h1-font-size)] tracking-[var(--t-h1-letter-spacing)] leading-[var(--t-h1-line-height)] relative w-fit whitespace-nowrap [font-style:var(--t-h1-font-style)]">
            마이페이지
          </div>

          <div className="inline-flex items-start justify-center gap-[40px] relative flex-[0_0_auto]">
            {/* 왼쪽 디브 */}

            <MiniNavigation status={"farm-designs"} />
            {/* 오른쪽 디브 */}
            <div className="inline-flex flex-col items-start justify-center gap-[15px] p-[15px] relative flex-[0_0_auto] border !rounded-[10px] border-solid border-graygray-300  w-[920px]">
              {/* 상위 디브 : 위치 안내 및 게시하기 버튼 */}
              <div className="flex w-full h-[40px] items-center justify-between mb-5">
                <div>마이페이지 〉 내 꾸미기 목록</div>
                <Modal
                  buttonText={"게시하기"}
                  buttonBgStyles={"bg-green-300"}
                  buttonTextStyles={"text-font-m5 text-white-100"}
                  Title="새로운 구경글 생성하기"
                  subTitle=""
                  Titlecss={"text-h3 font-extrabold"}
                  subTitlecss={"text-base font-bold"}
                  Modalcss={"w-[500px]"}
                  Titlebottom={
                    <div className="bg-green-200 w-[22rem] h-6 rounded-xl absolute top-11 left-6 z-[-1] opacity-70" />
                  }
                  next={"저장"}
                  contents={<DesignUpload />}
                />
              </div>
              {/* 카드 리스트 */}
              <div className="w-full grid grid-cols-3">
                <div className="flex justify-center">
                  <DesignCard
                    imgSrc="https://images.unsplash.com/photo-1540553016722-983e48a2cd10?ixlib=rb-1.2.1&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=800&amp;q=80"
                    farmName="가짜밭"
                    date="2024년 1월 2일"
                  />
                </div>
                <div className="flex justify-center">
                  <DesignCard
                    imgSrc="https://images.unsplash.com/photo-1540553016722-983e48a2cd10?ixlib=rb-1.2.1&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=800&amp;q=80"
                    farmName="엄마밭"
                    date="2024년 1월 2일"
                  />
                </div>
                <div className="flex justify-center">
                  <DesignCard
                    imgSrc="https://images.unsplash.com/photo-1540553016722-983e48a2cd10?ixlib=rb-1.2.1&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=800&amp;q=80"
                    farmName="아빠밭"
                    date="2024년 1월 2일"
                  />
                </div>
                <div className="flex justify-center">
                  <DesignCard
                    imgSrc="https://images.unsplash.com/photo-1540553016722-983e48a2cd10?ixlib=rb-1.2.1&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=800&amp;q=80"
                    farmName="아가밭"
                    date="2024년 1월 2일"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
