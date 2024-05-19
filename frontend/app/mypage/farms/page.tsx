"use client";

import { BASE_URL } from "@/utils/ServerApi";
import MiniNavigation from "../component/mini-nav";
import FarmCard from "../component/farm-card";
import { fetchFieldData } from "@/api/farm-field";
import { useEffect, useState } from "react";
import { fetchFarmListType } from "@/type/farm-field";
import React from "react";

export default function MyFarm() {
  let memberId = "";

  if (typeof window !== "undefined") {
    const ls = window.localStorage.getItem("userInfo");
    if (ls) {
      const lsInfo = JSON.parse(ls);
      memberId = lsInfo.state.userInfo.memberId;
    }
  }

  const [fetchFieldDataList, setFetchFieldDataList] =
    useState<fetchFarmListType[]>();

  useEffect(() => {
    fetchFieldData(Number(memberId)).then((res) =>
      setFetchFieldDataList(res.data.fields)
    );
  }, [memberId]);

  return (
    <div>
      <div className="w-full p-[70px] inline-flex flex-col items-center justify-center gap-[115px] relative bg-white">
        <div className="flex flex-col items-center gap-[70px] px-[150px] py-0 relative self-stretch w-full flex-[0_0_auto]">
          <div className="mt-[-1.00px] font-t-h1 font-[number:var(--t-h1-font-weight)] text-green-500 text-[length:var(--t-h1-font-size)] tracking-[var(--t-h1-letter-spacing)] leading-[var(--t-h1-line-height)] relative w-fit whitespace-nowrap [font-style:var(--t-h1-font-style)]">
            마이페이지
          </div>

          <div className="inline-flex items-start justify-center gap-[40px] relative flex-[0_0_auto]">
            {/* 왼쪽 디브 */}

            <MiniNavigation status={"farms"} />
            {/* 오른쪽 디브 */}
            <div className="inline-flex flex-col items-start justify-center gap-[15px] p-[15px] relative flex-[0_0_auto] border !rounded-[10px] border-solid border-graygray-300  w-[920px]">
              {/* 상위 디브 : 위치 안내 및 게시하기 버튼 */}
              <div className="flex w-full h-[40px] items-center justify-between mb-5">
                <div>마이페이지 〉 내 밭 목록</div>
                모달버튼
              </div>
              {/* 카드 리스트 */}

              <div className="w-full flex flex-col gap-[20px] justify-center">
                {fetchFieldDataList?.map((item, idx: number) => (
                  <React.Fragment key={idx}>
                    <FarmCard
                      userId={Number(memberId)}
                      fieldId={item.fieldId}
                      farmName={item.title}
                      startdate={item.startAt}
                      cultivating={false}
                      sensor={item.iot}
                      direction={item.address}
                    />
                  </React.Fragment>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
