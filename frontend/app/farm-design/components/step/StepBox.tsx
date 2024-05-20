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

export interface FieldCropsListType {
  id: number;
  name: string;
  isClick: boolean;
  isRecommend: boolean;
  cropHeight: number;
  cropWidth: number;
  area: number;
}

export interface cropIndexType {
  cropId: number;
  number: number;
}

export interface FarmCoordinateType {
  row: number;
  column: number;
  sequence: number;
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

  // 몇 번에 cropId 몇인지 알려주는 배열
  const [cropIndexArray, setCropIndexArray] = useState<cropIndexType[]>([]);

  // 밭의 좌표 배열(보여줄 때 밭 모양도 보여줄 것)
  const [farmCoordinateArray, setFarmCoordinateArray] = useState<
    FarmCoordinateType[]
  >([]);

  // 4단계 들어갈 때 필요한 작물 이름 리스트
  const [cropsNameList, setCropsNameList] = useState<string[]>([]);

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

  // 몇 번에 cropId 몇인지 알려주는 배열 update
  const handleUpdateCropIndexArray = (newCropIndexArray: cropIndexType[]) => {
    setCropIndexArray(newCropIndexArray);
  };

  // 밭 좌표 배열 update
  const handleFarmCoordinateArray = (
    newCoordinateArray: FarmCoordinateType[]
  ) => {
    setFarmCoordinateArray(newCoordinateArray);
  };

  // 작물에 있는 이름 리스트 배열 update (2, 3단계에서 저장 누를 때 실행)
  const handleUpdateCropsNameList = (newCropsNameList: string[]) => {
    setCropsNameList(newCropsNameList);
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
      handleUpdateFieldCropsList={handleUpdateFieldCropsList}
      cropIndexArray={cropIndexArray}
      handleUpdateCropIndexArray={handleUpdateCropIndexArray}
      fieldClickableArray={fieldClickableArray}
      fieldGridArray={fieldGridArray}
      handleUpdateFieldGridArray={handleUpdateFieldGridArray}
      handleFarmCoordinateArray={handleFarmCoordinateArray}
      farmCoordinateArray={farmCoordinateArray}
      handleUpdateCropsNameList={handleUpdateCropsNameList}
    />,
    <ThirdPage
      key="third"
      handleStep={handleStep}
      userAccessToken={userAccessToken}
      fieldCropsList={fieldCropsList}
      fieldDesignId={fieldDesignId}
      clickableField={fieldClickableArray}
      grid={fieldGridArray}
      handleUpdateFieldGridArray={handleUpdateFieldGridArray}
      cropIndexArray={cropIndexArray}
      handleUpdateCropIndexArray={handleUpdateCropIndexArray}
      farmCoordinateArray={farmCoordinateArray}
      handleFarmCoordinateArray={handleFarmCoordinateArray}
      handleUpdateCropsNameList={handleUpdateCropsNameList}
    />,
    <FourthPage
      key="fourth"
      cropsNameList={cropsNameList}
      fieldCropsList={fieldCropsList}
    />,
  ];

  return (
    <div className="border-2 h-full rounded-[25px] bg-gray-100 flex flex-col w-[75%] items-center justify-center shadow shadow-md">
      {/* 여기는 1단계~4단계 내용 들어갈 부분 */}
      {content[currentStep - 1]}
    </div>
  );
};

export default StepBox;
