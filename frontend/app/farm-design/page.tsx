`use client`;
// 밭꾸미기 가이드라인 ~ 4단계

import GuidlineBox from "./components/guideline/GuidlineBox";
import StepLayout from "./components/step/StepLayout";

export default function FarmDesign() {
  // 임시
  const view: number = 1;
  return (
    <div className=" flex justify-center w-full h-full">
      {/* 처음 딱 들어오면 무조건 가이드라인 */}
      {view === 0 ? <GuidlineBox /> : null}
      {view === 1 ? <StepLayout /> : null}
    </div>
  );
}
