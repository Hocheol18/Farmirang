import SelectMenu from "@/app/_components/common/SelectMenus";

export default function DesignUpload() {
  const MyDesignArr = [
    { id: 1, name: "1" },
    { id: 2, name: "2" },
    { id: 3, name: "3" },
  ];

  return (
    <div className="p-[50px] flex-col justify-center items-center gap-[50px] inline-flex">
      <div className="self-stretch h-28 flex-col justify-start items-center gap-1.5 flex">
        <div className="self-stretch text-center text-green-900 text-h4 font-bold font-['MICEGothic'] leading-10">
          꾸미기 선택
        </div>
        <SelectMenu
          labelcss={"font-semibold text-black-100 text-sm"}
          topScript={"자랑할 밭 디자인을 골라주세요!"}
          items={MyDesignArr}
          bordercss={"border-gray-300"}
          value={1}
          onChange={() => {}}
        />
      </div>
      <div className="self-stretch h-[302px] flex-col justify-center items-center gap-[17px] flex">
        <div className="self-stretch h-[41px] text-center text-green-900 text-h4 font-bold font-['MICEGothic'] leading-10">
          선택한 디자인
        </div>
        <img
          className="self-stretch h-[244px] rounded-[15px]"
          src="https://via.placeholder.com/813x244"
        />
      </div>
      <div className="self-stretch h-auto flex-col justify-center items-center gap-[17px] flex">
        <div className="self-stretch text-center text-green-900 text-h4 font-bold font-['MICEGothic'] leading-10">
          한줄 메모 남기기
        </div>
        <div className="mt-2">
          <textarea
            id="about"
            name="about"
            rows={6}
            className="flex rounded-md border border-green-300 w-[350px] focus:outline-none focus:ring-green-400 focus:ring-1 p-4"
            defaultValue={""}
          />
        </div>
      </div>
    </div>
  );
}
