import Image from "next/image";
import { fetchDonationListData, fetchProfile } from "@/api/farm-donation";
import React from "react";
import { cropData } from "../[donationId]/component/Crop";

export default async function Participate({
  donationIdChildren,
  donationData,
}: {
  donationIdChildren: number;
  donationData: Array<{
    crop_id: number;
    id: number;
    amount: number;
    unit: string;
    current: number;
  }>;
}) {
  // 처음 데이터 받아옴
  const donationListData = await fetchDonationListData(donationIdChildren);

  // 맴버 아이디 추출
  const memberIds = donationListData.data.donors
    .filter((donor) => donor.approval === true)
    .map((donor) => donor.member_id);

  // 프로필과 맴버 아이디 일치하는 항목만 받아서 Promise 저장
  const profilePromises = memberIds.map((memberId) => fetchProfile(memberId));
  const profiles = await Promise.all(profilePromises);

  // 기존의 있는 항목에 profile 항목을 추가해서 저장
  const donorsWithProfiles = donationListData.data.donors
    .filter((donor) => donor.approval)
    .map((donor, index) => ({
      ...donor,
      profile: profiles[index],
    }));

  // 식물 받아오는 항목을 다시 저장
  const donorsWithProfileCrops = donorsWithProfiles.map((donor) => {
    const crop = cropData.find((crop) => crop.id === donor.crop_id);
    return {
      ...donor,
      crop: crop,
    };
  });

  // 기부 작물 가져오는 함수
  const combinedData = donationData
    .filter((donation) => cropData.some((crop) => crop.id === donation.crop_id))
    .map((donation) => {
      const crop = cropData.find((crop) => crop.id === donation.crop_id);
      return {
        ...donation,
        cropName: crop?.name,
        cropImage: crop?.image,
      };
    });
  //

  const number = donorsWithProfileCrops.length;

  return (
    <>
      <div className="relative mt-44">
        <div className="text-h2 z-10">{number} 명이 참가했어요</div>
        <div className="bg-green-200 w-[21rem] h-6 rounded-xl absolute top-8 left-0 z-[-1] opacity-70"></div>
      </div>

      <div className="border border-black-100 my-2"></div>
      <div className="flex flex-wrap content-start">
        {combinedData.map((item, idx: number) => (
          <div
            key={idx}
            className="mx-[2.5rem] my-[2rem] w-[110px] h-[110px] border border-black-100 rounded-full relative flex items-center justify-center"
          >
            <div className="text-center">
              <div className="stroke-black">{item.cropImage}</div>
              <div className="font-bold text-h5 mt-[2px]">{item.current}개</div>
            </div>
          </div>
        ))}
      </div>

      <div className="border border-black-100 mt-2"></div>
      {number !== 0 ? (
        donorsWithProfileCrops.map((item, idx: number) => (
          <React.Fragment key={idx}>
            <div className="flex justify-between my-10">
              <div className="w-3/4 flex gap-[2rem]">
                <div className="border border-black-100 w-[80px] h-[80px] rounded-[10rem] relative overflow-hidden">
                  <Image
                    src={item.profile.data.profile_img}
                    alt="Profile Image"
                    fill
                  />
                </div>
                <div className="flex flex-col justify-center">
                  <div className="text-h4">{item.profile.data.nickname}</div>
                </div>
              </div>
              <div className="w-1/3 flex justify-end gap-[2rem]">
                <div className="stroke-black flex flex-col justify-center">
                  {item.crop?.image}
                </div>
                <div className="my-auto">
                  <div className="text-h4">{item.amount}개</div>
                </div>
              </div>
            </div>
          </React.Fragment>
        ))
      ) : (
        <div className="h-[20rem] flex flex-col justify-center">
          <div className="flex justify-center">
            <div className="font-bold text-h1">아직 후원자가 없습니다.</div>
          </div>
        </div>
      )}

      <div className="border border-black-100 border"></div>
    </>
  );
}
