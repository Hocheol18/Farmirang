import Link from "next/link";

export default function Home() {
  return (
    <div className="bg-[#e0f4ff] h-[1112px] px-[60px] py-[120px]">
      {/* 상단 */}
      <div>
        <div className="flex justify-center items-start content-start flex-wrap mt-132px relative">
          <div className="w-[487px] h-[332px] mb-4 bg-[url(/main/farmirangLogo.png)] bg-cover bg-no-repeat bg-center relative">
            <div className="w-[99px] h-[93px] -left-20 top-5 bg-[url(/main/bird.png)] bg-cover bg-no-repeat bg-center absolute" />
            <div className="w-[90px] h-[90px] -right-7 -top-8 bg-[url(/main/sun.png)] bg-cover bg-no-repeat bg-center absolute" />
          </div>
          <p className="text-white text-center mb-8">
            처음 농사를 시작하는 분들을 위한 완벽한 안내서!
            <br />
            텃밭부터 밥상까지, 함께 수확의 즐거움을 누려보세요!
          </p>
        </div>
        <div className="w-[2560px] h-[223px] absolute">
          <div className="w-[330px] h-[140px] top-[130px] left-[210px] bg-[url(/main/cloud1.png)] bg-no-repeat bg-center absolute"></div>
          <div className="w-[330px] h-[140px] top-[140px] left-[650px] bg-[url(/main/cloud2.png)] bg-no-repeat bg-center absolute"></div>
          <div className="w-[330px] h-[140px] top-[230px] left-[950px] bg-[url(/main/cloud3.png)] bg-no-repeat bg-center absolute"></div>
          <div className="w-[330px] h-[140px] top-[100px] left-[1560px] bg-[url(/main/cloud4.png)] bg-no-repeat bg-center absolute"></div>
          <div className="w-[330px] h-[140px] top-[180px] left-[2110px] bg-[url(/main/cloud5.png)] bg-no-repeat bg-center absolute"></div>
        </div>
      </div>

      {/* 메인 링크 */}
      <div className="grid grid-cols-3 gap-4 mt-4 relative">
        <div className="rounded-2xl shadow-xl bg-[#ff4500] text-white">
          재배를 시작해보세요
        </div>
        <div className="rounded-2xl shadow-xl bg-[#32cd32] text-white">
          수확의 기쁨을 나눠볼까요
        </div>
        <div className="rounded-2xl shadow-xl bg-[#00ced1] text-white">
          회원가입하기
        </div>
      </div>
    </div>
  );
}
