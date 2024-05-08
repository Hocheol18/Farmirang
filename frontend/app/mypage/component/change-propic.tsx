export default function ChangePicture() {
  return (
    <div className="w-[450px] h-[1312px] relative flex-col justify-start items-start inline-flex">
      <div className="w-[450px] h-[1312px] bg-white rounded-[20px] border-2 border-black" />
      <div className="w-[345px] h-[255.24px] flex-col justify-center items-start gap-[15px] inline-flex">
        <div className="text-black text-5xl font-bold font-['MICEGothic'] leading-[60px]">
          기관 회원 전환 신청
        </div>
        <div className="text-black text-2xl font-normal font-['MICEGothic'] leading-loose">
          후원 요청을 위한 기관회원 전환
        </div>
      </div>
      <div className="w-[390px] h-[644.07px] flex-col justify-start items-start gap-[30px] inline-flex">
        <div className="h-[70px] flex-col justify-start items-start gap-1.5 flex">
          <div className="text-zinc-800 text-xl font-bold font-['MICEGothic'] leading-7">
            시설명
          </div>
          <div className="self-stretch px-[13px] py-[9px] bg-white rounded-lg shadow border border-zinc-200 justify-start items-center inline-flex">
            <div className="text-neutral-400 text-[13px] font-normal font-['Inter'] leading-[18px]">
              Placeholder
            </div>
          </div>
        </div>
        <div className="h-[70px] flex-col justify-start items-start gap-1.5 flex">
          <div className="text-zinc-800 text-xl font-bold font-['MICEGothic'] leading-7">
            소재지
          </div>
          <div className="self-stretch px-[13px] py-[9px] bg-white rounded-lg shadow border border-zinc-200 justify-start items-center inline-flex">
            <div className="text-neutral-400 text-[13px] font-normal font-['Inter'] leading-[18px]">
              Placeholder
            </div>
          </div>
        </div>
        <div className="h-[94px] flex-col justify-start items-start gap-1.5 flex">
          <div className="text-zinc-800 text-xl font-bold font-['MICEGothic'] leading-7">
            복지 시설 신고번호
          </div>
          <div className="self-stretch px-[13px] py-[9px] bg-white rounded-lg shadow border border-red-300 justify-start items-center inline-flex">
            <div className="text-neutral-400 text-[13px] font-normal font-['Inter'] leading-[18px]">
              Placeholder
            </div>
          </div>
          <div className="text-red-500 text-[13px] font-normal font-['Inter'] leading-[18px]">
            필수로 입력해야합니다.
          </div>
        </div>
      </div>
      <div className="w-[82px] h-[114.50px] shadow flex-col justify-center items-center inline-flex">
        <div className="self-stretch grow shrink basis-0 px-8 py-3 bg-green-700 rounded-lg shadow border border-green-700 flex-col justify-center items-center gap-[22px] flex">
          <div className="text-center text-white text-xl font-bold font-['MICEGothic'] leading-7">
            확인
          </div>
        </div>
      </div>
      <div className="w-[82px] h-[114.50px] shadow flex-col justify-center items-center inline-flex">
        <div className="self-stretch grow shrink basis-0 px-8 py-3 bg-green-50 rounded-lg shadow border border-green-50 flex-col justify-center items-center gap-[22px] flex">
          <div className="text-center text-green-700 text-xl font-bold font-['MICEGothic'] leading-7">
            취소
          </div>
        </div>
      </div>
    </div>
  );
}
