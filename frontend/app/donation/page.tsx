import Card from "./component/Card";
import AosComponent from "./component/AosComponent";
import { fetchDonationData } from "@/api/farm-donation";
import { fetchDonationDataType } from "@/type/farm-donation";
import React from "react";
import Link from "next/link";

export default async function Donation() {
  const res = await fetchDonationData({ cursor: 0, size: 12, user: null});

  return (
    <>
      <div className="w-full h-full">
        <AosComponent />
        <div className="flex justify-center mt-[10rem] pb-[8rem]">
          <div className="w-11/12">
            <div className="relative w-full grid grid-cols-3 ml-[4rem]">
              <div className="text-h1">모금중인 기부</div>
              <div className="bg-yellow-100 w-[17rem] h-6 rounded-xl absolute top-10 left-0 z-[-1] opacity-70"></div>
            </div>
            <div className="w-full grid grid-cols-3">
              {res.data.posts.map(
                (item: fetchDonationDataType, idx: number) => (
                  <React.Fragment key={idx}>
                    <Link
                      href={`/donation/${item.id}`}
                      className="flex justify-center"
                    >
                      <Card
                        imgSrc={`${item.header_img}`}
                        contents={`${item.summary}`}
                        Title={`${item.title}`}
                        progress={item.progress}
                        
                      />
                    </Link>
                  </React.Fragment>
                )
              )}
            </div>
          </div>
        </div>
        <div className="pb-32"></div>
      </div>
    </>
  );
}
