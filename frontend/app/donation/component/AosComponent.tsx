"use client";

import AOS from "aos";
import React, { useEffect } from "react";
import "aos/dist/aos.css";

export default function AosComponent() {
  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <>
      <div>
        <div
          className="flex justify-center mt-20"
          data-aos="fade-up"
          data-aos-easing="ease-out"
          data-aos-duration="500"
          data-aos-delay="500"
        >
          <span className="font-bold text-h1">팜이랑과 함께하는</span>
          <span className="font-bold text-h1 text-green-400 ml-4">기부</span>
        </div>
      </div>

      <div className="w-full mt-14 leading-10">
        <div
          className="text-h5 font-semibold flex justify-center"
          data-aos="fade-up"
          data-aos-easing="ease-out"
          data-aos-duration="800"
          data-aos-delay="1300"
        >
          봄, 여름, 가을, 그리고 겨울
        </div>
        <div
          className="text-h5 font-semibold flex justify-center mb-8"
          data-aos="fade-up"
          data-aos-easing="ease-out"
          data-aos-duration="800"
          data-aos-delay="2100"
        >
          팜이랑은 가장 먼저 주변의 힘든 이웃을 도왔습니다.
        </div>
        <div className="mt-[4rem]">
          <div
            className="text-h5 font-semibold flex justify-center"
            data-aos="fade-up"
            data-aos-easing="ease-out"
            data-aos-duration="1000"
            data-aos-delay="3000"
          >
            기부,
          </div>
          <div
            className="text-h5 font-semibold flex justify-center"
            data-aos="fade-up"
            data-aos-easing="ease-out"
            data-aos-duration="1000"
            data-aos-delay="3000"
          >
            어렵지 않아요.
          </div>
          <div
            className="text-h5 font-semibold flex justify-center"
            data-aos="fade-up"
            data-aos-easing="ease-out"
            data-aos-duration="1000"
            data-aos-delay="3000"
          >
            팜이랑과 함께라면 쉬워집니다.
          </div>
          <div
            className="text-h5 font-semibold flex justify-center"
            data-aos="fade-up"
            data-aos-easing="ease-out"
            data-aos-duration="1000"
            data-aos-delay="3000"
          >
            지금 시작해보세요!
          </div>
        </div>
      </div>
    </>
  );
}
