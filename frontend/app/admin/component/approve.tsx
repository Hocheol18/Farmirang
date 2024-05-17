"use client";

import { useState, useEffect } from "react";
import { AGENCY_URL } from "@/utils/ServerApi";
import Modal from "@/app/_components/common/Modal";
import { useUserStore } from "@/app/_stores/userStore";
import Image from "next/image";

interface AgencyData {
  report_number: string;
  id: number;
  name: string;
  address: string;
  approval: boolean;
  contact: string;
  reason: string | null;
  img: string;
}

export default function ApproveAgency({ agencyId }: { agencyId: number }) {
  const { userInfo } = useUserStore();
  const reason = "";
  const [approval, setApproval] = useState<number>(1);
  const [payloadApprove, setPayloadApprove] = useState<boolean>(false);
  const [agencyData, setAgencyData] = useState<AgencyData>();
  const plans = ["승인 허가", "승인 불가"];
  const [selected, setSelected] = useState(plans[0]);

  // 셀렉트 메뉴
  const handleValueChange = (value: any) => {
    setApproval(value);
  };

  // 운영자의 기관신청 상세 조회 로직
  const fetchAgency = async () => {
    const response = await fetch(`${AGENCY_URL}/v1/agency/admin/${agencyId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${userInfo.accessToken}`,
        "Content-Type": "application/json",
      },
    });
    if (response && response.ok) {
      const data = await response.json();
      setAgencyData(data.data);
    }
  };

  // 운영자의 기관신청 승인 로직
  const approveAgency = async () => {
    if (approval === 1) {
      setPayloadApprove(false);
    } else {
      setPayloadApprove(true);
    }
    const requestBody = JSON.stringify({
      agency_id: agencyId,
      approval: payloadApprove,
      reason: reason,
    });

    const response = await fetch(`${AGENCY_URL}/v1/agency/admin`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${userInfo.accessToken}`,
        "Content-Type": "application/json",
      },
      body: requestBody, // JSON 문자열을 전달
    });

    if (response && response.ok) {
      // 승인 후 로직
    }
  };

  useEffect(() => {
    if (userInfo.accessToken.length > 0) {
      fetchAgency();
    }
  }, [userInfo]);
  // console.log(agencyData);
  return (
    <>
      <Modal
        buttonText={"신청 조회"}
        buttonBgStyles={"bg-green-400"}
        buttonTextStyles={"text-font-m5 text-white-100"}
        Title=""
        subTitle=""
        Titlecss={"text-h3 font-extrabold"}
        subTitlecss={"text-base font-bold"}
        Modalcss={"w-[500px]"}
        Titlebottom={<></>}
        next={"승인하기"}
        contents={
          <>
            <div className="text-lg font-semibold mt-10">기관 승인 여부</div>
            {agencyData?.approval !== null ? (
              agencyData?.approval ? (
                <p className="text-green-300">승인완료</p>
              ) : (
                <>
                  <p className="text-red-300">승인거절</p>
                  {agencyData?.reason}
                </>
              )
            ) : (
              <form action="a.jsp">
                성별
                <input type="radio" name="gender" value="female" />
                여성
                <input type="radio" name="gender" value="male" />
                남성
              </form>
            )}

            <div className="text-lg font-semibold mt-10">기관 아이디</div>
            {agencyData?.id}
            <div className="text-lg font-semibold mt-10">기관명</div>
            {agencyData?.name ? agencyData?.name : "미입력"}
            <div className="text-lg font-semibold mt-10">기관 연락처</div>
            {agencyData?.contact ? agencyData?.contact : "미입력"}
            <div className="text-lg font-semibold mt-10">소재지</div>
            {agencyData?.address ? agencyData?.address : "미입력"}
            <div className="text-lg font-semibold mt-10">기관 신고번호</div>
            {agencyData?.report_number ? agencyData?.report_number : "미입력"}
            <div className="text-lg font-semibold mt-10">신고증</div>
            <Image
              src={agencyData?.img || ""}
              width={100}
              height={100}
              alt={"신고증"}
            />
          </>
        }
        onSuccess={approveAgency}
      />
    </>
  );
}
