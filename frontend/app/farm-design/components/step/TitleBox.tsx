import TitleIcon from "../../../../public/icons/sprout-icon.png";
import Image from "next/image";

interface Props {
  basicText1: string;
  pointText: string;
  basicText2: string;
}

// 포인트 주는 타이틀 박스
const TitleBox = ({ basicText1, pointText, basicText2 }: Props) => {
  return (
    <div className="flex">
      <div className="flex flex-col w-fit-content relative px-2 ">
        {/* 타이틀 밑에 회색 밑줄 */}
        <div className="absolute w-full h-3 bottom-0 left-0 bg-gray-350" />

        <div className="flex relative gap-1 ">
          {/* 새싹 아이콘 */}
          <Image
            className="relative w-10 h-10 object-cover"
            alt="Natural food"
            src={TitleIcon}
          />
          {/* 타이틀 */}
          <div className="inline-flex items-end relative w-fit-content gap-1">
            {/* 일반텍스트1 */}
            <div className="relative w-fit text-lg font-extrabold text-black text-center tracking-[var(--m-h3-letter-spacing)] leading-[var(--m-h3-line-height)] whitespace-nowrap [font-style:var(--m-h3-font-style)]">
              {basicText1}
            </div>
            {/* 포인트(강조할)텍스트 */}
            <div className="my-1 relative w-fit text-base px-2 rounded-md font-extrabold text-white-100 bg-green-400 text-center tracking-[var(--m-h3-letter-spacing)]  whitespace-nowrap [font-style:var(--m-h3-font-style)]">
              {pointText}
            </div>
            {/* 일반텍스트2 */}
            <div className="relative w-fit text-lg font-extrabold text-black text-center tracking-[var(--m-h3-letter-spacing)] leading-[var(--m-h3-line-height)] whitespace-nowrap [font-style:var(--m-h3-font-style)]">
              {basicText2}
            </div>
          </div>
        </div>
      </div>
      <div className="flex-1"></div>
    </div>
  );
};

export default TitleBox;
