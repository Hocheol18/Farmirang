"use client";

import Button from "@/app/_components/common/Button";
import Input from "@/app/_components/common/Input";
import SelectMenu from "@/app/_components/common/SelectMenus";
import { useEffect, useRef, useState } from "react";
import FarmShapeDraw from "./FarmShapeDraw";
import { CreateField } from "@/api/farm-design";
import { createFieldResponse } from "@/type/farmDesginType";

interface InputType {
  placeholder: string;
  type: string;
  value: any;
  labeltext: string;
  handleChange: (value: any) => void;
}

// 점의 좌표를 나타내는 인터페이스
interface Point {
  x: number;
  y: number;
}

interface Props {
  handleStep: (step: number) => void;
  userAccessToken: string;
  handleUpdateFieldDesignId: (newDesignId: number) => void;
  handleUpdateFieldClickableArray: (
    newFieldClickableArray: boolean[][]
  ) => void;
  handleUpdateFieldGridArray: (newFieldGridArray: number[][]) => void;
}

const FirstInputBox = ({
  handleStep,
  userAccessToken,
  handleUpdateFieldDesignId,
  handleUpdateFieldClickableArray,
  handleUpdateFieldGridArray,
}: Props) => {
  const [farmArea, setFarmArea] = useState<number>(); //밭 넓이
  const [furrrowWidth, setFurrowWidth] = useState<number>(); //고랑 너비
  const [ridgeWidth, setRidgeWidth] = useState<number>(); //두둑 너비
  const [direction, setDirection] = useState<number>(1); //이랑, 고랑의 방향
  const [month, setMonth] = useState<number>(1); //월 선택

  //밭 넓이 변경 함수
  const handleFarmAreaChange = (value: any) => {
    setFarmArea(value);
  };

  //고랑 너비 변경 함수
  const handleFurrowWidthChange = (value: any) => {
    setFurrowWidth(value);
  };

  //두둑 너비 변경 함수
  const handleRidgeWidthChange = (value: any) => {
    setRidgeWidth(value);
  };

  //이랑, 고랑의 방향 변경 함수
  const handleDirectionChange = (value: any) => {
    setDirection(value);
  };

  //월 변경 함수
  const handleMonthChange = (value: any) => {
    setMonth(value);
  };

  //인풋 배열
  const inputArr: InputType[] = [
    {
      placeholder: "전체 밭 넓이 (cm²)",
      type: "number",
      value: farmArea,
      labeltext: "밭 넓이 (cm²)",
      handleChange: handleFarmAreaChange,
    },

    {
      placeholder: "작물 심는 곳",
      type: "number",
      value: ridgeWidth,
      labeltext: "두둑 너비 (cm)",
      handleChange: handleRidgeWidthChange,
    },
    {
      placeholder: "작물 심지 않는 곳",
      type: "number",
      value: furrrowWidth,
      labeltext: "고랑 너비 (cm)",
      handleChange: handleFurrowWidthChange,
    },
  ];

  const topcss = "shrink-0";
  const labelcss = "font-semibold text-black-100 text-sm";
  const inputCSS = `rounded-lg bg-white-100 border-0 bg-transparent h-[2rem] py-1 pl-3 text-black-100 placeholder:text-gary-500 sm:text-sm sm:leading-6 shadow`;
  const xyInputCSS = `w-14 rounded-lg bg-white border border-[#c9e9cc] bg-transparent h-[2rem] py-1 pl-3 text-black-100 placeholder:text-gary-500 sm:text-sm sm:leading-6 shadow`;

  // 이랑/고랑의 방향 - 가로, 세로
  const directionArr = [
    {
      id: 1,
      name: "가로",
    },
    {
      id: 2,
      name: "세로",
    },
  ];

  // 텃밭에 작물 심는 시기 (월별)
  const monthArr = [];
  for (let i = 1; i <= 12; i++) {
    monthArr.push({ id: i, name: `${i}월` });
  }

  // 텃밭 모양 생성 api 연결
  async function fetchPostCreateField() {
    // 텃밭 모양 배열 & 밭 넓이 & 고랑/두둑 너비 유무 확인
    if (farmArea && furrrowWidth && ridgeWidth) {
      // coordinateArr: 텃밭 모양 배열 api 보낼 형식으로 만든 배열
      const coordinateArr: { column: number; row: number; sequence: number }[] =
        [];

      points.forEach((point, idx) => {
        coordinateArr.push({
          column: point.x,
          row: point.y,
          sequence: idx + 1,
        });
      });

      const result = await CreateField({
        accessToken: userAccessToken,
        request: {
          coordinates: coordinateArr,
          area: farmArea,
          startMonth: month,
          ridgeWidth: ridgeWidth,
          furrowWidth: furrrowWidth,
          isVertical: direction === 2,
        },
      });

      return result;
    }
  }

  // 밭 생성!! (step 단계로 넘어가기)
  const handleRecommendAndCustom = async (step: number) => {
    if (farmArea && furrrowWidth && ridgeWidth) {
      if (points.length < 3) {
        alert("점은 세 개 이상 찍어야 합니다.");
      } else {
        const result: createFieldResponse = await fetchPostCreateField();

        console.log(result.farm);

        // true, false 배열 업데이트
        handleUpdateFieldClickableArray(result.farm);

        console.log(result.designId);

        // 디자인 ID 업데이트
        handleUpdateFieldDesignId(result.designId);

        console.log(result.designArray);
        // 작물 0 ,1, 2, 이런 배열 업데이트
        handleUpdateFieldGridArray(result.designArray);

        // 해당 step으로 넘어가기
        handleStep(step);
      }
    } else {
      alert("빈 칸을 모두 채워주세요.");
    }
  };

  // 그려진 점의 목록을 저장하는 상태
  const [points, setPoints] = useState<Point[]>([]);
  // 드래그 중인 점을 저장하는 상태
  const [selectedPoint, setSelectedPoint] = useState<Point | null>(null);

  // 캔버스에 클릭 할 때 점 추가해서 저장 할 핸들러 함수 - 새로 추가할 때
  const handlePoints = (points: Point[], x: number, y: number) => {
    setPoints([...points, { x, y }]);
  };

  const handleUpdatedPotins = (updatedPoints: Point[]) => {
    setPoints(updatedPoints);
  };

  // 드래그 중인 점 갱신하는 핸들러 함수
  const handleSelectedPoint = (point: Point | null) => {
    setSelectedPoint(point);
  };

  // 다각형 초기화 핸들러 함수
  const handleResetPoints = () => {
    setPoints([]);
  };

  // 위에 인풋5개의 height를 계산하여 아래(텃밭 모양 그리는 부분 + x와 y의 좌표 + 버튼들)부분의 height을 자동으로 계산하여 남은 부분을 100%에서 빼서 차지하게 만들기
  // topInputDivHeight: 위에 있는 인풋 5개 영역의 height
  const [topInputDivHeight, setTopInputDivHeight] = useState<number>(0);
  // topInputDivRef: 위에 있는 인풋 5개 영역
  const topInputDivRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    //처음 시작할때 위 5개의 인풋 영역이 있다면 height 계산해서 저장
    if (topInputDivRef.current) {
      setTopInputDivHeight(topInputDivRef.current.clientHeight);
    }
  }, []);

  // 인덱스 삭제하는 함수
  const handleCoordinateDelete = (index: number) => {
    const newPoints = points.filter((point, idx) => idx !== index);
    setPoints(newPoints);
  };

  // x, y 좌표 바꾸는 함수
  const handleChangeCoordinate = (
    index: number,
    coordinate: "x" | "y",
    value: number
  ) => {
    //먼저 0부터 49 사이의 값인지 확인하기
    //0 미만 => 0
    if (value < 0) {
      value = 0;
      //49 초과 => 49
    } else if (value > 49) {
      value = 49;
    }

    //기존 배열
    const newPoints = [...points];

    //바꾸는 값
    newPoints[index][coordinate] = value;
    setPoints(newPoints);
  };

  // 면적 자동으로 구하는 신발끈 공식
  const calculatePolygonArea = (points: Point[]): number => {
    const pointsLen = points.length;

    let areaSum = 0;

    // 점의 갯수만큼 반복
    for (let i = 0; i < pointsLen; i++) {
      const j = (i + 1) % pointsLen; //(i의 대각선 잇는 애)
      areaSum += points[i].x * points[j].y - points[j].x * points[i].y;
    }

    return Math.abs(areaSum) / 2;
  };

  // 점 배열 바뀔 때마다 면적 구하는 공식 실행
  useEffect(() => {
    const gridSize = 10; // 1칸의 크기 (cm)
    const farmArea = calculatePolygonArea(points) * gridSize * gridSize;
    handleFarmAreaChange(farmArea);
  }, [points]);

  return (
    // 전체
    <div className="flex flex-col h-full overflow-y-auto">
      {/* input 5개 모여 있는 div */}
      <div
        className="flex justify-between items-center pb-5"
        ref={topInputDivRef}
      >
        {inputArr.map((item, index) => (
          <div key={index}>
            <Input
              topcss={topcss}
              labeltext={item.labeltext}
              labelcss={labelcss}
              inputcss={inputCSS}
              placeholder={item.placeholder}
              type={item.type}
              value={item.value}
              onChange={item.handleChange}
            />
          </div>
        ))}
        <SelectMenu
          labelcss={labelcss}
          topScript={"이랑의 방향"}
          items={directionArr}
          bordercss="border-gray-300"
          onChange={handleDirectionChange}
          value={direction}
          textSmall="text-md"
          topcss={"w-28"}
        />
        <SelectMenu
          labelcss={labelcss}
          topScript={"텃밭에 작물 심는 시기"}
          items={monthArr}
          bordercss="border-gray-300"
          onChange={handleMonthChange}
          value={month}
          textSmall="text-md"
        />
      </div>
      {/* 좌표 그림판 및 좌표 표 (+버튼) div */}
      <div
        className=" flex "
        // 여기서 위의 인풋 5개 영역의 height 범위 빼기
        style={{ height: `calc(100% - ${topInputDivHeight}px)` }}
      >
        <div className="h-full p-[20px] mr-10 rounded-[25px] bg-white-100  shadow shadow-md ">
          <FarmShapeDraw
            points={points}
            handlePoints={handlePoints}
            handleUpdatedPotins={handleUpdatedPotins}
            selectedPoint={selectedPoint}
            handleSelectedPoint={handleSelectedPoint}
          />
        </div>
        {/* 텃밭 좌표+button 있는 곳 */}
        <div className="flex flex-col flex-1 mt-5 justify-between">
          {/* 텃밭 좌표 */}
          <div className="flex flex-1 flex-col gap-1 items-center justify-center overflow-y-auto">
            <div className="text-lg font-extrabold">텃밭 좌표</div>
            {/* x, y 좌표 인풋 - 동적 컴포넌트는 따로 만들어야 함 */}
            <div className="flex flex-col items-center justify-start bg-white-100 rounded-xl shadow px-12 overflow-y-auto">
              {points.map((point, index) => (
                <div
                  key={index}
                  className="flex py-1 items-center justify-center  gap-3"
                >
                  <div className="text-green-400 font-bold mr-3 ">
                    {index + 1}번째 점
                  </div>
                  <div className="flex items-center gap-3 mr-5">
                    {/* x 좌표*/}
                    <div className="font-bold">x </div>
                    <Input
                      topcss={topcss}
                      labeltext={""}
                      labelcss={""}
                      inputcss={xyInputCSS}
                      placeholder={""}
                      type={"number"}
                      value={point.x}
                      onChange={(value) =>
                        handleChangeCoordinate(index, "x", value)
                      }
                    />
                  </div>
                  <div className="flex items-center gap-3">
                    {/* y 좌표*/}
                    <div className="font-bold">y </div>
                    <Input
                      topcss={topcss}
                      labeltext={""}
                      labelcss={labelcss}
                      inputcss={xyInputCSS}
                      placeholder={""}
                      type={"number"}
                      value={point.y}
                      onChange={(value) =>
                        handleChangeCoordinate(index, "y", value)
                      }
                    />
                  </div>
                  <Button
                    text="x"
                    bgStyles="px-1 ml-1 bg-gray-100 rounded"
                    buttonStyle="reset"
                    textStyles="text-gray-500"
                    handleClick={() => handleCoordinateDelete(index)}
                  />
                </div>
              ))}
            </div>
            {points.length > 0 ? (
              <Button
                text="모두 지우기 (Reset)"
                bgStyles="mt-5 w-56 bg-green-300"
                textStyles="text-white-100 font-bold"
                handleClick={handleResetPoints}
              />
            ) : (
              <div className="flex flex-col items-center h-[40%] justify-center">
                <div>왼쪽 판에 마우스를 클릭하여 점을 찍고</div>
                <div>텃밭 모양을 그려보세요!</div>
              </div>
            )}
          </div>
          {/* 텃밭 좌표 끝 */}
          <div className="flex justify-end gap-5 mt-5">
            <Button
              text="추천 받기"
              bgStyles="bg-green-400"
              textStyles="text-white-100 font-extrabold"
              handleClick={() => handleRecommendAndCustom(2)}
            />
            <Button
              text="커스텀하기"
              bgStyles="bg-white-100"
              textStyles="text-green-500 font-extrabold"
              handleClick={() => handleRecommendAndCustom(3)}
            />
          </div>
        </div>
        {/* 텃밭 + 버튼 있는 곳 */}
      </div>
    </div>
  );
};

export default FirstInputBox;
