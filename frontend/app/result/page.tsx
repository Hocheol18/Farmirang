"use client";
import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";
// import { cookies } from "next/headers";
import LogoutButton from "./logoutButton";
import { useUserStore, UserStore } from "../_stores/userStore";

// function Result() {
//   const cookie_list = [
//     "access-token",
//     "refresh-token",
//     "expires-in",
//     "refresh-expires-in",
//     "token-type",
//     "member-id",
//     "nickname",
//     "profile-img",
//     "role",
//     "device-id",
//   ];
//   const cookieStore = cookies();
//   console.log("cookies");
//   console.log(cookieStore);

//   const userInfo = useUserStore((state) => state.userInfo);
//   console.log(userInfo);

//   const saveAuth = useUserStore((state) => state.saveAuth);

//   return (
//     <div>
//       <LogoutButton
//         accessToken={`Bearer ${cookieStore.get("access-token")?.value}`}
//         deviceId={cookieStore.get("device-id")?.value}
//       />
//       {cookieStore.getAll().map((cookie) => (
//         <p key={cookie.name}>
//           {cookie.name}: {cookie.value}
//         </p>
//       ))}
//     </div>
//   );
// }

function Result() {
  // 클라이언트 사이드에서 쿠키를 가져오는 함수
  const getCookieStore = () => {
    const cookies = document.cookie.split("; ");
    const cookieStore = {};
    cookies.forEach((cookie) => {
      const [name, value] = cookie.split("=");
      cookieStore[name] = decodeURIComponent(value);
    });
    return cookieStore;
  };

  // 클라이언트 사이드에서 쿠키 정보 가져오기
  const cookieStore = getCookieStore();
  console.log("cookies", cookieStore);

  const userInfo = useUserStore((state) => state.userInfo);
  console.log(userInfo);

  const saveAuth = useUserStore((state) => state.saveAuth);

  return (
    <div>
      <LogoutButton
        accessToken={`Bearer ${cookieStore["access-token"]}`}
        deviceId={cookieStore["device-id"]}
      />
      {/* 클라이언트 사이드에서 요청한 쿠키 정보를 출력 */}
      {Object.entries(cookieStore).map(([name, value]) => (
        <p key={name}>
          {name}: {value}
        </p>
      ))}
    </div>
  );
}
export default Result;
