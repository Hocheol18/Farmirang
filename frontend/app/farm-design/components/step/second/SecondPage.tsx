"use client";

import { useState } from "react";
import SecondFirstPage from "./SecondFirstPage";
import ShowStylePage from "../ShowStylePage";
import {
  FarmCoordinateType,
  FieldCropsListType,
  cropIndexType,
} from "../StepBox";

interface Props {
  handleStep: (step: number) => void;
  userAccessToken: string;
  fieldDesignId: number;
  handleUpdateFieldCropsList: (newFieldCropsList: FieldCropsListType[]) => void;
  cropIndexArray: cropIndexType[];
  handleUpdateCropIndexArray: (newCropIndexArray: cropIndexType[]) => void;
  fieldClickableArray: boolean[][];
  handleUpdateFieldGridArray: (newFieldGridArray: number[][]) => void;
  fieldGridArray: number[][];
  handleFarmCoordinateArray: (newCoordinateArray: FarmCoordinateType[]) => void;
  farmCoordinateArray: FarmCoordinateType[];
  handleUpdateCropsNameList: (newCropsNameList: string[]) => void;
}

const SecondPage = ({
  handleStep,
  userAccessToken,
  fieldDesignId,
  handleUpdateFieldCropsList,
  cropIndexArray,
  handleUpdateCropIndexArray,
  fieldClickableArray,
  handleUpdateFieldGridArray,
  fieldGridArray,
  handleFarmCoordinateArray,
  farmCoordinateArray,
  handleUpdateCropsNameList,
}: Props) => {
  // 몇 번째 second 페이지 보여줄지 (false => 1번째, true=> 2번째)
  const [isCheck, setIsCheck] = useState<boolean>(false);

  const handleCheck = () => {
    setIsCheck(true);
  };

  return (
    <div className=" flex flex-col w-[95%] h-[95%]  ">
      {!isCheck ? (
        <SecondFirstPage
          handleCheck={handleCheck}
          userAccessToken={userAccessToken}
          fieldDesignId={fieldDesignId}
          handleUpdateFieldCropsList={handleUpdateFieldCropsList}
          handleUpdateCropIndexArray={handleUpdateCropIndexArray}
          handleUpdateFieldGridArray={handleUpdateFieldGridArray}
          handleFarmCoordinateArray={handleFarmCoordinateArray}
        />
      ) : (
        <ShowStylePage
          handleStep={handleStep}
          step={2}
          userAccessToken={userAccessToken}
          crops={cropIndexArray}
          clickableField={fieldClickableArray}
          grid={fieldGridArray}
          farmCoordinateArray={farmCoordinateArray}
          designId={fieldDesignId}
          handleUpdateCropsNameList={handleUpdateCropsNameList}
        />
      )}
    </div>
  );
};

export default SecondPage;
