export default function CalendarDate() {
  const nowDate = 20;
  return (
    <div className="lg:flex lg:h-full">
      <div className="w-8/12 p-16">
        <div>
          <span className="text-h4 font-bold">
            밭 생성
          </span>
          <span className="ml-4 text-green-400 text-h3">
            + {nowDate}
          </span>
          <span className="ml-2 text-h4 font-bold">
            일 째
          </span>
        </div>
        <div className="text-h3 font-bold mt-10">
          심은 작물
        </div>
        <div className="flex overflow-auto">
          <div className="border w-48">
            h
          </div>
          <div className="border w-48">
            h
          </div>
          <div className="border w-48">
            h
          </div>
          <div className="border w-48">
            h
          </div>
          <div className="border w-48">
            h
          </div>
        </div>


      </div>
      <div className="w-4/12">
        "Diary"
      </div>
    </div>
  );
}
