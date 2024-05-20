"use client";

import { fetchAutoDiary, postManualDiary } from "@/api/farm-diary";
import { useEffect, useState } from "react";
import {
  diaryAutosDataType,
  diaryManualDataType,
  diaryTotalDataType,
  fetchAutoDiaryDataType,
  postManualDiaryType,
} from "@/type/farm-diary";
import { useParams } from "next/navigation";
import AutoDiary from "./AutoDiary";
import MyDiary from "./MyDiary";
import TemperatureComponent from "./TemperatureComponent";
import ImageComponent from "@/app/_components/common/Image";
import Editor from "@/app/_components/common/Editor";
import Spinner from "@/app/_components/common/Spinner";
import Modal from "@/app/_components/common/Modal";

interface ApiResponse {
  data: fetchAutoDiaryDataType;
}

export default function CalendarDate() {
  const [isTrueComponent, setIsTureComponent] = useState<boolean>(true);
  const [isTrue, setIsTure] = useState<boolean>(false);
  const [currentTemperatue, setCurrentTemperature] = useState<number>(0);
  const [manualId, setManualId] = useState<number>(0);
  const [fetchAutoDiaryData, setFetchAutoDiaryData] = useState<
    diaryAutosDataType[]
  >([]);
  const [fetchDiaryTotalData, setFetchDiaryTotalData] =
    useState<diaryTotalDataType>({
      fieldHumidity: "",
      humidity: "",
      temperature: "",
      diaryTotalId: 0,
    });
  const [fetchDiaryManualData, setFetchDiaryManualData] =
    useState<diaryManualDataType | null>({
      diaryManualId: "",
      content: "",
      photo: "https://s3.ap-northeast-2.amazonaws.com/default",
    });
  const params = useParams<{ date: string; diaryid: string }>();
  const [diaryPicture, setDiaryPicture] = useState<any>();

  const [totalValue, setTotalValue] = useState<postManualDiaryType>({
    diaryId: Number(params?.date),
    content: "",
  });

  const setEditorData = (model: string) => {
    setTotalValue((prevValue: any) => ({
      ...prevValue,
      ["content"]: model,
    }));
  };

  const OnSubmit = async () => {
    const formData = new FormData();
    formData.append("image", diaryPicture);
    formData.append("request", JSON.stringify(totalValue));
    const response = await postManualDiary(formData);

    if (response) {
      if (response.success) {
        alert("업로드 성공");
        window.location.reload();
      } else {
        alert("일지 작성에 오류가 발생했습니다. 다시 시도해주세요");
      }
    }
  };

  const NextFunction = (fetchdata: ApiResponse) => {
    setFetchAutoDiaryData(fetchdata.data.diaryAutos);
    setFetchDiaryTotalData(fetchdata.data.diaryTotal);
    setCurrentTemperature(Number(fetchdata.data.diaryTotal.temperature));
    if (fetchdata.data.diaryManual === null) {
      setIsTure(true);
    } else {
      setManualId(Number(fetchdata.data.diaryManual.diaryManualId));
      setFetchDiaryManualData(fetchdata.data.diaryManual);
      setIsTure(false)
    }
    setIsTureComponent(false);
  };

  useEffect(() => {
    fetchAutoDiary(Number(params?.date))
      .then((res) => {
        NextFunction(res);
      })
      .catch((err) => console.log(err));
  }, [params]);

  return (
    <>
      {isTrueComponent ? (
        <Spinner />
      ) : (
        <div className="h-full w-full flex">
          <div className="w-[80rem] p-10 ml-2 mt-2 h-full flex flex-col justify-between">
            <div>
            <div className="text-h2 font-bold mt-10">심은 작물</div>
            <div className="text-h5 font-semibold mt-4">오늘 작물은요...</div>
            </div>
          
            <div className="flex justify-between h-[24rem] w-full">
              <AutoDiary childrenAutoDiaryData={fetchAutoDiaryData} />
            </div>

            <div className="border border-gray-400 shadow-xl rounded-xl mt-10 h-1/3">
              <TemperatureComponent
                childrenDiaryTotalData={fetchDiaryTotalData}
              />
            </div>
          </div>
          <div className="w-[40rem] p-10 mr-8 mt-2 min-h-full">
            {isTrue ? (
              <div className="h-full flex flex-col justify-center">
                <div className="flex justify-center">
                  <Modal
                    buttonText={"나만의 일기 추가"}
                    buttonBgStyles={
                      "rounded-xl px-10 py-6 border border-black-100 shadow-sm hover:text-white-100 hover:bg-green-400 focus-visible:outline focus-visible:outline-2"
                    }
                    buttonTextStyles={"font-bold text-h1"}
                    Title={"일기 추가"}
                    subTitle={""}
                    contents={
                      <>
                        <ImageComponent
                          title={"일기 대표 사진"}
                          titlecss={"font-bold text-h5"}
                          topcss={"mt-[2rem] h-[20rem]"}
                          topsecondcss={"w-full"}
                          heightcss={"h-[18rem]"}
                          setDisplayImage={setDiaryPicture}
                        />
                        <div className="font-bold text-h5 mt-10 mb-4">
                          일지 쓰기
                        </div>
                        <Editor setEditorData={setEditorData} />
                      </>
                    }
                    subTitlecss={""}
                    Titlecss={"font-bold text-h2"}
                    Modalcss={"w-5/6"}
                    Titlebottom={undefined}
                    next={"작성"}
                    onSuccess={OnSubmit}
                  />
                </div>
              </div>
            ) : (
              <MyDiary
                setIsTure={setIsTure}
                manualId={manualId}
                childrenDiaryManualData={fetchDiaryManualData}
                Temperature={currentTemperatue}
              />
            )}
          </div>
        </div>
      )}
    </>
  );
}
