"use client";

import { useEffect, useState } from "react";
import {
  fetchDonationDataType,
  fetchDonationListDataType,
  fetchDonorPersonListDataType,
} from "@/type/farm-donation";
import {
  fetchDonationData,
  fetchDonationDataWithCompony,
  fetchDonationDetailData,
  fetchDonationListData,
  fetchDonorData,
} from "@/api/farm-donation";
import MiniNavigation from "../component/mini-nav";
import FarmUserDonor from "../component/farm-userdonor";
import Spinner from "@/app/_components/common/Spinner";

interface ContentData {
  member_id: number;
  header_img: string;
  main_img: string;
  start_date: string;
  end_date: string;
  delivery_address: string;
  register_date: string;
  id: number;
  title: string;
  content: string;
  state: string;
  progress: number;
  summary: string;
  items: any[];
}

interface Donor {
  board_id: number;
  member_id: number;
  crop_id: number;
  register_date: string;
  confirm_img: string;
  id: number;
  amount: number;
  approval: boolean | null;
}

interface FetchDonationListDataType {
  data: {
    board_id: number;
    donors: Donor[];
    cursor: number;
  };
  status: string;
  message: string;
}

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
  const [fetchWholeList, setFetchWholeList] = useState<any[]>();

  useEffect(() => {
    const fetchDonorPerson = async () => {
      const res = await fetchDonationData({ cursor: 0, size: 20, user: null });

      const resFetchData = await Promise.all(
        res.data.posts.map((item) => fetchDonationListData(item.id))
      );

      const consolidatedDonors = resFetchData.reduce(
        (acc: { [key: number]: Donor[] }, board) => {
          const donors = board.data.donors || [];
          donors.forEach((donor) => {
            if (!acc[donor.board_id]) {
              acc[donor.board_id] = [];
            }
            if (
              !acc[donor.board_id].some(
                (existingDonor) => existingDonor.member_id === donor.member_id
              )
            ) {
              acc[donor.board_id].push(donor);
            }
          });
          return acc;
        },
        {}
      );
      const filteredDonors = Object.values(consolidatedDonors).flat();
      const filterPlease = filteredDonors.filter(
        (res) => res.member_id === Number(memberId)
      );
      const fetchDataPromises = filterPlease.map((donor) =>
        fetchDonationDetailData(donor.board_id)
      );

      const fetchDataPlease = await Promise.all(fetchDataPromises);

      setFetchWholeList(fetchDataPlease);

      setIsTrue(false);
    };
    fetchDonorPerson();
  }, [memberId]);

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
                    {fetchWholeList
                      ? fetchWholeList.map((item, idx: number) => (
                          <div className="" key={idx}>
                            <FarmUserDonor
                              memberId={Number(memberId)}
                              donationImage={item.data.header_img}
                              fieldId={item.data.id}
                              farmName={item.data.title}
                              date={item.data.end_date.slice(0, 10)}
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
