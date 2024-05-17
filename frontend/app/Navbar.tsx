"use client";

import { useState, useEffect } from "react";
import { MEMBER_URL } from "@/utils/ServerApi";
import { Disclosure, Menu } from "@headlessui/react";
import { BellIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useUserStore } from "./_stores/userStore";
import Logo from "../public/main/NavLogo3.png";

function classNames(...classes: Array<string>) {
  return classes.filter(Boolean).join(" ");
}

export default function Navbar() {
  const { userInfo, resetAuth, updateToken } = useUserStore();
  const router = useRouter();
  const [navigation, setNavigation] = useState([
    { name: "텃밭꾸미기", href: "/farm-design", current: false },
    { name: "텃밭일기", href: "/farm-diary", current: false },
    // { name: "이웃이야기", href: "/board/neighbor", current: false },
    { name: "기부하기", href: "/donation", current: false },
  ]);

  const handleEvent = (href: string, index: number) => {
    // 텃밭꾸미기할 때 accessToken 없으면
    if (index === 0 && userInfo.accessToken === "") {
      // 경고창 띄우고 들어가지 못하게
      alert("로그인이 필요한 서비스입니다");
      return;
    }

    const newNavigation = navigation.map((item, idx) => ({
      ...item,
      current: idx === index,
    }));
    setNavigation(newNavigation);

    router.push(href);
  };

  const extraPageEvent = (href: string) => {
    const newNavigation = navigation.map((item) => ({
      ...item,
      current: false,
    }));
    setNavigation(newNavigation);
    router.push(`${href}`);
  };

  const handleLogout = async () => {
    const response = await fetch(
      // "http://localhost:8081/api/v1/security/logout",
      `${MEMBER_URL}/v1/security/logout`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${userInfo.accessToken}`,
          "device-id": `${userInfo.deviceId}`,
          // "device-id": "83cb30c3-5e31-4bef-986c-7435576e0e9b",
        },
      }
    );
    if (response) {
      resetAuth();
      router.push("/");
    }
  };

  useEffect(() => {
    const reissueToken = async (accessToken: string, refreshToken: string) => {
      try {
        const response = await fetch(`${MEMBER_URL}/v1/security/token`, {
          cache: "no-store",
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify({
            refresh_token: refreshToken,
            grant_type: "refresh_token",
          }),
        });
        const responseData = await response.json();
        updateToken(
          responseData.data.access_token,
          responseData.data.refresh_token
        );
      } catch (error) {
        // 토큰 재발급 요청이 실패한 경우에 대한 에러 처리
        console.error("토큰 재발급 요청 중 오류가 발생했습니다:", error);
        throw error; // 예외를 다시 throw하여 호출자에게 전파
      }
    };

    // 토큰 유효시간이 10분이기 때문에 8분마다 재요청을 하기로 함
    const SILENT_REFRESH_TIME = 540000;
    const interval = setInterval(async () => {
      // userInfo.accessToken이 공백이 아닌 경우에만 reissueToken 함수 실행
      if (
        userInfo.accessToken &&
        userInfo.refreshToken &&
        userInfo.accessToken.trim() !== "" &&
        userInfo.refreshToken.trim() !== ""
      ) {
        await reissueToken(userInfo.accessToken, userInfo.refreshToken);
      }
    }, SILENT_REFRESH_TIME);
    return () => clearInterval(interval);
  }, [userInfo]);

  return (
    <>
      <div className="border-b bg-white-100 fixed z-10 w-full">
        <Disclosure>
          {() => (
            <>
              <div className="mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div
                      className="flex-shrink-0 w-[86px] h-[55px] text-green-500 font-extrabold text-h4 font-tmoney cursor-pointer relative"
                      onClick={() => {
                        extraPageEvent("/");
                      }}
                    >
                      <Image
                        src={Logo}
                        alt="Logo"
                        className="absolute w-full h-full z-20"
                      />
                    </div>
                    <div className="hidden md:block">
                      <div className="ml-32 flex items-baseline space-x-8">
                        {navigation.map((item, idx) => (
                          <a
                            key={item.name}
                            href={item.href}
                            className={classNames(
                              item.current
                                ? "text-green-400 border-b-2 border-green-400"
                                : "text-black-100 hover:text-green-500",
                              "px-3 py-6 text-h6 font-extrabold font-tmoney"
                            )}
                            aria-current={item.current ? "page" : undefined}
                            onClick={(e) => {
                              e.preventDefault();
                              handleEvent(item.href, idx);
                            }}
                          >
                            {item.name}
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>
                  {/* 로그인 상태일 경우 알람 아이콘과 마이페이지 버튼이 보이도록 한다 */}
                  {userInfo.memberId.length > 0 ? (
                    <>
                      <div className="hidden md:block">
                        <div className="ml-6 flex items-center md:ml-6 space-x-2">
                          {/* <button
                            type="button"
                            className="relative rounded-full p-1"
                            onClick={() => {
                              reissueToken(
                                userInfo.accessToken,
                                userInfo.refreshToken
                              );
                            }}
                          >
                            <span className="absolute -inset-1.5" />
                            <BellIcon className="h-8 w-8" aria-hidden="true" />
                          </button> */}

                          <Menu as="div" className="relative ml-6">
                            <Menu.Button
                              className="relative flex max-w-xs items-center rounded-full"
                              onClick={() => extraPageEvent("/mypage/profile")}
                            >
                              <span className="absolute -inset-1.5" />
                              <Image
                                className="h-8 w-8 rounded-full"
                                src={userInfo.profileImg}
                                alt=""
                                width={100}
                                height={100}
                              />
                            </Menu.Button>
                          </Menu>
                          <a
                            onClick={handleLogout}
                            className="text-green-500 cursor-pointer hover:text-green-400 px-3 py-6 text-h6 font-extrabold font-tmoney"
                          >
                            로그아웃
                          </a>
                        </div>
                      </div>
                    </>
                  ) : (
                    // 로그아웃 상태일 경우 로그인 버튼이 보이도록 한다
                    <>
                      <a
                        href="/login"
                        className="text-green-500 hover:text-green-400 px-3 py-6 text-h6 font-extrabold font-tmoney ml-3"
                      >
                        로그인
                      </a>
                    </>
                  )}
                </div>
              </div>
            </>
          )}
        </Disclosure>
        <header className="bg-white shadow" />
      </div>
    </>
  );
}
