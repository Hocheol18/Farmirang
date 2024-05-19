"use client";

import { CiCalendar, CiCircleList, CiSearch } from "react-icons/ci";
import { GoPlus } from "react-icons/go";
import { RiFileList3Line } from "react-icons/ri";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { deleteFieldData, fetchFieldData } from "@/api/farm-field";
import { fetchFarmListType } from "@/type/farm-field";
import { CiTrash } from "react-icons/ci";
import Spinner from "@/app/_components/common/Spinner";

export default function CalendarSideBar() {
  const [fetchFarmList, setFetchFarmList] = useState<fetchFarmListType[]>();
  const [isTrue, setIsTrue] = useState<boolean>(true);

  // localStorage에서 accessToken 받는 방법
  let memberId = "";
  if (typeof window !== "undefined") {
    const ls = window.localStorage.getItem("userInfo");
    if (ls) {
      const lsInfo = JSON.parse(ls);
      memberId = lsInfo.state.userInfo.memberId;
    }
  }

  const func = (res: { data: { fields: fetchFarmListType[] } }) => {
    setFetchFarmList(res.data.fields), setIsTrue(false);
  };

  const fetchData = async () => {
    fetchFieldData(Number(memberId)).then(
      (res: { data: { fields: fetchFarmListType[] } }) => func(res)
    );
  };

  const router = useRouter();
  const { diaryid } = useParams<{ diaryid: string }>() as { diaryid: string };

  const navigation = [
    {
      name: "달력",
      current: true,
      icon: <CiCalendar className="h-10 w-10" />,
    },
    {
      name: "일지",
      current: false,
      icon: <CiCircleList className="h-10 w-10" />,
    },
  ];

  function classNames(...classes: Array<string>) {
    return classes.filter(Boolean).join(" ");
  }

  useEffect(() => {
    fetchData();
  }, []);

  const deleteFunction = async (userId: number, fieldId: number) => {
    const result = await deleteFieldData(userId, fieldId);
    if (result?.success) {
      alert("삭제 성공");
      router.push("/farm-diary");
    } else {
      alert("삭제 실패. 다시 시도해주세요");
    }
  };

  return (
    <>
      {isTrue ? (
        <Spinner />
      ) : (
        <div className="flex flex-col justify-between mt-10 h-full">
          <div className="flex flex-col gap-1 p-2 text-base">
            {navigation.map((item, idx) => (
              <div key={idx}>
                <div className="relative block w-full">
                  <div className="flex items-center w-full p-0 leading-tight transition-all rounded-lg outline-none">
                    <div className="flex items-center justify-between w-full p-3 antialiased font-semibold leading-snug text-left">
                      <div className="grid mr-4 place-items-center">
                        {item.icon}
                      </div>
                      <div
                        className={classNames(
                          item.current
                            ? "block mr-auto text-h5 antialiased leading-relaxed text-balck-100 cursor-pointer"
                            : "block mr-auto text-h5 antialiased leading-relaxed text-gray-300"
                        )}
                        onClick={() => {
                          item.current ? router.push(`${diaryid}`) : null;
                        }}
                      >
                        {item.name}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            <hr className="my-4 border-gray-400" />
            <div className="flex items-center w-full p-3 leading-tight transition-all">
              <div className="grid mr-4 place-items-center">
                <RiFileList3Line className="h-8 w-8" />
              </div>
              <span className="font-extrabold text-h6">밭 목록</span>
              <div className="grid ml-auto place-items-center justify-self-end">
                <div className="relative grid items-center py-1rounded-full select-none whitespace-nowrap">
                  <GoPlus
                    className="h-8 w-8 cursor-pointer"
                    onClick={() => {
                      router.push("/farm-enroll");
                    }}
                  />
                </div>
              </div>
            </div>

            {fetchFarmList?.map((item, idx) => (
              <div key={idx} className="flex w-full p-4 justify-between">
                <div className="flex">
                  <div className="grid mr-4">
                    <CiSearch className="w-8 h-8" />
                  </div>
                  {item.fieldId === Number(diaryid) ? (
                    <div className="font-extrabold text-base place-content-center">
                      {item.title}
                    </div>
                  ) : (
                    <div className="font-bold text-base place-content-center cursor-pointer">
                      {item.title}
                    </div>
                  )}
                </div>
                <CiTrash
                  className="h-7 w-7 cursor-pointer my-auto"
                  onClick={() => {
                    deleteFunction(Number(memberId), item.fieldId);
                  }}
                />
              </div>
            ))}
          </div>
          {/* 추후 추가 예정 (센서 구매 페이지) */}
          {/* <div className="flex place-content-center cursor-pointer">
        <Modal
          Titlebottom={""}
          subTitlecss={"text-base font-bold"}
          Titlecss={"text-h3 font-extrabold"}
          buttonText={"센서 추가"}
          buttonBgStyles={
            "border-2 rounded-xl w-[220px] bg-green-400 h-[60px] place-content-center"
          }
          buttonTextStyles={
            "flex place-content-center text-white-100 text-l font-bold"
          }
          Title="센서 구매"
          subTitle="밭에 심을 센서를 구매하는 폼입니다"
          Modalcss="w-[30rem]"
          contents={
            <>
              <Input
                name=""
                labelcss={"text-lg font-semibold"}
                inputcss={
                  "flex rounded-lg border border-green-300 w-full focus:outline-none focus:ring-green-400 focus:ring-1 h-10 p-2"
                }
                placeholder={"구매할 센서의 갯수를 적어주세요"}
                type={"number"}
                value={undefined}
                topcss={"mt-10"}
                labeltext={"센서갯수"}
                onChange={() => {}}
              />

              <div className="block flex justify-between mt-10">
                <div className="font-bold text-h6 my-auto">주소 등록</div>
                <DaumPost setAddressObj={setAddressObj} />
              </div>

              <div className="mt-2">
                <input
                  value={addressObj.areaAddress}
                  onChange={() => {}}
                  className="flex rounded-lg border border-green-300 w-full focus:outline-none focus:ring-green-400 focus:ring-1 h-10 p-2"
                  placeholder="주소 찾기를 눌러주세요"
                />
              </div>
              <div className="mt-4">
                <input
                  value={addressObj.townAddress}
                  onChange={() => {}}
                  className="flex rounded-lg border border-green-300 w-full focus:outline-none focus:ring-green-400 focus:ring-1 h-10 p-2"
                  placeholder="주소 찾기를 눌러주세요"
                />
              </div>
              <div className="mt-4">
                <input
                  type="text"
                  onChange={() => {}}
                  className="flex rounded-lg border border-green-300 w-full focus:outline-none focus:ring-green-400 focus:ring-1 h-10 p-2"
                  placeholder="상세 주소를 입력해주세요"
                />
              </div>

              <div className="mt-14">
                <div className="text-lg font-semibold">총 가격</div>

                <div className="relative mt-2">
                  <div className="flex rounded-lg border border-gray-300">
                    <input
                      disabled
                      className={`h-10 rounded-lg focus:outline-none w-full focus:ring-green-400 focus:ring-1 ml-2 h-10`}
                      value={totalPrice}
                    />
                  </div>
                </div>
              </div>
            </>
          }
          next={"확인"}
        />
      </div> */}
        </div>
      )}
    </>
  );
}
