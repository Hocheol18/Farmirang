interface Crops {
  id: number;
  name: string;
  isClick: boolean;
  isRecommend: boolean;
}

const SecondPage = () => {
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

  // cropsList: 작물 배열
  const cropsList: Crops[] = [];

  for (let i = 1; i <= 16; i++) {
    cropsList.push({
      id: i,
      name: cropsName[i - 1],
      isClick: false,
      isRecommend: false,
    });
  }

  return (
    <div className=" flex flex-col w-[90%] h-[90%] border border-black-100  ">
      second
    </div>
  );
};

export default SecondPage;
