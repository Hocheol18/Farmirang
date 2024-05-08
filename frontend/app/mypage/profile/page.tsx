"use client";
import MiniNavigation from "../component/mini-nav";
import Button from "@/app/_components/common/Button";
import ProfileCSR from "../component/profile-csr";

export default function MyPage() {
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
                <Button
                  text={"회원자격 변경신청"}
                  bgStyles={"bg-green-300"}
                  textStyles={"text-font-m5 text-white-100"}
                  handleClick={() => {}}
                />
              </div>
              {/* 프로필 리스트 */}
              <div className="justify-center mx-auto">
                <ProfileCSR />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
