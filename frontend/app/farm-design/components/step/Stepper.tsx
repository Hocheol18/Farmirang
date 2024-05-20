import Step from "./Step";
import StepName from "./StepName";

interface Props {
  nowStep: number;
}

const Stepper = ({ nowStep }: Props) => {
  // 단계의 제목과 내용을 배열로 관리
  const stepsDetails = [
    { title: "1단계", content: "텃밭 모양과 이랑 넓이 입력하기" },
    { title: "2단계", content: "작물 선택 후 추천 받기" },
    { title: "3단계", content: "텃밭 커스텀하여 꾸미기" },
    { title: "4단계", content: "비료 추천 받기" },
  ];

  return (
    <div className="flex h-[80%] w-[20%] gap-5 justify-center">
      <div className="flex flex-col items-center my-2">
        {/* 단계 컴포넌트를 동적으로 렌더링 */}
        {stepsDetails.map((_, index) => (
          <Step
            key={index}
            stepNumber={index + 1}
            isFinish={index + 1 <= nowStep}
            isNow={index + 1 === nowStep}
          />
        ))}
      </div>
      <div className="flex flex-col items-center ">
        {/* 단계 이름 컴포넌트를 동적으로 렌더링 */}
        {stepsDetails.map((step, index) => (
          <StepName
            key={index}
            title={step.title}
            content={step.content}
            isNow={index + 1 === nowStep}
          />
        ))}
      </div>
    </div>
  );
};

export default Stepper;
