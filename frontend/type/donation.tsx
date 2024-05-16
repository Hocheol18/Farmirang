export interface fetchDonationDataFunctionType {
  cursor: number;
  size: number;
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

export interface postDonationDataType {
  address: string;
  title: string;
  crops: Array<{ id: number; amount: number; unit: string }>;
  startDate: string;
  endDate: string;
  content: string;
  summary: string;
}
