import KakaoMap from "@/app/_components/common/Maps";
import Modal from "@/app/_components/common/Modal";

export default function FirstModal() {
  return (
    <Modal
      Titlebottom={
        <div className="bg-green-200 w-[11rem] h-6 rounded-xl absolute top-8 left-0 z-0 opacity-70"></div>
      }
      buttonText={"기부하기"}
      buttonBgStyles={"bg-green-400 w-full"}
      buttonTextStyles={"font-bold text-white-100 text-l"}
      Title={"후원해요"}
      subTitle={"가능한 기부 품목"}
      contents={
        <>
          <div className="flex justify-center">
            <div className="flex flex-wrap content-start">
              <div className="mx-[1.8rem] my-[1.2rem] border border-green-400 rounded-[10rem] w-[96px] h-[96px] shrink-0"></div>
              <div className="mx-[1.8rem] my-[1.2rem] border border-green-400 rounded-[10rem] w-[96px] h-[96px] shrink-0"></div>
              <div className="mx-[1.8rem] my-[1.2rem] border border-green-400 rounded-[10rem] w-[96px] h-[96px] shrink-0"></div>
              <div className="mx-[1.8rem] my-[1.2rem] border border-green-400 rounded-[10rem] w-[96px] h-[96px] shrink-0"></div>
            </div>
          </div>
          <div className="text-h4 mt-[2rem] mb-[1rem] font-bold">
            여기로 보내면 되요!
          </div>
          <KakaoMap />
          <div className="mt-4 text-h6">
            멀티캠퍼스 역삼 (서울 강남구 테헤란로 212)
          </div>
        </>
      }
      subTitlecss={"text-h6"}
      Titlecss={"font-bold text-h1 relative"}
      Modalcss="max-w-[700px] p-[2.5rem]"
      next={"다음"}
    />
  );
}
