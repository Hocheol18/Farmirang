import Mainbox1 from "./_components/common/mainbox1";
import Mainbox2 from "./_components/common/mainbox2";
import Mainbox3 from "./_components/common/mainbox3";

export default function Home() {
  return (
    <>
      <div className="flex flex-col items-center justify-center relative overflow-hidden">
        {/* 배경 사진 설정 */}
        <div className="relative self-stretch overflow-hidden w-full h-full bg-[url(/main/newfield.png)] bg-cover bg-[50%_50%]">
          <div className="main-box" />
        </div>
        {/* 구름 움직임 */}
        <div className="cloud1 w-[330px] h-[140px] top-[300px] left-[100px] bg-[url(/main/cloud.png)] bg-no-repeat bg-center absolute"></div>
        <div className="cloud2 w-[330px] h-[140px] top-[140px] left-[250px] bg-[url(/main/cloud.png)] bg-no-repeat bg-center absolute"></div>
        <div className="cloud3 w-[330px] h-[140px] top-[90px] right-[600px] bg-[url(/main/cloud.png)] bg-no-repeat bg-center absolute"></div>
        <div className="cloud4 w-[330px] h-[140px] top-[100px] right-[100px] bg-[url(/main/cloud.png)] bg-no-repeat bg-center absolute"></div>
        <div className="cloud5 w-[330px] h-[140px] top-[250px] right-[300px] bg-[url(/main/cloud.png)] bg-no-repeat bg-center absolute"></div>
        {/* 내부 내용 */}
        <div className="flex flex-col w-[23.75rem] items-center justify-center gap-[25px] absolute top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <Mainbox1 />
          <div className="inline-flex flex-col h-[101px] items-center justify-center gap-[12px] relative"></div>
        </div>
        <div className="flex flex-col min-w-full items-center justify-center gap-[25px] absolute top-2/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <Mainbox2 />
        </div>
        {/* 밭에 심어진 야채들 */}
        {/* <Mainbox3 /> */}
      </div>
    </>
  );
}
