import Step1Gray from "../../../../public/icons/step1-icon-gray.png";
import Step2Gray from "../../../../public/icons/step2-icon-gray.png";
import Step3Gray from "../../../../public/icons/step3-icon-gray.png";
import Step4Gray from "../../../../public/icons/step4-icon-gray.png";
import Step1Color from "../../../../public/icons/step1-icon-color.png";
import Step2Color from "../../../../public/icons/step2-icon-color.png";
import Step3Color from "../../../../public/icons/step3-icon-color.png";
import Step4Color from "../../../../public/icons/step4-icon-color.png";

import { FaCheck } from "react-icons/fa6";
import Image, { StaticImageData } from "next/image";

interface StepProps {
  stepNumber: number;
  isFinish: boolean;
  isNow: boolean;
}

const Step = ({ stepNumber, isFinish, isNow }: StepProps) => {
  // 단계별 이미지 선택
  const grayImages: StaticImageData[] = [
    Step1Gray,
    Step2Gray,
    Step3Gray,
    Step4Gray,
  ];
  const colorImages: StaticImageData[] = [
    Step1Color,
    Step2Color,
    Step3Color,
    Step4Color,
  ];

  // 현재 단계에 맞는 이미지 결정
  const currentGrayImage: StaticImageData = grayImages[stepNumber - 1];
  const currentColorImage: StaticImageData = colorImages[stepNumber - 1];

  return (
    <div
      className={`flex flex-col ${
        stepNumber === 1 ? "" : "h-full"
      } items-center `}
    >
      {/* 첫번째가 아닐 경우에만 위에 작대기 긋고, 첫번째면 없음 */}
      {!(stepNumber === 1) && (
        <div
          className={`flex-1 w-1 mb-2 ${
            isFinish ? "bg-green-500" : "bg-gray-350"
          }`}
        ></div>
      )}
      <div
        className={`w-10 h-10 flex items-center justify-center rounded-full p-1 ${
          isFinish
            ? isNow
              ? "bg-white-100 border-2 border-green-500"
              : "bg-green-500 text-white"
            : "border-2 border-gray-350 text-gray-350 bg-white-100"
        } mb-2`}
      >
        {isFinish ? (
          isNow ? (
            <>
              <Image src={currentColorImage} alt={`Step ${stepNumber}`} />
            </>
          ) : (
            <>
              <FaCheck color="white" />
            </>
          )
        ) : (
          <>
            <Image src={currentGrayImage} alt={`Step ${stepNumber}`} />
          </>
        )}
      </div>
    </div>
  );
};

export default Step;
