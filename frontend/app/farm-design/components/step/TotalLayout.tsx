import StepBox from "./StepBox";
import Stepper from "./Stepper";

const TotalLayout = () => {
  return (
    <div className="flex w-full border-black-100 items-center mx-[5%] gap-[5%]  border border-2 ">
      <Stepper />
      <StepBox />
    </div>
  );
};

export default TotalLayout;
