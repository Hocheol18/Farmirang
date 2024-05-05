import FirstPage from "./first/FirstPage";
import FourthPage from "./fourrth/FourthPage";
import SecondPage from "./second/SecondPage";
import ThirdPage from "./third/ThirdPage";

const StepBox = () => {
  const currentStep = 3;

  const content: JSX.Element[] = [
    <FirstPage />,
    <SecondPage />,
    <ThirdPage />,
    <FourthPage />,
  ];

  const currentContent = content[currentStep - 1];

  return (
    <div className="border-2 h-full rounded-[25px] bg-gray-100 flex flex-col w-[75%] items-center justify-center shadow shadow-md">
      {/* 여기는 1단계~4단계 내용 들어갈 부분 */}
      {currentContent}
    </div>
  );
};

export default StepBox;
