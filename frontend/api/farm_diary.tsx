import { FARM_DIARY } from "@/utils/ServerApi";

// 달력 조회 API
export const FetchCalendar = async () => {
    const response = await fetch(`${FARM_DIARY}/v1/diary/calendar/1?year=2024&month=5`, {
      cache: "no-cache", // 매 요청마다 패치됨
      method: "GET",
    });
  
    return await response.json();
  };