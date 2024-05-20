"use client";

import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import Image from "next/image";
import VEGE from "@/public/main/vege.png";

export default function Mainbox3() {
  useEffect(() => {
    AOS.init({
      useClassNames: true,
    });
  }, []);

  return (
    <div>
      <Image
        src={VEGE}
        alt="vegetable"
        className="absolute w-16 h-16 rotate-16 left-[2rem] bottom-[1rem] z-20"
      />
      <Image
        src={VEGE}
        alt="vegetable"
        className="absolute w-16 h-16 rotate-16 left-[7rem] bottom-[5rem] z-20"
      />
      <Image
        src={VEGE}
        alt="vegetable"
        className="absolute w-18 h-18 rotate-10 left-[15rem] bottom-[8rem] z-20"
      />
      <Image
        src={VEGE}
        alt="vegetable"
        className="absolute w-16 h-16 rotate-10 left-[15rem] bottom-[2rem] z-20"
      />
      <Image
        src={VEGE}
        alt="vegetable"
        className="absolute w-18 h-18 rotate-8 left-[25rem] bottom-[9rem] z-20"
      />
      <Image
        src={VEGE}
        alt="vegetable"
        className="absolute w-18 h-18 rotate-5 left-[35rem] bottom-12 z-20"
      />
      <Image
        src={VEGE}
        alt="vegetable"
        className="absolute w-18 h-18 rotate-12 left-[44rem] bottom-[10rem]"
      />
      <Image
        src={VEGE}
        alt="vegetable"
        className="absolute w-18 h-18 rotate-12 left-[54rem] bottom-24 z-20"
      />
      <Image
        src={VEGE}
        alt="vegetable"
        className="absolute w-18 h-18 rotate-12 left-[64rem] bottom-28 z-20"
      />
    </div>
  );
}
