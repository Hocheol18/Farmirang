import {
  fetchAutoDiaryDataType,
  fetchCalendarDataType,
} from "@/type/farm-diary";
import { makeQuerystring } from "@/utils/ApiUtils";
import { DIARY_URL } from "@/utils/ServerApi";

export const fetchCalendar = async (
  params: fetchCalendarDataType
): Promise<fetchCalendarDataType[]> => {
  const { fieldId, year, month } = params;
  const response = await fetch(
    `${DIARY_URL}/v1/diary/calendar/${fieldId}${makeQuerystring({
      year,
      month,
    })}`,
    {
      cache: "no-store", // 매번 캐싱
      method: "GET",
    }
  );

  return await response.json();
};
interface ApiResponse {
  data: fetchAutoDiaryDataType;
}

export const fetchAutoDiary = async (diaryId: number): Promise<ApiResponse> => {
  const response = await fetch(`${DIARY_URL}/v1/diary/diary/${diaryId}`, {
    cache: "no-store", // 매번 캐싱
    method: "GET",
  });
  return await response.json();
};
