import StepBox from "./StepBox";
import Stepper from "./Stepper";

const TotalLayout = () => {
  return (
    <div className="flex w-full items-center mx-[5%] gap-[5%] ">
      <Stepper />
      <StepBox />
    </div>
  );
};

export default TotalLayout;
