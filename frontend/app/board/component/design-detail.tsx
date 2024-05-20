export default function DesignDetail() {
  return (
    <div className="w-auto h-[1802px] p-[50px] bg-white rounded-[15px] flex-col gap-[80px] justify-between items-center inline-flex">
      <div className="self-stretch justify-between items-center inline-flex">
        <div className="h-[126px] gap-[20px] justify-between items-center flex">
          <div className="w-[126px] h-[126px] bg-zinc-300 rounded-full">
            프사
          </div>
          <div className="text-center text-green-700 text-4xl font-extrabold font-['Tmoney RoundWind'] leading-10">
            유저 닉네임
          </div>
        </div>
        <div className="w-[216px] h-10 text-center text-black text-2xl font-extrabold font-['Tmoney RoundWind'] leading-loose">
          2024.04.23
        </div>
      </div>
      <img
        className="self-stretch h-[541px] rounded-[15px]"
        src="https://via.placeholder.com/1053x541"
      />
      <div className="self-stretch h-[305px] flex-col justify-center items-start gap-[15px] flex">
        <div className="text-center text-green-900 text-4xl font-bold font-['MICEGothic'] leading-10">
          한줄 메모
        </div>
        <div className="self-stretch h-[238px] px-24 py-[72px] bg-amber-100 rounded-[15px] justify-start items-center gap-2.5 inline-flex">
          <div className="grow shrink basis-0 text-center text-black text-4xl font-bold font-['MICEGothic'] leading-10">
            봄 시즌에 맞춰 고추, 부추, 상추를 심어봤습니다 <br />
            제법 아트적이죠? ^^
          </div>
        </div>
      </div>
      <div className="self-stretch h-[245px] flex-col justify-start items-start gap-[15px] flex">
        <div className="text-center text-green-900 text-4xl font-bold font-['MICEGothic'] leading-10">
          심은작물
        </div>
        <div className="self-stretch h-[190px] px-[85px] py-[47px] bg-amber-100 rounded-[15px] flex-col justify-between items-center flex">
          <div className="self-stretch justify-center items-center gap-[150px] inline-flex">
            <div className="grow shrink basis-0 h-24 justify-between items-center flex">
              <div className="text-center text-green-950 text-4xl font-bold font-['MICEGothic'] leading-10">
                고추
              </div>
              <img
                className="w-24 h-24"
                src="https://via.placeholder.com/96x96"
              />
            </div>
            <div className="grow shrink basis-0 h-24 justify-between items-center flex">
              <div className="text-center text-green-950 text-4xl font-bold font-['MICEGothic'] leading-10">
                부추
              </div>
              <img
                className="w-24 h-24"
                src="https://via.placeholder.com/96x96"
              />
            </div>
            <div className="grow shrink basis-0 h-24 justify-between items-center flex">
              <div className="text-center text-green-950 text-4xl font-bold font-['MICEGothic'] leading-10">
                상추
              </div>
              <img
                className="w-24 h-24"
                src="https://via.placeholder.com/96x96"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="w-full self-stretch justify-center items-center gap-[38px] inline-flex">
        <div className="grow shrink basis-0 flex-col justify-center items-center gap-[15px] inline-flex">
          <div className="text-center text-green-900 text-4xl font-bold font-['MICEGothic'] leading-10">
            밑거름 비료 비율
          </div>
          <div className="self-stretch h-[336px] px-[30px] py-11 bg-amber-100 rounded-[15px] justify-center items-center gap-2.5 inline-flex">
            <div className="w-auto text-center text-black text-4xl font-bold font-['MICEGothic'] leading-10">
              비료1
              <br />
              비료2
              <br />
              비료3
              <br />
              비료4
              <br />
              비료5
            </div>
          </div>
        </div>
        <div className="grow shrink basis-0 flex-col justify-center items-center gap-[15px] inline-flex">
          <div className="justify-center items-center gap-[15px] inline-flex">
            <div className="text-center text-green-900 text-4xl font-bold font-['MICEGothic'] leading-10">
              웃거름 비료 비율
            </div>
            <div className="w-[54px] h-[54px] relative">
              <div className="w-[54px] h-[54px] left-0 top-0 absolute bg-amber-300 rounded-full" />
              <div className="w-9 h-[43.20px] left-[9px] top-[5.40px] absolute">
                <div className="w-[20.05px] left-[7.60px] top-[39.23px] absolute"></div>
              </div>
            </div>
          </div>
          <div className="self-stretch px-[86px] py-[66px] bg-amber-100 rounded-[15px] justify-center items-center gap-2.5 inline-flex">
            <div className="w-auto text-center text-black text-4xl font-bold font-['MICEGothic'] leading-10">
              비료1
              <br />
              비료2
              <br />
              비료3
              <br />
              비료4
              <br />
              비료5
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
