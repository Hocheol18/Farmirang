import StepBox from "./StepBox";
import Stepper from "./Stepper";

const TotalLayout = () => {
  return (
    <div className="flex w-full border-black-100 items-center mx-[5%] gap-[7%]">
      <Stepper />
      <StepBox />
    </div>
  );
};

export default TotalLayout;
