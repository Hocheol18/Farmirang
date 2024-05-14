import {
  fetchAutoDiaryDataType,
  fetchCalendarDataType,
  fetchFarmListType,
} from "@/type/farm-diary";
import { makeQuerystring } from "@/utils/ApiUtils";
import { BASE_URL, DIARY_URL } from "@/utils/ServerApi";

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

export const fetchFieldData = async (
  userId: number
): Promise<{data : {fields : fetchFarmListType[]}}> => {
  const response = await fetch(`${BASE_URL}/v1/field/${userId}`, {
    cache: "no-store",
    method: "GET",
  });
  return await response.json();
};

export const postManualDiary = async() => {
  const response = await fetch(`${DIARY_URL}/v1/diary/manual}`, {
    method: "POST"
  })
}
