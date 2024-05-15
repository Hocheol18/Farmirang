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

// 자동 일지 조회
export const fetchAutoDiary = async (diaryId: number): Promise<ApiResponse> => {
  const response = await fetch(`${DIARY_URL}/v1/diary/diary/${diaryId}`, {
    cache: "no-store", // 매번 캐싱
    method: "GET",
  });
  return await response.json();
};

// 수동 일지 생성
export const postManualDiary = async (formData: FormData) => {
  try {
    const response = await fetch(`${DIARY_URL}/v1/diary/manual`, {
      method: "POST",
      body: formData,
      headers: {
        accept: "application/json",
        "accept-language": "ko-KR,ko;q=0.9,en-US;q=0.8,en;q=0.7",
        Referer: "http://localhost:3000/",
        "Referrer-Policy": "strict-origin-when-cross-origin",
      },
    });
    if (response.ok) {
      return { success: true };
    } else if (!response.ok) {
      return { success: false };
    }
  } catch (err) {
    return { success: false };
  }
};

// 수동 일지 삭제
export const postManualDiaryDelete = async (manualId : number) => {
  try {
    const response = await fetch(`${DIARY_URL}/v1/diary/manual/${manualId}`, {
      method: "DELETE",
      headers: {
        accept: "*/*",
      },
    });
    if (response.ok) {
      return {success : true}
    }
  }
  catch (err) {
    return {success : false}
  }
}