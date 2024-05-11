import React, { useEffect, useRef, useState } from "react";

import Image, { StaticImageData } from "next/image";

import Potato from "../../../../../public/icons/farms/crops-potato.svg";
import SweetPotato from "../../../../../public/icons/farms/crops-sweet-potato.svg";
import CheongyangChillPepper from "../../../../../public/icons/farms/crops-cheongyang-chili-pepper.svg";
import Carrot from "../../../../../public/icons/farms/crops-carrot.svg";
import Strawberry from "../../../../../public/icons/farms/crops-strawberry.svg";
import Peanut from "../../../../../public/icons/farms/crops-peanut.svg";
import CherryTomato from "../../../../../public/icons/farms/crops-cherry-tomato.svg";
import Leek from "../../../../../public/icons/farms/crops-leek.svg";
import Blueberry from "../../../../../public/icons/farms/crops-blueberry.svg";
import Lettuce from "../../../../../public/icons/farms/crops-lettuce.svg";
import Ginger from "../../../../../public/icons/farms/crops-ginger.svg";
import Onion from "../../../../../public/icons/farms/crops-onion.svg";
import YoungRadish from "../../../../../public/icons/farms/crops-young-radish.svg";
import Cucumber from "../../../../../public/icons/farms/crops-cucumber.svg";
import Corn from "../../../../../public/icons/farms/crops-corn.svg";
import Korean from "../../../../../public/icons/farms/crops-korean-melon.svg";

// Props 받는 것들
interface Props {
  grid: number[][]; // 그리드 데이터를 받는 prop (2차원 배열)
  crops: { [key: number]: number }; // 작물 ID와 아이콘 매핑 객체를 받는 prop
  type: string;
}

const ShowArrangement = ({ grid, crops, type }: Props) => {
  const picList: StaticImageData[] = [
    Potato,
    SweetPotato,
    CheongyangChillPepper,
    Carrot,
    Strawberry,
    Peanut,
    CherryTomato,
    Leek,
    Blueberry,
    Lettuce,
    Ginger,
    Onion,
    YoungRadish,
    Cucumber,
    Corn,
    Korean,
  ];

  const rLen = grid.length; // 그리드의 행 개수
  const cLen = grid[0].length; // 그리드의 열 개수
  const gridRef = useRef<HTMLDivElement>(null); // 그리드 ref (그리드 요소에 대한 참조)
  const [scale, setScale] = useState(1); // 초기 스케일 값을 1로 설정

  //getCropBorderStyle: 작물 테두리 스타일을 계산하는 함수
  const getCropBorderStyle = (cropId: number): React.CSSProperties | null => {
    const positions = []; // 작물이 위치한 셀의 위치를 저장할 배열

    // 그리드를 순회하며 해당 작물 ID를 가진 셀의 위치를 저장
    for (let r = 0; r < rLen; r++) {
      for (let c = 0; c < cLen; c++) {
        if (grid[r][c] === cropId) {
          positions.push({ r, c });
        }
      }
    }

    // 작물이 위치한 셀이 있는 경우
    if (positions.length > 0) {
      const { r: topRow, c: leftCol } = positions[0]; // 가장 왼쪽 위 셀의 위치
      const { r: bottomRow, c: rightCol } = positions[positions.length - 1]; // 가장 오른쪽 아래 셀의 위치
      const cellWidth = 100 / cLen; // 셀의 가로 크기 (%)
      const cellHeight = 100 / rLen; // 셀의 세로 크기 (%)

      // 작물 테두리 스타일 객체 반환
      return {
        position: "absolute" as const, // 절대 위치 설정
        top: `${topRow * cellHeight}%`, // 테두리의 상단 위치
        left: `${leftCol * cellWidth}%`, // 테두리의 왼쪽 위치
        width: `${(rightCol - leftCol + 1) * cellWidth}%`, // 테두리의 가로 길이
        height: `${(bottomRow - topRow + 1) * cellHeight}%`, // 테두리의 세로 길이
        boxShadow: "0 0 0 2px #388140 inset", // 내부에 3px 두께의 초록색 테두리를 생성
        borderRadius: "0.25rem",
      };
    }

    return null; // 작물이 위치한 셀이 없는 경우 null 반환
  };

  //getIconPosition: 작물 ID에 해당하는 아이콘의 위치를 계산하는 함수
  const getIconPosition = (
    cropId: number
  ): { top: string; left: string } | undefined => {
    const positions = []; // 해당 작물 ID를 가진 셀의 위치를 저장할 배열

    // 그리드를 순회하며 작물 ID를 가진 셀의 위치를 저장
    for (let r = 0; r < rLen; r++) {
      for (let c = 0; c < cLen; c++) {
        if (grid[r][c] === cropId) {
          positions.push({ r, c });
        }
      }
    }

    // 작물 ID를 가진 셀이 존재하는 경우
    if (positions.length > 0) {
      const { r: topRow, c: leftCol } = positions[0]; // 가장 왼쪽 위 셀의 위치
      const { r: bottomRow, c: rightCol } = positions[positions.length - 1]; // 가장 오른쪽 아래 셀의 위치

      const top = ((topRow + bottomRow + 1) / 2 / rLen) * 100; // 아이콘의 세로 위치 계산 (%)
      const left = ((leftCol + rightCol + 1) / 2 / cLen) * 100; // 아이콘의 가로 위치 계산 (%)
      return { top: `${top}%`, left: `${left}%` }; // 아이콘의 위치 반환
    }

    return undefined; // 작물 ID를 가진 셀이 없는 경우 undefined 반환
  };
  const getIconIndex = (cropId: number): number | undefined => {
    return crops[cropId];
  };

  return (
    <div
      ref={gridRef}
      className="grid relative w-full bg-yellow-100 overflow-y-auto "
      style={{
        gridTemplateColumns: `repeat(${cLen}, 1fr)`,
        gridTemplateRows: `repeat(${rLen}, 1fr)`,
        // aspectRatio: `${cLen} / ${rLen}`,
      }}
    >
      {/* 그리드 렌더링 */}
      {grid.map((row, rowIndex) => (
        <React.Fragment key={rowIndex}>
          {row.map((cell, colIndex) => (
            <div
              key={`${rowIndex}-${colIndex}`}
              className="flex justify-center items-center relative rounded"
              style={{
                backgroundColor: cell === 0 ? "" : "#723511",
                aspectRatio: `1 / 1`,
                // borderWidth: `0.2px`,
              }}
            ></div>
          ))}
        </React.Fragment>
      ))}

      {/* 작물 아이콘 렌더링 */}
      {Object.keys(crops).map((cropId) => {
        const iconPosition = getIconPosition(Number(cropId)); // 작물 아이콘의 위치 계산
        const iconIndex = getIconIndex(Number(cropId)); // 작물 아이콘의 인덱스 가져오기

        if (iconPosition && iconIndex !== undefined) {
          return (
            <div
              key={cropId} // 작물 아이콘의 고유 키 설정
              className="absolute w-[5%] transform -translate-x-1/2 -translate-y-1/2 bg-white-100 rounded-full" // 작물 아이콘의 클래스 설정
              style={{
                top: iconPosition.top, // 작물 아이콘의 상단 위치 설정
                left: iconPosition.left, // 작물 아이콘의 왼쪽 위치 설정
              }}
            >
              <Image className="" src={picList[iconIndex - 1]} alt="icon" />

              {/* 작물 아이콘 표시 */}
            </div>
          );
        }
        return null; // 작물 아이콘이 없는 경우 null 반환
      })}

      {/* 작물 테두리 렌더링 */}
      {Object.keys(crops).map((cropId) => {
        const borderStyle = getCropBorderStyle(Number(cropId)); // 작물 테두리 스타일 계산
        if (borderStyle) {
          return <div key={`border-${cropId}`} style={borderStyle} />; // 작물 테두리 렌더링
        }
        return null; // 작물 테두리가 없는 경우 null 반환
      })}
    </div>
  );
};

export default ShowArrangement;
