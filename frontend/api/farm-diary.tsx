import { fetchCalendarData } from "@/type/farm-diary";
import { makeQuerystring } from "@/utils/ApiUtils";
import { DIARY_URL } from "@/utils/ServerApi";

export const fetchCalendar = async (
  params: fetchCalendarData
): Promise<fetchCalendarData[]> => {
  const { year, month } = params;
  const response = await fetch(
    `${DIARY_URL}/v1/diary/calendar/1${makeQuerystring({
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
