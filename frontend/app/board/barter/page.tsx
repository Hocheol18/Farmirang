import MiniNavigation from "../component/mini-nav";

export default function Barter() {
  return (
    <div className="flex flex-col justify-center mx-auto gap-[30px]">
      {/* 상단 현재 위치 */}
      <div className="flex items-center justify-center">작물교환</div>
      <MiniNavigation status={"barter"} />
      {/* 내용 */}
      <div className="inline-flex flex-col items-start justify-center gap-[15px] p-[15px] relative flex-[0_0_auto] border !rounded-[10px] border-solid border-graygray-300  min-w-[1220px]">
        내용
      </div>
    </div>
  );
}
