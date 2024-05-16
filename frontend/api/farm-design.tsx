import { createFieldParams, getCropInfoParams } from "@/type/farmDesginType";

("@/app/_stores/userStore");
import { makeQuerystring } from "@/utils/ApiUtils";
import { BASE_URL, DESIGN_URL } from "@/utils/ServerApi";

// createField
// 1단계 - 디자인용 텃밭 생성 POST
// /api/v1/designs
export const CreateField = async (params: createFieldParams) => {
  const { accessToken, request } = params;
  const response = await fetch(`${DESIGN_URL}/v1/designs`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(request),
  });
  if (response.ok) {
    // JSON 데이터 추출
    const result = await response.json();
    return result.data;
  } else {
    throw new Error("Failed to create field");
  }
};

// getCropInfo
// 2단계 - 작물 정보 조회 GET
// /api/v1/designs/{designId}/crops
export const getCropInfo = async (params: getCropInfoParams) => {
  const { accessToken, designId } = params;
  const response = await fetch(`${DESIGN_URL}/v1/designs/${designId}/crops`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
  });
  if (response.ok) {
    // JSON 데이터 추출
    const result = await response.json();
    return result.data;
  } else {
    throw new Error("Failed to create field");
  }
};

// createRecommendation
// 2단계 - 추천 디자인 생성 POST
// /api/v1/designs/{designId}/recommendations

// updateDesignName
// 2단계&3단계 - 디자인 이름 수정 PUT
// /api/v1/designs/{designId}/names

// getCustomEmptyField
// 3단계 - 커스텀용 조회 GET
// /api/v1/designs/{designId}/customs

// createCustomDesign
// 3단계 - 커스텀 디자인 생성 POST
// /api/v1/designs/{designId}/customs

// recommendFertilizer
// 4단계 - 비료 추천 POST (BASE_URL, Header X)
// /api/v1/recommend/fertilizer
