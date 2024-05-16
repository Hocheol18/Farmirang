import { createFieldParams } from "@/type/farmDesginType";

import { useUserStore } from "@/app/_stores/userStore";
("@/app/_stores/userStore");
import { makeQuerystring } from "@/utils/ApiUtils";
import { BASE_URL, DESIGN_URL } from "@/utils/ServerApi";

// createField
// 1단계 - 디자인용 텃밭 생성 POST
// /api/v1/designs

const { userInfo } = useUserStore();

const putNewNickname = async () => {
  const response = await fetch(`${DESIGN_URL}/v1/designs`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${userInfo.accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ nickname: "들어갈 말" }),
  });
  if (response.ok) {
    // 코드 적기
  }
};

// getCropInfo
// 2단계 - 작물 정보 조회 GET
// /api/v1/designs/{designId}/crops

// createRecommendation
// 2단계 - 추천 디자인 생성 POST
// /api/v1/designs/{designId}/recommendations

// getDesignDetails
// 2단계&3단계 - 디자인 상세조회 GET
// /api/v1/designs/{designId}

// updateDesignName
// 2단계&3단계 - 디자인 이름 수정 PUT
// /api/v1/designs/{designId}/names

// getCustomEmptyField
// 3단계 - 커스텀용 빈 밭 조회 (1단계에서 바로 넘어갈 때) GET
// /api/v1/designs/{designId}/customs

// createCustomDesign
// 3단계 - 커스텀 디자인 생성 (1단계후 & 2단계 후) POST
// /api/v1/designs/{designId}/customs

// recommendFertilizer
// 4단계 - 비료 추천 POST (BASE_URL, Header X)
// /api/v1/recommend/fertilizer
