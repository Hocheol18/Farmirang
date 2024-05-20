import FertilizerBox from "@/app/_components/common/FertilizerBox";

import { StaticImageData } from "next/image";

interface Crop {
  id: number;
  name: string;
  isClick: boolean;
  pic: StaticImageData;
  nitrogen: number;
  phosphate: number;
  potassium: number;
  addNitrogen: number;
  addPhosphate: number;
  addPotassium: number;
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
        N={selectedCrop.nitrogen}
        P={selectedCrop.phosphate}
        K={selectedCrop.potassium}
      />
      <FertilizerBox
        type="back"
        id={selectedCrop.id}
        name={selectedCrop.name}
        N={selectedCrop.addNitrogen}
        P={selectedCrop.addPhosphate}
        K={selectedCrop.addPotassium}
      />
    </div>
  );
};

export default FertilizerContent;
