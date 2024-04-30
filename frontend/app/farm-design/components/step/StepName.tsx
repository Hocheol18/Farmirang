interface StepProps {
  stepNumber: number;
  title: string;
  isActive: boolean;
  isFirst?: boolean;
}

const StepName = ({ stepNumber, title, isActive, isFirst }: StepProps) => {
  return (
    <div className="flex">
      <h6
        className={`text-base font-bold ${
          isActive ? "text-green-500" : "text-gray-400"
        }`}
      >
        <div>{stepNumber}</div>
        <div>{title}</div>
      </h6>
    </div>
  );
};

export default StepName;
