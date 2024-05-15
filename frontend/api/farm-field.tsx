
import { fetchFarmListType, postFieldType } from "@/type/farm-field";
import { BASE_URL } from "@/utils/ServerApi";

// 밭 생성
export const postField = async (data: postFieldType) => {
  const response = await fetch(`${BASE_URL}/v1/field`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      accept : "*/*",
    },
    body: JSON.stringify(data),
  });
  return response.json()
};

// 밭 조회
export const fetchFieldData = async (
  userId: number
): Promise<{ data: { fields: fetchFarmListType[] } }> => {
  const response = await fetch(`${BASE_URL}/v1/field/${userId}`, {
    cache: "no-store",
    method: "GET",
  });
  return await response.json();
};
