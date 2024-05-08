import React, { useRef, useEffect } from "react";
import ShowArrangement from "./ShowArrangement";

interface Props {
  grid: number[][];
  crops: { [key: number]: string };
}

const FarmLayout: React.FC<Props> = ({ grid, crops }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (ctx) {
      // Canvas 크기 설정
      ctx.canvas.width = 500; // 예시로 500을 사용, 필요에 따라 조정 가능
      ctx.canvas.height = 500; // 예시로 500을 사용, 필요에 따라 조정 가능

      // 땅 모양 그리기
      const points = [
        [0, 0],
        [0, 10],
        [3, 13],
        [10, 9],
        [6, 0],
      ]; // 주어진 모서리 좌표
      ctx.beginPath();
      ctx.moveTo(points[0][0], points[0][1]);
      points.forEach(([x, y]) => ctx.lineTo(x, y));
      ctx.closePath();
      ctx.fillStyle = "sandybrown"; // 땅 색상
      ctx.fill();
    }
  }, []);

  return (
    <div className="relative">
      <canvas ref={canvasRef} className="absolute top-0 left-0 z-0"></canvas>
      <ShowArrangement grid={grid} crops={crops} />
    </div>
  );
};

export default FarmLayout;
