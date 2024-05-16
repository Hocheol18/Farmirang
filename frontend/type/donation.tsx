export interface fetchDonationDataFunctionType {
  cursor: number;
  size: number;
  user: number | null;
}

export interface fetchDonationDataType {
  header_img: string;
  end_date: string;
  state: string;
  id: number;
  title: string;
  name: string;
  progress: number;
  summary: string;
}
