import React, { useEffect, useRef, useState } from "react";

// 점의 좌표를 나타내는 인터페이스
interface Point {
  x: number;
  y: number;
}

// prop 받은 type들
interface Props {
  points: Point[]; //저장한 점들의 배열
  handlePoints: (points: Point[], x: number, y: number) => void; //저장한 점들의 배열 바꾸기 (점 추가)
  handleUpdatedPotins: (updatedPoints: Point[]) => void; //저장한 점들의 배열 바꾸기 (배열 전체)
  selectedPoint: Point | null; //드래그할 때 필요! 선택한 점
  handleSelectedPoint: (point: Point | null) => void; //선택한 점 바꾸기
}

const FarmShapeDraw = ({
  points,
  handlePoints,
  handleUpdatedPotins,
  selectedPoint,
  handleSelectedPoint,
}: Props) => {
  // 캔버스 요소에 대한 참조
  const canvasRef = useRef<HTMLCanvasElement>(null);
  // 마우스 위치의 좌표값을 저장하는 상태
  const [mouseCoords, setMouseCoords] = useState<Point | null>(null);

  // 캔버스 크기를 조정하는 함수
  const resizeCanvas = () => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");

    if (canvas && context) {
      const parentHeight = canvas.parentElement?.clientHeight || 0;
      canvas.width = parentHeight;
      canvas.height = parentHeight;
    }
  };

  // 캔버스를 다시 그리는 함수
  const redrawCanvas = () => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");

    if (canvas && context) {
      // 캔버스 초기화
      context.clearRect(0, 0, canvas.width, canvas.height);

      // 좌표 그리드 그리기 - 50x50으로 width, height 비율대로
      context.strokeStyle = "gray"; //그리드 색상은 gray-100으로
      context.lineWidth = 0.25;
      //50칸이지만 0부터 49까지 좌표가 찍히기 때문에 49로 나눈 값을 cellWidth, cellHeight로
      const cellWidth = canvas.width / 49;
      const cellHeight = canvas.height / 49;

      // 50칸이기 때문에 50번 반복
      for (let i = 0; i < 50; i++) {
        context.beginPath(); //그리기 시작
        // (0, 0) => (0, 49), (1, 0) => (1, 49) 이렇게 가로 선 긋기
        context.moveTo(i * cellWidth, 0);
        context.lineTo(i * cellWidth, canvas.height);
        context.stroke();

        context.beginPath();
        // (0, 0) => (49, 0), (0, 1) => (49, 1) 이렇게 세로 선 긋기
        context.moveTo(0, i * cellHeight);
        context.lineTo(canvas.width, i * cellHeight);
        context.stroke();
      }
      //여기까지 좌표 그리기

      // 다각형 그리기
      if (points.length > 1) {
        context.strokeStyle = "green";
        context.lineWidth = 1;
        context.beginPath();
        context.moveTo(points[0].x * cellWidth, points[0].y * cellHeight);
        for (let i = 1; i < points.length; i++) {
          context.lineTo(points[i].x * cellWidth, points[i].y * cellHeight);
        }

        context.lineTo(points[0].x * cellWidth, points[0].y * cellHeight);

        context.stroke();
        context.fillStyle = "#c9e9cc";
        context.fill();
      }

      // 그려진 점 그리기

      const length = points.length;

      for (let i = 0; i < length; i++) {
        // 점 그리기
        context.fillStyle = "green";
        context.beginPath();
        context.arc(
          points[i].x * cellWidth,
          points[i].y * cellHeight,
          8,
          0,
          2 * Math.PI
        );
        context.fill();

        // 점 안에 숫자(점의 인덱스) 그리기
        context.fillStyle = "white";
        context.fillText(
          `${i + 1}`,
          points[i].x * cellWidth - 4,
          points[i].y * cellHeight + 4
        );
      }
    }
  };

  // 컴포넌트가 마운트될 때 캔버스 크기를 조정하고 창 크기 변경 이벤트 리스너를 등록
  useEffect(() => {
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // 컴포넌트가 언마운트될 때 창 크기 변경 이벤트 리스너를 제거
    return () => {
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);

  // points 또는 isDrawing 상태가 변경될 때마다 캔버스를 다시 그림
  useEffect(() => {
    redrawCanvas();
  }, [points]);

  // 캔버스 클릭 핸들러
  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const rect = canvasRef.current?.getBoundingClientRect();
    if (rect) {
      const x = Math.max(
        0,
        Math.min(49, Math.floor((e.clientX - rect.left) / (rect.width / 50)))
      );
      const y = Math.max(
        0,
        Math.min(49, Math.floor((e.clientY - rect.top) / (rect.height / 50)))
      );
      handlePoints(points, x, y);
      console.log("x: " + x + ", y: " + y);
    }
  };

  // 점 드래그 시작 핸들러
  const handlePointDragStart = (point: Point) => {
    handleSelectedPoint(point);
  };

  // 점 드래그 중 핸들러
  const handlePointDragMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (selectedPoint) {
      const rect = canvasRef.current?.getBoundingClientRect();
      if (rect) {
        const x = Math.max(
          0,
          Math.min(49, Math.floor((e.clientX - rect.left) / (rect.width / 50)))
        );
        const y = Math.max(
          0,
          Math.min(49, Math.floor((e.clientY - rect.top) / (rect.height / 50)))
        );
        const updatedPoints = points.map((p) =>
          p === selectedPoint ? { x, y } : p
        );
        handleUpdatedPotins(updatedPoints);
        setMouseCoords({ x, y }); // 드래그 중에도 마우스 위치의 좌표값 업데이트
      }
    }
  };

  // 점 드래그 종료 핸들러
  const handlePointDragEnd = () => {
    handleSelectedPoint(null);
  };

  // 마우스 이동 시 좌표값 업데이트 핸들러
  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const rect = canvasRef.current?.getBoundingClientRect();
    if (rect) {
      const x = Math.max(
        0,
        Math.min(49, Math.floor((e.clientX - rect.left) / (rect.width / 50)))
      );
      const y = Math.max(
        0,
        Math.min(49, Math.floor((e.clientY - rect.top) / (rect.height / 50)))
      );
      setMouseCoords({ x, y });
    }
  };

  // 마우스가 캔버스를 벗어났을 때 좌표값 초기화 핸들러
  const handleMouseLeave = () => {
    setMouseCoords(null);
  };

  return (
    <div className="w-full h-full relative flex justify-center items-center">
      {/* 캔버스 요소 */}
      <canvas
        className="bg-green-100"
        ref={canvasRef}
        onClick={handleCanvasClick}
        onMouseMove={(e) => {
          handleMouseMove(e);
          if (selectedPoint) {
            handlePointDragMove(e);
          }
        }}
        onMouseLeave={handleMouseLeave}
        onMouseUp={handlePointDragEnd}
      ></canvas>
      {/* 그려진 점들 */}
      <div>
        {points.map((point, index) => {
          const canvas = canvasRef.current;
          if (!canvas) return null;

          return (
            <div
              key={index}
              style={{
                position: "absolute",
                left: `${(point.x * canvas.width) / 50}px`,
                top: `${(point.y * canvas.height) / 50}px`,
                width: 20,
                height: 20,
                backgroundColor: "transparent",
                cursor: "move",
                transform: "translate(-50%, -50%)",
              }}
              className="bg-white-100"
              onMouseDown={() => handlePointDragStart(point)}
            ></div>
          );
        })}
      </div>

      {/* 마우스 위치의 좌표값 표시 */}
      {mouseCoords && (
        <div
          className="absolute bg-black-100 text-white-100 p-1 rounded-full shadow"
          style={{
            left: `${(mouseCoords.x * 100) / 50}%`,
            top: `${(mouseCoords.y * 100) / 50}%`,
            transform: "translate(10px, -50%)",
          }}
        >
          {mouseCoords.x}, {mouseCoords.y}
        </div>
      )}
    </div>
  );
};

export default FarmShapeDraw;
