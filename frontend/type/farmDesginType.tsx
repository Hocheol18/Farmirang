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

export interface getDesignIdParams {
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

// 2단계 - 작물 정보로 추천 디자인 생성 POST Request
export interface CreateRecommendParams {
  accessToken: string;
  request: {
    cropList: { cropId: number; priority: number; quantity: number }[];
  };
  designId: number;
}

// 2단계 - 작물 정보로 추천 디자인 생성 POST Response
export interface CreateRecommendResponse {
  designArray: number[][];
  cropNumberAndCropIdDtoList: {
    cropId: number;
    number: number;
  }[];
  // 밭 좌표
  farmCoordinateList: {
    row: number;
    column: number;
    sequence: number;
  }[];
}

// 2, 3단계 이름 수정 PUT Request
export interface updateDesignNameParams {
  accessToken: string;
  designId: number;
  request: {
    name: string;
  };
}

// 3단계 - 커스텀용 조회 GET
export interface getCustomEmptyResponse {
  cropList: CropInfo[];
}

// 3단계 커스텀 디자인 생성 POST Request
export interface CreateCustomDesignParams {
  accessToken: string;
  designId: number;
  request: {
    designArray: number[][];
    cropNumberAndCropIdDtoList: {
      cropId: number;
      number: number;
    }[];
    cropIdAndQuantityDtoList: {
      cropId: number;
      quantity: number;
    }[];
  };
}

// 4단계 비료 추천 GET Response
export interface Fertilizer {
  id: number;
  // add 안 붙은 건 밑거름
  nitrogen: number; //질소
  phosphate: number; //인산
  potassium: number; //칼륨
  // add 붙은 건 웃거름
  addNitrogen: number;
  addPhosphate: number;
  addPotassium: number;
}

export interface Fertilizers {
  [cropName: string]: Fertilizer[];
}

// 디자인 상세보기 GET Resonse
export interface getDesignDetailResponse {
  farm: boolean[][];
  designArray: number[][];
  cropNumberAndCropIdDtoList: {
    cropId: number;
    number: number;
  }[];
  name: string;
  cropList: string[];
  saveTime: string;
}

// 디자인 리스트 조회 GET Response
export interface getDesignListResponse {
  designId: number;
  designArray: number[][];
  farm: boolean[][];
  cropNumberAndCropIdDtoList: {
    cropId: number;
    number: number;
  }[];
  name: string;
  savedTime: string;
  isThumbnail: false;
}

// 대표 디자인 조회 GET Response
export interface getThumbnailDesignResponse {
  designArray: number[][];
  booleanFarmArrangement: boolean[][];
  cropNumberAndCropIdDtoList: {
    cropId: number;
    number: number;
  }[];
}
