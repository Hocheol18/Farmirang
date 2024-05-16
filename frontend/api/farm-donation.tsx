import {
  fetchDonationDataType,
  fetchDonationDataFunctionType,
  postDonationDataType,
  fetchDonationDetailDataType,
} from "@/type/donation";
import { makeQuerystring } from "@/utils/ApiUtils";
import { DONATION_URL } from "@/utils/ServerApi";

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

export const postDonationData = async ({
  accessToken,
  inputData,
}: {
  accessToken: string;
  inputData: postDonationDataType;
}) => {
  const response = await fetch(`${DONATION_URL}/v1/donation`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ data: inputData }),
  });
};

export const fetchDonationDetailData = async (
  donationId: number
): Promise<{ data: fetchDonationDetailDataType }> => {
  const response = await fetch(`${DONATION_URL}/v1/donation/${donationId}`, {
    method: "GET",
    cache: "no-cache",
  });
  return await response.json();
};
