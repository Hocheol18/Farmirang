import Image from "next/image";

import GuidLineImg from "@/public/icons/farm-design-guideline.svg";

const GuidlineContent = () => {
  return (
    <div className="rounded-[25px] bg-white-100 w-[92%] h-[80%] overflow-auto">
      <Image
        className="w-full rounded-[25px]"
        src={GuidLineImg}
        alt="가이드라인"
      />
    </div>
  );
};

export default GuidlineContent;
