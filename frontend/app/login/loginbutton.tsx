"use client";

import { MEMBER_URL } from "@/utils/ServerApi";
import Image from "next/image";

export default function LoginButton() {
  const tokenURL = `${MEMBER_URL}/v1/security/oauth2`;
  // const tokenURL = `http://localhost:8081/api/v1/security/oauth2`;

  const kakaoLogin = function () {
    window.location.href = `${tokenURL}/kakao`;
  };
  const googleLogin = function () {
    window.location.href = `${tokenURL}/google`;
  };

  return (
    <div className="inline-flex flex-col h-[101px] items-center justify-center gap-[12px] relative">
      <Image
        src="/user/KAKAO_LOGIN.png"
        alt="kakao Logo"
        className="cursor-pointer"
        onClick={kakaoLogin}
        width={302}
        height={45}
      />{" "}
      <Image
        src="/user/GOOGLE_LOGIN.png"
        alt="Google Logo"
        className="cursor-pointer"
        onClick={googleLogin}
        width={302}
        height={45}
        priority
      />
    </div>
  );
}
