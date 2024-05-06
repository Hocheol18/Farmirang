import FertilizerBox from "@/app/_components/common/FertilizerBox";

const FertilizerContent = () => {
  const cropsName: string[] = [
    "감자",
    "고구마",
    "청양고추",
    "당근",
    "딸기",
    "땅콩",
    "방울토마토",
    "부추",
    "블루베리",
    "상추",
    "생강",
    "양파",
    "열무",
    "오이",
    "옥수수",
    "참외",
  ];

  return (
    <div className="flex justify-center items-center gap-24 w-full h-full border border-black-100">
      <FertilizerBox type="front" id={1} name="감자" N={13} P={3.3} K={11.4} />
      <FertilizerBox type="back" id={1} name="감자" N={13} P={3.3} K={11.4} />
    </div>
  );
};

export default FertilizerContent;
