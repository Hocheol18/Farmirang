import TitleBox from "../TitleBox";
import FirstInputBox from "./FirstInputBox";

interface Props {
  handleStep: (step: number) => void;
  userAccessToken: string;
  handleUpdateFieldDesignId: (newDesignId: number) => void;
  handleUpdateFieldClickableArray: (
    newFieldClickableArray: boolean[][]
  ) => void;
  handleUpdateFieldGridArray: (newFieldGridArray: number[][]) => void;
}

const FirstPage = ({
  handleStep,
  userAccessToken,
  handleUpdateFieldDesignId,
  handleUpdateFieldClickableArray,
  handleUpdateFieldGridArray,
}: Props) => {
  return (
    <div className=" flex flex-col w-[90%] h-[90%]">
      {/* 1단계 타이틀 */}
      <TitleBox
        basicText1="텃밭 정보를"
        pointText="입력"
        basicText2="해주세요"
      />
      <div className="mt-3 h-full overflow-y-auto">
        <FirstInputBox
          handleStep={handleStep}
          userAccessToken={userAccessToken}
          handleUpdateFieldDesignId={handleUpdateFieldDesignId}
          handleUpdateFieldClickableArray={handleUpdateFieldClickableArray}
          handleUpdateFieldGridArray={handleUpdateFieldGridArray}
        />
      </div>
    </div>
  );
};

export default FirstPage;
