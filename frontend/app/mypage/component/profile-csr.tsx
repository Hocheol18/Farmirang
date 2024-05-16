"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { PiMedalFill, PiCertificateFill } from "react-icons/pi";
import { FaHatCowboy } from "react-icons/fa6";
import { MEMBER_URL } from "@/utils/ServerApi";
import MypageModal from "@/app/_components/common/MypageModal";
import Button from "@/app/_components/common/Button";
import Input from "@/app/_components/common/Input";
import ChangePicture from "./change-propic";
import { useUserStore } from "@/app/_stores/userStore";

// 프로필 데이터를 나타내는 인터페이스
interface ProfileType {
  profile_img: string;
  nickname: string;
  role: string;
  badge: number;
}

interface ProfileCSRProps {
  profileData?: ProfileType;
  accessToken: string;
  memberId: string;
  role: string;
  profileImg: string;
}

export default function ProfileCSR({
  profileData,
  accessToken,
  memberId,
  role,
  profileImg,
}: ProfileCSRProps) {
  const { userInfo, updateImg } = useUserStore();
  const [userImage, setUserimage] = useState<string>(
    profileData?.profile_img || profileImg
  );
  const [selectImage, setSelectImage] = useState<any>();
  const [showImage, setShowImage] = useState<any>();
  const [newNickname, setNewNickname] = useState<string>("");

  // 입력한 닉네임으로 백엔드 저장하는 로직
  const putNewNickname = async () => {
    const response = await fetch(`${MEMBER_URL}/v1/user/nickname`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ nickname: newNickname }),
    });
    if (response.ok) {
      window.location.reload();
    }
  };

  // useEffect(() => {
  //   console.log(newNickname);
  // }, [newNickname]);

  // 고른 이미지로 백엔드 저장하는 로직
  const imageSelect = async () => {
    const formData = new FormData();
    formData.append("img", selectImage);
    console.log(formData);
    const response = await fetch(`${MEMBER_URL}/v1/user/profile`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      body: formData,
    });
    if (response) {
      const responseData = await response.json();
      setUserimage(responseData.data.url);
      updateImg(responseData.data.url);
    }
  };

  // 프로필 이미지 삭제하는 로직
  const deleteImage = async () => {
    const formData = new FormData();
    formData.append("img", "");
    const response = await fetch(`${MEMBER_URL}/v1/user/profile`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      body: formData,
    });
    if (response) {
      const responseData = await response.json();
      setUserimage(responseData.data.url);
    }
  };

  return (
    <div className="flex flex-col items-center gap-[70px] relative bg-white border">
      {/* 유저 사진 헤더 */}
      <div className="flex flex-col items-start gap-[10px] p-[10px] relative self-stretch w-full flex-[0_0_auto]">
        {/* 밭 디자인 */}
        <Image
          className="w-[880px] h-[378px] mr-[-10.00px] relative object-cover"
          alt="User's Farm-design Image"
          src="/user/ground.jpg"
          width={880}
          height={378}
        />
        {/* 유저 프사 */}
        <div
          className="inline-flex items-start gap-[10px] absolute top-[295px] left-[360px]"
          onClick={() => {}}
        >
          <div className="relative w-[180px] h-[185px] bg-[#d9d9d9] rounded-[90px/92.5px]">
            <Image
              src={userImage}
              alt="User Profile Image"
              className="w-full h-full rounded-[90px/92.5px]"
              width={180}
              height={185}
              loading="eager"
            />
          </div>
        </div>
        <div className="relative top-[100px] left-[305px] mb-[70px]">
          <MypageModal
            buttonText={"프로필 사진 변경"}
            buttonBgStyles={"bg-green-300 mx-auto"}
            buttonTextStyles={"text-font-m6 text-white-100"}
            Title="프로필 사진 변경"
            subTitle=""
            Titlecss={"text-h3 font-extrabold"}
            subTitlecss={"font-bold"}
            Modalcss={"w-[400px]"}
            Titlebottom={""}
            next={"확인"}
            contents={
              <div className="flex justify-center">
                {/* 여기 부분에 인자로 이미지 고르는거 + 바꾸는 state 내려줌 */}
                <ChangePicture
                  selectImage={selectImage}
                  setSelectImage={setSelectImage}
                  showImage={showImage}
                  setShowImage={setShowImage}
                />
              </div>
            }
            onSuccess={imageSelect}
          />{" "}
          <Button
            text={"프로필 사진 삭제"}
            bgStyles={"bg-green-500 mx-auto"}
            textStyles={"text-white-100"}
            handleClick={deleteImage}
          />
        </div>
      </div>

      {/* 유저 정보 */}
      <div className="flex flex-col items-center justify-center gap-[10px] relative self-stretch w-full flex-[0_0_auto]">
        <div className="inline-flex items-center justify-center gap-[10px] pb-[19px] relative flex-[0_0_auto]">
          <div className="relative w-fit mt-[-1.00px] font-t-h2 font-[number:var(--t-h2-font-weight)] text-black text-[length:var(--t-h2-font-size)] tracking-[var(--t-h2-letter-spacing)] leading-[var(--t-h2-line-height)] whitespace-nowrap [font-style:var(--t-h2-font-style)]">
            {profileData?.nickname ? profileData.nickname : "유저 닉네임"}
          </div>
          <MypageModal
            buttonText={"닉네임 변경"}
            buttonBgStyles={"bg-green-300"}
            buttonTextStyles={"text-font-m6 text-white-100"}
            Title="닉네임 변경"
            subTitle=""
            Titlecss={"text-h3 font-extrabold"}
            subTitlecss={"text-base font-bold"}
            Modalcss={"w-[500px]"}
            Titlebottom={""}
            next={"확인"}
            contents={
              <Input
                labelcss={"text-lg font-semibold"}
                inputcss={
                  "flex rounded-lg border border-green-300 w-full focus:outline-none focus:ring-green-400 focus:ring-1 h-10 p-2"
                }
                placeholder={"변경할 닉네임"}
                type={"string"}
                value={newNickname}
                onChange={(value) => setNewNickname(value)}
                topcss={"mt-10"}
                labeltext={"변경할 이름을 작성해주세요"}
              />
            }
            onSuccess={putNewNickname}
          />
        </div>
        <div className="w-[300px] justify-center flex items-center relative mb-[40px]">
          <div className="flex items-center gap-[10px] flex-[0_0_auto] relative w-full">
            <div className="w-full flex justify-between font-m-h3 tracking-[var(--m-h3-letter-spacing)] [font-style:var(--m-h3-font-style)] text-[length:var(--m-h3-font-size)] text-black font-[number:var(--m-h3-font-weight)] leading-[var(--m-h3-line-height)] w-fit">
              {role === "MEMBER" && (
                <>
                  <div className="flex gap-2">
                    <FaHatCowboy />
                    도시농부
                  </div>
                  <div className="flex gap-2">
                    <PiMedalFill /> 기부횟수 {profileData?.badge}
                  </div>
                </>
              )}

              {role === "AGENCY" && (
                <div className="flex items-center gap-[10px] justify-center text-center mx-auto">
                  <PiCertificateFill />
                  기관회원
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* 게시글 */}
      {/* <div className="flex flex-col items-center justify-center gap-[10px] relative self-stretch w-full flex-[0_0_auto]">
        <div className="w-fit mt-[-1.00px] text-[length:var(--m-h4-font-size)] text-gray-400">
          최근 작성한 글
        </div> */}
      {/* 박스 하나 */}
      {/* <div className="flex flex-col w-[880px] items-center justify-center gap-[20px] p-[20px] relative flex-[0_0_auto] rounded-[10px] overflow-hidden border border-solid border-green-300">
          <div className="flex flex-col w-[673px] h-[206px] items-start justify-center gap-[50px] relative">
            <div className="flex-wrap items-center justify-between gap-[398px_398px] flex relative self-stretch w-full flex-[0_0_auto]">
              <div className="relative w-fit mt-[-1.00px] font-m-h4 font-[number:var(--m-h4-font-weight)] text-black text-[length:var(--m-h4-font-size)] tracking-[var(--m-h4-letter-spacing)] leading-[var(--m-h4-line-height)] whitespace-nowrap [font-style:var(--m-h4-font-style)]">
                카테고리
              </div>
              <div className="relative w-fit mt-[-1.00px] font-m-h4 text-black text-[length:var(--m-h4-font-size)] tracking-[var(--m-h4-letter-spacing)] leading-[var(--m-h4-line-height)] whitespace-nowrap [font-style:var(--m-h4-font-style)]">
                작성일자
              </div>
            </div>
            <div className="flex-col items-start justify-center gap-[21px] flex relative self-stretch w-full flex-[0_0_auto]">
              <div className="w-[105px] mt-[-1.00px] text-[length:var(--m-h2-font-size)] tracking-[var(--m-h2-letter-spacing)] leading-[var(--m-h2-line-height)] relative font-m-h2 font-[number:var(--m-h2-font-weight)] text-black [font-style:var(--m-h2-font-style)]">
                글제목
              </div>
              <p className="w-[467px] text-[length:var(--m-h3-font-size)] tracking-[var(--m-h3-letter-spacing)] leading-[var(--m-h3-line-height)] relative font-m-h3 font-[number:var(--m-h3-font-weight)] text-black [font-style:var(--m-h3-font-style)]">
                글내용 조회 데이터에 있는지?? 없음 잘러
              </p>
            </div>
          </div>
        </div> */}
      {/* 박스 하나 */}
      {/* <div className="flex flex-col w-[880px] items-center justify-center gap-[20px] p-[20px] relative flex-[0_0_auto] rounded-[10px] overflow-hidden border border-solid border-green-300">
          <div className="flex flex-col w-[673px] h-[206px] items-start justify-center gap-[50px] relative">
            <div className="flex-wrap items-center justify-between gap-[398px_398px] flex relative self-stretch w-full flex-[0_0_auto]">
              <div className="relative w-fit mt-[-1.00px] font-m-h4 font-[number:var(--m-h4-font-weight)] text-black text-[length:var(--m-h4-font-size)] tracking-[var(--m-h4-letter-spacing)] leading-[var(--m-h4-line-height)] whitespace-nowrap [font-style:var(--m-h4-font-style)]">
                카테고리
              </div>
              <div className="relative w-fit mt-[-1.00px] font-m-h4 text-black text-[length:var(--m-h4-font-size)] tracking-[var(--m-h4-letter-spacing)] leading-[var(--m-h4-line-height)] whitespace-nowrap [font-style:var(--m-h4-font-style)]">
                작성일자
              </div>
            </div>
            <div className="flex-col items-start justify-center gap-[21px] flex relative self-stretch w-full flex-[0_0_auto]">
              <div className="w-[105px] mt-[-1.00px] text-[length:var(--m-h2-font-size)] tracking-[var(--m-h2-letter-spacing)] leading-[var(--m-h2-line-height)] relative font-m-h2 font-[number:var(--m-h2-font-weight)] text-black [font-style:var(--m-h2-font-style)]">
                글제목
              </div>
              <p className="w-[467px] text-[length:var(--m-h3-font-size)] tracking-[var(--m-h3-letter-spacing)] leading-[var(--m-h3-line-height)] relative font-m-h3 font-[number:var(--m-h3-font-weight)] text-black [font-style:var(--m-h3-font-style)]">
                글내용 조회 데이터에 있는지?? 없음 잘러
              </p>
            </div>
          </div>
        </div> */}
      {/* 박스 하나 */}
      {/* <div className="flex flex-col w-[880px] items-center justify-center gap-[20px] p-[20px] relative flex-[0_0_auto] rounded-[10px] overflow-hidden border border-solid border-green-300">
          <div className="flex flex-col w-[673px] h-[206px] items-start justify-center gap-[50px] relative">
            <div className="flex-wrap items-center justify-between gap-[398px_398px] flex relative self-stretch w-full flex-[0_0_auto]">
              <div className="relative w-fit mt-[-1.00px] font-m-h4 font-[number:var(--m-h4-font-weight)] text-black text-[length:var(--m-h4-font-size)] tracking-[var(--m-h4-letter-spacing)] leading-[var(--m-h4-line-height)] whitespace-nowrap [font-style:var(--m-h4-font-style)]">
                카테고리
              </div>
              <div className="relative w-fit mt-[-1.00px] font-m-h4 text-black text-[length:var(--m-h4-font-size)] tracking-[var(--m-h4-letter-spacing)] leading-[var(--m-h4-line-height)] whitespace-nowrap [font-style:var(--m-h4-font-style)]">
                작성일자
              </div>
            </div>
            <div className="flex-col items-start justify-center gap-[21px] flex relative self-stretch w-full flex-[0_0_auto]">
              <div className="w-[105px] mt-[-1.00px] text-[length:var(--m-h2-font-size)] tracking-[var(--m-h2-letter-spacing)] leading-[var(--m-h2-line-height)] relative font-m-h2 font-[number:var(--m-h2-font-weight)] text-black [font-style:var(--m-h2-font-style)]">
                글제목
              </div>
              <p className="w-[467px] text-[length:var(--m-h3-font-size)] tracking-[var(--m-h3-letter-spacing)] leading-[var(--m-h3-line-height)] relative font-m-h3 font-[number:var(--m-h3-font-weight)] text-black [font-style:var(--m-h3-font-style)]">
                글내용 조회 데이터에 있는지?? 없음 잘러
              </p>
            </div>
          </div>
        </div>
      </div> */}
    </div>
  );
}
