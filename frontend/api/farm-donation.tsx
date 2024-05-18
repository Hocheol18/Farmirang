import {
  fetchDonationDataType,
  fetchDonationDataFunctionType,
  fetchDonationDetailDataType,
  fetchDonationListDataType,
  fetchDonorListDataType,
  fetchDonorPersonListDataType,
} from "@/type/farm-donation";
import { makeQuerystring } from "@/utils/ApiUtils";
import { DONATION_URL, MEMBER_URL } from "@/utils/ServerApi";

// 기부글 전체 조회
export const fetchDonationData = async (
  params: fetchDonationDataFunctionType
): Promise<{ data: { posts: fetchDonationDataType[] } }> => {
  const { cursor, size } = params;

  const response = await fetch(
    `${DONATION_URL}/v1/donation${makeQuerystring({
      cursor,
      size,
      
    })}`,
    {
      cache: "no-store",
      method: "GET",
    }
  );
  return await response.json();
};

// 기부글 포스트
export const postDonationData = async ({
  accessToken,
  formdata,
}: {
  accessToken: string;
  formdata: FormData;
}) => {
  try {
    const response = await fetch(`${DONATION_URL}/v1/donation`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        accept: "application/json",
        "accept-language": "ko-KR,ko;q=0.9,en-US;q=0.8,en;q=0.7",
        Referer: "http://localhost:3000/",
        "Referrer-Policy": "strict-origin-when-cross-origin",
      },
      body: formdata,
    });

    if (response.ok) {
      return { success: true }
    }
  } catch (err) {
    console.log(err);
  }
};

// 도네이션 기부 상세글
export const fetchDonationDetailData = async (
  donationId: number
): Promise<{ data: fetchDonationDetailDataType }> => {
  const response = await fetch(`${DONATION_URL}/v1/donation/${donationId}`, {
    method: "GET",
    cache: "no-cache",
  });
  return await response.json();
};

// 도네이션 후원 목록 조회
export const fetchDonationListData = async (
  donationId: number
): Promise<{ data: { donors: fetchDonationListDataType[] } }> => {
  const response = await fetch(`${DONATION_URL}/v1/donor?id=${donationId}`, {
    method: "GET",
    cache: "no-store",
  });

  return await response.json();
};

// 프로필 받아오는 함수
export const fetchProfile = async (memberId: number) => {
  const response = await fetch(`${MEMBER_URL}/v1/user/${memberId}/profile`);
  if (response && response.ok) {
    return await response.json();
  }
};

// 회원이 작물 후원 POST 함수
export const postDonationCrops = async (
  accessToken: string,
  FormData: FormData
) => {
  try {
    const response = await fetch(`${DONATION_URL}/v1/donor`, {
      method: "POST",
      headers: {
        accept: "application/json",
        "accept-language": "ko-KR,ko;q=0.9,en-US;q=0.8,en;q=0.7",
        Referer: "http://localhost:3000/",
        "Referrer-Policy": "strict-origin-when-cross-origin",
        Authorization: `Bearer ${accessToken}`,
      },
      body: FormData,
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

// 개인 유저 후원 목록 조회
export const fetchDonorData = async (donationId : number) : Promise<fetchDonorPersonListDataType> => {
  const response = await fetch(`${DONATION_URL}/v1/donor?id=${donationId}`, {
    cache: "no-store",
    method : "GET"
  })
  return await response.json()
}

// 기부글 특정 기업 회원 조회
export const fetchDonationDataWithCompony = async (
  params: fetchDonationDataFunctionType
): Promise<{ data: { posts: fetchDonationDataType[] } }> => {
  const { cursor, size, user } = params;

  const response = await fetch(
    `${DONATION_URL}/v1/donation${makeQuerystring({
      cursor,
      size,
      user
    })}`,
    {
      cache: "no-store",
      method: "GET",
    }
  );
  return await response.json();
};


// 후원 목록 조회
export const fetchDonorList = async (donationId: number): Promise<{ data: { donors: fetchDonorListDataType[] } }> => {

  const response = await fetch(`${DONATION_URL}/v1/donor?id=${donationId}`, {
    method: "GET",
    cache: "no-store"
  })
  return await response.json()

}

// 후원 승인, 거절
export const putDonorApprove = async (accessToken : string, dataList : {id : number, approval : boolean}) => {
  const response = await fetch(`${DONATION_URL}/v1/donor`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      accept: "*/*",
      'Content-Type' : "application/json",
      Referer: "http://localhost:3000/",
      "Referrer-Policy": "strict-origin-when-cross-origin",
    },
    body : JSON.stringify(dataList),
  })
  if (response.ok) {
    return {success : true}
  } else {
    return {success : false}
  } 
}

// 후원글 유저 삭제
export const deleteDonor = async (accessToken : string, donorId : number) => {
  const response = await fetch(`${DONATION_URL}/v1/donor?id=${donorId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      accept : "*/*",
      'Content-Type' : "aaplication/json"
    }
  })
  if (response.ok) {
    return {success : true}
  } else {
    return {success : false}
  }

}

// 기부글 삭제
export const deleteDonation = async (donationId : number, accessToken : string) => {
  const response = await fetch(`${DONATION_URL}/v1/donation?id=${donationId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      accept : "*/*"
    }
  })
  if (response.ok) {
    return {success : true}
  } else {
    return {success : false}
  }
}