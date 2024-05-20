"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AGENCY_URL } from "@/utils/ServerApi";
import { useUserStore } from "@/app/_stores/userStore";
import MiniNavigation from "../component/mini-nav";

interface agencyType {
  id: number;
  name: string | null;
  approval: boolean | null;
}

export default function MyPage() {
  const { userInfo } = useUserStore();
  const [agencyData, setAgencyData] = useState<agencyType[]>([]);

  useEffect(() => {
    const fetchAgencyData = async () => {
      try {
        if (userInfo) {
          const response = await fetch(`${AGENCY_URL}/v1/agency/admin`, {
            headers: {
              Authorization: `Bearer ${userInfo.accessToken}`,
              "Content-Type": "application/json",
            },
          });
          if (response.ok) {
            const data = await response.json();
            setAgencyData(data.data.agencies);
          }
        }
      } catch (error) {
        console.error("Error fetching agency data:", error);
      }
    };
    fetchAgencyData();
  }, [userInfo]);

  return (
    <div>
      <div className="w-full p-[70px] inline-flex flex-col items-center justify-center gap-[115px] relative bg-white">
        <div className="flex flex-col items-center gap-[70px] px-[150px] py-0 relative self-stretch w-full flex-[0_0_auto]">
          <div className="mt-[-1.00px] font-t-h1 font-[number:var(--t-h1-font-weight)] text-green-500 text-[length:var(--t-h1-font-size)] tracking-[var(--t-h1-letter-spacing)] leading-[var(--t-h1-line-height)] relative w-fit whitespace-nowrap [font-style:var(--t-h1-font-style)]">
            관리자페이지
          </div>

          <div className="inline-flex items-start justify-center gap-[40px] relative flex-[0_0_auto]">
            {/* 왼쪽 디브 */}

            <MiniNavigation status={"profile"} />
            {/* 오른쪽 디브 */}
            <div className="inline-flex flex-col items-start justify-center gap-[15px] p-[15px] relative flex-[0_0_auto] border !rounded-[10px] border-solid border-graygray-300  w-[920px]">
              {/* 상위 디브 : 위치 안내 및 게시하기 버튼 */}
              <div className="flex w-full h-[40px] items-center justify-between mb-5">
                <div>관리자페이지 〉 유저 권한 변경</div>
              </div>
              {/* 프로필 리스트 */}
              <div className="justify-center mx-auto">
                <ul>
                  {agencyData.map((data) => (
                    <li key={data.id}>
                      <Link href={`/admin/role-list/${data.id}`}>
                        <div className="flex gap-[10px]">
                          <p className="text-green-300">접수 아이디:</p>
                          {data.id}
                          <p className="text-green-300">기관명:</p>
                          {data.name ? data.name : "미입력"}
                          <p className="text-green-300">승인여부:</p>
                          {data.approval ? "승인" : "미승인"}
                        </div>
                      </Link>
                      -
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
