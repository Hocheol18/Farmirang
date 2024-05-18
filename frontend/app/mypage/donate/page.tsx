"use client";

import { useEffect, useState } from "react";
import {
  fetchDonationDataType,
  fetchDonorPersonListDataType,
} from "@/type/farm-donation";
import {
  fetchDonationDataWithCompony,
  fetchDonorData,
} from "@/api/farm-donation";
import MiniNavigation from "../component/mini-nav";
import FarmUserDonor from "../component/farm-userdonor";
import Spinner from "@/app/_components/common/Spinner";

export default function Page() {
  const [isTrue, setIsTrue] = useState<boolean>(true);
  // localStorage에서 memberId 받는 방법
  let memberId = 0;

  if (typeof window !== "undefined") {
    const ls = window.localStorage.getItem("userInfo");
    if (ls) {
      const lsInfo = JSON.parse(ls);
      memberId = lsInfo.state.userInfo.memberId;
    }
  }

  const [fetchDonationList, setFetchDonationList] =
    useState<fetchDonorPersonListDataType[]>();
  const [fetchWholeList, setFetchWholeList] =
    useState<fetchDonationDataType[]>();

  useEffect(() => {
    const fetchDonorPerson = async () => {
      const res = await fetchDonationDataWithCompony({
        cursor: 0,
        size: 30,
        user: Number(memberId),
      });
      const fetchData = await Promise.all(
        res.data.posts.map((item) => fetchDonorData(item.id))
      );
      const filteredPosts = res.data.posts.filter(
        (post, index) => fetchData[index].data.donors.length >= 1
      );
      const filteredData = fetchData.filter(
        (donorData) => donorData.data.donors.length >= 1
      );
      setFetchDonationList(filteredData);
      setFetchWholeList(filteredPosts);
      setIsTrue(false);
    };
    fetchDonorPerson();
  }, []);

  return (
    <>
      {isTrue ? (
        <Spinner />
      ) : (
        <div>
          <div className="w-full p-[70px] inline-flex flex-col items-center justify-center gap-[115px] relative bg-white">
            <div className="flex flex-col items-center gap-[70px] px-[150px] py-0 relative self-stretch w-full flex-[0_0_auto]">
              <div className="mt-[-1.00px] font-t-h1 font-[number:var(--t-h1-font-weight)] text-green-500 text-[length:var(--t-h1-font-size)] tracking-[var(--t-h1-letter-spacing)] leading-[var(--t-h1-line-height)] relative w-fit whitespace-nowrap [font-style:var(--t-h1-font-style)]">
                마이페이지
              </div>

              <div className="inline-flex items-start justify-center gap-[40px] relative flex-[0_0_auto]">
                {/* 왼쪽 디브 */}

                <MiniNavigation status={"approve"} />
                {/* 오른쪽 디브 */}
                <div className="inline-flex flex-col items-start justify-center gap-[15px] p-[15px] relative flex-[0_0_auto] border !rounded-[10px] border-solid border-graygray-300  w-[920px]">
                  {/* 상위 디브 : 위치 안내 및 게시하기 버튼 */}
                  <div className="flex w-full h-[40px] items-center justify-between mb-5">
                    <div>마이페이지 〉 기부 신청 현황</div>
                    <div className="h-10 justify-start items-start inline-flex"></div>
                  </div>
                  <div className="text-h3 font-bold">
                    총 후원 목록 {fetchWholeList?.length}개
                  </div>
                  {/* 카드 리스트 */}
                  <div className="w-full flex flex-col gap-[20px] justify-center">
                    {fetchWholeList && fetchDonationList
                      ? fetchWholeList.map((item, idx: number) => (
                          <div className="" key={idx}>
                            <FarmUserDonor
                              donationImage={item.header_img}
                              fieldId={item.id}
                              farmName={item.title}
                              date={item.end_date.slice(0, 10)}
                            />
                          </div>
                        ))
                      : null}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
