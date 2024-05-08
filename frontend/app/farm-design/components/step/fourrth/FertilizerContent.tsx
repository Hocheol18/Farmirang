import FertilizerBox from "@/app/_components/common/FertilizerBox";

import { StaticImageData } from "next/image";

interface Crop {
  id: number;
  name: string;
  isClick: boolean;
  pic: StaticImageData;
}

interface Props {
  selectedCrop: Crop;
}

const FertilizerContent = ({ selectedCrop }: Props) => {
  return (
    <div className="flex justify-center items-center gap-24 w-full h-full">
      <FertilizerBox
        type="front"
        id={selectedCrop.id}
        name={selectedCrop.name}
        N={13}
        P={3.3}
        K={11.4}
      />
      <FertilizerBox
        type="back"
        id={selectedCrop.id}
        name={selectedCrop.name}
        N={13}
        P={3.3}
        K={11.4}
      />
    </div>
  );
};

export default FertilizerContent;
