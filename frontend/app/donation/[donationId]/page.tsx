import Remote from "../component/Remote";
import Image from "next/image";
import DonationList from "../component/DonationList";
import Participate from "../component/Participate";
import { fetchDonationDetailData } from "@/api/farm-donation";

export default async function DonationDetailPage(donationId: {
  params: { donationId: number };
}) {
  const res = await fetchDonationDetailData(donationId.params.donationId);
  const number = 25;
  const count = 6;
  return (
    <>
      {JSON.stringify(res)}

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
                <div className="w-[1000px] border border-black-100 h-[500px] relative">
                  <Image src={res.data.header_img} alt="" fill></Image>
                </div>
              </div>

              <div className="flex justify-end mt-10">
                <div className="w-4/5">
                  <div className="flex justify-end">
                    <div className="border border-black-100 w-[800px] h-[500px] relative">
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
                  <DonationList />

                  {/* 참가자 목록 */}
                  <Participate />
                </div>
              </div>
            </div>
            <Remote />
          </div>
        </div>
      </div>
    </>
  );
}
