"use client";
// 밭꾸미기 가이드라인 ~ 4단계

import { useUserStore } from "@/app/_stores/userStore";
import GuidlineBox from "./components/guideline/GuidlineBox";
import TotalLayout from "./components/step/TotalLayout";
import { useEffect } from "react";

export default function FarmDesign() {
  const { userInfo } = useUserStore();

  useEffect(() => {
    if (userInfo.accessToken === "") {
    }
  }, []);

  // 임시
  const view: number = 1;

  return (
    <div className=" flex justify-center w-full h-full">
      {/* 처음 딱 들어오면 무조건 가이드라인 */}
      {view === 0 ? <GuidlineBox /> : null}
      {view === 1 ? <TotalLayout /> : null}
    </div>
  );
}
