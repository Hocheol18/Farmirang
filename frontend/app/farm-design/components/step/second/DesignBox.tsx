import React, { useEffect } from "react";
import DynamicField from "./DynamicField";

interface CropData {
  r: number;
  c: number;
  cropId: number;
}

interface Props {
  grid: number[][];
  cropsList: CropData[];
}

const DesignBox = ({ grid, cropsList }: Props) => {
  const rLen = grid.length; //만들 그리드의 행 수
  const cLen = grid[0].length; //만들 그리드의 열 수

  const spacing: {
    cropSpacing: number;
    ridgeSpacing: number;
  }[] = [
    {
      cropSpacing: 1,
      ridgeSpacing: 2,
    },
    {
      cropSpacing: 2,
      ridgeSpacing: 2,
    },
  ];

  const visited: boolean[][] = grid.map((row) => row.map((cell) => cell > 0));

  // 그리드 안에 있는 값들을 for문을 통해 돌 때(렌더링 할 때) 나오지 않은 값(1, 2, ...)이 있다면
  // 하나의 리스트(변수 선언해야 함)에 추가하고
  // visited 방문 배열 체크 할때 현재 방문한 곳에, 해당 리스트 안에 가장 최근 값보다(1, 2, 3,, 이렇게 가니까)
  // 작거나 같은 경우 DynamicField를 렌더링하지 않는 코드 추가해야 함

  return (
    <div className="flex flex-wrap w-full h-full border border-black-100">
      {grid.map((row, rowIndex) => (
        <div key={rowIndex} className="flex w-full ">
          {row.map((cell, colIndex) => (
            <div
              key={`${rowIndex}-${colIndex}`}
              className="border border-black-100 flex flex-col"
              style={{
                width: `calc(1 / 8 * 100%)", height: "calc(2/ 6 * 100%)`,
              }}
            >
              {visited[rowIndex][colIndex] ? (
                <div className="border border-red-300 flex justify-center items-center">
                  <DynamicField />
                </div>
              ) : (
                <div>방문했니?</div>
              )}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default DesignBox;
