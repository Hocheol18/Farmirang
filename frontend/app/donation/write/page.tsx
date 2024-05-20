"use client";

import { GoPlus } from "react-icons/go";
import { useEffect, useState } from "react";
import Input from "@/app/_components/common/Input";
import Button from "@/app/_components/common/Button";
import DaumPost from "@/app/_components/common/address";
import SelectMenu from "@/app/_components/common/SelectMenus";
import DatePicker from "@/app/_components/common/SelectDate";
import ImageComponent from "@/app/_components/common/Image";
import { cropData } from "./component/CropList";
import { postDonationDataType } from "@/type/farm-donation";
import { postDonationData } from "@/api/farm-donation";
import Editor from "@/app/_components/common/Editor";
import { useRouter } from "next/navigation";
import { CiCircleMinus } from "react-icons/ci";
import React from "react";

interface Props {
  areaAddress: string;
  townAddress: string;
}

export default function DonationWrite() {
  const [direction, setDirection] = useState<number>(1);
  const [amount, setAmount] = useState<number>(0);
  const router = useRouter();
  const [cropsJSON, setCropsJSON] = useState<
    { id: number; amount: number; unit: string }[]
  >([]);
  const [totalValue, setTotalValue] = useState<postDonationDataType>({
    address: "",
    title: "",
    crops: [{ id: 0, amount: 0, unit: "" }],
    startDate: "",
    endDate: "",
    content: "",
    summary: "",
  });
  const [headPicture, setHeadPicture] = useState<any>();
  const [detailPicture, setDetailPicture] = useState<any>();
  const [parentData, setParentData] = useState<string>("");
  const [showImage, setShowImage] = useState<any>();
  const [showDetailImage, setShowDetailImage] = useState<any>();
  const [secondparentDate, setSecondparentDate] = useState<string>("");
  const [addressObj, setAddressObj] = useState<Props>({
    areaAddress: "",
    townAddress: "",
  });

  let accessToken = "";
  if (typeof window !== "undefined") {
    const ls = window.localStorage.getItem("userInfo");
    if (ls) {
      const lsInfo = JSON.parse(ls);
      accessToken = lsInfo.state.userInfo.accessToken;
    }
  }

  const handleAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(Number(event.target.value));
  };

  const addCrop = () => {
    const selectedCrop = cropData.find((crop) => crop.id === direction);
    if (selectedCrop && cropsJSON.some((data) => data.id === selectedCrop.id)) {
      alert("이미 목록에 있습니다");
      setDirection(1);
      setAmount(0);
    } else if (selectedCrop && amount) {
      const newCrop = {
        id: selectedCrop.id,
        amount: Number(amount),
        unit: selectedCrop.name,
      };
      setCropsJSON([...cropsJSON, newCrop]);
      setTotalValue((prev: postDonationDataType) => ({
        ...prev,
        ["crops"]: cropsJSON,
      }));
      setDirection(1);
      setAmount(0);
    }
  };

  useEffect(() => {
    console.log(cropsJSON);
  }, [cropsJSON]);

  const handleInputFunction = (event: React.ChangeEvent<HTMLInputElement>) => {
    const name = event.target.name;
    const value = event.target.value;
    setTotalValue((prev: postDonationDataType) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleTextareaFunction = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    console.log(event);
    const name = event.target.name;
    const value = event.target.value;
    setTotalValue((prev: postDonationDataType) => ({
      ...prev,
      [name]: value,
    }));
  };

  const setEditorData = (model: string) => {
    setTotalValue((prevValue: postDonationDataType) => ({
      ...prevValue,
      ["content"]: model,
    }));
  };

  // 주소 데이터 입력 함수
  useEffect(() => {
    setTotalValue((prev: postDonationDataType) => ({
      ...prev,
      ["address"]: JSON.stringify(addressObj),
    }));
  }, [addressObj]);

  const onSubmit = async () => {
    const formdata = new FormData();
    formdata.append("head", headPicture);
    formdata.append("main", detailPicture);

    formdata.append("data", JSON.stringify(totalValue));
    const response = await postDonationData({ accessToken, formdata });
    if (response?.success) {
      alert("등록 성공");
      router.push("/");
    } else {
      alert("등록 실패");
      // window.location.reload();
    }
  };

  // 작물 삭제
  const deleteCrop = (index: number) => {
    setCropsJSON(cropsJSON.filter((_, idx) => idx !== index));
  };

  useEffect(() => {
    setTotalValue((prevValue: postDonationDataType) => ({
      ...prevValue,
      ["startDate"]: parentData,
    }));
  }, [parentData]);

  useEffect(() => {
    setTotalValue((prevValue: postDonationDataType) => ({
      ...prevValue,
      ["endDate"]: secondparentDate,
    }));
  }, [secondparentDate]);

  return (
    <>
      <div className="flex justify-center mt-20">
        <div className="space-y-12 w-1/3">
          <div className="">
            <h2 className="text-h1 font-semibold text-black-100">
              기부 신청하기
            </h2>

            <div className="grid grid-cols-1 gap-y-8 sm:grid-cols-6">
              <div className="col-span-full mt-10">
                <ImageComponent
                  topsecondcss="w-full"
                  title={"메인 사진"}
                  titlecss={"font-bold text-h5"}
                  topcss={"mt-8"}
                  heightcss={""}
                  displayImage={headPicture}
                  showImage={showImage}
                  setDisplayImage={setHeadPicture}
                  setShowImage={setShowImage}
                />
                <ImageComponent
                  topsecondcss="w-full"
                  title={"상세 사진"}
                  titlecss={"font-bold text-h5"}
                  topcss={"mt-20"}
                  heightcss={""}
                  displayImage={detailPicture}
                  showImage={showDetailImage}
                  setShowImage={setShowDetailImage}
                  setDisplayImage={setDetailPicture}
                />

                <div className="col-span-full mt-20">
                  <div className="flex w-full justify-between">
                    <div className="block text-h5 font-bold leading-12 text-black-100 flex flex-col justify-center">
                      기부 받을 주소
                    </div>
                    <div className="block flex justify-end">
                      <DaumPost setAddressObj={setAddressObj} />
                    </div>
                  </div>

                  <div className="mt-4">
                    <input
                      value={addressObj.areaAddress}
                      onChange={() => {}}
                      className="flex rounded-lg border border-green-300 w-full focus:outline-none focus:ring-green-400 focus:ring-1 h-10 p-4"
                      placeholder="주소 찾기를 눌러주세요"
                    />
                  </div>
                  <div className="mt-4">
                    <input
                      value={addressObj.townAddress}
                      onChange={() => {}}
                      className="flex rounded-lg border border-green-300 w-full focus:outline-none focus:ring-green-400 focus:ring-1 h-10 p-4"
                      placeholder="주소 찾기를 눌러주세요"
                    />
                  </div>
                  <div className="mt-4">
                    <input
                      type="text"
                      onChange={() => {}}
                      className="flex rounded-lg border border-green-300 w-full focus:outline-none focus:ring-green-400 focus:ring-1 h-10 p-4"
                      placeholder="상세 주소를 입력해주세요"
                    />
                  </div>
                </div>

                <div className="">
                  <Input
                    labeltext={"기부 글 제목"}
                    topcss="mt-20"
                    labelcss={
                      "block text-h5 leading-12 text-black-100 font-bold"
                    }
                    inputcss={
                      "h-[2.8rem] flex rounded-lg border border-green-300 w-full focus:outline-none focus:ring-green-400 focus:ring-1 h-10 p-4"
                    }
                    placeholder={"기부 글 이름을 정해주세요"}
                    type={"text"}
                    value={totalValue.title}
                    name={"title"}
                    onChange={handleInputFunction}
                  />
                </div>
              </div>

              <div className="col-span-full mt-12">
                <div className="block text-h5 font-bold leading-12 text-black-100">
                  기부 받을 작물 목록
                </div>
                {cropsJSON.length === 0 ? (
                  <>
                    <div className="flex mt-2 justify-between">
                      <div className="w-1/2 mr-[1rem]">
                        <SelectMenu
                          value={direction}
                          onChange={(value: number) => {
                            setDirection(value);
                          }}
                          labelcss={"text-h4 text-black-100"}
                          topScript={""}
                          items={cropData}
                          bordercss="border-gray-400 h-[2.5rem]"
                        />
                      </div>
                      <div className="relative mt-2 w-1/2 ml-[1rem]">
                        <div className="flex rounded-md border border-green-300">
                          <input
                            type={"text"}
                            name={"amount"}
                            value={amount !== 0 ? amount : ""}
                            onChange={handleAmountChange}
                            className="flex rounded-lg border border-green-300 w-full focus:outline-none focus:ring-green-400 focus:ring-1 h-10 p-4 placeholder:text-base"
                            placeholder={"작물 갯수를 적어주세요"}
                          />
                        </div>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    {cropsJSON.map((item, idx: number) => (
                      <React.Fragment key={idx}>
                        <div className="flex mt-2 justify-between">
                          <div className="w-1/2 mr-[1rem]">
                            <div className="border border-green-400 mt-2 h-10 rounded-lg">
                              <div className="py-1 pl-4 pr-10 font-bold text-h6">
                                {item.unit}
                              </div>
                            </div>
                          </div>
                          <div className="relative mt-2 w-1/2 ml-[1rem] mr-[1rem]">
                            <div className="flex rounded-md border border-green-300">
                              <div className="font-bold text-lg h-10 p-2 px-4">
                                {item.amount}
                              </div>
                            </div>
                          </div>
                          <CiCircleMinus
                            className="w-12 h-12 my-auto"
                            onClick={() => {
                              deleteCrop(idx);
                            }}
                          />
                        </div>
                      </React.Fragment>
                    ))}
                    <div className="flex mt-2 justify-between">
                      <div className="w-1/2 mr-[1rem]">
                        <SelectMenu
                          value={direction}
                          onChange={(value: number) => {
                            setDirection(value);
                          }}
                          labelcss={"text-h4 text-black-100"}
                          topScript={""}
                          items={cropData}
                          bordercss="border-gray-400 h-[2.5rem]"
                        />
                      </div>
                      <div className="relative mt-2 w-1/2 ml-[1rem]">
                        <div className="flex rounded-md border border-green-300">
                          <input
                            type={"text"}
                            name={"amount"}
                            value={amount !== 0 ? amount : ""}
                            onChange={handleAmountChange}
                            className="flex rounded-lg border border-green-300 w-full focus:outline-none focus:ring-green-400 focus:ring-1 h-10 p-4 placeholder:text-base"
                            placeholder={"작물 갯수를 적어주세요"}
                          />
                        </div>
                      </div>
                    </div>
                  </>
                )}

                <div
                  className="flex border border-green-300 h-10 rounded-md mt-4 justify-center cursor-pointer"
                  onClick={addCrop}
                >
                  <div className="flex flex-col justify-center">
                    <GoPlus className="h-8 w-8" />
                  </div>
                </div>
              </div>

              <div className="col-span-full mt-12">
                <div className="block text-h5 font-bold leading-12 text-black-100">
                  기부 시작일
                </div>
                <div className="flex justfiy-between">
                  <DatePicker
                    parentData={parentData}
                    setParentData={setParentData}
                  />
                  <div className="w-[3rem]"></div>
                  <DatePicker
                    parentData={secondparentDate}
                    setParentData={setSecondparentDate}
                  />
                </div>
              </div>

              <div className="col-span-full mt-12">
                <div className="block text-h5 font-bold leading-12 text-black-100">
                  기부글 내용 요약
                </div>
                <div className="mt-2">
                  <textarea
                    name="summary"
                    rows={6}
                    className="flex rounded-md border border-green-300 w-full focus:outline-none focus:ring-green-400 focus:ring-1 p-4"
                    value={totalValue.summary}
                    placeholder="기부글 내용을 요약해주세요"
                    onChange={handleTextareaFunction}
                  />
                </div>
                <p className="mt-1 text-[0.8rem] leading-6 text-gray-400">
                  기부글 내용을 요약해주세요
                </p>
              </div>

              <div className="col-span-full mt-12">
                <div className="block text-h5 font-bold leading-12 text-black-100">
                  기부글 소개
                </div>
                <div className="mt-2">
                  <Editor setEditorData={setEditorData} />
                </div>
                <p className="mt-1 text-[0.8rem] leading-6 text-gray-400">
                  텃밭을 설명할 글을 적어주세요 (자세하게 적을수록 좋습니다)
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-center mt-[10rem] pb-[10rem]">
        <Button
          text="확인"
          bgStyles="bg-green-400 w-32"
          textStyles="text-white-100"
          handleClick={onSubmit}
        />
      </div>
      <div></div>
    </>
  );
}
