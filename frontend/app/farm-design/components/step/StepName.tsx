interface StepProps {
  title: string;
  content: string;
  isNow: boolean;
}

const StepName = ({ title, content, isNow }: StepProps) => {
  return (
    <div
      className={`flex flex-col ${
        title === `1단계` ? "" : `h-full justify-end`
      } items-center `}
    >
      <div
        className={`font-black font-tmoney ${
          isNow ? " text-h4 text-green-400" : " text-h5 text-gray-350"
        }`}
      >
        <div>{title}</div>
      </div>
      <div
        className={`text-sm text-center ${
          isNow ? "text-black-100" : "text-gray-350"
        }`}
      >
        <div>{content}</div>
      </div>
    </div>
  );
};

export default StepName;
