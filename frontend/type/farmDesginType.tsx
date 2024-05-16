interface Coordinate {
  x: number;
  y: number;
  sequence: number;
}

// 1단계 - 디자인용 텃밭 생성 POST Request
export interface createFieldParams {
  coordinates: Coordinate[];
  area: number;
  startMonth: number;
  ridgeWidth: number;
  furrowWidth: number;
  isVertical: boolean;
}
