"use client";

import axios, { AxiosHeaders } from "axios";

function LogoutButton({
  accessToken,
  deviceId,
}: {
  accessToken: string | undefined;
  deviceId: string | undefined;
}) {
  // logout
  function handleClick() {
    const logout_url = "http://k10a105.p.ssafy.io:8081/api/v1/security/logout";
    const headers: AxiosHeaders = new AxiosHeaders();
    headers.set("Authorization", accessToken);
    headers.set("Device-id", deviceId); // https 환경에서만 쿠키가 포함됨. 따라서 헤더에 추가
    axios.post(logout_url, {}, { headers }).then((res) => {
      console.log("logout");
      console.log(res);
    });
  }
  return <button onClick={handleClick}>로그아웃</button>;
}

export default LogoutButton;
