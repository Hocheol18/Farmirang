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
  const cropsName: string[] = [
    "감자",
    "고구마",
    "청양고추",
    "당근",
    "딸기",
    "땅콩",
    "방울토마토",
    "부추",
    "블루베리",
    "상추",
    "생강",
    "양파",
    "열무",
    "오이",
    "옥수수",
    "참외",
  ];

  // cropsList: 작물 배열
  const [cropsList, setCropsList] = useState<Crops[]>([]);

  // clickedCrops: 선택한 작물 배열
  const [clickedCrops, setClickedCrops] = useState<Crops[]>([]);

  // totalRidgeArea: 심을 수 있는 밭의 전체 면적
  const [totalRidgeArea, setTotalRidgeArea] = useState<number>(0);

  // ridgeWidth: 두둑 가로 (작물의 cropWidth랑 비교)
  const [ridgeWidth, setRidgeWidth] = useState<number>(0);

  // ridgeWidth: 두둑 세로 (작물의 cropHeight랑 비교)
  const [ridgeHeight, setRidgeHeight] = useState<number>(0);

  // 처음 렌더링 할때 작물 배열에 넣기
  useEffect(() => {
    const fetchGetCropInfo = async () => {
      if (fieldDesignId !== 0) {
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
          })
        );
        setCropsList(initialCropsList);

        // 밭의 면적, 두둑 가로, 두둑 세로 모두 업데이트
        setTotalRidgeArea(result.totalRidgeArea);
        setRidgeWidth(result.ridgeWidth);
        setRidgeHeight(result.ridgeHeight);
      }
      //if 끝
    };

    fetchGetCropInfo();
  }, []);

  //   작물 컴포넌트 클릭시 isClick 변환
  const handleClick = (id: number) => {
    setCropsList((prevCropsList) => {
      const updatedCropsList = [...prevCropsList];
      updatedCropsList[id - 1] = {
        ...updatedCropsList[id - 1],
        isClick: !updatedCropsList[id - 1].isClick,
      };
      return updatedCropsList;
    });
  };

  // 작물 배열이 변할 때마다 선택한 작물 배열 변함
  useEffect(() => {
    const updatedClickedCrops = cropsList.filter((crops) => crops.isClick);
    setClickedCrops(updatedClickedCrops);
  }, [cropsList]);

  // 임시...함수
  const tmpHandleFunction = () => {
    handleCheck();
  };

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
              <CropsInput key={index} id={crops.id} name={crops.name} />
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
