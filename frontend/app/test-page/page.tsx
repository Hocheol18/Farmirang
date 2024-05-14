"use client";

import React, { useState, useRef, useEffect } from "react";
import BackgroundShapes from "../farm-design/components/step/second/BackgroundShapes";
import ShowArrangement from "../farm-design/components/step/second/ShowArrangement";

// 점의 좌표를 나타내는 인터페이스
interface Point {
  x: number;
  y: number;
}

// 앱 컴포넌트
const Testpage: React.FC = () => {
  // 그려진 점의 목록을 저장하는 상태
  const [points, setPoints] = useState<Point[]>([]);
  // 드래그 중인 점을 저장하는 상태
  const [selectedPoint, setSelectedPoint] = useState<Point | null>(null);
  // 다각형을 그리는 모드인지 여부를 나타내는 상태
  const [isDrawing, setIsDrawing] = useState(false);
  // 캔버스 요소에 대한 참조
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");

    if (ctx) {
      // 캔버스 초기화
      ctx.clearRect(0, 0, 800, 600);

      // 좌표 그리드 그리기
      ctx.strokeStyle = "gray";
      ctx.lineWidth = 0.5;
      for (let i = 0; i <= 100; i++) {
        ctx.beginPath();
        ctx.moveTo(i * 8, 0);
        ctx.lineTo(i * 8, 600);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(0, i * 6);
        ctx.lineTo(800, i * 6);
        ctx.stroke();
      }

      // 그려진 점 그리기
      ctx.fillStyle = "red";
      points.forEach((point) => {
        ctx.beginPath();
        ctx.arc(point.x * 8, point.y * 6, 4, 0, 2 * Math.PI);
        ctx.fill();
      });

      // 다각형 그리기
      if (points.length > 1) {
        ctx.strokeStyle = "blue";
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(points[0].x * 8, points[0].y * 6);
        for (let i = 1; i < points.length; i++) {
          ctx.lineTo(points[i].x * 8, points[i].y * 6);
        }
        if (isDrawing) {
          ctx.lineTo(points[0].x * 8, points[0].y * 6);
        }
        ctx.stroke();
      }
    }
  }, [points, isDrawing]);

  // 캔버스 클릭 핸들러
  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (isDrawing) {
      const rect = canvasRef.current?.getBoundingClientRect();
      if (rect) {
        const x = Math.floor((e.clientX - rect.left) / 8);
        const y = Math.floor((e.clientY - rect.top) / 6);
        setPoints([...points, { x, y }]);
      }
    }
  };

  // 점 드래그 시작 핸들러
  const handlePointDragStart = (point: Point) => {
    setSelectedPoint(point);
  };

  // 점 드래그 중 핸들러
  const handlePointDragMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (selectedPoint) {
      const rect = canvasRef.current?.getBoundingClientRect();
      if (rect) {
        const x = Math.floor((e.clientX - rect.left) / 8);
        const y = Math.floor((e.clientY - rect.top) / 6);
        const updatedPoints = points.map((p) =>
          p === selectedPoint ? { x, y } : p
        );
        setPoints(updatedPoints);
      }
    }
  };

  // 점 드래그 종료 핸들러
  const handlePointDragEnd = () => {
    setSelectedPoint(null);
  };

  // 다각형 그리기 모드 전환 핸들러
  const handleDrawPolygon = () => {
    setIsDrawing(!isDrawing);
  };

  // 다각형 초기화 핸들러
  const handleResetPolygon = () => {
    setPoints([]);
    setIsDrawing(false);
  };

  const grid = [
    [1, 2, 3, 4, 5, 6, 7, 8, 0],
    [1, 2, 3, 4, 5, 6, 7, 8, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [9, 10, 11, 12, 13, 13, 14, 14, 0],
    [9, 10, 11, 12, 13, 13, 14, 14, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
  ];

  const crops = {
    1: "🌱",
    2: "❤",
    3: "🥒",
    10: "🍎",
    5: "🥕",
    13: "🌽",
    14: "🍅",
  };

  return (
    <>
      <div>
        {/* 캔버스 요소 */}
        <canvas
          ref={canvasRef}
          width={800}
          height={600}
          onClick={handleCanvasClick}
          onMouseMove={handlePointDragMove}
          onMouseUp={handlePointDragEnd}
        />
        {/* 그려진 점들 */}
        <div>
          {points.map((point, index) => (
            <div
              key={index}
              style={{
                position: "absolute",
                left: point.x * 8 - 4,
                top: point.y * 6 - 4,
                width: 8,
                height: 8,
                backgroundColor: "transparent",
                cursor: "move",
              }}
              onMouseDown={() => handlePointDragStart(point)}
            />
          ))}
        </div>
        {/* 다각형 그리기 버튼 */}
        <button onClick={handleDrawPolygon}>
          {isDrawing ? "Finish Polygon" : "Draw Polygon"}
        </button>
        {/* 다각형 초기화 버튼 */}
        <button onClick={handleResetPolygon}>Reset</button>
      </div>
      <BackgroundShapes />
    </>
  );
};

export default Testpage;
