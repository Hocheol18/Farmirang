import Remote from "../component/Remote";
import Image from "next/image";
import DonationList from "../component/DonationList";
import Participate from "../component/Participate";
import { fetchDonationDetailData } from "@/api/farm-donation";

export default async function DonationDetailPage(donationId: {
  params: { donationId: number };
}) {
  const res = await fetchDonationDetailData(donationId.params.donationId);
  return (
    <>
      <div className="w-full pb-[10rem] mt-[5rem]">
        <div className="flex justify-center text-h1 font-bold text-green-400">
          기부중
        </div>
        <div className="flex justify-center text-[70px] font-extrabold">
          {res.data.title}
        </div>
        <div className="flex justify-center mt-16 h-full">
          <div className="flex w-4/5 h-full">
            <div className="w-8/12 mr-10">
              <div className="flex justify-end">
                <div className="w-5/6 aspect-video border border-black-100 relative">
                  <Image src={res.data.header_img} alt="" fill></Image>
                </div>
              </div>

              <div className="flex justify-end mt-10">
                <div className="w-3/4">
                  <div className="relative mt-6">
                    <div className="text-h2">이런걸 진행해요</div>
                    <div className="bg-green-200 w-[15rem] h-6 rounded-xl absolute top-8 left-0 z-[-1] opacity-70"></div>
                  </div>
                  <div className="flex justify-end mt-4">
                    <div className="border border-black-100 w-full aspect-video relative">
                      <Image src={res.data.main_img} alt="" fill></Image>
                    </div>
                  </div>

                  {/* 콘텐츠 내용 */}

                  <div className="text-h6 mt-10 leading-10">
                    <div
                      dangerouslySetInnerHTML={{
                        __html: res.data.content,
                      }}
                    />
                  </div>

                  {/* 기부 목록 */}
                  <DonationList donationData={res.data.items} />

                  {/* 참가자 목록 */}
                  <Participate donationIdChildren={res.data.id} donationData={res.data.items} />
                </div>
              </div>
            </div>
      
            <Remote
              progress={res.data.progress}
              startDate={res.data.start_date}
              endDate={res.data.end_date}
              address={res.data.delivery_address}
              donationId={res.data.id}
              donationItem={res.data.items}
            />
          </div>
        </div>
      </div>
    </>
  );
}
