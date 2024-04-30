import Button from "@/src/common/Button";
import GuidlineContent from "./GuidlineContent";

const GuidlineBox = () => {
  return (
    // 가이드라인박스 전체!
    <div className="border-2 rounded-[25px] bg-gray-100 flex flex-col items-center justify-center w-[80%]  h-full gap-5">
      {/* 가이드라인 사진 넣을 부분임 */}
      <GuidlineContent />
      {/* 버튼들 */}
      <div className="flex gap-5">
        <Button text="이전" bgColor="bg-white-100" textColor="text-green-500" />
        <Button text="다음" bgColor="bg-green-400" textColor="text-white-100" />
      </div>
    </div>
  );
};

export default GuidlineBox;
