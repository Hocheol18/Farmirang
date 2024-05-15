import Image from "next/image";
import Link from "next/link";
import SCARECROW from "../public/main/scarecrow.png";
import VEGE from "../public/main/vege.png";
import CARROT from "../public/icons/farms/crops-carrot.svg";

export default function Home() {
  return (
    <div className="bg-[#B0E2FF] h-full px-[60px] py-[120px] relative overflow-hidden">
      <Image
        src={SCARECROW}
        alt="scarecrow"
        className="absolute w-80 h-80 rotate-12 right-0 bottom-20 z-20"
      ></Image>
      <Image
        src={VEGE}
        alt="vegetable"
        className="absolute w-24 h-24 rotate-16 left-[5rem] bottom-20 z-20"
      ></Image>
      <Image
        src={VEGE}
        alt="vegetable"
        className="absolute w-24 h-24 rotate-10 left-[15rem] bottom-24 z-20"
      ></Image>
      <Image
        src={VEGE}
        alt="vegetable"
        className="absolute w-24 h-24 rotate-8 left-[25rem] bottom-40 z-20"
      ></Image>
      <Image
        src={VEGE}
        alt="vegetable"
        className="absolute w-24 h-24 rotate-5 left-[35rem] bottom-12 z-20"
      ></Image>
      <Image
        src={VEGE}
        alt="vegetable"
        className="absolute w-24 h-24 rotate-12 left-[44rem] bottom-44 z-20"
      ></Image>
      <Image
        src={VEGE}
        alt="vegetable"
        className="absolute w-24 h-24 rotate-12 left-[54rem] bottom-24 z-20"
      ></Image>
      <Image
        src={VEGE}
        alt="vegetable"
        className="absolute w-24 h-24 rotate-12 left-[64rem] bottom-28 z-20"
      ></Image>
      <div className="w-full h-[70%] left-0 z-10 bg-no-repeat bg-cover bottom-0 bg-[url(/main/newfield.png)] absolute"></div>
      <div className="w-[80rem] h-[25rem] scale-x-[-1] left-0 bg-no-repeat bg-cover bottom-[20rem] bg-[url(/main/mountain.png)] absolute"></div>
      <div className="w-[40rem] h-[20rem] right-0 bg-no-repeat bg-cover bottom-[20rem] bg-[url(/main/mountain.png)] absolute"></div>
      <div className="cloud1 w-[330px] h-[140px] top-[300px] left-[100px] bg-[url(/main/cloud1.png)] bg-no-repeat bg-center absolute"></div>
      <div className="cloud2 w-[330px] h-[140px] top-[140px] left-[250px] bg-[url(/main/cloud2.png)] bg-no-repeat bg-center absolute"></div>
      <div className="cloud3 w-[330px] h-[140px] top-[90px] right-[600px] bg-[url(/main/cloud3.png)] bg-no-repeat bg-center absolute"></div>
      <div className="cloud4 w-[330px] h-[140px] top-[100px] right-[100px] bg-[url(/main/cloud4.png)] bg-no-repeat bg-center absolute"></div>
      <div className="cloud5 w-[330px] h-[140px] top-[250px] right-[300px] bg-[url(/main/cloud5.png)] bg-no-repeat bg-center absolute"></div>
      {/* 상단 */}
      <div className="z-20">
        <div className="flex z-20 items-center content-start flex-col mt-132px relative">
          <div className="w-[487px] h-[332px] mb-4 bg-[url(/main/farmirangLogo.png)] bg-cover bg-no-repeat bg-center relative z-20">
            <div className="w-[99px] h-[93px] -left-20 top-5 bg-[url(/main/bird.png)] bg-cover bg-no-repeat bg-center absolute z-20" />
            <div className="w-[90px] h-[90px] light-effect -right-7 -top-8 z-10"></div>
            <div className="sun w-[90px] h-[90px] -right-7 -top-8 bg-[url(/main/sun.png)] bg-cover bg-no-repeat bg-center absolute z-10" />
          </div>
          <p className="text-white text-center mb-8 z-20">
            처음 농사를 시작하는 분들을 위한 완벽한 안내서!
            <br />
            텃밭부터 밥상까지, 함께 수확의 즐거움을 누려보세요!
          </p>
        </div>
        {/* <div className="w-full h-[223px] relative">
          
        </div> */}
      </div>
      {/* 메인 링크 */}
      <div className="grid grid-cols-3 gap-4 relative z-20 my-4">
        <div className="flex w-[20rem] mx-auto flex-col gap-10 z-20 relative ">
          <Image
            src={CARROT}
            alt="CARROT"
            className="absolute w-24 h-24 rotate-12 left-[-3rem] top-[-2rem] z-20"
          ></Image>
          <div className="rounded-xl w-full h-72 shadow-xl p-5 bg-[#E5367B]">
            <p className="text-white-100 text-2xl">나만의 텃밭😆</p>
          </div>
          <div className="rounded-xl w-full h-20 mx-auto p-5 bg-[#FFFFFF]">
            교육 신청하기
          </div>
        </div>
        <div className="flex w-[20rem] mx-auto flex-col gap-10 z-20 ">
          <div className="rounded-xl w-full h-72 shadow-xl p-5 bg-[#0042A4]">
            <p className="text-white-100 text-2xl">좋은일 하세요🧨</p>
          </div>
          <div className="rounded-xl w-full h-20 mx-auto p-5 bg-[#FFFFFF]">
            교육 신청하기
          </div>
        </div>
        <div className="flex w-[20rem] mx-auto flex-col gap-10 z-20 ">
          <div className="rounded-xl w-full h-72 shadow-xl p-5 bg-[#FFD600]">
            <p className="text-2xl">회원가입유도✍</p>
          </div>
          <div className="rounded-xl w-full h-20 mx-auto p-5 bg-[#FFFFFF]">
            교육 신청하기
          </div>
        </div>
      </div>
    </div>
  );
}
