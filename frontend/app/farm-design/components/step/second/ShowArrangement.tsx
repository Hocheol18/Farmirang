import React, { useEffect } from "react";

interface Props {
  grid: number[][]; // 그리드 데이터를 받는 prop
  crops: { [key: number]: string }; // 작물 ID와 아이콘 매핑 객체를 받는 prop
}

const ShowArrangement = ({ grid, crops }: Props) => {
  const rLen = grid.length; // 그리드의 행 개수
  const cLen = grid[0].length; // 그리드의 열 개수

  // 작물 ID에 해당하는 아이콘의 위치를 계산하는 함수
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
      style={{
        display: "grid", // 그리드 레이아웃 사용
        gridTemplateColumns: `repeat(${cLen}, 1fr)`, // 열의 크기를 1fr로 설정하여 동일한 크기로 만듦
        gridTemplateRows: `repeat(${rLen}, 1fr)`, // 행의 크기를 1fr로 설정하여 동일한 크기로 만듦
        position: "relative", // 상대 위치 설정
        width: "100%", // 컨테이너의 가로 크기를 100%로 설정
        height: "100%", // 컨테이너의 세로 크기를 100%로 설정
        aspectRatio: `${cLen} / ${rLen}`, // 그리드의 가로 세로 비율 유지
      }}
    >
      {/* 그리드 렌더링 */}
      {grid.map((row, rowIndex) => (
        <React.Fragment key={rowIndex}>
          {row.map((cell, colIndex) => (
            <div
              key={`${rowIndex}-${colIndex}`}
              style={{
                backgroundColor: cell === 0 ? "white" : "green", // 셀의 배경색 설정
                border: "1px solid black", // 셀의 테두리 설정
                display: "flex", // 플렉스 레이아웃 사용
                justifyContent: "center", // 셀 내부 내용을 가로 가운데 정렬
                alignItems: "center", // 셀 내부 내용을 세로 가운데 정렬
                position: "relative", // 상대 위치 설정
              }}
            >
              {cell !== 0 ? cell : ""}{" "}
              {/* 셀에 숫자 표시 (0인 경우 빈 문자열) */}
            </div>
          ))}
        </React.Fragment>
      ))}

      {/* 작물 아이콘 렌더링 */}
      {Object.keys(crops).map((cropId) => {
        const iconPosition = getIconPosition(Number(cropId)); // 작물 ID에 해당하는 아이콘 위치 계산
        if (iconPosition) {
          return (
            <div
              key={cropId}
              style={{
                position: "absolute", // 절대 위치 설정
                top: iconPosition.top, // 아이콘의 세로 위치
                left: iconPosition.left, // 아이콘의 가로 위치
                transform: "translate(-50%, -50%)", // 아이콘을 중앙에 위치시키기 위한 이동
              }}
            >
              {crops[Number(cropId)]} {/* 작물 ID에 해당하는 아이콘 표시 */}
            </div>
          );
        }
        return null; // 작물 ID에 해당하는 아이콘이 없는 경우 null 반환
      })}
    </div>
  );
};

export default ShowArrangement;
