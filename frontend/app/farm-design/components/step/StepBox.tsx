"use client";

import { useState } from "react";
import FirstPage from "./first/FirstPage";
import FourthPage from "./fourrth/FourthPage";
import SecondPage from "./second/SecondPage";
import ThirdPage from "./third/ThirdPage";

interface Props {
  currentStep: number;
  handleStep: (step: number) => void;
  userAccessToken: string;
}

interface FieldCropsListType {
  cropId: number;
  number: number;
}

const StepBox = ({ currentStep, handleStep, userAccessToken }: Props) => {
  // 밭의 디자인 ID 관리
  const [fieldDesignId, setFieldDesignId] = useState<number>(0);

  // 밭의 true, false 배열 관리 (배치 가능한 유무 배열)
  const [fieldClickableArray, setFieldClickableFieldArray] = useState<
    boolean[][]
  >([]);

  // 밭의 작물 배열 관리
  const [fieldGridArray, setFieldGridArray] = useState<number[][]>([]);

  // 밭의 작물 리스트 배열 관리
  const [fieldCropsList, setFieldCropsList] = useState<FieldCropsListType[]>(
    []
  );

  // 디자인 Id update
  const handleUpdateFieldDesignId = (newDesignId: number) => {
    setFieldDesignId(newDesignId);
  };

  // 배치 가능한 유무 배열 update
  const handleUpdateFieldClickableArray = (
    newFieldClickableArray: boolean[][]
  ) => {
    setFieldClickableFieldArray(newFieldClickableArray);
  };

  // 밭의 작물 배열 update
  const handleUpdateFieldGridArray = (newFieldGridArray: number[][]) => {
    setFieldGridArray(newFieldGridArray);
  };

  // 밭의 작물 리스트 배열 update
  const handleUpdateFieldCropsList = (
    newFieldCropsList: FieldCropsListType[]
  ) => {
    setFieldCropsList(newFieldCropsList);
  };

  // 각 단계별 컴포넌트들
  const content: JSX.Element[] = [
    <FirstPage
      key="first"
      handleStep={handleStep}
      userAccessToken={userAccessToken}
      handleUpdateFieldDesignId={handleUpdateFieldDesignId}
      handleUpdateFieldClickableArray={handleUpdateFieldClickableArray}
      handleUpdateFieldGridArray={handleUpdateFieldGridArray}
    />,
    <SecondPage
      key="second"
      handleStep={handleStep}
      userAccessToken={userAccessToken}
      fieldDesignId={fieldDesignId}
    />,
    <ThirdPage
      key="third"
      handleStep={handleStep}
      userAccessToken={userAccessToken}
    />,
    <FourthPage key="fourth" />,
  ];

  return (
    <div className="border-2 h-full rounded-[25px] bg-gray-100 flex flex-col w-[75%] items-center justify-center shadow shadow-md">
      {/* 여기는 1단계~4단계 내용 들어갈 부분 */}
      {content[currentStep - 1]}
    </div>
  );
};

export default StepBox;
