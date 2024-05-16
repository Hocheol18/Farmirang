"use client";

import Button from "@/app/_components/common/Button";
import { useEffect, useState } from "react";
import CropsBox from "../CropsBox";
import TitleBox from "../TitleBox";
import Input from "@/app/_components/common/Input";
import ShowArrangement from "@/app/_components/common/ShowArrangement";
import ShowStylePage from "../ShowStylePage";

interface Crops {
  id: number;
  name: string;
  isClick: boolean;
  isRecommend: boolean;
}

interface CropIndex {
  cropId: number;
  number: number;
}

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
}

const ThirdPage = ({ handleStep, userAccessToken }: Props) => {
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

  //   작물 컴포넌트 클릭시 isClick 변환 (이전에 클릭된건 지움)
  const handleClick = (id: number) => {
    setIsCancel(false);
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

  // 저장하기
  const handleSave = () => {
    // 작물마다 몇 개인지 알려주는 배열
    const numberCropLsit: CropQuantity[] = [];

    for (let i = 0; i < indexArray.length; i++) {
      //indexArray[i]의 cropId와 같은 cropId를 numberCropList에서 찾음
      const findCrop = numberCropLsit.find(
        (crop) => crop.cropId === indexArray[i].cropId
      );

      // 있으면 +1
      if (findCrop) {
        findCrop.quantity++;
      } else {
        // 없으면 새로 추가함
        numberCropLsit.push({
          cropId: indexArray[i].cropId,
          quantity: 1,
        });
      }
    }

    handleStep(4);
  };

  const InputCSS = `w-36 rounded-lg bg-white-100 border-0 bg-transparent h-[2rem] py-1 pl-3 text-black-100 placeholder:text-gary-500 sm:text-sm sm:leading-6 shadow`;

  // 작물 리스트
  const cropLengthList: CropLength[] = [
    {
      cropId: 5,
      name: "딸기",
      isRecommended: true,
      cropLengthAndAreaDto: {
        height: 10,
        width: 20,
        area: 1200,
      },
    },

    {
      cropId: 1,
      name: "감자",
      isRecommended: false,
      cropLengthAndAreaDto: {
        height: 20,
        width: 30,
        area: 1000,
      },
    },

    {
      cropId: 3,
      name: "청양고추",
      isRecommended: false,
      cropLengthAndAreaDto: {
        height: 10,
        width: 30,
        area: 3200,
      },
    },
    {
      cropId: 2,
      name: "고구마",
      isRecommended: false,
      cropLengthAndAreaDto: {
        height: 10,
        width: 20,
        area: 2400,
      },
    },
    {
      cropId: 6,
      name: "땅콩",
      isRecommended: false,
      cropLengthAndAreaDto: {
        height: 10,
        width: 10,
        area: 800,
      },
    },

    {
      cropId: 4,
      name: "당근",
      isRecommended: false,
      cropLengthAndAreaDto: {
        height: 10,
        width: 10,
        area: 1200,
      },
    },
  ];

  // 5 x 20
  const [grid, setGrid] = useState<number[][]>([
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 3, 3, 3, 0, 0, 0, 0],
    [0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 4, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 6, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5, 5],
  ]);

  const clickableField = [
    [
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      true,
      true,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
    ],
    [
      false,
      false,
      false,
      true,
      true,
      true,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      true,
      true,
      true,
      false,
      false,
      false,
      false,
    ],
    [
      false,
      false,
      false,
      true,
      true,
      true,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      true,
      false,
      false,
      false,
      false,
      false,
    ],
    [
      false,
      false,
      false,
      false,
      false,
      false,
      true,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
    ],
    [
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      true,
      true,
      true,
      true,
    ],
  ];

  const crops: CropIndex[] = [
    {
      cropId: 1,
      number: 1,
    },
    {
      cropId: 2,
      number: 2,
    },

    {
      cropId: 3,
      number: 3,
    },
    {
      cropId: 4,
      number: 4,
    },

    {
      cropId: 5,
      number: 5,
    },
    {
      cropId: 6,
      number: 6,
    },
  ];

  // 삭제 버튼 (작물 배치한 거 취소할 때)
  const [isCancel, setIsCancel] = useState<boolean>(false);

  // 삭제 함수
  const handleCancel = () => {
    setIsCancel(!isCancel);
    setCropsList((prevCropsList) => {
      const updatedCropsList = [...prevCropsList];

      if (currentCrops) {
        updatedCropsList[currentCrops.id - 1] = {
          ...updatedCropsList[currentCrops.id - 1],
          isClick: !updatedCropsList[currentCrops.id - 1].isClick,
        };
      }

      setCurrentCrops(null);

      return updatedCropsList;
    });
  };

  // 몇 번에 cropId 몇인지 알려주는 배열 (처음엔 crops 배열과 같음)
  const [indexArray, setIndexArray] = useState<CropIndex[]>(crops);

  // nextIndex: 다음 번호
  const [nextIndex, setNextIndex] = useState<number>(1);

  // 셀을 클릭할 때
  const handleClickCell = (rowIndex: number, colIndex: number) => {
    // 작물 클릭 후 셀 클릭 할 때
    if (currentCrops) {
      // 1. currentCrops가 null이 아닐 때, grid[rowIndex][colIndex]이 0이 아닌 걸 클릭하면 아무런 일도 일어나지 않음
      if (grid[rowIndex][colIndex] !== 0) {
        return;
      }

      // 2. currentCrops가 null이 아닐 때, grid[rowIndex][colIndex] 값이 0이고 clickableField[rowIndex][colIndex] 값이 true면
      if (
        grid[rowIndex][colIndex] === 0 &&
        clickableField[rowIndex][colIndex]
      ) {
        // 2-1. currentCrops의 id(cropId임)가 cropLengthList에서 cropId와 같은 객체의 cropLengthAndAreaDto의 height와 width를 가져옴
        const { height, width } = cropLengthList.find(
          (crop) => crop.cropId === currentCrops.id
        )?.cropLengthAndAreaDto || { height: 0, width: 0 };

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
          setGrid(newGrid);

          // 4. indexArray에 해당 인덱스 number와 해당 작물을 추가한다.
          setIndexArray([
            ...indexArray,
            { cropId: currentCrops.id, number: nextIndex },
          ]);
        }
      }
    }

    // 삭제 버튼 클릭 후 셀 클릭 할 때
    if (isCancel) {
      // 1. 삭제 버튼이 true일 경우에만 작동하며 grid[rowIndex][colIndex]가 0이면 아무 일도 일어나지 않음
      if (grid[rowIndex][colIndex] === 0) {
        return;
      }

      // 2. 삭제 버튼이 true이고, 클릭한 셀의 grid[rowIndex][colIndex]에 숫자가 있다면 grid 안에 같은 해당 숫자를 모두 0으로 바꿈
      const clickedIndex = grid[rowIndex][colIndex];
      const newGrid = grid.map((row) =>
        row.map((cell) => (cell === clickedIndex ? 0 : cell))
      );
      setGrid(newGrid);

      // 3. 해당 숫자와 같은 indexArray의 number 값을 찾고 해당 객체{}를 삭제함
      setIndexArray(indexArray.filter((crop) => crop.number !== clickedIndex));
    }
  };

  // 테두리 클릭시에 아이콘 사라지지 않는 오류 해결을 위한 함수(테두리 클릭시에도 내려보내기)
  const handleDeleteCrop = (cropNumber: number) => {
    if (isCancel) {
      const newGrid = grid.map((row) =>
        row.map((cell) => (cell === cropNumber ? 0 : cell))
      );
      setGrid(newGrid);

      setIndexArray(indexArray.filter((crop) => crop.number !== cropNumber));
    }
  };

  useEffect(() => {
    // 처음 렌더링 할때 작물 배열에 넣기
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

    // 처음 렌더링 할 때 nextIndex 찾기
    const nextNum = Math.max(...indexArray.map((crop) => crop.number)) + 1;
    setNextIndex(nextNum);
  }, []);

  useEffect(() => {
    console.log(grid);
  }, [grid]);

  useEffect(() => {
    if (currentCrops) console.log(currentCrops.id);
  }, [currentCrops]);

  return (
    <>
      {isSave ? (
        <ShowStylePage
          handleStep={handleStep}
          step={3}
          userAccessToken={userAccessToken}
        />
      ) : (
        <div className="relative flex flex-col justify-between items-center w-[90%] h-[95%]">
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
                  key={index}
                  id={crops.id}
                  name={crops.name}
                  isClick={crops.isClick}
                  isRecommend={crops.isRecommend}
                  handleClick={handleClick}
                />
              ))}
            </div>
            <div className="flex jsutify-center items-center border border-green-100 rounded-[20px] w-[70%] bg-white-100 overflow-y-auto">
              <ShowArrangement
                grid={grid}
                crops={indexArray}
                type="custom"
                checkArray={clickableField}
                handlePlace={handleClickCell}
                handleDeleteCrop={handleDeleteCrop}
              />
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
