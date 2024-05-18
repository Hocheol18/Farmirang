{
  /* <MyModal buttonText={"자세하게 보기"}
                                buttonBgStyles={"bg-green-200"}
                                subTitle=""
                                buttonTextStyles={"font-bold text-base text-black-100"}

                                Title={`${farmName}에서 ${fetchDonationList?.data.donors.length} 건 후원하셨어요.`}
                                contents={<>
                                    <div className="w-full flex justify-center mt-20">
                                        <div className="w-full">
                                            {fetchDonationList?.data.donors.map((item, idx: number) => (
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
                                                            <div className="h-1/2">
                                                                <div className="flex justify-between w-[20rem] mt-6">
                                                                    <div className="font-bold text-h4">
                                                                        {cropData[item.crop_id].name}
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
                                                        {item.approval === null ? "승인 대기" : item.approval ? "승인" : "거절"}
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
                                next={"새로고침"}></MyModal> */
}
