// 밭 목록 인터페이스
export interface fetchFarmListType {
  address: string;
  content: string;
  design: number;
  iot: number;
  title: string;
  startAt: string;
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
