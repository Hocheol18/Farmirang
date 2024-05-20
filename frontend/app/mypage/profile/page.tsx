"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { MEMBER_URL } from "@/utils/ServerApi";
import { useUserStore } from "@/app/_stores/userStore";
import MiniNavigation from "../component/mini-nav";
import MypageModal from "@/app/_components/common/MypageModal";
import ProfileCSR from "../component/profile-csr";
import ChangeRole from "../component/change-role";

// 프로필 데이터를 나타내는 인터페이스
interface ProfileType {
  profile_img: string;
  nickname: string;
  role: string;
  badge: number;
}

export default function MyPage() {
  const { userInfo, resetAuth } = useUserStore();
  const router = useRouter();
  const [profileData, setProfileData] = useState<ProfileType>();
  const [userImage, setUserimage] = useState<string>("/user/user.png");

  // localStorage에서 accessToken 받는 방법
  let accessToken = "";
  let memberId = "";
  let profileImg = "";
  let role = "";
  if (typeof window !== "undefined") {
    const ls = window.localStorage.getItem("userInfo");
    if (ls) {
      const lsInfo = JSON.parse(ls);
      accessToken = lsInfo.state.userInfo.accessToken;
      memberId = lsInfo.state.userInfo.memberId;
      profileImg = lsInfo.state.userInfo.profileImg;
      role = lsInfo.state.userInfo.role;
    }
  }

  // 초기 프로필 데이터를 받아오기 위한 fetch 함수
  const fetchProfile = async () => {
    const response = await fetch(`${MEMBER_URL}/v1/user/${memberId}/profile`);
    if (response && response.ok) {
      const data = await response.json();
      setProfileData(data.data);
    }
  };

  useEffect(() => {
    fetchProfile();
    setUserimage(profileImg);
  }, [userInfo]);

  const handleDelUser = async () => {
    const response = await fetch(`${MEMBER_URL}/v1/user`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "device-id": `${userInfo.deviceId}`,
      },
    });
    if (response && response.ok) {
      resetAuth();
      router.push("/");
    }
  };

  return (
    <div>
      <div className="w-full p-[70px] inline-flex flex-col items-center justify-center gap-[115px] relative bg-white">
        <div className="flex flex-col items-center gap-[70px] px-[150px] py-0 relative self-stretch w-full flex-[0_0_auto]">
          <div className="mt-[-1.00px] font-t-h1 font-[number:var(--t-h1-font-weight)] text-green-500 text-[length:var(--t-h1-font-size)] tracking-[var(--t-h1-letter-spacing)] leading-[var(--t-h1-line-height)] relative w-fit whitespace-nowrap [font-style:var(--t-h1-font-style)]">
            마이페이지
          </div>

          <div className="inline-flex items-start justify-center gap-[40px] relative flex-[0_0_auto]">
            {/* 왼쪽 디브 */}

            <MiniNavigation status={"profile"} />
            {/* 오른쪽 디브 */}
            <div className="inline-flex flex-col items-start justify-center gap-[15px] p-[15px] relative flex-[0_0_auto] border !rounded-[10px] border-solid border-graygray-300  w-[920px]">
              {/* 상위 디브 : 위치 안내 및 게시하기 버튼 */}
              <div className="flex w-full h-[40px] items-center justify-between mb-5">
                <div>마이페이지 〉 내 프로필</div>
                {role === "ADMIN" && (
                  <Link href="/admin/role-list">
                    <p>관리자 페이지</p>
                  </Link>
                )}
                <ChangeRole />
              </div>
              {/* 프로필 리스트 */}
              <div className="justify-center mx-auto">
                <ProfileCSR
                  profileData={profileData}
                  accessToken={accessToken}
                  memberId={memberId}
                  role={role}
                  profileImg={profileImg}
                />
              </div>
              <MypageModal
                buttonText={"회원 탈퇴 하기"}
                buttonBgStyles={"bg-red-500"}
                buttonTextStyles={"text-font-m5 text-white-100"}
                Title="정말 탈퇴하시겠습니까?"
                subTitle="탈퇴한 뒤에는 아이디 및 데이터를 복구할 수 없으니 신중히 진행하세요."
                Titlecss={"text-h3 font-extrabold"}
                subTitlecss={"text-base font-bold"}
                Modalcss={"w-[530px]"}
                Titlebottom={
                  <></>
                  // <div className="bg-red-300 w-[22rem] h-6 rounded-xl absolute top-11 left-6 z-[-1] opacity-70" />
                }
                next={"탈퇴하기"}
                contents={<></>}
                onSuccess={handleDelUser}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
