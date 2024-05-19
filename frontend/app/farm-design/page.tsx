"use client";

// 밭꾸미기 가이드라인 ~ 4단계

import { useEffect, useState } from "react";
import GuidlineBox from "./components/guideline/GuidlineBox";
import TotalLayout from "./components/step/TotalLayout";
import { useUserStore } from "@/app/_stores/userStore";

export default function FarmDesign() {
  const { userInfo } = useUserStore();
  const [userAccessToken, setUserAccessToken] = useState<string>("");

  useEffect(() => {
    setUserAccessToken(userInfo.accessToken);
  }, []);

  useEffect(() => {
    setUserAccessToken(userInfo.accessToken);
  }, [userInfo.accessToken]);

  // 임시
  const [guideline, setGuideline] = useState<boolean>(false);

  const handleGuidLine = () => {
    setGuideline(!guideline);
  };

  return (
    <div className=" flex justify-center w-full h-full">
      {/* 처음 딱 들어오면 무조건 가이드라인 */}
      {guideline ? (
        <TotalLayout userAccessToken={userAccessToken} />
      ) : (
        <GuidlineBox handleGuideLine={handleGuidLine} guideline={guideline} />
      )}
    </div>
  );
}
