"use client"

import { deleteDonation, fetchDonorList, fetchProfile, putDonorApprove } from "@/api/farm-donation";
import MyModal from "@/app/_components/common/Modal";
import { fetchDonorListDataType, fetchDonorProfileListDataType } from "@/type/farm-donation";
import { useEffect, useState } from "react";
import Image from "next/image";
import { cropData } from "@/app/donation/write/component/CropList";
import Button from "@/app/_components/common/Button";


interface Props {
    fieldId: number;
    farmName: string;
    date: string;
    title: string;
}

export default function FarmDonation({
    fieldId,
    date,
    farmName,

    title
}: Props) {
    const [isFetch, setIsFetch] = useState<boolean>(true)
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
        const fetchDonorProfiles = async () => {
            try {
                const res = await fetchDonorList(fieldId);

                const donorProfiles = await Promise.all(
                    res.data.donors.map((item) => fetchProfile(item.member_id))
                );
                setFetchDonorDetailList(res.data.donors)
                setFetchDonorProfileList(donorProfiles);
            } catch (error) {
                console.error("Error fetching donor profiles:", error);
            }
        };

        fetchDonorProfiles();
    }, [fieldId, isFetch]);


    const [fetchDonorProfileList, setFetchDonorProfileList] = useState<Array<{ data: fetchDonorProfileListDataType }>>([{
        data: {
            badge: 0,
            nickname: "",
            profile_img: "",
            role: ""
        }
    }])

    const handleClickFunction = async (data: { id: number, approval: boolean }) => {
        const response = await putDonorApprove(accessToken, data)
        if (response.success) {
            alert("승인 / 거절 성공")
            setIsFetch((prev) => !prev);
        } else {
            alert("승인 / 거절 실패")
            setIsFetch((prev) => !prev);
        }
    }

    const handleDeleteFunction = async (donationId: number) => {
        const response = await deleteDonation(donationId, accessToken)
        if (response.success) {
            alert("삭제 성공")
            window.location.reload()
        } else {
            alert("삭제 실패")
            
        }
    }
    const [fetchDonorDetailList, setFetchDonorDetailList] = useState<fetchDonorListDataType[]>([])
    return (
        <div className="w-full h-auto px-[37px] py-[35px] bg-white rounded-[20px] border-4 border-green-400 flex-col justify-center items-center inline-flex mb-6">
            <div className="self-stretch h-fit flex-col justify-start items-end flex">
                <div className="self-stretch justify-between items-center inline-flex">
                    <div className="w-[477px] h-12 items-end flex gap-[5px]">
                        <div className="text-[length:var(--m-h3-font-size)] leading-10">
                            {farmName}
                        </div>
                        <div className="text-gray-400 text-[length:var(--m-h5-font-size)] leading-loose ml-4">
                            {date} 종료
                        </div>
                    </div>


                    <div className="h-12 justify-between items-center flex gap-[10px]">
                        <MyModal buttonText={"후원 목록 보기"}
                            buttonBgStyles={"bg-green-200"}
                            buttonTextStyles={"font-bold text-lg text-black-100"}
                            Title={`${title} 후원 목록`}
                            subTitle={"후원자 목록에서 승인/거절해주세요"}
                            contents={<>
                                <div className="w-full flex justify-center">
                                    <div className="w-full">
                                        {fetchDonorDetailList.map((item, idx: number) => (
                                            <div className="flex mb-10 justify-between w-full" key={idx}>
                                                <div className="flex justify-between w-[60rem]">
                                                    <div className="w-[400px]">

                                                        <Image src={item.confirm_img} alt="" width={400} height={200} />
                                                    </div>

                                                    <div className="ml-10 flex flex-col w-[30rem]">
                                                        <div className="flex h-1/2">
                                                            <div className="border border-black-100 w-[100px] h-[100px] rounded-full relative overflow-hidden my-auto">
                                                                <Image
                                                                    src={fetchDonorProfileList[idx]?.data.profile_img}
                                                                    alt="Profile Image"
                                                                    fill
                                                                />
                                                            </div>
                                                            <div className="my-auto">
                                                                <div className="font-bold text-h6 ml-10">
                                                                    {fetchDonorProfileList[idx]?.data.nickname}
                                                                </div>
                                                            </div>
                                                        </div>
                                                        {JSON.stringify(item)}
                                                        <div className="h-1/2">
                                                            <div className="flex justify-between w-[20rem] mt-6">
                                                                <div className="font-bold text-h4">
                                                                    {cropData[item.crop_id-1].name}
                                                                </div>
                                                                <div className="font-bold text-h4">
                                                                    {item.amount} 개
                                                                </div>
                                                            </div>

                                                            <div className="flex justify-between w-[20rem] my-auto mt-2">
                                                                <div className="font-bold text-h6">
                                                                    등록 날짜 :
                                                                </div>
                                                                <div className="text-h6">
                                                                    {item.register_date.slice(0, 10)}
                                                                </div>
                                                            </div>


                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="text-h4 my-auto ">
                                                    {item.approval === null ? "승인 대기" : item.approval ? "승인" : "거절" }
                                                </div>

                                                <div className="flex flex-col w-[5rem] my-auto">
                                                    <Button text={"승인"} bgStyles={"h-[3rem] bg-green-300"} textStyles={"text-black-100 font-bold text-h6"} handleClick={() => handleClickFunction({ id: item.id, approval: true })} />

                                                    <div className="mt-10"></div>

                                                    <Button text={"거절"} bgStyles={"h-[3rem] bg-red-100"} textStyles={"text-white-100 font-bold text-h6"} handleClick={() => handleClickFunction({ id: item.id, approval: false })} />
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                            </>}
                            subTitlecss={"text-h6"}
                            Titlecss={"font-bold text-h1"}
                            Modalcss={"w-2/3 p-16"}
                            Titlebottom={undefined}
                            onSuccess={() => { window.location.reload() }}
                            next={"새로고침"}></MyModal>
                        <div className="mr-2">

                        </div>
                        <Button text={"글 삭제"} bgStyles={"bg-red-100"} textStyles={"text-white-100 font-bold"} handleClick={() => { handleDeleteFunction(fieldId) }
                        }>

                        </Button>
                    </div>
                </div>

            </div >
        </div >
    );
}
