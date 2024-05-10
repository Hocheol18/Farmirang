import React, { useEffect, useState } from "react";
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
  const rLen = grid.length; // 만들 그리드의 행 수
  const cLen = grid[0].length; // 만들 그리드의 열 수
  const spacing: { cropSpacing: number; ridgeSpacing: number }[] = [
    { cropSpacing: 1, ridgeSpacing: 2 },
    { cropSpacing: 2, ridgeSpacing: 2 },
  ];

  const [visited, setVisited] = useState<boolean[][]>(
    grid.map((row) => row.map((cell) => false))
  );

  const [maxValue, setMaxValue] = useState<number>(0);

  useEffect(() => {
    let tempMaxValue = maxValue; // 임시 최대값 변수
    grid.forEach((row, rowIndex) => {
      row.forEach((cell, colIndex) => {
        if (cell > tempMaxValue) {
          tempMaxValue = cell;
          setVisited((prevVisited) => {
            const newVisited = [...prevVisited];
            newVisited[rowIndex][colIndex] = true;
            return newVisited;
          });
        }
      });
    });
    setMaxValue(tempMaxValue); // 반복문이 끝난 후 한 번만 상태 갱신
  }, [grid]); // grid가 변경될 때마다 useEffect 실행

  return (
    <div className="flex-wrap flex w-full h-full border border-black-100">
      {grid.map((row, rowIndex) => (
        <div key={rowIndex} className="flex w-full ">
          {row.map((cell, colIndex) => (
            <>
              {visited[rowIndex][colIndex] && (
                <>
                  <div
                    key={`${rowIndex}-${colIndex}`}
                    className="w-full bg-green-200"
                  >
                    <DynamicField
                      cropList={cropsList}
                      cell={cell}
                      rLen={rLen}
                      cLen={cLen}
                      spacing={spacing}
                    />
                  </div>
                </>
              )}
              {cell === 0 && <div className="flex-1">0</div>}
            </>
          ))}
        </div>
      ))}
    </div>
  );
};

export default DesignBox;
