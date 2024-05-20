"use client";

import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

export default function Mainbox1() {
  useEffect(() => {
    AOS.init({
      useClassNames: true,
    });
  }, []);

  return (
    <div className="z-20">
      <div className="flex z-20 items-center content-start flex-col mt-132px relative">
        <div
          className="w-[487px] h-[332px] mb-4 bg-[url(/main/farmirangLogo.png)] bg-cover bg-no-repeat bg-center relative z-20"
          data-aos="fade-up"
          data-aos-delay="0"
        >
          <div className="w-[90px] h-[90px] light-effect -right-7 -top-8 z-10"></div>
          <div className="sun w-[90px] h-[90px] -right-7 -top-5 bg-[url(/main/sun.png)] bg-cover bg-no-repeat bg-center absolute z-10" />
        </div>
        <div
          data-aos="fade-up"
          data-aos-delay="100"
          className="text-white text-center mb-8 z-20"
        >
          처음 농사를 시작하는 분들을 위한 완벽한 안내서!
          <br />
          텃밭부터 밥상까지, 함께 수확의 즐거움을 누려보세요!
        </div>
      </div>
    </div>
  );
}
