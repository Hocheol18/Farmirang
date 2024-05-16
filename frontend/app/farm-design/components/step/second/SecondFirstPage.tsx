import React, { useEffect, useState } from "react";
import CropsBox from "../CropsBox";
import TitleBox from "../TitleBox";
import CropsInput from "./CropsInput";
import Button from "@/app/_components/common/Button";
import { getCropInfo } from "@/api/farm-design";
import { CropInfo, getCropInfoResponse } from "@/type/farmDesginType";

interface Crops {
  id: number;
  name: string;
  isClick: boolean;
  isRecommend: boolean;
  cropHeight: number;
  cropWidth: number;
  area: number;
  priority: number;
  inputNumber: number | "";
}

interface Priority {
  id: number;
  name: string;
}

interface Props {
  handleCheck: () => void;
  userAccessToken: string;
  fieldDesignId: number;
}

const SecondFirstPage = ({
  handleCheck,
  userAccessToken,
  fieldDesignId,
}: Props) => {
  // cropsList: 작물 배열
  const [cropsList, setCropsList] = useState<Crops[]>([]);

  // clickedCrops: 선택한 작물 배열
  const [clickedCrops, setClickedCrops] = useState<Crops[]>([]);

  // totalRidgeArea: 심을 수 있는 밭의 전체 면적
  const [totalRidgeArea, setTotalRidgeArea] = useState<number>(0);

  // currentRidgeArea: 전체 면적 - 각 작물의 갯수 x 각 작물의 면적
  const [currentRidgeArea, setCurrentRidgeArea] = useState<number>(0);

  // ridgeWidth: 두둑 가로 (작물의 cropWidth랑 비교)
  const [ridgeWidth, setRidgeWidth] = useState<number>(0);

  // ridgeWidth: 두둑 세로 (작물의 cropHeight랑 비교)
  const [ridgeHeight, setRidgeHeight] = useState<number>(0);

  //   작물 컴포넌트 클릭시
  const handleClick = (index: number) => {
    if (
      cropsList[index].cropWidth <= ridgeWidth &&
      cropsList[index].cropHeight <= ridgeHeight
    ) {
      // isClick 변수 변경
      setCropsList((prevCropsList) => {
        console.log(prevCropsList);
        const updatedCropsList = [...prevCropsList];
        updatedCropsList[index] = {
          ...updatedCropsList[index],
          isClick: !updatedCropsList[index].isClick,
          inputNumber: "", // 초기화
        };
        return updatedCropsList;
      });

      // 우선 순위 배열 객체 추가
      const updatePriorityArr = priorityArr;

      updatePriorityArr.push({
        id: priorityArr.length + 1,
        name: `${priorityArr.length + 1}`,
      });

      setPriorityArr(updatePriorityArr);
    } else {
      alert("이 작물을 두둑에 심기에는 너무 큽니다.");
    }
  };

  // 임시...함수
  const tmpHandleFunction = () => {
    handleCheck();
  };

  // 우선 순위 배열
  const [priorityArr, setPriorityArr] = useState<Priority[]>([]);

  // 선택한 작물의 우선순위 변경 함수
  const handlePriority = (cropId: number, priority: number) => {
    setCropsList((prevCropsList) => {
      const updatedCropsList = prevCropsList.map((crop) => {
        if (crop.id === cropId) {
          return {
            ...crop,
            priority: priority,
          };
        }
        return crop;
      });
      return updatedCropsList;
    });
  };

  // 선택한 작물의 개수 변경 함수
  const handleChangeInput = (
    cropId: number,
    inputNumber: number | "",
    area: number
  ) => {
    setCropsList((prevCropsList) => {
      const updatedCropsList = prevCropsList.map((crop) => {
        if (crop.id === cropId) {
          let updatedInputNumber: number | "" = inputNumber;

          if (inputNumber !== "") {
            const parsedInputNumber = Number(inputNumber);
            const remainingArea =
              currentRidgeArea +
              (crop.inputNumber ? crop.inputNumber * area : 0);
            const possibleNumber = Math.floor(remainingArea / area);

            if (parsedInputNumber > possibleNumber) {
              updatedInputNumber = possibleNumber;
            } else if (parsedInputNumber < 0) {
              updatedInputNumber = 0;
            } else {
              updatedInputNumber = parsedInputNumber;
            }
          }

          return {
            ...crop,
            inputNumber: updatedInputNumber,
          };
        }
        return crop;
      });
      return updatedCropsList;
    });

    console.log(cropsList);
  };

  // 처음 렌더링 할때 작물 배열에 넣기
  useEffect(() => {
    const fetchGetCropInfo = async () => {
      // if (fieldDesignId !== 0) {
      const result: getCropInfoResponse = await getCropInfo({
        accessToken: userAccessToken,
        designId: fieldDesignId,
      });

      // 작물 목록 초기화
      const initialCropsList: Crops[] = result.cropList.map(
        (crop: CropInfo) => ({
          id: crop.cropId,
          name: crop.name,
          isClick: false,
          isRecommend: crop.isRecommended,
          cropHeight: crop.cropLengthAndAreaDto.cropHeight,
          cropWidth: crop.cropLengthAndAreaDto.cropWidth,
          area: crop.cropLengthAndAreaDto.area,
          priority: 1,
          inputNumber: "",
        })
      );
      setCropsList(initialCropsList);

      // 밭의 면적, 두둑 가로, 두둑 세로 모두 업데이트
      setTotalRidgeArea(result.totalRidgeArea);
      setRidgeWidth(result.ridgeWidth);
      setRidgeHeight(result.ridgeHeight);
    };
    //if 끝
    // };

    fetchGetCropInfo();
  }, []);

  useEffect(() => {
    // 작물 배열이 변할 때마다 선택한 작물 배열 변함
    const updatedClickedCrops = cropsList.filter((crops) => crops.isClick);
    setClickedCrops(updatedClickedCrops);
  }, [cropsList]);

  useEffect(() => {
    // 선택한 배열이 변할 때마다 현재 사용 가능한 면적 업데이트
    let sum = 0;
    clickedCrops.forEach((item, index) => {
      if (item.inputNumber !== "") {
        sum += item.inputNumber * item.area;
      }
    });

    console.log("sum" + sum + " totalRidgeArea: " + totalRidgeArea);

    setCurrentRidgeArea(totalRidgeArea - sum);
  }, [clickedCrops]);

  return (
    <div className="gap-10 overflow-y-auto w-full h-full flex flex-col items-center">
      <div className="flex flex-col items-center gap-7">
        <TitleBox basicText1="작물을" basicText2="해주세요" pointText="선택" />

        {/* 작물 선택 */}
        <div className=" grid grid-cols-8">
          {cropsList.map((crops, index) => (
            <CropsBox
              key={index}
              id={crops.id}
              index={index}
              name={crops.name}
              isClick={crops.isClick}
              isRecommend={crops.isRecommend}
              handleClick={handleClick}
            />
          ))}
        </div>
      </div>
      <div className="flex flex-col items-center gap-7 w-full">
        <TitleBox
          basicText1="선택한 작물의 개수와"
          pointText="우선순위"
          basicText2="를 입력해주세요"
        />
        {clickedCrops.length > 0 ? (
          <div className="grid grid-cols-2 w-[80%] gap-4">
            {clickedCrops.map((crops, index) => (
              <CropsInput
                key={index}
                id={crops.id}
                name={crops.name}
                priorityArr={priorityArr}
                priority={crops.priority}
                onChange={(priority) => handlePriority(crops.id, priority)}
                inputNumber={crops.inputNumber}
                handleChangeInput={(inputNumber) =>
                  handleChangeInput(crops.id, inputNumber, crops.area)
                }
                placeholder={Math.floor(currentRidgeArea / crops.area)}
              />
            ))}
          </div>
        ) : (
          <div className="underline decoration-green-300 text-gray-400 text-lg decoration-wavy">
            작물을 선택해주세요!
          </div>
        )}
      </div>

      {clickedCrops.length > 0 ? (
        <Button
          text="확인"
          bgStyles="bg-green-400 px-6 "
          textStyles="text-white-100 font-semibold"
          handleClick={tmpHandleFunction}
        />
      ) : null}
    </div>
  );
};

export default SecondFirstPage;
