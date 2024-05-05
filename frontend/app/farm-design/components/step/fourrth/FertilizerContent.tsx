import FertilizerBox from "@/app/_components/common/FertilizerBox";

const FertilizerContent = () => {
  return (
    <div className="flex justify-center items-center gap-24 w-full h-full border border-black-100">
      <FertilizerBox />
      <FertilizerBox />
    </div>
  );
};

export default FertilizerContent;
