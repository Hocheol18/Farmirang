// 밭 목록 인터페이스
export interface fetchFarmListType {
  address: string;
  content: string;
  design: number;
  iot: number;
  title: string;
  startAt: string;
  fieldId: number;
}

// 밭 등록 인터페이스
export interface postFieldType {
  title: string;
  content: string;
  address: string;
  startAt: string;
  user: number;
  design: number;
  iot: string;
}

// 밭 디자인 리스트 인터페이스
export interface fetchDesignDataType {
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
