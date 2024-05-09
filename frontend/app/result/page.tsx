"use client";

import { useEffect, useState } from "react";
import { useUserStore } from "../_stores/userStore";

interface CookieStore {
  [key: string]: string;
}

function Result() {
  const saveAuth = useUserStore((state) => state.saveAuth);
  const [cookieValues, setCookieValues] = useState<CookieStore | null>(null);

  useEffect(() => {
    // 클라이언트 사이드에서 쿠키를 가져오는 함수
    const getCookieStore = () => {
      const cookies = document.cookie.split("; ");
      const cookieStore: CookieStore = {};
      cookies.forEach((cookie) => {
        const [name, value] = cookie.split("=");
        cookieStore[name] = decodeURIComponent(value);
      });
      return cookieStore;
    };

    const cookieStore = getCookieStore();
    console.log("cookies", cookieStore);
    setCookieValues(cookieStore);

    const authData = {
      accessToken: cookieStore["access-token"] || "",
      refreshToken: cookieStore["refresh-token"] || "",
      memberId: cookieStore["member-id"] || "",
      profileImg: cookieStore["profile-img"] || "",
      role: cookieStore["role"] || "",
      deviceId: cookieStore["device-id"] || "",
    };

    // saveAuth 함수에 쿠키 정보를 전달하여 실행
    saveAuth(authData);
  }, []);

  return (
    <div>
      {/* 클라이언트 사이드에서 요청한 쿠키 정보를 출력 */}
      {cookieValues &&
        Object.entries(cookieValues).map(([name, value]) => (
          <p key={name}>
            {name}: {value}
          </p>
        ))}{" "}
    </div>
  );
}
export default Result;
