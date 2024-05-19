import {
  CreateCustomDesignParams,
  CreateRecommendParams,
  createFieldParams,
  getDesignIdParams,
  getDesignListResponse,
  getThumbnailDesignResponse,
  updateDesignNameParams,
} from "@/type/farmDesginType";

("@/app/_stores/userStore");

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
export const getCropInfo = async (params: getDesignIdParams) => {
  const { accessToken, designId } = params;
  const response = await fetch(`${DESIGN_URL}/v1/designs/${designId}/crops`, {
    method: "GET",
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
export const CreateRecommendation = async (params: CreateRecommendParams) => {
  const { accessToken, request, designId } = params;
  const response = await fetch(
    `${DESIGN_URL}/v1/designs/${designId}/recommendations`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(request),
    }
  );
  if (response.ok) {
    // JSON 데이터 추출
    const result = await response.json();
    return result.data;
  } else {
    throw new Error("Failed to create field");
  }
};

// updateDesignName
// 2단계&3단계 - 디자인 이름 수정 PUT
// /api/v1/designs/{designId}/names
export const UpdateDesignName = async (params: updateDesignNameParams) => {
  const { accessToken, request, designId } = params;
  const response = await fetch(`${DESIGN_URL}/v1/designs/${designId}/names`, {
    method: "PUT",
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

// getCustomEmptyField
// 3단계 - 커스텀용 조회 GET
// /api/v1/designs/{designId}/customs
export const getCustomEmptyField = async (params: getDesignIdParams) => {
  const { accessToken, designId } = params;
  const response = await fetch(`${DESIGN_URL}/v1/designs/${designId}/customs`, {
    method: "GET",
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

// createCustomDesign
// 3단계 - 커스텀 디자인 생성 POST
// /api/v1/designs/{designId}/customs
export const CreateCustomDesign = async (params: CreateCustomDesignParams) => {
  const { accessToken, request, designId } = params;
  const response = await fetch(`${DESIGN_URL}/v1/designs/${designId}/customs`, {
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

// recommendFertilizer
// 4단계 - 비료 추천 POST (BASE_URL, Header X)
// /api/v1/recommend/fertilizer
export const getRecommendFertilizer = async (params: { crops: string[] }) => {
  const response = await fetch(`${BASE_URL}/v1/recommend/fertilizer`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(params),
  });
  if (response.ok) {
    // JSON 데이터 추출
    const result = await response.json();
    console.log(result.data);
    return result.data.fertilizers;
  } else {
    throw new Error("Failed to create field");
  }
};

//  getDesignDetail
// 디자인 상세보기 GET
// /api/v1/designs/{designId}
export const getDesignDetail = async (params: getDesignIdParams) => {
  const { accessToken, designId } = params;
  const response = await fetch(`${DESIGN_URL}/v1/designs/${designId}`, {
    method: "GET",
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

// getDesignList
// 디자인 리스트 조회
// /api/v1/designs/lists
export const getDesignList = async (
  accessToken: string
): Promise<{ data: { designList: getDesignListResponse[] } }> => {
  const response = await fetch(`${DESIGN_URL}/v1/designs/lists`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  if (response.ok) {
    // JSON 데이터 추출
    const result = await response.json();

    return result;
  } else {
    throw new Error("Failed to create field");
  }
};

// getThumbnailDesign
// 대표 디자인 조회
// /api/v1/designs/thumbnails
export const getThumbnailDesign = async (
  accessToken: string
): Promise<getThumbnailDesignResponse> => {
  const response = await fetch(`${DESIGN_URL}/v1/designs/thumbnails`, {
    method: "GET",
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

// updateThumbnailDesign
// 대표 디자인 수정
// /api/v1/designs/thumbnails/{designId}
export const updateThumbnailDesign = async (params: getDesignIdParams) => {
  const { accessToken, designId } = params;
  const response = await fetch(
    `${DESIGN_URL}/v1/designs/thumbnails/${designId}`,
    {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    }
  );
  if (response.ok) {
    // JSON 데이터 추출
    const result = await response.json();

    return result.data;
  } else {
    throw new Error("Failed to create field");
  }
};

// deleteDesign
// 디자인 삭제
// /api/v1/designs/{ designId };
export const deleteDesign = async (params: getDesignIdParams) => {
  const { accessToken, designId } = params;
  const response = await fetch(`${DESIGN_URL}/v1/designs/${designId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
  });
  if (response.ok) {
    // JSON 데이터 추출
    const result = await response.json();

    return result;
  } else {
    throw new Error("Failed to create field");
  }
};
