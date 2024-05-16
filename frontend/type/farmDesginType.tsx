interface Coordinate {
  column: number;
  row: number;
  sequence: number;
}

// 1단계 - 디자인용 텃밭 생성 POST Request
export interface createFieldParams {
  accessToken: string;
  request: {
    coordinates: Coordinate[];
    area: number;
    startMonth: number;
    ridgeWidth: number;
    furrowWidth: number;
    isVertical: boolean;
  };
}

export interface createFieldResponse {
  designArray: number[][];
  designId: number;
  farm: boolean[][];
}

export interface getCropInfoParams {
  accessToken: string;
  designId: number;
}

// 2단계 - 작물 정보 조회 GET Response

export interface CropLengthAndAreaDto {
  cropHeight: number;
  cropWidth: number;
  area: number;
}

export interface CropInfo {
  cropId: number;
  name: string;
  isRecommended: boolean;
  cropLengthAndAreaDto: CropLengthAndAreaDto;
}

export interface getCropInfoResponse {
  cropList: CropInfo[];
  totalRidgeArea: number;
  ridgeWidth: number;
  ridgeHeight: number;
}
