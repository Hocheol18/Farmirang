import {
  fetchDonationDataType,
  fetchDonationDataFunctionType,
} from "@/type/donation";
import { makeQuerystring } from "@/utils/ApiUtils";
import { DONATION_URL } from "@/utils/ServerApi";

export const fetchDonationData = async (
  params: fetchDonationDataFunctionType
): Promise<fetchDonationDataType> => {
  const { cursor, size, user } = params;

  const response = await fetch(
    `${DONATION_URL}/v1/donation${makeQuerystring({
      cursor,
      size,
      user,
    })}`,
    {
      cache: "no-store",
      method: "GET",
    }
  );
  return await response.json();
};
