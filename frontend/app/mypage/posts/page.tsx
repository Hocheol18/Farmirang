"use client";

import { useState } from "react";
import MiniNavigation from "../component/mini-nav";
import NeighborsCard from "../component/neighbors-card";
import BoardDesignCard from "../component/board-design-card";
import ExchangeCard from "../component/exchange-card";
import BarterCard from "../component/barter-card";

export default function MyPosts() {
  const categories = ["neighbors", "boardDesign", "exchange", "barter"];
  const [currentSelect, setCurrentSelect] = useState<string>("neighbors");
  // 선택된 카드 컴포넌트를 반환하는 함수
  const renderSelectedCard = () => {
    switch (currentSelect) {
      case "neighbors":
        return (
          <NeighborsCard
            title={"내리갈굼어떻게대처하죠?"}
            content={"grmgrmgrkenajsdnf"}
            date={"2024년 1월 2일"}
            photo={true}
          />
        );
      case "boardDesign":
        return (
          <div className="w-full grid grid-cols-3">
            <div className="flex justify-center">
              <BoardDesignCard
                imgSrc={"/user/farm.jpg"}
                memo={"한줄메모내용이 보여용"}
              />
            </div>
          </div>
        );
      case "exchange":
        return (
          <ExchangeCard
            imgSrc={"/user/farm.jpg"}
            title={"계세요?"}
            content={"시금치"}
            date={"2024년 1월 2일"}
            exchanging={true}
          />
        );
      case "barter":
        return (
          <BarterCard
            imgSrc={"/user/farm.jpg"}
            title={"계세요?"}
            direction={"부천시 원미구"}
            date={"2024년 1월 2일"}
            ing={true}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div>
      <div className="w-full p-[70px] inline-flex flex-col items-center justify-center gap-[115px] relative bg-white">
        <div className="flex flex-col items-center gap-[70px] px-[150px] py-0 relative self-stretch w-full flex-[0_0_auto]">
          <div className="mt-[-1.00px] font-t-h1 font-[number:var(--t-h1-font-weight)] text-green-500 text-[length:var(--t-h1-font-size)] tracking-[var(--t-h1-letter-spacing)] leading-[var(--t-h1-line-height)] relative w-fit whitespace-nowrap [font-style:var(--t-h1-font-style)]">
            마이페이지
          </div>

          <div className="inline-flex items-start justify-center gap-[40px] relative flex-[0_0_auto]">
            {/* 왼쪽 디브 */}

            <MiniNavigation status={"posts"} />
            {/* 오른쪽 디브 */}
            <div className="inline-flex flex-col items-start justify-center gap-[15px] p-[15px] relative flex-[0_0_auto] border !rounded-[10px] border-solid border-graygray-300  w-[920px]">
              {/* 상위 디브 : 위치 안내 및 게시하기 버튼 */}
              <div className="flex w-full h-[40px] items-center justify-between mb-5">
                <div>마이페이지 〉 내가 쓴 글</div>
                <div className="h-10 justify-start items-start inline-flex">
                  {categories.map((category) => (
                    <div
                      key={category}
                      className={`px-4 py-2 flex cursor-pointer text-font-m5 font-[number:var(--t-h1-font-weight)] ${
                        currentSelect === category
                          ? "text-green-500 bg-amber-100 rounded-full"
                          : "text-neutral-600"
                      }`}
                      onClick={() => setCurrentSelect(category)}
                    >
                      {category === "neighbors"
                        ? "이웃소통"
                        : category === "boardDesign"
                        ? "텃밭구경"
                        : category === "exchange"
                        ? "작물교환"
                        : category === "barter"
                        ? "텃밭중개"
                        : category}
                    </div>
                  ))}
                </div>
              </div>
              {/* 카드 리스트 */}
              <div className="w-full flex flex-col gap-[20px] justify-center">
                {renderSelectedCard()}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
