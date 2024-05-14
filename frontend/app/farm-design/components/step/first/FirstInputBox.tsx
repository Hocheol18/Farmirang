"use client";

import Button from "@/app/_components/common/Button";
import Input from "@/app/_components/common/Input";
import SelectMenu from "@/app/_components/common/SelectMenus";
import { useEffect, useRef, useState } from "react";
import FarmShapeDraw from "./FarmShapeDraw";

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
}

const FirstInputBox = ({ handleStep }: Props) => {
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
      placeholder: "밭의 넓이 (평)",
      type: "number",
      value: farmArea,
      labeltext: "밭 넓이",
      handleChange: handleFarmAreaChange,
    },
    {
      placeholder: "고랑의 너비 (cm)",
      type: "number",
      value: furrrowWidth,
      labeltext: "고랑 너비",
      handleChange: handleFurrowWidthChange,
    },
    {
      placeholder: "두둑의 너비 (cm)",
      type: "number",
      value: ridgeWidth,
      labeltext: "두둑 너비",
      handleChange: handleRidgeWidthChange,
    },
  ];

  const topcss = "shrink-0";
  const labelcss = "font-semibold text-black-100 text-sm";
  const inputCSS = `rounded-lg bg-white-100 border-0 bg-transparent h-[2rem] py-1 pl-3 text-black-100 placeholder:text-gary-500 sm:text-sm sm:leading-6 shadow`;
  const xyInputCSS = `w-14 rounded-lg bg-white-100 border-0 bg-transparent h-[2rem] py-1 pl-3 text-black-100 placeholder:text-gary-500 sm:text-sm sm:leading-6 shadow`;

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

  // x, y 좌표

  const [coordinateArr, setCoordinateArr] = useState([
    { x: 0, y: 0 },
    { x: 0, y: 50 },
  ]);

  // 추천 단계로 넘어가기
  const handleRecommend = () => {
    handleStep(2);
  };

  // 커스텀 단계로 넘어가기
  const handleCustom = () => {
    handleStep(3);
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

  // 이 함수 쓴 애들 다 바꿔야 함!!!!!!! (임시로 그냥 한 거라...)
  const handleCoordinateArrChange = () => {};

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

  return (
    // 전체
    <div className="flex flex-col h-full mt-5 overflow-y-auto">
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
          topScript={"이랑/고랑의 방향"}
          items={directionArr}
          bordercss="border-gray-300"
          onChange={handleDirectionChange}
          value={direction}
        />
        <SelectMenu
          labelcss={labelcss}
          topScript={"텃밭에 작물 심는 시기"}
          items={monthArr}
          bordercss="border-gray-300"
          onChange={handleMonthChange}
          value={month}
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
        <div className="flex flex-col flex-1 bg-red-200 justify-between overflow-y-auto">
          {/* 텃밭 좌표 */}
          <div className="flex flex-1 flex-col items-center justify-center bg-yellow-100 overflow-y-auto ">
            <div className="font-extrabold mt-5">텃밭 좌표</div>
            {/* x, y 좌표 인풋 - 동적 컴포넌트는 따로 만들어야 함 */}
            <div className="flex flex-col items-center justify-center bg-green-400 gap-2 overflow-y-auto">
              {points.map((point, index) => (
                <div
                  key={index}
                  className="flex items-center justify-center text-sm border border-blue-200 gap-3"
                >
                  <div>{index + 1}번째 점</div>
                  <div className="flex items-center gap-3 mr-5">
                    <div className="font-bold">x </div>
                    {/* value, onChange 바꿔야 함 */}
                    <Input
                      topcss={topcss}
                      labeltext={""}
                      labelcss={""}
                      inputcss={xyInputCSS}
                      placeholder={""}
                      type={"number"}
                      value={point.x}
                      onChange={handleCoordinateArrChange}
                    />
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="font-bold">y </div>
                    {/* value, onChange 바꿔야 함 */}
                    <Input
                      topcss={topcss}
                      labeltext={""}
                      labelcss={labelcss}
                      inputcss={xyInputCSS}
                      placeholder={""}
                      type={"number"}
                      value={point.y}
                      onChange={handleCoordinateArrChange}
                    />
                  </div>
                </div>
              ))}
            </div>

            <Button
              text="모두 지우기 (Reset)"
              bgStyles="mt-5 w-56 bg-green-300"
              textStyles="text-white-100 font-bold"
              handleClick={handleResetPoints}
            />
          </div>
          {/* 텃밭 좌표 끝 */}
          <div className="flex justify-end gap-5">
            <Button
              text="추천 받기"
              bgStyles="bg-green-400"
              textStyles="text-white-100 font-extrabold"
              handleClick={handleRecommend}
            />
            <Button
              text="커스텀하기"
              bgStyles="bg-white-100"
              textStyles="text-green-500 font-extrabold"
              handleClick={handleCustom}
            />
          </div>
        </div>
        {/* 텃밭 + 버튼 있는 곳 */}
      </div>
    </div>
  );
};

export default FirstInputBox;
