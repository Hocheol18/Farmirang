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

export interface fetchDonationDetailDataType {
  member_id: number;
  header_img: string;
  main_img: string;
  start_date: string;
  end_date: string;
  delivery_address: string;
  register_date: string;
  id: number;
  title: string;
  content: string;
  state: string;
  progress: number;
  summary: string;
  items: Array<{
    crop_id: number;
    id: number;
    amount: number;
    unit: string;
    current: number;
  }>;
}

export interface fetchDonationListDataType {
  board_id: number;
  member_id: number;
  crop_id: number;
  register_date: string;
  confirm_img: string;
  id: number;
  amount: number;
  approval: boolean;
}