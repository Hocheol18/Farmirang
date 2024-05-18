"use client";

import {
  deleteDonation,
  deleteDonor,
  fetchDonorData,
} from "@/api/farm-donation";
import MyModal from "@/app/_components/common/Modal";
import {
  fetchDonorListDataType,
  fetchDonorPersonListDataType,
} from "@/type/farm-donation";
import { useEffect, useState, Fragment } from "react";
import Image from "next/image";
import { cropData } from "@/app/donation/write/component/CropList";
import { Dialog, Transition } from "@headlessui/react";
import Button from "@/app/_components/common/Button";

interface Props {
  fieldId: number;
  farmName: string;
  date: string;

  donationImage: string;
}

export default function FarmUserDonor({
  fieldId,
  date,
  farmName,

  donationImage,
}: Props) {
  const [fetchDonationList, setFetchDonationList] =
    useState<fetchDonorPersonListDataType>();
  const [isFetch, setIsFetch] = useState<boolean>(true);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  // localStorage에서 accessToken 받는 방법
  let accessToken = "";

  if (typeof window !== "undefined") {
    const ls = window.localStorage.getItem("userInfo");
    if (ls) {
      const lsInfo = JSON.parse(ls);
      accessToken = lsInfo.state.userInfo.accessToken;
    }
  }

  useEffect(() => {
    fetchDonorData(fieldId).then((res) => setFetchDonationList(res));
  }, [isFetch]);

  const handleClickFunction = async (accessToken: string, donorId: number) => {
    const response = await deleteDonor(accessToken, donorId);
    if (response.success) {
      alert("후원 철회 성공");
      setIsFetch((prev) => !prev);
    } else {
      alert("후원 철회 실패");
      setIsFetch((prev) => !prev);
    }
  };
  return (
    <div className="w-full h-auto px-[37px] py-[35px] bg-white rounded-[20px] border-4 border-green-400 flex-col justify-center items-center inline-flex mb-6">
      <div className="self-stretch h-fit flex-col justify-start items-end flex">
        <div className="self-stretch justify-between items-center inline-flex">
          <Image src={donationImage} alt="" width={300} height={150}></Image>
          <div className="w-[230px] h-full items-start">
            <div className="text-h5 font-bold leading-10">{farmName}</div>
            <div className="text-gray-400 text-lg">{date} 마감</div>
          </div>

          <div className="h-12 justify-between items-center flex">
            <div className="flex flex-col justfiy-between">
              <>
                <Button
                  text={"자세하게 보기"}
                  bgStyles={"bg-green-200"}
                  textStyles={"font-bold text-base text-black-100"}
                  handleClick={() => setIsOpen(true)}
                />

                <Transition appear show={isOpen} as={Fragment}>
                  <Dialog
                    as="div"
                    className="relative z-10"
                    onClose={() => setIsOpen(false)}
                  >
                    <div className="fixed inset-0 bg-gray-500 bg-opacity-80 z-0 w-full h-full"></div>
                    <div className="fixed inset-0 overflow-y-auto">
                      <div className="flex min-h-full items-center justify-center p-4 text-center">
                        <Transition.Child
                          as={Fragment}
                          enter="ease-out duration-300"
                          enterFrom="opacity-0 scale-95"
                          enterTo="opacity-100 scale-100"
                          leave="ease-in duration-200"
                          leaveFrom="opacity-100 scale-100"
                          leaveTo="opacity-0 scale-95"
                        >
                          <Dialog.Panel
                            className={`transform border border-gray-300 overflow-hidden rounded-2xl bg-white-100 p-6 text-left align-middle shadow-xl transition-all w-2/3 p-16`}
                          >
                            <>
                              <Dialog.Title
                                as="h3"
                                className={`text-black-100 font-bold text-h1`}
                              >
                                {`${farmName}에서 ${fetchDonationList?.data.donors.length} 건 후원하셨어요.`}
                              </Dialog.Title>
                              <div className={"mt-6"}>
                                <>
                                  <div className="w-full flex justify-center mt-20">
                                    <div className="w-full">
                                      {fetchDonationList?.data.donors.length !==
                                      0 ? (
                                        fetchDonationList?.data.donors.map(
                                          (item, idx: number) => (
                                            <div
                                              className="flex mb-24 justify-between w-full"
                                              key={idx}
                                            >
                                              <div className="flex justify-between w-[33rem]">
                                                <div className="w-[400px]">
                                                  <Image
                                                    src={item.confirm_img}
                                                    alt=""
                                                    width={300}
                                                    height={150}
                                                  />
                                                </div>

                                                <div className="ml-10 flex flex-col w-[12rem] h-full">
                                                  <div className="my-auto">
                                                    <div className="flex justify-between w-[17rem]">
                                                      <div className="font-bold text-h4">
                                                        {
                                                          cropData[item.crop_id]
                                                            .name
                                                        }
                                                      </div>
                                                      <div className="font-bold text-h4">
                                                        {item.amount} 개
                                                      </div>
                                                    </div>

                                                    <div className="flex justify-between w-[17rem] my-auto mt-2">
                                                      <div className="font-bold text-h6">
                                                        등록 날짜 :
                                                      </div>
                                                      <div className="text-h6">
                                                        {item.register_date.slice(
                                                          0,
                                                          10
                                                        )}
                                                      </div>
                                                    </div>
                                                  </div>
                                                </div>
                                              </div>

                                              <div className="flex w-[18rem] my-auto">
                                                <div className="text-h4 my-auto w-[10rem]">
                                                  {item.approval === null
                                                    ? "승인 대기"
                                                    : item.approval
                                                    ? "승인"
                                                    : "거절"}
                                                </div>
                                                {item.approval === null ? (
                                                  <Button
                                                    text={"후원 철회"}
                                                    bgStyles={
                                                      "h-[3rem] bg-red-100"
                                                    }
                                                    textStyles={
                                                      "text-white-100 font-bold text-h6"
                                                    }
                                                    handleClick={() =>
                                                      handleClickFunction(
                                                        accessToken,
                                                        item.id
                                                      )
                                                    }
                                                  />
                                                ) : (
                                                  <Button
                                                    text={"철회 불가"}
                                                    bgStyles={
                                                      "h-[3rem] bg-gray-300"
                                                    }
                                                    textStyles={
                                                      "text-white-100 font-bold text-h6"
                                                    }
                                                    handleClick={() => {}}
                                                  />
                                                )}
                                              </div>
                                            </div>
                                          )
                                        )
                                      ) : (
                                        <div className="flex justify-center">
                                          <div className="flex flex-col justify-center">
                                            <div className="font-bold text-h1">
                                              후원 내역이 없습니다.
                                            </div>
                                          </div>
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                </>
                              </div>
                              <div className="flex justify-end">
                                <button
                                  type="button"
                                  className="inline-flex justify-center rounded-md border shadow-lg border-transparent bg-green-100 px-4 py-2 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2 mr-4"
                                  onClick={() => setIsOpen(false)}
                                >
                                  <div className="text-green-400 font-bold">
                                    닫기
                                  </div>
                                </button>
                              </div>
                            </>
                          </Dialog.Panel>
                        </Transition.Child>
                      </div>
                    </div>
                  </Dialog>
                </Transition>
              </>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
