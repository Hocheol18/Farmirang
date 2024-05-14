// 땅 모양 그리는 것

import React from "react";

interface Props {}

const BackgroundShapes = () => {
  const points = [
    { x: 0, y: 0 },
    { x: 0, y: 20 },
    { x: 20, y: 20 },
    { x: 20, y: 0 },
  ];

  // 점들의 x, y 좌표 중 최소값과 최대값 찾기
  const minX = Math.min(...points.map((point) => point.x));
  const maxX = Math.max(...points.map((point) => point.x));
  const minY = Math.min(...points.map((point) => point.y));
  const maxY = Math.max(...points.map((point) => point.y));

  // viewBox 설정
  const viewBox = `${minX} ${minY} ${maxX - minX} ${maxY - minY}`;

  return (
    <div className="relative w-full h-full">
      <svg className="absolute inset-0 w-full h-full" viewBox={viewBox}>
        <polygon
          points={points.map(({ x, y }) => `${x},${y}`).join(" ")}
          fill="#F0E68C"
        />
      </svg>
    </div>
  );
};

export default BackgroundShapes;
