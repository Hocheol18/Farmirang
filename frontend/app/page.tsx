import Link from "next/link";

export default function Home() {
  return (
    <div className="bg-[#e0f4ff] h-[1112px] px-[60px] py-[120px] relative">
      <div className="cloud1 w-[330px] h-[140px] top-[300px] left-[100px] bg-[url(/main/cloud1.png)] bg-no-repeat bg-center absolute"></div>
      <div className="cloud2 w-[330px] h-[140px] top-[140px] left-[250px] bg-[url(/main/cloud2.png)] bg-no-repeat bg-center absolute"></div>
      <div className="cloud3 w-[330px] h-[140px] top-[90px] right-[600px] bg-[url(/main/cloud3.png)] bg-no-repeat bg-center absolute"></div>
      <div className="cloud4 w-[330px] h-[140px] top-[100px] right-[100px] bg-[url(/main/cloud4.png)] bg-no-repeat bg-center absolute"></div>
      <div className="cloud5 w-[330px] h-[140px] top-[250px] right-[300px] bg-[url(/main/cloud5.png)] bg-no-repeat bg-center absolute"></div>
      {/* 상단 */}
      <div>
        <div className="flex  items-center content-start flex-col mt-132px relative">
          <div className="w-[487px] h-[332px] mb-4 bg-[url(/main/farmirangLogo.png)] bg-cover bg-no-repeat bg-center relative">
            <div className="w-[99px] h-[93px] -left-20 top-5 bg-[url(/main/bird.png)] bg-cover bg-no-repeat bg-center absolute" />
            <div className="sun w-[90px] h-[90px] -right-7 -top-8 bg-[url(/main/sun.png)] bg-cover bg-no-repeat bg-center absolute" />
          </div>
          <p className="text-white text-center mb-8">
            처음 농사를 시작하는 분들을 위한 완벽한 안내서!
            <br />
            텃밭부터 밥상까지, 함께 수확의 즐거움을 누려보세요!
          </p>
        </div>
        {/* <div className="w-full h-[223px] relative">
          
        </div> */}
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
