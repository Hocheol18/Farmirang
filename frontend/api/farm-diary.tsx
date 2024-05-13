import { DIARY_URL } from "@/utils/ServerApi";

export const fetchCalendar = async () => {
  const response = await fetch(
    `${DIARY_URL}/v1/diary/calendar/1?year=2024&month=5`,
    {
      cache: "no-store",
      method: "GET",
    }
  );

  return response.json();
};
