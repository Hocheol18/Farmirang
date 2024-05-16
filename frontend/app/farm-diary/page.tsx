"use client";

import { fetchFieldData } from "@/api/farm-field";
import { fetchFarmListType } from "@/type/farm-field";
import Link from "next/link";
import { useEffect, useState } from "react";
import DiaryPage from "./[diaryid]/page";
import { useRouter } from "next/navigation";

export default function Diary() {
  const [isTrue, setIsTrue] = useState<boolean>(true);
  const router = useRouter()
  let memberId = "";
  const ls = window.localStorage.getItem("userInfo");
  if (ls) {
    const lsInfo = JSON.parse(ls);
    memberId = lsInfo.state.userInfo.memberId;
  }

  const fetchDataBoolean = (res: { data: { fields: fetchFarmListType[] } }) => {
    if (res.data.fields) {
      setIsTrue(true);
      router.push(`/farm-diary/${res.data.fields[0].fieldId}`)
    } else {
      setIsTrue(false);
    }
  };

  useEffect(() => {
    fetchFieldData(Number(memberId)).then((res) => fetchDataBoolean(res));
  }, [memberId]);


  return (
    <>
      {isTrue ? (
        <>
          <div className="h-full my-auto">
            
          </div>
        </>
      ) : null}
    </>
  );
}
