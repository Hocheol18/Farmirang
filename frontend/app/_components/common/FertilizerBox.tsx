const FertilizerBox = () => {
  return (
    <div className="flex flex-col py-[2%] gap-3 items-center w-[30%] h-full">
      <div className="font-extrabold text-lg">비료 성분량</div>
      <div className="flex flex-col items-center w-full h-full">
        <div className="w-[90%] h-5 bg-yellow-100 shadow rounded-md"></div>
        <div className="flex-1 bg-yellow-200 w-[85%] shadow-xl">
          <div>슈퍼 감자 비료</div>
          <div className="flex">
            <div>13.7</div>
            <div>ㅡ</div>
            <div>13.7</div>
            <div>ㅡ</div>
            <div>13.7</div>
          </div>
          <div className="flex gap-4">
            <div>질소</div>
            <div>인산</div>
            <div>칼리</div>
          </div>
          <div>감자 사진</div>
        </div>
        <div className="w-[90%] h-5 bg-yellow-100 shadow rounded-md"></div>
      </div>
    </div>
  );
};

export default FertilizerBox;
