import React, { useEffect, useState } from "react";
import CropsBox from "../CropsBox";
import TitleBox from "../TitleBox";

interface Crops {
  id: number;
  name: string;
  isClick: boolean;
  isRecommend: boolean;
}

const SecondFirstPage = () => {
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

  // 처음 렌더링 할때 작물 배열에 넣기
  useEffect(() => {
    const initialCropsList: Crops[] = [];
    for (let i = 1; i <= 16; i++) {
      initialCropsList.push({
        id: i,
        name: cropsName[i - 1],
        isClick: false,
        isRecommend: false,
      });
    }
    setCropsList(initialCropsList);
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

  return (
    <div className="overflow-y-auto w-full h-full flex flex-col items-center border border-black-100">
      <TitleBox basicText1="작물을" basicText2="해주세요" pointText="선택" />

      {/* 작물 선택 */}
      <div className="grid grid-cols-8">
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

      <TitleBox
        basicText1="선택한 작물의 개수와"
        pointText="우선순위"
        basicText2="를 입력해주세요"
      />
    </div>
  );
};

export default SecondFirstPage;
