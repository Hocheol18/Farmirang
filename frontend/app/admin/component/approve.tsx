"use client";

import { useState, useEffect } from "react";
import { AGENCY_URL } from "@/utils/ServerApi";
import Input from "@/app/_components/common/Input";
import Modal from "@/app/_components/common/Modal";
import { useUserStore } from "@/app/_stores/userStore";

interface Props {
  areaAddress: string;
  townAddress: string;
}

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

export default function ApproveAgency() {
  const { userInfo } = useUserStore();
  const [approval, setApproval] = useState<boolean>(false);
  const [agencyData, setAgencyData] = useState<AgencyData>();
  const [selectImage, setSelectImage] = useState<any>();
  const [name, setName] = useState<string>("");
  const [detailedAddress, setDetailedAddress] = useState<string>("");
  const [report, setReport] = useState<string>("");
  const [contact, setContact] = useState<string>("");
  const [addressObj, setAddressObj] = useState<Props>({
    areaAddress: "",
    townAddress: "",
  });
  const address = `${addressObj.areaAddress} ${addressObj.townAddress} ${detailedAddress}`;

  // 기관등록 조회 로직
  const fetchAgency = async () => {
    const response = await fetch(`${AGENCY_URL}/v1/agency/registration`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${userInfo.accessToken}`,
        "Content-Type": "application/json",
      },
    });
    if (response && response.ok) {
      const data = await response.json();
      console.log(data);
      setAgencyData(data.data);
      setApproval(true);
    }
  };

  // 기관등록 신청 로직
  const postAgency = async (
    name: string,
    address: string,
    report: string,
    contact: string
  ) => {
    const formData = new FormData();
    const test = {
      name,
      address,
      report,
      contact,
    };
    formData.append(
      "data",
      new File([JSON.stringify(test)], "data.json", {
        type: "application/json",
      })
    );
    formData.append("img", selectImage);

    try {
      const response = await fetch(`${AGENCY_URL}/v1/agency/registration`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${userInfo.accessToken}`,
        },
        body: formData,
      });

      if (response.ok) {
        const responseData = await response.json();
        setApproval(true);
      }
    } catch (error) {
      console.error("API 요청 실패:", error);
    }
  };

  // 기관등록 삭제 로직
  const deleteAgency = async (agencyId: number) => {
    const response = await fetch(
      `${AGENCY_URL}/v1/agency/registration?id=${agencyId}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${userInfo.accessToken}`,
        },
      }
    );
    if (response.ok) {
      setApproval(false);
    }
  };

  useEffect(() => {
    if (userInfo) {
      fetchAgency();
    }
  }, [userInfo, approval]);

  return (
    <>
      {approval === true ? (
        <Modal
          buttonText={"회원자격 조회"}
          buttonBgStyles={"bg-green-400"}
          buttonTextStyles={"text-font-m5 text-white-100"}
          Title="기관 회원 전환 신청 조회"
          subTitle="기관 회원을 신청한 내역입니다."
          Titlecss={"text-h3 font-extrabold"}
          subTitlecss={"text-base font-bold"}
          Modalcss={"w-[500px]"}
          Titlebottom={
            <div className="bg-green-200 w-[18rem] h-6 rounded-xl absolute top-11 left-6 z-[-1] opacity-70" />
          }
          next={agencyData?.approval === null ? "확인" : "재신청하기"}
          contents={
            <>
              <div className="text-lg font-semibold mt-10">기관 승인 여부</div>
              {agencyData?.approval === null ? (
                <p>승인 대기중입니다</p>
              ) : agencyData?.reason === null ? (
                <p>기관 신청 승인 완료</p>
              ) : (
                <p>승인이 거절되었습니다. 사유: {agencyData?.reason}</p>
              )}

              <div className="text-lg font-semibold mt-10">기관 아이디</div>
              {agencyData?.id}
              <div className="text-lg font-semibold mt-10">기관명</div>
              {agencyData?.name}
              <div className="text-lg font-semibold mt-10">기관 연락처</div>
              {agencyData?.contact}
              <div className="text-lg font-semibold mt-10">기관 신고번호</div>
              {agencyData?.report_number}
            </>
          }
          onSuccess={
            agencyData?.approval === null
              ? () => {} // 승인 대기중이면 빈 함수 전달
              : () => deleteAgency(agencyData?.id ?? 0)
          }
        />
      ) : (
        <Modal
          buttonText={"회원자격 변경신청"}
          buttonBgStyles={"bg-green-300"}
          buttonTextStyles={"text-font-m5 text-white-100"}
          Title="기관 회원 전환 신청"
          subTitle="후원 요청을 위한 기관회원 전환 신청서입니다."
          Titlecss={"text-h3 font-extrabold"}
          subTitlecss={"text-base font-bold"}
          Modalcss={"w-[500px]"}
          Titlebottom={
            <div className="bg-green-200 w-[18rem] h-6 rounded-xl absolute top-11 left-6 z-[-1] opacity-70" />
          }
          next={"확인"}
          contents={
            <>
              <Input
                labelcss={"text-lg font-semibold"}
                inputcss={
                  "flex rounded-lg border border-green-300 w-full focus:outline-none focus:ring-green-400 focus:ring-1 h-10 p-2"
                }
                placeholder={"기관 또는 단체의 공식 명칭을 입력하세요."}
                type={"string"}
                value={name}
                topcss={"mt-10"}
                labeltext={"시설명"}
                onChange={(value) => setName(value)}
              />

              <Input
                labelcss={"text-lg font-semibold"}
                inputcss={
                  "flex rounded-lg border border-green-300 w-full focus:outline-none focus:ring-green-400 focus:ring-1 h-10 p-2"
                }
                placeholder={"복지시설 신고번호를 입력하세요."}
                type={"string"}
                value={report}
                topcss={"mt-10"}
                labeltext={"복지시설신고번호"}
                onChange={(e) => setReport(e)}
              />
              <Input
                labelcss={"text-lg font-semibold"}
                inputcss={
                  "flex rounded-lg border border-green-300 w-full focus:outline-none focus:ring-green-400 focus:ring-1 h-10 p-2"
                }
                placeholder={"연락 가능한 전화번호를 입력하세요."}
                type={"string"}
                value={contact}
                topcss={"mt-10"}
                labeltext={"전화번호"}
                onChange={(e) => setContact(e)}
              />
            </>
          }
          onSuccess={() => postAgency(name, address, report, contact)}
        />
      )}
    </>
  );
}
