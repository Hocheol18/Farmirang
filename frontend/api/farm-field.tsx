import {
  fetchDesignDataType,
  fetchFarmListType,
  postFieldType,
} from "@/type/farm-field";
import { BASE_URL, DESIGN_URL } from "@/utils/ServerApi";

// 밭 생성
export const postField = async (data: postFieldType) => {
  try {
    const response = await fetch(`${BASE_URL}/v1/field`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        accept: "*/*",
      },
      body: JSON.stringify(data),
    });
    if (response.ok) {
      return { success: true };
    } else {
      return { success: false };
    }
  } catch (err) {
    return { success: false };
  }
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

// 밭 디자인 조회
export const fetchDesignData = async (
  accessToken: string
): Promise<{ data: { designList: fetchDesignDataType[] } }> => {
  const response = await fetch(`${DESIGN_URL}/v1/designs/lists`, {
    cache: "no-store",
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
  });
  return await response.json();
};

// 밭 삭제
export const deleteFieldData = async (userId: number, fieldId: number) => {
  try {
    const response = await fetch(`${BASE_URL}/v1/field/${userId}/${fieldId}`, {
      method: "DELETE",
    });
    if (response.ok) {
      return { success: true };
    }
  } catch (err) {
    return { success: false };
  }
};
