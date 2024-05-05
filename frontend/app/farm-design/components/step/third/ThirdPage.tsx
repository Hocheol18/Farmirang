"use client";

import Button from "@/app/_components/common/Button";
import { useEffect, useState } from "react";
import CropsBox from "../CropsBox";
import TitleBox from "../TitleBox";
import Input from "@/app/_components/common/Input";

interface Crops {
  id: number;
  name: string;
  isClick: boolean;
  isRecommend: boolean;
}

const ThirdPage = () => {
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

  //현재 클릭한 작물
  const [currentCrops, setCurrentCrops] = useState<Crops | null>();

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

  //   작물 컴포넌트 클릭시 isClick 변환 (이전에 클릭된건 지움)
  const handleClick = (id: number) => {
    setCropsList((prevCropsList) => {
      const updatedCropsList = [...prevCropsList];

      if (currentCrops) {
        updatedCropsList[currentCrops.id - 1] = {
          ...updatedCropsList[currentCrops.id - 1],
          isClick: !updatedCropsList[currentCrops.id - 1].isClick,
        };
      }

      updatedCropsList[id - 1] = {
        ...updatedCropsList[id - 1],
        isClick: !updatedCropsList[id - 1].isClick,
      };

      setCurrentCrops(cropsList[id - 1]);

      return updatedCropsList;
    });
  };

  const [isSave, setIsSave] = useState<boolean>(false);

  // 저장하기 버튼 눌렀는지
  const handleSaveButton = () => {
    setIsSave(!isSave);
  };

  // 임시 함수...
  const tmpHandleFunction = () => {};

  const InputCSS = `w-36 rounded-lg bg-white-100 border-0 bg-transparent h-[2rem] py-1 pl-3 text-black-100 placeholder:text-gary-500 sm:text-sm sm:leading-6 shadow`;

  return (
    <>
      {isSave ? (
        <div className="flex flex-col pb-1 gap-[5%] justify-center items-center overflow-y-auto w-full h-full">
          <TitleBox basicText1="완성된" pointText="텃밭꾸미기" basicText2="" />

          {/* 이안에 추천된 텃밭꾸미기 들어갈 것 */}
          <div className="flex justify-center items-center w-[80%] h-[70%] bg-white-100 rounded-[20px] shadow">
            완성된 텃밭꾸미기 보여주는 곳
          </div>
          {/* 버튼들 */}
          <div className="flex gap-3 items-center px-[10%]">
            {/* 이름 저장 Input */}
            <div className="flex items-center gap-3 mr-5">
              <div className="font-bold">텃밭 이름: </div>
              {/* value, onChange 바꿔야 함 */}
              <Input
                topcss={""}
                labeltext={""}
                labelcss={""}
                inputcss={InputCSS}
                placeholder={"이름을 지정해주세요"}
                type={"text"}
                value={""}
                onChange={tmpHandleFunction}
              />
            </div>
            <Button
              text="저장하기"
              bgStyles="bg-green-400 px-6"
              textStyles="text-white-100 font-semibold"
              handleClick={tmpHandleFunction}
            />
          </div>
        </div>
      ) : (
        <div className="flex flex-col justify-between items-center w-[90%] h-[95%]">
          <TitleBox
            basicText1="텃밭을"
            pointText="커스텀"
            basicText2="해보세요"
          />
          {/* 가운데 (작물 리스트 + 커스텀 공간) */}
          <div className="flex w-full h-[80%] gap-1 ">
            <div className="flex flex-wrap overflow-y-auto flex-1 gap-3 py-3 rounded-lg justify-center items-center">
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
            <div className="border border-green-100 rounded-[20px] w-[70%] h-full bg-white-100">
              오른쪽 커스텀
            </div>
          </div>
          <Button
            text="저장하기"
            bgStyles="bg-green-400 px-5"
            textStyles="text-white-100 font-semibold"
            handleClick={handleSaveButton}
          />
        </div>
      )}
    </>
  );
};

export default ThirdPage;
