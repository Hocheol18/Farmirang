"use client";

import { useState } from "react";
import SecondFirstPage from "./SecondFirstPage";
import SecondSecondPage from "./SecondSecondPage";

const SecondPage = () => {
  const [isCheck, setIsCheck] = useState<boolean>(false);

  return (
    <div className=" flex flex-col w-[90%] h-[90%]  ">
      {!isCheck ? <SecondFirstPage /> : <SecondSecondPage />}
    </div>
  );
};

export default SecondPage;
