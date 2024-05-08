import TitleBox from "../TitleBox";
import FirstInputBox from "./FirstInputBox";

interface Props {
  handleStep: (step: number) => void;
}

const FirstPage = ({ handleStep }: Props) => {
  return (
    <div className=" flex flex-col w-[90%] h-[90%]">
      {/* 1단계 타이틀 */}
      <TitleBox
        basicText1="텃밭 정보를"
        pointText="입력"
        basicText2="해주세요"
      />
      <FirstInputBox handleStep={handleStep} />
    </div>
  );
};

export default FirstPage;
