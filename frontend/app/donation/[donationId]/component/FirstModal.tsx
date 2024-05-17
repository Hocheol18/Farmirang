"use client";

import Button from "@/app/_components/common/Button";
import ImageComponent from "@/app/_components/common/Image";
import Input from "@/app/_components/common/Input";
import KakaoMap from "@/app/_components/common/Maps";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, ReactEventHandler, useEffect, useState } from "react";
import { cropData } from "./Crop";
import SelectMenu from "@/app/_components/common/SelectMenus";
import { useParams } from "next/navigation";
import { postDonationCrops } from "@/api/farm-donation";

export default function FirstModal({
  address,
  remainCrops,
}: {
  address: string;
  remainCrops: Array<{
    crop_id: number;
    id: number;
    amount: number;
    unit: string;
    current: number;
  }>;
}) {
  const params = useParams<{ donationId: string }>();
  const [diaryPicture, setDiaryPicture] = useState<any>();
  const [totalValue, setTotalValue] = useState<{
    crop_id: number;
    board_id: number;
    amount: number;
  }>({
    amount: 0,
    board_id: Number(params.donationId),
    crop_id: 0,
  });
  const combinedData = remainCrops
    .filter((donation) => cropData.some((crop) => crop.id === donation.crop_id))
    .map((donation) => {
      const crop = cropData.find((crop) => crop.id === donation.crop_id);
      return {
        ...donation,
        cropName: crop?.name,
        cropImage: crop?.image,
      };
    });
  const [direction, setDirection] = useState<number>(1);
  const [state, setState] = useState<boolean>(true);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const setDefault = () => {
    setIsOpen(false);
    setState(true);
  };

  const handleInputData = (event: React.ChangeEvent<HTMLInputElement>) => {
    const name = event.target.name;
    const value = event.target.value;

    setTotalValue((item) => ({
      ...item,
      [name]: Number(value),
    }));
  };

  const handleDirectionChange = (parentValue: number) => {
    setTotalValue((prev: any) => ({
      ...prev,
      ["crop_id"]: parentValue,
    }));
  };

  // 데이터 재가공 (selectMenu를 위한)
  const selectedMenuItem = combinedData.map((item, index: number) => ({
    designId: item.crop_id,
    name: item.cropName,
    id: index + 1,
  }));

  const OnSubmit = async () => {
    const formData = new FormData();
    formData.append("img", diaryPicture);
    formData.append("data", JSON.stringify(totalValue));
    const response = await postDonationCrops(accessToken, formData);

    if (response.success) {
      alert("후원 등록 성공");
      window.location.reload();
    } else {
      alert("후원 등록 실패, 다시 시도해주세요.");
      window.location.reload();
    }
  };

  let accessToken = "";
  if (typeof window !== "undefined") {
    const ls = window.localStorage.getItem("userInfo");
    if (ls) {
      const lsInfo = JSON.parse(ls);
      accessToken = lsInfo.state.userInfo.accessToken;
    }
  }

  const parseAddress = JSON.parse(address);

  return (
    <>
      <Button
        text={"기부하기"}
        bgStyles={"bg-green-400 w-full"}
        textStyles={"font-bold text-white-100 text-l"}
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
                  className={`w-full transform border border-gray-400 overflow-hidden rounded-2xl bg-white-100 p-6 text-left align-middle shadow-xl transition-all ${"max-w-[700px] p-[2.5rem]"}`}
                >
                  <>
                    {state ? (
                      <>
                        <Dialog.Title
                          as="h3"
                          className={`text-black-100 ${"font-bold text-h1 relative"}`}
                        >
                          {"후원해요"}
                          <div className="bg-green-200 w-[11rem] h-6 rounded-xl absolute top-8 left-0 z-[-1] opacity-70"></div>
                        </Dialog.Title>
                        <div className="mt-2">
                          <p className={`text-black-100 ${"text-h6"}`}>
                            {"가능한 기부 품목"}
                          </p>
                        </div>

                        <div className="mt-6">
                          <div className="flex flex-wrap content-start">
                            {combinedData.map((item, idx: number) => (
                              <div
                                key={idx}
                                className="mx-[1.2rem] my-[1.2rem] w-[110px] h-[110px] border border-black-100 rounded-full relative flex items-center justify-center"
                              >
                                <div className="text-center">
                                  <div className="stroke-black">
                                    {item.cropImage}
                                  </div>
                                  <div className="font-bold text-h6 mt-[2px]">
                                    {item.cropName}
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>

                          <div className="text-h4 mt-[2rem] mb-[1rem] font-bold">
                            여기로 보내면 되요!
                          </div>
                          <KakaoMap address={address} />

                          <div className="mt-4 text-h6">
                            {parseAddress.areaAddress}
                            {parseAddress.townAddress}
                          </div>
                        </div>

                        <div className="flex justify-end mt-10">
                          <button
                            type="button"
                            className="inline-flex justify-center rounded-md border shadow-lg border-transparent bg-green-100 px-4 py-2 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2 mr-4"
                            onClick={() => {
                              setDefault();
                            }}
                          >
                            <div className="text-green-400 font-bold">취소</div>
                          </button>
                          <button
                            type="button"
                            className="inline-flex justify-center rounded-md shadow-xl border border-transparent bg-green-400 px-4 py-2 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2"
                            onClick={() => {
                              setState(false);
                            }}
                          >
                            <div className="text-white-100 font-bold">
                              {"다음"}
                            </div>
                          </button>
                        </div>
                      </>
                    ) : (
                      <>
                        <Dialog.Title
                          as="h3"
                          className={`text-black-100 ${"font-bold text-h3 relative"}`}
                        >
                          {"작물을 보냈어요!"}
                          <div className="bg-green-200 w-[20rem] h-5 rounded-xl absolute top-8 left-0 z-[-1] opacity-70"></div>
                        </Dialog.Title>

                      

                        <div className="flex mt-[2rem] w-full">
                          <div className="w-1/2 mt-8 pr-[1rem]">
                            <div className="block text-h5 leading-12 text-black-100 font-bold">
                              기부 물품
                            </div>
                            <SelectMenu
                              handleDirectionChange={handleDirectionChange}
                              value={direction}
                              onChange={(value: number) => {
                                setDirection(value);
                              }}
                              labelcss={"text-h4 text-black-100"}
                              topScript={""}
                              items={selectedMenuItem}
                              bordercss="border-gray-400 h-[2.8rem]"
                            />
                          </div>

                          <Input
                            name={"amount"}
                            labeltext={"갯수"}
                            topcss="mt-8 w-1/2 pl-[1rem]"
                            labelcss={
                              "block text-h5 leading-12 text-black-100 font-bold"
                            }
                            inputcss={
                              "h-[2.8rem] flex rounded-lg border w-full border-green-300 focus:outline-none focus:ring-green-400 focus:ring-1 p-2"
                            }
                            placeholder={"물품 갯수를 적어주세요"}
                            type={"number"}
                            value={
                              totalValue.amount === 0 ? "" : totalValue.amount
                            }
                            onChange={handleInputData}
                          />
                        </div>
                        <ImageComponent
                          title={"기부 물품 사진"}
                          titlecss={"font-semibold text-h6"}
                          topcss={"mt-[4rem] justify-center"}
                          topsecondcss="w-5/6"
                          heightcss={""}
                          setDisplayImage={setDiaryPicture}
                        />

                        <div className="flex justify-end mt-10">
                          <button
                            type="button"
                            className="inline-flex justify-center rounded-md border shadow-lg border-transparent bg-green-100 px-4 py-2 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2 mr-4"
                            onClick={() => {
                              setState(true);
                            }}
                          >
                            <div className="text-green-400 font-bold">뒤로</div>
                          </button>
                          <button
                            type="button"
                            className="inline-flex justify-center rounded-md shadow-xl border border-transparent bg-green-400 px-4 py-2 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2"
                            onClick={OnSubmit}
                          >
                            <div className="text-white-100 font-bold">
                              {"확인"}
                            </div>
                          </button>
                        </div>
                      </>
                    )}
                  </>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
