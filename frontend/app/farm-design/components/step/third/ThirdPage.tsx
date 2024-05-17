"use client";

import Button from "@/app/_components/common/Button";
import { useEffect, useState } from "react";
import CropsBox from "../CropsBox";
import TitleBox from "../TitleBox";
import ShowArrangement from "@/app/_components/common/ShowArrangement";
import ShowStylePage from "../ShowStylePage";
import {
  FarmCoordinateType,
  FieldCropsListType,
  cropIndexType,
} from "../StepBox";
import { CreateCustomDesign, getCustomEmptyField } from "@/api/farm-design";
import {
  CreateCustomDesignParams,
  getCustomEmptyResponse,
} from "@/type/farmDesginType";

interface CropQuantity {
  cropId: number;
  quantity: number;
}

interface CropLength {
  cropId: number;
  name: string;
  isRecommended: boolean;
  cropLengthAndAreaDto: {
    height: number;
    width: number;
    area: number;
  };
}

interface Props {
  handleStep: (step: number) => void;
  userAccessToken: string;
  fieldCropsList: FieldCropsListType[];
  fieldDesignId: number;
  clickableField: boolean[][];
  grid: number[][];
  handleUpdateFieldGridArray: (newFieldGridArray: number[][]) => void;
  cropIndexArray: cropIndexType[];
  handleUpdateCropIndexArray: (newCropIndexArray: cropIndexType[]) => void;
  farmCoordinateArray: FarmCoordinateType[];

  handleFarmCoordinateArray: (newCoordinateArray: FarmCoordinateType[]) => void;
  handleUpdateCropsNameList: (newCropsNameList: string[]) => void;
}

const ThirdPage = ({
  handleStep,
  userAccessToken,
  fieldCropsList,
  fieldDesignId,
  clickableField,
  grid,
  handleUpdateFieldGridArray,
  cropIndexArray,
  farmCoordinateArray,
  handleFarmCoordinateArray,
  handleUpdateCropIndexArray,
  handleUpdateCropsNameList,
}: Props) => {
  // cropsList: 작물 배열
  const [cropsList, setCropsList] = useState<FieldCropsListType[]>([]);

  //현재 클릭한 작물의 인덱스
  const [currentCropsIndex, setCurrentCropsIndex] = useState<number>(-1);

  //   작물 컴포넌트 클릭시 isClick 변환 (이전에 클릭된건 지움)
  const handleClick = (index: number) => {
    setIsCancel(false);
    setCropsList((prevCropsList) => {
      const updatedCropsList = [...prevCropsList];

      if (currentCropsIndex >= 0) {
        updatedCropsList[currentCropsIndex] = {
          ...updatedCropsList[currentCropsIndex],
          isClick: !updatedCropsList[currentCropsIndex].isClick,
        };
      }
      updatedCropsList[index] = {
        ...updatedCropsList[index],
        isClick: !updatedCropsList[index].isClick,
      };

      setCurrentCropsIndex(index);

      return updatedCropsList;
    });
  };

  const [isSave, setIsSave] = useState<boolean>(false);

  // 저장하기
  const handleSave = async () => {
    // 작물마다 몇 개인지 알려주는 배열
    const numberCropLsit: CropQuantity[] = [];

    for (let i = 0; i < cropIndexArray.length; i++) {
      //indexArray[i]의 cropId와 같은 cropId를 numberCropList에서 찾음
      const findCrop = numberCropLsit.find(
        (crop) => crop.cropId === cropIndexArray[i].cropId
      );

      // 있으면 +1
      if (findCrop) {
        findCrop.quantity++;
      } else {
        // 없으면 새로 추가함
        numberCropLsit.push({
          cropId: cropIndexArray[i].cropId,
          quantity: 1,
        });
      }
    }

    // api 연결
    const result: CreateCustomDesignParams = await CreateCustomDesign({
      accessToken: userAccessToken,
      request: {
        designArray: grid,
        cropNumberAndCropIdDtoList: cropIndexArray,
        cropIdAndQuantityDtoList: numberCropLsit,
      },
      designId: fieldDesignId,
    });

    handleUpdateCropIndexArray(cropIndexArray);
    handleUpdateFieldGridArray(grid);

    // 저장하기 버튼 누름
    setIsSave(true);
  };

  // 삭제 버튼 (작물 배치한 거 취소할 때)
  const [isCancel, setIsCancel] = useState<boolean>(false);

  // 삭제 함수
  const handleCancel = () => {
    setIsCancel(!isCancel);
    setCropsList((prevCropsList) => {
      const updatedCropsList = [...prevCropsList];

      if (currentCropsIndex >= 0) {
        updatedCropsList[currentCropsIndex] = {
          ...updatedCropsList[currentCropsIndex],
          isClick: !updatedCropsList[currentCropsIndex].isClick,
        };
      }

      setCurrentCropsIndex(-1);

      return updatedCropsList;
    });
  };

  // nextIndex: 다음 번호
  const [nextIndex, setNextIndex] = useState<number>(1);

  // 셀을 클릭할 때
  const handleClickCell = (rowIndex: number, colIndex: number) => {
    // 작물 클릭 후 셀 클릭 할 때
    // 1. currentCrops가 null이 아닐 때, grid[rowIndex][colIndex]이 0이 아닌 걸 클릭하면 아무런 일도 일어나지 않음
    // 2. currentCrops가 null이 아닐 때, grid[rowIndex][colIndex] 값이 0이고 clickableField[rowIndex][colIndex] 값이 true면
    if (
      currentCropsIndex >= 0 &&
      grid[rowIndex][colIndex] === 0 &&
      clickableField[rowIndex][colIndex]
    ) {
      // 2-1. currentCrops의 id(cropId임)(이것도변경)가 cropLengthList(변경 cropsList로)에서 cropId와 같은 객체의 cropLengthAndAreaDto의 height와 width를 가져옴
      const { cropHeight: height, cropWidth: width } =
        cropsList[currentCropsIndex];

      // 2-2. 클릭한 셀로부터 가로로 width/10 만큼의 크기, 세로로 height/10만큼의 크기만큼의 칸들이 clickableField에서 true인지, grid에서 0인지 확인함
      let isValid = true;
      for (let r = rowIndex; r < rowIndex + height / 10; r++) {
        for (let c = colIndex; c < colIndex + width / 10; c++) {
          if (!clickableField[r]?.[c] || grid[r]?.[c] !== 0) {
            isValid = false;
            break;
          }
        }
        if (!isValid) {
          alert(`해당 작물을 배치하기엔 칸이 부족합니다.
            가로: ${width / 10}칸, 세로: ${height / 10}칸 필요`);
          break;
        }
      }

      // 3. 만약 2-2까지 통과한다면 클릭한 셀로부터 가로로 width/10 만큼의 크기, 세로로 height/10만큼의 크기만큼의 칸들에 인덱스를 줄 건데 그 인덱스 숫자는 indexArray의 가장 큰 number에 +1 한 값이며, grid[][] 배열에서 0을 해당 인덱스 숫자로 바꾼다.
      if (isValid) {
        setNextIndex((pre) => pre + 1);
        const newGrid = [...grid];
        for (let r = rowIndex; r < rowIndex + height / 10; r++) {
          for (let c = colIndex; c < colIndex + width / 10; c++) {
            newGrid[r][c] = nextIndex;
          }
        }
        handleUpdateFieldGridArray(newGrid);

        // 4. indexArray에 해당 인덱스 number와 해당 작물을 추가한다.
        handleUpdateCropIndexArray([
          ...cropIndexArray,
          { cropId: cropsList[currentCropsIndex].id, number: nextIndex },
        ]);
      }
    }

    // 삭제 버튼 클릭 후 셀 클릭 할 때
    // 1. 삭제 버튼이 true일 경우에만 작동하며 grid[rowIndex][colIndex]가 0이면 아무 일도 일어나지 않음
    if (isCancel && grid[rowIndex][colIndex] !== 0) {
      // 2. 삭제 버튼이 true이고, 클릭한 셀의 grid[rowIndex][colIndex]에 숫자가 있다면 grid 안에 같은 해당 숫자를 모두 0으로 바꿈
      const clickedIndex = grid[rowIndex][colIndex];
      const newGrid = grid.map((row) =>
        row.map((cell) => (cell === clickedIndex ? 0 : cell))
      );
      handleUpdateFieldGridArray(newGrid);

      // 3. 해당 숫자와 같은 indexArray의 number 값을 찾고 해당 객체{}를 삭제함
      handleUpdateCropIndexArray(
        cropIndexArray.filter((crop) => crop.number !== clickedIndex)
      );
    }
  };

  // 테두리 클릭시에 아이콘 사라지지 않는 오류 해결을 위한 함수(테두리 클릭시에도 내려보내기)
  const handleDeleteCrop = (cropNumber: number) => {
    if (isCancel) {
      const newGrid = grid.map((row) =>
        row.map((cell) => (cell === cropNumber ? 0 : cell))
      );
      handleUpdateFieldGridArray(newGrid);

      handleUpdateCropIndexArray(
        cropIndexArray.filter((crop) => crop.number !== cropNumber)
      );
    }
  };

  useEffect(() => {
    const fetchGetCustomInfo = async () => {
      const result: getCustomEmptyResponse = await getCustomEmptyField({
        accessToken: userAccessToken,
        designId: fieldDesignId,
      });

      // 작물 목록 초기화
      const initialCropsList: FieldCropsListType[] = result.cropList.map(
        (crop) => ({
          id: crop.cropId,
          name: crop.name,
          isClick: false,
          isRecommend: crop.isRecommended,
          cropHeight: crop.cropLengthAndAreaDto.cropHeight,
          cropWidth: crop.cropLengthAndAreaDto.cropWidth,
          area: crop.cropLengthAndAreaDto.area,
        })
      );

      setCropsList(initialCropsList);
    };

    // 처음 렌더링 할 때 저장한 작물 리스트가 있으면 있는 거 가져옴
    if (fieldCropsList.length > 0) {
      setCropsList(fieldCropsList);
      setNextIndex(cropIndexArray.length + 2);
    } else {
      // 처음 렌더링 할때 저장한 작물 리스트가 없을 때 작물리스트 넣기
      //(1단게 => 3단계 커스텀 바로 갈 때)
      fetchGetCustomInfo();
    }
  }, []);

  useEffect(() => {
    console.log(grid);
  }, [grid]);

  useEffect(() => {
    if (currentCropsIndex >= 0) console.log(cropsList[currentCropsIndex].id);
  }, [currentCropsIndex]);

  useEffect(() => {
    console.log(cropIndexArray);
  }, [cropIndexArray]);

  return (
    <>
      {isSave ? (
        <ShowStylePage
          handleStep={handleStep}
          step={3}
          userAccessToken={userAccessToken}
          crops={cropIndexArray}
          clickableField={clickableField}
          grid={grid}
          farmCoordinateArray={farmCoordinateArray}
          designId={fieldDesignId}
          handleUpdateCropsNameList={handleUpdateCropsNameList}
        />
      ) : (
        <div className="relative flex flex-col justify-between items-center w-[90%] h-[95%] ">
          <TitleBox
            basicText1="텃밭을"
            pointText="커스텀"
            basicText2="해보세요"
          />
          <Button
            text="삭제"
            bgStyles={`hover:bg-green-400 hover:text-white-100  ${
              isCancel
                ? "bg-green-300 text-white-100"
                : "bg-white-100 text-green-500"
            } absolute right-5 py-2 px-4 rounded-md shadow-lg`}
            textStyles="font-bold text-sm"
            handleClick={handleCancel}
            buttonStyle="reset"
          />

          {/* 가운데 (작물 리스트 + 커스텀 공간) */}
          <div className="flex w-full h-[80%] gap-1 ">
            <div className="flex flex-wrap overflow-y-auto flex-1 gap-3 py-3 rounded-lg justify-center items-center">
              {cropsList.map((crops, index) => (
                <CropsBox
                  key={crops.id}
                  index={index}
                  id={crops.id}
                  name={crops.name}
                  isClick={crops.isClick}
                  isRecommend={crops.isRecommend}
                  handleClick={handleClick}
                />
              ))}
            </div>
            <div className="flex justify-center items-center border border-green-100 rounded-[20px] w-[70%] bg-white-100 overflow-hidden">
              <div className="w-full h-full overflow-y-auto">
                <ShowArrangement
                  grid={grid}
                  crops={cropIndexArray}
                  type="custom"
                  checkArray={clickableField}
                  handlePlace={handleClickCell}
                  handleDeleteCrop={handleDeleteCrop}
                />
              </div>
            </div>
          </div>

          {currentCropsIndex !== -1 ? (
            <div className="absolute left-0 top-5">
              <div className="flex gap-2 items-center">
                <div className="font-bold text-lg">
                  {cropsList[currentCropsIndex].name}
                </div>
                <div className="flex gap-1">
                  <div> 세로: </div>
                  <div className="flex">
                    <div className="text-green-300 font-bold">
                      {cropsList[currentCropsIndex].cropHeight / 10}
                    </div>
                    <div>칸</div>
                  </div>
                </div>
                <div className="flex gap-1">
                  <div> 가로: </div>
                  <div className="flex">
                    <div className="text-green-300 font-bold">
                      {cropsList[currentCropsIndex].cropWidth / 10}
                    </div>
                    <div>칸</div>
                  </div>
                </div>
              </div>
            </div>
          ) : null}

          <Button
            text="저장하기"
            bgStyles="bg-green-400 px-5"
            textStyles="text-white-100 font-semibold"
            handleClick={handleSave}
          />
        </div>
      )}
    </>
  );
};

export default ThirdPage;
