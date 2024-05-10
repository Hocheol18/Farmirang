import React, { useEffect, useRef, useState } from "react";

// Props 받는 것들
interface Props {
  grid: number[][]; // 그리드 데이터를 받는 prop (2차원 배열)
  crops: { [key: number]: string }; // 작물 ID와 아이콘 매핑 객체를 받는 prop
}

const ShowArrangement = ({ grid, crops }: Props) => {
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
        boxShadow: "0 0 0 5px green inset", // 내부에 3px 두께의 초록색 테두리를 생성
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

  return (
    <div
      ref={gridRef}
      className="grid relative w-full h-full bg-yellow-100"
      style={{
        gridTemplateColumns: `repeat(${cLen}, 1fr)`,
        gridTemplateRows: `repeat(${rLen}, 1fr)`,
        aspectRatio: `1 / 1`,
      }}
    >
      {/* 그리드 렌더링 */}
      {grid.map((row, rowIndex) => (
        <React.Fragment key={rowIndex}>
          {row.map((cell, colIndex) => (
            <div
              key={`${rowIndex}-${colIndex}`}
              className="flex justify-center items-center relative"
              style={{
                backgroundColor: cell === 0 ? "" : "#723511",
              }}
            ></div>
          ))}
        </React.Fragment>
      ))}

      {/* 작물 아이콘 렌더링 */}
      {Object.keys(crops).map((cropId) => {
        const iconPosition = getIconPosition(Number(cropId)); // 작물 아이콘의 위치 계산
        if (iconPosition) {
          return (
            <div
              key={cropId} // 작물 아이콘의 고유 키 설정
              className="absolute transform -translate-x-1/2 -translate-y-1/2" // 작물 아이콘의 클래스 설정
              style={{
                top: iconPosition.top, // 작물 아이콘의 상단 위치 설정
                left: iconPosition.left, // 작물 아이콘의 왼쪽 위치 설정
              }}
            >
              {crops[Number(cropId)]} {/* 작물 아이콘 표시 */}
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
