"use client";

import { fetchFieldData } from "@/api/farm-field";
import { fetchFarmListType } from "@/type/farm-field";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Spinner from "../_components/common/Spinner";

export default function Diary() {
  const [isTrue, setIsTrue] = useState<boolean>(true);
  const router = useRouter();
  let memberId = "";

  if (typeof window !== "undefined") {
    const ls = window.localStorage.getItem("userInfo");
    if (ls) {
      const lsInfo = JSON.parse(ls);
      if (lsInfo.state.userInfo.accessToken === "") {
        alert("로그인이 필요한 서비스입니다");
        router.push("/");
      } else {
        memberId = lsInfo.state.userInfo.memberId;
      }
    }
  }

  const fetchDataBoolean = (res: { data: { fields: fetchFarmListType[] } }) => {
    if (res.data.fields && res.data.fields.length > 0) {
      router.push(`/farm-diary/${res.data.fields[0].fieldId}`);
    } else {
      setIsTrue(false);
    }
  };

  useEffect(() => {
    fetchFieldData(Number(memberId)).then((res) => fetchDataBoolean(res));
  }, [memberId]);

  return (
    <>
      <div className="h-full flex items-center justify-center">
        {isTrue ? (
          <>
            <Spinner />
          </>
        ) : (
          <div className="h-full flex flex-col justify-center text-h4">
            등록된 밭이 없습니다. 밭을 등록해주세요
            <div
              className="flex justify-center px-4 border border-green-400 w-[13rem] h-[4rem] rounded-xl mt-6 mx-auto hover:bg-green-400 hover:text-white-100"
              onClick={() => router.push("/farm-enroll")}
            >
              <div className="my-auto">밭 추가하기</div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
